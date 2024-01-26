const { defineConfig } = require('@vue/cli-service')
// TODO: Avaliar se precisamos alterar alguma configuração

module.exports = defineConfig({
  lintOnSave: true,
  filenameHashing: false,
  css: { extract: false },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.compilerOptions = {
          ...options.compilerOptions,
          isCustomElement: (tag) =>
            [
              'br-avatar',
              'br-breadcrumb',
              'br-button',
              'br-card',
              'br-collapse',
              'br-card-header',
              'br-card-content',
              'br-card-footer',
              'br-cookiebar',
              'br-checkbox',
              'br-divider',
              'br-footer',
              'br-header-action',
              'br-header-search',
              'br-header',
              'br-icon-base',
              'br-input',
              'br-item',
              'br-list',
              'br-loading',
              'br-magic-button',
              'br-menu',
              'br-message',
              'br-notification',
              'br-sign-in',
              'br-switch',
              'br-tab-item',
              'br-tab',
            ].includes(tag),
        }
        return options
      })
  },
  transpileDependencies: true,
})
