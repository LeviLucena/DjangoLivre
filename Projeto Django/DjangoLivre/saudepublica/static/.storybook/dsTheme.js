import { create } from '@storybook/theming'

export default create({
  base: 'light',
  brandTitle: 'Web Components GovBR-DS',
  brandImage: 'web-components-vue.png',
  brandTarget: '_self',

  colorPrimary: '#071D41',
  colorSecondary: '#0C326F',

  // UI
  appBg: '#FFF',
  appContentBg: '#ffffff',
  appBorderColor: '#f8f8f8',
  appBorderRadius: 2,

  // Typography
  fontBase: 'rawline',
  fontCode: 'monospace',

  // Text colors
  textColor: '#333333',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#333333',
  barSelectedColor: '#0C326F',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#f8f8f8',
  inputTextColor: '#333333',
  inputBorderRadius: 2,
})
