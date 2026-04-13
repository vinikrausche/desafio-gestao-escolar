const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

// ! A configuracao segue a base do Expo e deixa o Prettier como fonte unica de formatacao.
module.exports = defineConfig([
  {
    ignores: ['.expo/**', 'coverage/**', 'dist/**', 'node_modules/**'],
  },
  ...expoConfig,
  prettierRecommended,
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
        },
      ],
    },
  },
]);
