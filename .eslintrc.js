module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-async-in-computed-properties': 'warning',
    'vue/no-dupe-keys': 'warning',
    'vue/no-duplicate-attributes': 'warning',
    'vue/no-parsing-error': 'warning',
    'vue/no-reserved-keys': 'warning',
    'vue/no-shared-component-data': 'warning',
    'vue/no-side-effects-in-computed-properties': 'warning',
    'vue/no-template-key': 'warning',
    'vue/no-textarea-mustache': 'warning',
    'vue/no-unused-components': 'warning',
    'vue/no-unused-vars': 'warning',
    'vue/no-use-v-if-with-v-for': 'warning',
    'vue/require-component-is': 'warning',
    'vue/require-prop-type-constructor': 'warning',
    'vue/require-render-return': 'warning',
    'vue/require-v-for-key': 'warning',
    'vue/require-valid-default-prop': 'warning',
    'vue/return-in-computed-property': 'warning',
    'vue/use-v-on-exact': 'warning',
    'vue/valid-template-root': 'warning',
    'vue/valid-v-bind': 'warning',
    'vue/valid-v-cloak': 'warning',
    'vue/valid-v-else-if': 'warning',
    'vue/valid-v-else': 'warning',
    'vue/valid-v-for': 'warning',
    'vue/valid-v-html': 'warning',
    'vue/valid-v-if': 'warning',
    'vue/valid-v-model': 'warning',
    'vue/valid-v-on': 'warning',
    'vue/valid-v-once': 'warning',
    'vue/valid-v-pre': 'warning',
    'vue/valid-v-show': 'warning',
    'vue/valid-v-text': 'warning'
  }
}
