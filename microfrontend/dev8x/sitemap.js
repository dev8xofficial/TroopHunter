import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { watch } from 'chokidar';
import fsExtra from 'fs-extra';
import { SitemapStream, streamToPromise } from 'sitemap';

// Destructure the required functions from fs-extra
const { createWriteStream } = fsExtra;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define a record to map page names to URLs for dev8x
const pageToUrlMap = {
  // Main pages
  index: '/',
  'about/index': '/about',
  'pricing/index': '/pricing',
  'contact/index': '/contact',
  'our-process/index': '/our-process',
  'services-for-early-stage-startups/index': '/services-for-early-stage-startups',
  'services-for-growth-stage-startups/index': '/services-for-growth-stage-startups',
  'cto-as-a-service/index': '/cto-as-a-service',
  'web-applications/index': '/web-applications',
  'saas-applications/index': '/saas-applications',
  'mobile-applications/index': '/mobile-applications',
  'internships/index': '/internships',
  'privacy/index': '/privacy',
  '404/index': '/404',

  // Dynamic routes (these will be handled separately)
  'pricing/[slug]': '/pricing/[slug]',
};

// Function to read dynamic routes from data files
const readDynamicRoutes = () => {
  const dynamicRoutes = {
    pricing: []
  };

  try {
    // Read pricing routes
    const pricingDataPath = path.join(__dirname, './data/pricing/index.d.tsx');
    if (fs.existsSync(pricingDataPath)) {
      const pricingContent = fs.readFileSync(pricingDataPath, 'utf-8');

      // 1. FIX: Changed 'Offers' to 'OFFERS' to match the data file
      // 2. FIX: The capture group ([\s\S]*?) will contain the array content
      const pricingMatch = pricingContent.match(/const\s+OFFERS\s*:\s*OffersContent[\s\w\[\]]*=\s*\[([\s\S]*?)\];/);

      if (pricingMatch) {
        // CORRECT: Use pricingMatch[1] to get the captured content *inside* the array brackets
        const pricingArrayContent = pricingMatch[1];

        // Extract slug properties using regex
        const slugMatches = pricingArrayContent.match(/slug:\s*['"`]([^'"`]+)['"`]/g);
        if (slugMatches) {
          slugMatches.forEach((match) => {
            const slug = match.match(/slug:\s*['"`]([^'"`]+)['"`]/)[1];
            dynamicRoutes.pricing.push(slug);
          });
        }
      }
    }

    console.log('📊 Dynamic routes found:');
    console.log(`   Pricing: ${dynamicRoutes.pricing.length} routes`);

    return dynamicRoutes;
  } catch (error) {
    console.error('Error reading dynamic routes:', error);
    return dynamicRoutes;
  }
};

// Function to get the current date in `YYYY-MM-DD` format
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Cache the existing sitemap content to avoid redundant writes
let existingSitemapContent = '';

// Function to generate the sitemap based on updated paths
const generateSitemap = async (updatedPaths = new Set(Object.values(pageToUrlMap))) => {
  try {
    console.log('Generating sitemap for dev8x...');

    if (!process.env.NEXT_PUBLIC_DEV8X_APP_URL) {
      console.warn('Warning: NEXT_PUBLIC_DEV8X_APP_URL is not defined, using default');
      process.env.NEXT_PUBLIC_DEV8X_APP_URL = 'https://dev8x.com';
    }

    const sitemapStream = new SitemapStream({ hostname: process.env.NEXT_PUBLIC_DEV8X_APP_URL });

    // Read dynamic routes
    const dynamicRoutes = readDynamicRoutes();

    // Add static pages
    for (const [pageName, urlPath] of Object.entries(pageToUrlMap)) {
      if (urlPath === '/404' || urlPath.includes('[slug]')) continue; // Skip 404 routes and dynamic routes

      const lastmod = updatedPaths.has(urlPath) ? getCurrentDate() : undefined;

      // Define changefreq and priority based on page importance
      let changefreq = 'weekly';
      let priority = 0.9;

      if (urlPath === '/') {
        changefreq = 'monthly';
        priority = 1.0;
      } else if (urlPath === '/about') {
        changefreq = 'yearly';
        priority = 0.9;
      } else if (urlPath === '/contact') {
        changefreq = 'yearly';
        priority = 0.7;
      } else if (urlPath === '/cto-as-a-service') {
        changefreq = 'monthly';
        priority = 0.6;
      } else if (urlPath === '/services-for-early-stage-startups') {
        changefreq = 'monthly';
        priority = 0.6;
      } else if (urlPath === '/services-for-growth-stage-startups') {
        changefreq = 'monthly';
        priority = 0.5;
      } else if (urlPath === '/web-applications') {
        changefreq = 'monthly';
        priority = 0.5;
      } else if (urlPath === '/saas-applications') {
        changefreq = 'monthly';
        priority = 0.5;
      } else if (urlPath === '/mobile-applications') {
        changefreq = 'monthly';
        priority = 0.5;
      } else if (urlPath === '/our-process') {
        changefreq = 'yearly';
        priority = 0.5;
      } else if (urlPath === '/privacy') {
        changefreq = 'yearly';
        priority = 0.4;
      } else if (urlPath === '/pricing') {
        changefreq = 'monthly';
        priority = 0.8;
      }

      sitemapStream.write({
        url: urlPath,
        changefreq,
        priority,
        lastmod
      });
    }

    // Add dynamic pricing routes
    for (const slug of dynamicRoutes.pricing) {
      sitemapStream.write({
        url: `/pricing/${slug}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: getCurrentDate()
      });
    }

    sitemapStream.end();

    const sitemapBuffer = await streamToPromise(sitemapStream);
    const newSitemapContent = sitemapBuffer.toString();

    if (newSitemapContent !== existingSitemapContent) {
      fs.writeFileSync('./public/sitemap.xml', newSitemapContent, 'utf-8');
      existingSitemapContent = newSitemapContent;
      console.log('dev8x sitemap updated successfully.');
    } else {
      console.log('dev8x sitemap content unchanged.');
    }
  } catch (error) {
    console.error('Error generating dev8x sitemap:', error);
  }
};

// Function to start watching page files for changes
const startFileWatcher = () => {
  const pagesDir = path.join(__dirname, './pages/**/*.tsx');
  const dataDir = path.join(__dirname, './data/**/*.d.tsx');
  console.log('pagesDir:', pagesDir);
  console.log('dataDir:', dataDir);
  const updatedPaths = new Set();

  // Initialize chokidar to watch page files and data files
  const watcher = watch([pagesDir, dataDir], {
    persistent: true,
    ignoreInitial: true,
    ignored: ['**/node_modules/**', '**/.next/**', '**/components/**', '**/*.module.css', '**/_app.tsx', '**/_document.tsx']
  });

  let updateTimeout = null;

  // Trigger update on file change
  watcher.on('change', (filePath) => {
    console.log(`File changed: ${filePath}`);

    // Check if it's a data file (pricing)
    if (filePath.includes('/data/pricing/')) {
      console.log('Data file changed, regenerating sitemap with dynamic routes...');

      // Debounce updates (wait for 5 seconds of inactivity)
      if (updateTimeout !== null) clearTimeout(updateTimeout);

      updateTimeout = setTimeout(() => {
        generateSitemap(new Set(['/pricing']));
      }, 5000);
      return;
    }

    // Handle page file changes
    const relativePath = path.relative(path.join(__dirname, './pages'), filePath);
    const pageKey = relativePath.replace(/\.tsx$/, '');

    // Find the corresponding URL path
    let urlPath = null;
    for (const [key, url] of Object.entries(pageToUrlMap)) {
      if (key === pageKey) {
        urlPath = url;
        break;
      }
    }

    if (urlPath && urlPath !== '/404' && !urlPath.includes('[slug]')) {
      updatedPaths.add(urlPath);

      // Debounce updates (wait for 5 seconds of inactivity)
      if (updateTimeout !== null) clearTimeout(updateTimeout);

      updateTimeout = setTimeout(() => {
        generateSitemap(updatedPaths);
        updatedPaths.clear();
      }, 5000);
    }
  });

  // Handle file deletions
  watcher.on('unlink', (filePath) => {
    console.log(`File removed: ${filePath}`);

    // Check if it's a data file
    if (filePath.includes('/data/pricing/')) {
      console.log('Data file removed, regenerating sitemap...');
      generateSitemap(new Set(['/pricing']));
      return;
    }

    const relativePath = path.relative(path.join(__dirname, './pages'), filePath);
    const pageKey = relativePath.replace(/\.tsx$/, '');

    if (pageToUrlMap[pageKey]) {
      const urlPath = pageToUrlMap[pageKey];
      delete pageToUrlMap[pageKey];
      generateSitemap(new Set([urlPath])); // Update sitemap to remove the deleted route
    }
  });

  // Error Handling
  watcher.on('error', (error) => {
    console.error('Error watching file changes:', error);
  });

  console.log('File watcher started. Monitoring for changes in dev8x page files and data files...');
};

// Only trigger the watcher in production and generate the initial sitemap
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  console.log('Starting dev8x sitemap generation in production mode...');
  generateSitemap().catch(console.error);
  startFileWatcher();
} else {
  console.log('Generating dev8x sitemap in development mode for testing...');
  generateSitemap().catch(console.error);
}
