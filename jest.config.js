// for ci to run test
module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  reporters: ["default", "jest-junit"],
  collectCoverage: true,
  collectCoverageFrom: [
    "packages/**/*.{ts,tsx}",
    "!packages/stacks/**/*.{ts,tsx}",
    "!packages/internals/**/*.{ts,tsx}"
  ],
  coverageReporters: ["json", "lcov", "text", "clover"],
};
