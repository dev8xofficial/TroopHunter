/**
 * ADE — CLI
 *
 * Arg parsing → dispatch only (no logic).
 * Maps spec 07 §2 command surface.
 *
 * @module cli
 */

import { Command } from 'commander';
import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import { buildConfig } from './config.js';
import { runLoop } from './orchestrator.js';
import { generateReport } from './report.js';
import type { Brief, BrandData } from './schema.js';

const program = new Command();

program
  .name('ade')
  .description('Autonomous Design Engine — AI that designs from a brief')
  .version('0.1.0');

// ─── generate ──────────────────────────────────────────────────────

program
  .command('generate')
  .description('Run the generate→render→screenshot→critique→edit loop on one section')
  .requiredOption('--brief <path>', 'Path to brief JSON file')
  .requiredOption('--section <name>', 'Section name (e.g. hero)')
  .requiredOption('--out <dir>', 'Output directory')
  .option('--brand-data <path>', 'Path to brand-data JSON file')
  .option('--variations <n>', 'Candidates per iteration', '1')
  .option('--max-iters <n>', 'Max loop iterations', '4')
  .option('--threshold <n>', 'Pass score (0-100)', '80')
  .option('--refs <paths...>', 'Reference screenshots (≤5, soft)')
  .option('--model <id>', 'Model ID')
  .option('--headed', 'Show the browser while rendering')
  .action(async (opts) => {
    try {
      // Build config from env + CLI overrides
      const cfg = buildConfig({
        model: opts.model,
        variations: opts.variations ? parseInt(opts.variations) : undefined,
        maxIters: opts.maxIters ? parseInt(opts.maxIters) : undefined,
        threshold: opts.threshold ? parseInt(opts.threshold) : undefined,
        headed: opts.headed,
      });

      // Load brief
      const briefPath = resolve(opts.brief);
      if (!existsSync(briefPath)) {
        console.error(`❌ Brief file not found: ${briefPath}`);
        process.exit(1);
      }
      const brief: Brief = JSON.parse(readFileSync(briefPath, 'utf-8'));

      // Validate section name matches
      if (brief.section.name !== opts.section) {
        console.warn(
          `⚠ Section name in brief ("${brief.section.name}") differs from --section ("${opts.section}"). Using brief's name.`,
        );
      }

      // Load brand-data (optional)
      let brandData: BrandData | undefined;
      if (opts.brandData) {
        const brandPath = resolve(opts.brandData);
        if (!existsSync(brandPath)) {
          console.error(`❌ Brand-data file not found: ${brandPath}`);
          process.exit(1);
        }
        brandData = JSON.parse(readFileSync(brandPath, 'utf-8'));
      }

      // Output directory
      const outDir = resolve(opts.out);

      console.log('\n🚀 ADE Generate');
      console.log(`   Brief: ${briefPath}`);
      console.log(`   Section: ${brief.section.name}`);
      console.log(`   Output: ${outDir}`);
      console.log(`   Provider: ${cfg.provider} (${cfg.modelId})`);
      console.log(`   Variations: ${cfg.variations}`);
      console.log(`   Max iters: ${cfg.maxIters}`);
      console.log(`   Threshold: ${cfg.threshold}`);
      console.log('');

      // Run the loop
      const result = await runLoop(cfg, brief, brandData, outDir, briefPath);

      // Exit code per spec
      switch (result.state) {
        case 'APPROVED':
          process.exit(0);
        case 'ESCALATED':
          process.exit(2);
        case 'ABORTED':
          process.exit(3);
      }
    } catch (err) {
      console.error('❌ Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// ─── report ────────────────────────────────────────────────────────

program
  .command('report')
  .description('Generate a report from trace.jsonl')
  .option('--out <dir>', 'Run output directory')
  .option('--all <dir>', 'Scan all run directories under this path')
  .action(async (opts) => {
    try {
      if (opts.out) {
        generateReport(resolve(opts.out));
      } else if (opts.all) {
        generateReport(resolve(opts.all), true);
      } else {
        console.error('❌ Specify --out <dir> or --all <dir>');
        process.exit(1);
      }
    } catch (err) {
      console.error('❌ Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// ─── Parse ─────────────────────────────────────────────────────────

program.parse();
