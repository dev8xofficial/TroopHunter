const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy package.json to dist for proper module resolution
const packageJson = require('./package.json');
const distPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  main: './index.js',
  types: './index.d.ts',
  exports: {
    '.': {
      types: './index.d.ts',
      import: './index.js',
      require: './index.js',
    },
  },
};

fs.writeFileSync(path.join(distDir, 'package.json'), JSON.stringify(distPackageJson, null, 2));

console.log('✅ Build configuration completed');
