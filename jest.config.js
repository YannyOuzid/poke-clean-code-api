/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest",
      "^node_modules/.+\\.(js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
      "node_modules/(?!(data-uri-to-buffer)/)"
    ]
  };
  