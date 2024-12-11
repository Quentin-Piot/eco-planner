module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["simple-import-sort", "@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "no-console": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-require-imports": "off",
    "prettier/prettier": ["error", { singleQuote: false }],
    quotes: ["error", "double", { avoidEscape: true }],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [["^@react-router/.*"], ["^@?\\w", "^\\w"], ["^@/"], ["^\\."]],
      },
    ],
    "simple-import-sort/exports": "error",
  },
  env: {
    node: true,
    es6: true,
  },
};
