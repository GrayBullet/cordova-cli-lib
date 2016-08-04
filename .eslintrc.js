module.exports = {
  extends: 'google',
  env: {
    node: true,
    jasmine: true
  },
  rules: {
    'space-before-function-paren': [
      2, {
        anonymous: 'always',
        named: 'never'
      }],
    'max-len': [2, 120]
  }
};
