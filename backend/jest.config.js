module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?|jsx?)$',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
