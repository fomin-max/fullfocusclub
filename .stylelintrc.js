module.exports = {
  customSyntax: 'postcss-scss',
  plugins: ['stylelint-scss'],
  extends: [
    'stylelint-config-htmlacademy',
    'stylelint-config-prettier',
    'stylelint-config-rational-order',
    'stylelint-config-css-modules',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'function-calc-no-invalid': null,
    'max-nesting-depth': [2, { ignore: ['pseudo-classes'] }],
  },
};
