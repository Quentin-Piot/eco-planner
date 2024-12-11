module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@tanstack/query/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  root: true,
  env: {
    node: true,
    es6: true,

  },
  plugins: ["simple-import-sort", "@typescript-eslint", "react-hooks",
    "react-refresh",
    "@tanstack/query", "prettier"],
  ignorePatterns: [".eslintrc.cjs"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-unused-vars": "off",
    "react-refresh/only-export-components": "off",
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-require-imports": "off",
    "no-empty-pattern": "off",
    "prettier/prettier": ["error", { singleQuote: false }],
    "quotes": ["error", "double", { avoidEscape: true }],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^react"],
          ["^@react-router/.*"],
          ["^@chakra-ui/.*", "^@/components/ui"],
          ["^@?\\w", "^\\w"],
          ["^@/"],
          ["^\\."],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
  },
};

