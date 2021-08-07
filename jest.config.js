module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setUpTests.js'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/styleMock.js',
  },
};
