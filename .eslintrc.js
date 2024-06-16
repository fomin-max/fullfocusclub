module.exports = {
  env: {
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['public/bundle'],
  plugins: ['@typescript-eslint', 'prettier', 'unicorn', 'react-hooks'],
  globals: {
    React: true,
    VoidFunction: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    curly: ['error', 'all'],
    camelcase: 'off',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    'import/no-extraneous-dependencies': 'off', // TODO: need to research
    'no-shadow': 'off', // его обрабатывает '@typescript-eslint/no-shadow'
    'no-unused-vars': 'off', // его обрабатывает @typescript-eslint/no-unused-vars
    'no-use-before-define': 'off', // его обрабатывает @typescript-eslint/no-use-before-define
    'no-param-reassign': 'off',
    'consistent-return': 'off',
    'no-console': 'off',
    'no-irregular-whitespace': 'off',
    'no-underscore-dangle': 'off',
    'default-case': 'off',
    'class-methods-use-this': 'off',

    '@typescript-eslint/no-shadow': 2,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],

    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/control-has-associated-label': 'off',

    'react/jsx-key': 2,
    'react/jsx-handler-names': 2,
    'react/no-danger': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],

    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ],

    'unicorn/no-null': 'off',
    'unicorn/prefer-spread': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/consistent-destructuring': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/new-for-builtins': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/expiring-todo-comments': 'off',
    'unicorn/numeric-separators-style': [
      'error',
      {
        number: {
          minimumDigits: 0,
          groupLength: 3,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['*.stories.*'],
      rules: {
        'no-shadow': 0,
        'import/no-extraneous-dependencies': 0,
        'react/jsx-props-no-spreading': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/no-shadow': 0,
      },
    },
    {
      files: ['.eslintrc.js'],
      rules: {
        'unicorn/prefer-module': 0,
      },
    },
    {
      files: ['**/mocks/*'],
      rules: {
        'unicorn/numeric-separators-style': 0,
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: ['tsconfig.json'],
      },
    },
  },
};
