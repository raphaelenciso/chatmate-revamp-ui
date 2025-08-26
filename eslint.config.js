import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      eslintPluginUnicorn.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Disable rules that can be problematic in React
      'unicorn/prevent-abbreviations': 'off', // React uses common abbreviations like 'props', 'ref', 'e' for events
      'unicorn/array-type': 'off',
      'unicorn/no-null': 'off', // React often uses null for conditional rendering
      'unicorn/no-array-reduce': 'off', // Reduce is commonly used in React state management
      'unicorn/no-array-for-each': 'off', // forEach is sometimes needed in React for side effects
      'unicorn/prefer-query-selector': 'off', // React uses refs and getElementById is sometimes needed
      'unicorn/prefer-dom-node-dataset': 'off', // React handles data attributes differently
      'unicorn/prefer-add-event-listener': 'off', // React uses onClick, onSubmit, etc.
      'unicorn/prefer-dom-node-append': 'off', // React handles DOM manipulation
      'unicorn/prefer-dom-node-remove': 'off', // React handles DOM manipulation
      'unicorn/no-keyword-prefix': 'off', // React component names can start with keywords
      'unicorn/prefer-global-this': 'off', // GlobalThis is used in React for window and document
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-nested-ternary': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-useless-promise-resolve-reject': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-top-level-await': 'off',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'no-shadow': 'off',

      // Customize filename case for React components
      'unicorn/filename-case': [
        'warn',
        {
          cases: {
            camelCase: true,
            pascalCase: true, // Allow PascalCase for React components
            kebabCase: true,
          },
          // Allow filenames starting with hyphen (-)
          ignore: ['^-.*'],
        },
      ],

      // Useful rules to keep enabled for React
      'unicorn/better-regex': 'warn',
      'unicorn/error-message': 'error',
      'unicorn/explicit-length-check': 'warn',
      'unicorn/import-style': 'warn',
      'unicorn/new-for-builtins': 'error',
      'unicorn/no-array-push-push': 'warn',
      'unicorn/no-console-spaces': 'warn',
      'unicorn/no-empty-file': 'error',
      'unicorn/no-instanceof-array': 'error',
      'unicorn/no-lonely-if': 'warn',
      'unicorn/no-negated-condition': 'warn',
      'unicorn/no-new-array': 'error',
      'unicorn/no-typeof-undefined': 'error',
      'unicorn/no-unnecessary-await': 'error',
      'unicorn/no-unreadable-array-destructuring': 'warn',
      'unicorn/no-useless-spread': 'error',
      'unicorn/no-zero-fractions': 'error',
      'unicorn/prefer-array-find': 'warn',
      'unicorn/prefer-array-flat': 'warn',
      'unicorn/prefer-array-flat-map': 'warn',
      'unicorn/prefer-array-index-of': 'warn',
      'unicorn/prefer-array-some': 'warn',
      'unicorn/prefer-at': 'warn',
      'unicorn/prefer-code-point': 'warn',
      'unicorn/prefer-date-now': 'warn',
      'unicorn/prefer-default-parameters': 'warn',
      'unicorn/prefer-includes': 'warn',
      'unicorn/prefer-keyboard-event-key': 'warn',
      'unicorn/prefer-logical-operator-over-ternary': 'warn',
      'unicorn/prefer-math-trunc': 'warn',
      'unicorn/prefer-modern-math-apis': 'warn',
      'unicorn/prefer-native-coercion-functions': 'warn',
      'unicorn/prefer-negative-index': 'warn',
      'unicorn/prefer-number-properties': 'warn',
      'unicorn/prefer-object-from-entries': 'warn',
      'unicorn/prefer-optional-catch-binding': 'warn',
      'unicorn/prefer-regexp-test': 'warn',
      'unicorn/prefer-spread': 'warn',
      'unicorn/prefer-string-replace-all': 'warn',
      'unicorn/prefer-string-slice': 'warn',
      'unicorn/prefer-string-starts-ends-with': 'warn',
      'unicorn/prefer-string-trim-start-end': 'warn',
      'unicorn/prefer-switch': 'warn',
      'unicorn/prefer-ternary': 'warn',
      'unicorn/prefer-type-error': 'error',
      'unicorn/require-array-join-separator': 'warn',
      'unicorn/require-number-to-fixed-digits-argument': 'warn',
      'unicorn/switch-case-braces': 'warn',
      'unicorn/template-indent': 'warn',
      'unicorn/text-encoding-identifier-case': 'warn',
      'unicorn/throw-new-error': 'error',
      'unicorn/prefer-number-properties': 'off',
      'unicorn/no-negated-condition': 'off',
      '@typescript-eslint/array-type': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
]);
