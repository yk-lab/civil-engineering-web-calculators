module.exports = {
  customSyntax: 'postcss-html',
  extends: ['stylelint-config-standard'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'deep'],
      },
    ],
  },
};
