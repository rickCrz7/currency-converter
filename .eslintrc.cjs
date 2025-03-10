module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    extends: ['eslint:recommended', 'plugin:solid/recommended', 'prettier'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser'
        // sourceType: 'module',
    },
    plugins: ['vue', 'prettier'],
    rules: {
        'vue/no-v-html': 'off',
        'vue/multi-word-component-names': 'off',
        'prettier/prettier': ['error']
    }
}