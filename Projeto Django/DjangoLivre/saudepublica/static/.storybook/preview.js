import packageInfo from '../package.json'
import '../src/library/lib.js'
import dsTheme from './dsTheme'

const [major, minor, patch, postfix] = packageInfo.version.split('.')

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    values: [
      { name: 'Claro', value: '#fff' },
      { name: 'Escuro', value: '#333' },
      { name: 'Invertido', value: '#071D41' },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
    sort: 'alphabetical',
  },
  docs: {
    theme: dsTheme,
  },
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  options: {
    storySort: {
      order: ['Introdução', 'Links relacionados', 'Contribuindo', 'Notas de versão', 'Docs', 'Componentes'],
    },
  },
  html: {
    removeEmptyComments: true,
    highlighter: {
      showLineNumbers: true,
    },
    prettier: {
      tabWidth: 2,
      useTabs: false,
      htmlWhitespaceSensitivity: 'strict',
    },
    transform: (code) => {
      // Remove valores vazios dos atributos booleanos
      const regex = /(\s\w+)=["']["']/gm
      return code.replace(regex, '$1')
    },
  },
  version: {
    major: `v${major}`,
    minor,
    patch,
    postfix,
    style: {
      'font-size': '14px',
      'text-transform': 'lowercase',
      'background-color': '#d4e5ff',
    },
  },
}
