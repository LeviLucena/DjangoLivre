module.exports = async () => {
  return {
    collectCoverage: true,
    collectCoverageFrom: ['**/*.vue', '!**/node_modules/**'],
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
    moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
    preset: '@vue/cli-plugin-unit-jest',
    testEnvironmentOptions: {
      customExportConditions: ['node', 'node-addons'],
    },
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    transform: {
      '.*\\.(js)$': 'babel-jest',
      '.*\\.(vue)$': '@vue/vue3-jest',
    },
    transformIgnorePatterns: ['/node_modules/(?!@govbr)'],
  }
}
