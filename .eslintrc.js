module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension

      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      parserOptions: {
        project: ['./tsconfig.json'] // Specify it only for TypeScript files
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-prototype-builtins': 'warn',
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-unused-expressions': 'warn',
    'react/prop-types': 'off',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import/namespace': 'off',
    'react/jsx-key': 'warn',
    'no-undef': 'warn',
    'no-dupe-else-if': 'warn',
    'react/no-direct-mutation-state': 'off',
    'react/display-name': 'off',
    'react/no-deprecated': 'off',
    'react/no-typos': 'off',
    'react/no-string-refs': 'off',
    'react/require-render-return': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/default': 'off',
    'react/no-unknown-property': 'off',
    'import/no-named-as-default': 'off',
    eqeqeq: ['warn', 'smart'],
    'no-lonely-if': 'warn',
    'no-lone-blocks': 'warn',
    'require-await': 'error', // Error because it can cause unseen errors not awaiting async code
    'no-else-return': 'warn',
    'no-unneeded-ternary': 'warn',
    'no-var': 'error', // Should never be used, better to show this while typing the code
    'prefer-const': 'warn',
    'default-case': 'warn',
    'default-case-last': 'warn',
    'no-alert': 'warn',
    'arrow-spacing': 'warn',
    'no-empty-function': 'warn',
    'multiline-ternary': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    "@typescript-eslint/member-delimiter-style": "off",
    '@typescript-eslint/no-empty-interface': [
      'warn',
      {
        allowSingleExtends: true
      }
    ],
    'no-empty': 'warn'
  }
}
