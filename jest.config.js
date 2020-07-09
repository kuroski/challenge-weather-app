module.exports = {
  setupFilesAfterEnv: ["./tests/setup.js"],
  moduleNameMapper: {
    "@tests(.*)$": "<rootDir>/tests/$1"
  },
  preset: "@vue/cli-plugin-unit-jest",
  transformIgnorePatterns: ["node_modules/?!(vue-unicons)"]
};
