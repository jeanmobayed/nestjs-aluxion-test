module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:sonarjs/recommended',
    'plugin:import/typescript',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', '@typescript-eslint', 'sonarjs', 'import', 'prefer-arrow'],
  rules: {
    'no-prototype-builtins': 'off',
    'prettier/prettier': 'error',
    'indent': 'off',
    'require-await': 'error',
    'no-empty-function': 'off',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/unbound-method': [
      'error',
      {
        ignoreStatic: true,
      }
    ],
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      }
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public',
      },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/member-ordering': [
      'error',
      {
        'default': [
          'signature',

          'public-abstract-field',
          'protected-abstract-field',
          'private-abstract-field',

          'public-static-field',
          'protected-static-field',
          'private-static-field',

          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',

          'public-constructor',
          'protected-constructor',
          'private-constructor',

          'public-abstract-method',
          'protected-abstract-method',
          'private-abstract-method',

          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',

          'public-static-method',
          'protected-static-method',
          'private-static-method',
        ]
      }
    ],
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'arrow-body-style': 'error',
    'arrow-parens': ['error', 'always'],
    'camelcase': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'complexity': 'off',
    'constructor-super': 'error',
    'curly': 'off',
    'dot-notation': 'error',
    'eol-last': 'off',
    'eqeqeq': ['error', 'smart'],
    'guard-for-in': 'off',
    'id-blacklist': 'error',
    'id-match': 'error',
    'max-classes-per-file': 'off',
    'max-len': [
      'error',
      {
        code: 150,
      },
    ],
    'new-parens': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-empty': 'off',
    'no-eval': 'error',
    'no-fallthrough': 'off',
    'no-invalid-this': 'off',
    'no-multiple-empty-lines': 'error',
    'no-new-wrappers': 'error',
    'no-return-await': 'error',
    'no-shadow': 'off',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'warn',
    'no-unsafe-finally': 'error',
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        'singleReturnOnly': true
      }
    ],
    'quote-props': ['error', 'as-needed'],
    'radix': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        asyncArrow: 'always',
        named: 'never',
      },
    ],
    'spaced-comment': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'off',
    'sonarjs/cognitive-complexity': ['warn', 16],
    'sonarjs/no-duplicate-string': 'off',
    'import/no-absolute-path': 'error',
    'import/no-unused-modules': 'error',
    'import/first': 'error',
    'import/order': [
      'error',
      {
        'groups': [
          ['builtin', 'external'],
          'internal',
          'unknown',
          ['parent', 'sibling'],
          'index',
        ],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'desc',
        },
      },
    ],
  },
};
