module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'max-len': 0,
    'linebreak-style': 0,
    'vue/max-attributes-per-line': 0,
    'vue/html-self-closing': 0,
    'no-param-reassign': 0,
    'no-alert': 0,
    'no-tabs': 'off',
    "no-plusplus": 0,
    "no-multiple-empty-lines": [2, {"max": 2}],//空行最多不能超过2行
    "comma-dangle": [2, "never"], // 对象最后元素不加逗号
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};