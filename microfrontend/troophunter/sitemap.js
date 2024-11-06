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
  console.log('Generating sitemap...');

  const sitemapStream = new SitemapStream({ hostname: `${process.env.NEXT_TROOPHUNTER_APP_URL}` });
  const writeStream = createWriteStream('./public/sitemap.xml');

  sitemapStream.pipe(writeStream);

  for (const [componentName, urlPath] of Object.entries(componentToUrlMap)) {
    const lastmod = updatedPaths.has(urlPath) ? getCurrentDate() : undefined;
    const changefreq = urlPath === '/lead' ? 'daily' : 'monthly'; // Customize based on page type

    sitemapStream.write({
      url: urlPath,
      changefreq,
      priority: 0.8,
      lastmod
    });
  }

  sitemapStream.end();

  // Convert the stream to a string and check if it differs from the existing content
  const sitemapBuffer = await streamToPromise(sitemapStream);
  const newSitemapContent = sitemapBuffer.toString();

  console.log('New Sitemap Content:', newSitemapContent);

  if (newSitemapContent !== existingSitemapContent) {
    fs.writeFileSync('./public/sitemap.xml', newSitemapContent, 'utf-8');
    existingSitemapContent = newSitemapContent;
    console.log('Sitemap updated.');
  } else {
    console.log('Sitemap content has not changed.');
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
if (process.env.NODE_ENV === 'production') {
  generateSitemap(); // Generate sitemap on startup
  startFileWatcher();
}
