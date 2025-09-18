module.exports = [
  {
    ignores: ['node_modules/', 'frontend/dist/', 'backend/prisma/dev.db'],
  },
  {
    files: ['frontend/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
    plugins: {
      react: require('eslint-plugin-react'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'react-hooks': require('eslint-plugin-react-hooks'),
    },
    settings: { react: { version: 'detect' } },
    rules: {},
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  },
  {
    files: ['backend/**/*.ts'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: { '@typescript-eslint': require('@typescript-eslint/eslint-plugin') },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    rules: {},
  },
];
module.exports = {
  // Flat config compatible with ESLint v9+; provides overrides for frontend and backend
  ignores: ['node_modules/', 'frontend/dist/', 'backend/prisma/dev.db'],
  overrides: [
    {
      files: ['frontend/**/*.{js,jsx,ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      plugins: { react: require('eslint-plugin-react') },
      settings: { react: { version: 'detect' } },
      rules: {},
      extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
    },
    {
      files: ['backend/**/*.ts'],
      languageOptions: { ecmaVersion: 2020, sourceType: 'module' },
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: { project: './backend/tsconfig.json' },
      rules: {},
    },
  ],
};
