// eslint.config.js (root)
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  { ignores: ['node_modules', 'dist', 'example/dist'] },
  {
    files: ['frontend/**/*.js', 'scripts/**/*.mjs', 'example/**/*.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2023,
      },
    },
    plugins: { import: importPlugin, prettier: eslintPluginPrettier },
    rules: {
      ...js.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,

      'prettier/prettier': 'error',
      'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
      'max-len': [
        'error',
        {
          code: 80,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    },
  },

  prettier,
];
