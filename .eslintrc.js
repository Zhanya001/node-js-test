module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: "module",
  },

  env: {
    node: true,
    jest: true,
    es6: true,
  },

  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts"],
        moduleDirectory: ["src/", "node_modules"],
      },
    },
  },

  plugins: [
    "@typescript-eslint",
    "unused-imports",
    /*     "testing-library", */
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:sonarjs/recommended",
    "plugin:security/recommended",
    /*     "testing-library", */
  ],
  overrides: [
    {
      files: ["*.spec.ts"],
      rules: {
        "jest/expect-expect": "off",
      },
    },
  ],
  rules: {
    "no-shadow": "off",
    "no-param-reassign": 0,
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.test.ts"] },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "import/extensions": [
      "off",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
      },
    ],
    "no-console": "off",
    "unused-imports/no-unused-imports": "error",
    "yaml-semantic-error": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-nested-ternary": "off",
    "import/prefer-default-export": "off",
  },
};
