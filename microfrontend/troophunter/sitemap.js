import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { watch } from 'chokidar';
import fsExtra from 'fs-extra'; // Import fs-extra as a whole
import { SitemapStream, streamToPromise } from 'sitemap';

// Destructure the required functions from fs-extra
const { createWriteStream } = fsExtra;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define a record to map component names to URLs
const componentToUrlMap = {
  SignIn: '/signin',
  SignUp: '/signup',
  ForgotPassword: '/forgot-password',
  ResetPassword: '/reset-password/:id/:token',
  Home: '/lead',
  Leads: '/leads',
  SettingsProfile: '/settings/profile',
  SettingsSecurity: '/settings/security',
  PageNotFound: '*',
  Verified: '/verify/:id/:token'
};

// Function to get the current date in `YYYY-MM-DD` format
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Cache the existing sitemap content to avoid redundant writes
let existingSitemapContent = '';

// Function to generate the sitemap based on updated paths
const generateSitemap = async (updatedPaths = new Set(Object.values(componentToUrlMap))) => {
  try {
    console.log('Generating sitemap...');

    if (!process.env.NEXT_PUBLIC_TROOPHUNTER_APP_URL) {
      console.warn('Warning: NEXT_PUBLIC_TROOPHUNTER_APP_URL is not defined');
      return;
    }

    const sitemapStream = new SitemapStream({ hostname: process.env.NEXT_PUBLIC_TROOPHUNTER_APP_URL });
    const writeStream = createWriteStream('./public/sitemap.xml');

    sitemapStream.pipe(writeStream);

    for (const [componentName, urlPath] of Object.entries(componentToUrlMap)) {
      if (urlPath === '*') continue; // Skip 404 routes

      const lastmod = updatedPaths.has(urlPath) ? getCurrentDate() : undefined;
      const changefreq = urlPath === '/lead' ? 'daily' : 'monthly';

      sitemapStream.write({
        url: urlPath,
        changefreq,
        priority: 0.8,
        lastmod
      });
    }

    sitemapStream.end();

    const sitemapBuffer = await streamToPromise(sitemapStream);
    const newSitemapContent = sitemapBuffer.toString();

    if (newSitemapContent !== existingSitemapContent) {
      fs.writeFileSync('./public/sitemap.xml', newSitemapContent, 'utf-8');
      existingSitemapContent = newSitemapContent;
      console.log('Sitemap updated successfully.');
    } else {
      console.log('Sitemap content unchanged.');
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};

// Function to start watching component files for changes
const startFileWatcher = () => {
  const pagesDir = path.join(__dirname, '../src/pages/*.tsx');
  console.log('pagesDir:', pagesDir);
  const updatedPaths = new Set();

  // Initialize chokidar to watch component files
  const watcher = watch(pagesDir, {
    persistent: true,
    ignoreInitial: true
  });

  let updateTimeout = null;

  // Trigger update on file change
  watcher.on('change', (filePath) => {
    console.log(`File changed: ${filePath}`);
    const componentName = path.basename(filePath, '.tsx');
    const urlPath = componentToUrlMap[componentName];
    if (urlPath) {
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
    const componentName = path.basename(filePath, '.tsx');
    const urlPath = componentToUrlMap[componentName];
    if (urlPath) {
      delete componentToUrlMap[componentName];
      generateSitemap(new Set([urlPath])); // Update sitemap to remove the deleted route
    }
  });

  // Error Handling
  watcher.on('error', (error) => {
    console.error('Error watching file changes:', error);
  });

  console.log('File watcher started. Monitoring for changes in component files...');
};

// Only trigger the watcher in production and generate the initial sitemap
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  console.log('Starting sitemap generation in production mode...');
  generateSitemap().catch(console.error);
  startFileWatcher();
} else {
  console.log('Skipping sitemap generation in development mode.');
}
