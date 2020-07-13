module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier",
    "plugin:testing-library/recommended",
    "plugin:testing-library/vue",
    "plugin:jest-dom/recommended"
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "testing-library/await-async-query": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ],
  plugins: ["testing-library", "jest-dom"]
};
