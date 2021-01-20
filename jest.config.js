module.exports = {
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/backend/server/**'
  ],
  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@entities/(.*)': '<rootDir>/src/core/entities/$1',
    '@application/(.*)': '<rootDir>/src/core/application/$1',
    '@adapter/(.*)': '<rootDir>/src/core/adapter/$1',
    '@backend/(.*)': '<rootDir>/src/backend/$1',
    '@tests/(.*)': '<rootDir>/tests/$1',
  },
};
