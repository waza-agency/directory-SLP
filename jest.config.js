// Babel config lives at ./babel.jest.config.js (non-standard name) so that
// Next.js's SWC compiler does NOT detect it and fall back to Babel. Keeping
// SWC active is required by next/font in _app.tsx.
const path = require('path');

const babelJestConfigFile = path.resolve(__dirname, 'babel.jest.config.js');
const babelJestTransform = {
  '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: babelJestConfigFile }],
};
const moduleNameMapper = { '^@/(.*)$': '<rootDir>/src/$1' };
const setupFilesAfterEnv = ['<rootDir>/jest.setup.js'];

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: babelJestTransform,
  moduleNameMapper,
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  setupFilesAfterEnv,
  collectCoverageFrom: [
    'src/pages/api/**/*.{ts,tsx}',
    'src/lib/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 40,
      lines: 40,
      statements: 40,
    },
  },
  projects: [
    {
      displayName: 'API Tests',
      testMatch: ['<rootDir>/src/pages/api/**/*.test.ts'],
      testEnvironment: 'node',
      transform: babelJestTransform,
      moduleNameMapper,
      setupFilesAfterEnv,
    },
    {
      displayName: 'Integration Tests',
      testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
      testEnvironment: 'node',
      transform: babelJestTransform,
      moduleNameMapper,
      setupFilesAfterEnv,
    },
    {
      displayName: 'Component Tests',
      testMatch: [
        '<rootDir>/__tests__/**/*.test.tsx',
        '<rootDir>/src/pages/__tests__/**/*.test.tsx',
        '<rootDir>/src/components/**/*.test.tsx',
      ],
      testEnvironment: 'jsdom',
      transform: babelJestTransform,
      moduleNameMapper,
      setupFilesAfterEnv,
    },
    {
      displayName: 'Lib Tests',
      testMatch: ['<rootDir>/src/lib/**/*.test.ts'],
      testEnvironment: 'node',
      transform: babelJestTransform,
      moduleNameMapper,
      setupFilesAfterEnv,
    },
    {
      displayName: 'Data Tests',
      testMatch: ['<rootDir>/src/data/**/*.test.ts'],
      testEnvironment: 'node',
      transform: babelJestTransform,
      moduleNameMapper,
      setupFilesAfterEnv,
    },
  ],
};
