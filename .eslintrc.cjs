module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'simple-import-sort'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-empty-object-type': 'off',
    // Allow intentionally unused vars/args if prefixed with "_"
    '@typescript-eslint/no-unused-vars': ['error', {
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_',
    }],
    'comma-spacing': ['error', { before: false, after: true }],
    'indent': ['error', 2],
    'max-len': ['error', { code: 120 }],
    'object-curly-newline': ['error', { consistent: true }],
    'object-curly-spacing': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'semi': ['error', 'always'],
    'import/prefer-default-export': 'error',
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': 'warn',
    // Nudge cross-folder imports towards the "src/*" absolute alias instead of "../../.." chains.
    'no-restricted-imports': ['warn', { patterns: ['../*'] }],
  },
  overrides: [
    {
      files: ['.eslintrc.cjs'],
      env: { node: true },
    },
  ],
  ignorePatterns: ['dist', 'node_modules'],
};
