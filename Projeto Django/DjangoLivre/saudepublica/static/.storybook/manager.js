import { addons } from '@storybook/addons'
import dsTheme from './dsTheme'

addons.setConfig({
  theme: dsTheme,
  showPanel: true,
  panelPosition: 'bottom',
  previewTabs: {
    canvas: {
      title: 'Visualizar',
    },
    'storybook/docs/panel': {
      index: -1,
      hidden: true,
    },
  },
  // sidebar: {
  // collapsedRoots: ['Componentes', 'Documentações'],
  // renderLabel: (item) => <abbr title="...">{item.name}</abbr>,
  // },
})
