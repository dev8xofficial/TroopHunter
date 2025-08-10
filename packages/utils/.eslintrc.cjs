module.exports = {
  extends: ['@repo/eslint-config/.eslintrc.base.cjs'],
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        moduleDirectory: ['node_modules', 'src/'], // Add this line
      },
      react: {
        version: 'detect', // or specify your React version, e.g., '17.0.2'
      },
    },
  },
  ignorePatterns: ['build.config.js'],
};
