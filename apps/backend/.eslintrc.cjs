module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: { project: './tsconfig.json', tsconfigRootDir: __dirname },
  env: { node: true, es2021: true },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
