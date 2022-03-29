const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.paths.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.config.ts',
    '!src/**/*.entity.ts',
    '!src/**/*.role.ts',
    '!src/**/*.repository.ts',
    '!src/**/functions/**/*.ts',
    '!src/**/*.fixture.ts',
    '!src/migrations/**/*.ts',
  ],
};
