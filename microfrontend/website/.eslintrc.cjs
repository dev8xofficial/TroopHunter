module.exports = {
  env: {
    browser: true
  },
  extends: ['@repo/eslint-config/.eslintrc.base.cjs', 'plugin:jsx-a11y/recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
        trailingComma: 'all' // Add this line
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // 'no-shadow': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        moduleDirectory: ['node_modules', 'src/'] // Add this line
      },
      react: {
        version: 'detect' // or specify your React version, e.g., '17.0.2'
      }
    }
  },
  ignorePatterns: ['tailwind.config.cjs', 'vite.config.ts', 'postcss.config.cjs', 'sitemap.js', 'submitToIndexNow.js']
};
