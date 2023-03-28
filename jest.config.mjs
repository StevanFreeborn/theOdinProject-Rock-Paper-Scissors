export default {
  transform: {},
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['./scripts/**.mjs', '!**/tests/**', '!/node_modules'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'text', 'html'],
  testMatch: ['**/tests/*.(test|spec|jest).mjs'],
  testPathIgnorePatterns: ['tests/(setup|testUtils).mjs'],
  verbose: true,
};
