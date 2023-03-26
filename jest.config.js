/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/?(*.)\.test.ts', '**/tests/**/*.ts'],
  // testRegex: ['/src/.*.test.ts$', '/tests/.*.ts$'],
  testPathIgnorePatterns: ['<rootDir>/src/.*.test.scratch.ts$', '<rootDir>/tests/.*.scratch.ts$'],
  preset: 'ts-jest/presets/default-esm',
  resolver: 'ts-jest-resolver',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};

export default config;
