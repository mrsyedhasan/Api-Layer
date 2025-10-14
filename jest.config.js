module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/node_modules/**'
  ],
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],
  verbose: true,
  testTimeout: 30000,
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'API Layer Test Report',
        outputPath: 'test-results/test-report.html',
        includeFailureMsg: true,
        includeConsoleLog: true,
        theme: 'darkTheme',
        sort: 'status'
      }
    ]
  ]
};

