module.exports = {
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/framework/server/**'
  ],
  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@entities/(.*)': '<rootDir>/src/entities/$1',
    '@application/(.*)': '<rootDir>/src/application/$1',
    '@adapter/(.*)': '<rootDir>/src/adapter/$1',
    '@framework/(.*)': '<rootDir>/src/framework/$1',
    '@tests/(.*)': '<rootDir>/tests/$1',
  },
};
