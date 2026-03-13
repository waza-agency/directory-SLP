module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
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
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    },
    {
      displayName: 'Integration Tests',
      testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
      testEnvironment: 'node',
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    },
    {
      displayName: 'Component Tests',
      testMatch: [
        '<rootDir>/__tests__/**/*.test.tsx',
        '<rootDir>/src/pages/__tests__/**/*.test.tsx',
        '<rootDir>/src/components/**/*.test.tsx',
      ],
      testEnvironment: 'jsdom',
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    },
    {
      displayName: 'Lib Tests',
      testMatch: ['<rootDir>/src/lib/**/*.test.ts'],
      testEnvironment: 'node',
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    }
  ]
}
