module.exports = {
  ignorePatterns: ['.eslintrc.cjs'],
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    'import/resolver': {
      typescript: {}
    },
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:vue/recommended',
    'airbnb-typescript/base',
  ],
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue'],
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'import',
  ],
  rules: {
    '@typescript-eslint/no-inferrable-types': ['off'],
    '@typescript-eslint/unbound-method': ['warn'],
    '@typescript-eslint/require-await': ['warn'],
    '@typescript-eslint/naming-convention': ['off'], // @TODO: Configre this rule later
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    '@typescript-eslint/no-unsafe-member-access': ['off'], // @WHY: becouse it's rule is broken
    '@typescript-eslint/no-unsafe-assignment': ['off'], // @WHY: becouse it's rule is broken
    '@typescript-eslint/no-unsafe-call': ['off'], // @WHY: becouse it's rule is broken
    '@typescript-eslint/no-unsafe-return': ['off'], // @WHY: becouse it's rule is broken
    'import/prefer-default-export': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'no-underscore-dangle': ['off'],
    'no-restricted-syntax': ['off'],
    'no-void': ['warn'],
    'no-continue': ['off'],
    'class-methods-use-this': ['warn'],
    'consistent-return': ['off'],
    'no-async-promise-executor': ['off'],
    'no-await-in-loop': ['off'],
    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'import/extensions': [
      'error',
      {
        ts: 'never',
        'd.ts': 'never',
      },
    ],
    'vue/no-v-for-template-key-on-child': ['error'],
    'vue/no-v-for-template-key': ['off'],
    'vue/max-attributes-per-line': ['error', {
      'singleline': {
        'max': 3
      },
      'multiline': {
        'max': 1
      }
    }]
  },
};
