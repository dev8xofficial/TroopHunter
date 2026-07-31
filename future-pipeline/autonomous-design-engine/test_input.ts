import { inputGate } from './src/guardrails.js';
import fs from 'fs';

const brief = JSON.parse(fs.readFileSync('test_assets/brief.json', 'utf-8'));
const result = inputGate(brief, undefined, 'test_assets/brief.json');
console.log(JSON.stringify(result, null, 2));
