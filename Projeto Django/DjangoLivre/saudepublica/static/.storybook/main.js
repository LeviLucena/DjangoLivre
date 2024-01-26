const path = require('path')

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: true,
        backgrounds: false,
      },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        transcludeMarkdown: true,
      },
    },
    '@whitespace/storybook-addon-html',
    'storybook-version',
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    })
    return config
  },
  core: {
    builder: {
      name: '@storybook/builder-webpack5',
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
    disableTelemetry: true,
  },
  features: {
    postcss: false,
    modernInlineRender: true,
    buildStoriesJson: true,
    storyStoreV7: true,
  },
  staticDirs: ['../src/assets'],
}
