import path from 'node:path';
import { fileURLToPath } from 'node:url';

import _import from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import {
  fixupConfigRules,
  fixupPluginRules,
} from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:import/typescript',
      'prettier'
    )
  ),
  {
    ignores: [
      'build',
      'node_modules',
      'bin',
      '*.d.ts',
      'dist',
      '.react-router'
    ],
    plugins: {
      'react-hooks': fixupPluginRules(reactHooks),
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
    },

    settings: {
      react: {
        version: 'detect',
      },

      'import/resolver': {
        node: {
          paths: ['app'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', '/'],
        },
      },
    },

    rules: {
      'no-empty-function': [
        'error',
        {
          allow: ['constructors'],
        },
      ],

      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],

      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'index', 'type', 'internal'],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['builtin'],

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },

          pathGroups: [
            {
              pattern: '{react,react-dom/**,react-router-dom,next/**}',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '{@/libs/**,@/libs}',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '{@/utils/**,@/utils}',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '{@/config/**,@/config}',
              group: 'index',
              position: 'after',
            },
            {
              pattern: '{@/domains/**,@/domains}',
              group: 'type',
              position: 'before',
            },
            {
              pattern: '{@/constants/**,@/constants}',
              group: 'type',
              position: 'after',
            },
            {
              pattern: '@/repository/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{@/hooks/**,@/hooks}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/components/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/layouts/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{./**,../**}',
              group: 'internal',
              position: 'after',
            },
          ],
        },
      ],
    },
  },
];
