export default {
  testEnvironment: 'node',
  transform: {},
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: ['js/**/*.js'],
  coverageReporters: ['text', 'lcov'],
};
