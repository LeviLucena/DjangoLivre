module.exports = {
  extends: ['@govbr-ds/commit-config'],
  ignores: [(commit) => commit.includes('[skip ci]')],
}
