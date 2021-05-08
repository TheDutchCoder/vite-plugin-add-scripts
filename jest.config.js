module.exports = {
  roots: ['./src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: '../coverage',
}
