import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
  // Base
  {
    ignores: ['dist'],
  },

  // JS
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    ...js.configs.recommended,
  },

  // TS
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        warnOnUnsupportedTypeScriptVersion: true
      },
    },
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
    ],
    rules: {
      "@typescript-eslint/no-base-to-string": "off"
    },
  },

  // Prettier
  prettier,
);
