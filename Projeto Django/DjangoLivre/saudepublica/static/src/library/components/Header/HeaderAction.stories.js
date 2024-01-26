import { action } from '@storybook/addon-actions'
import { customEventStorybookArgType, kebabiseArgs } from '../../util/Utils.js'
import HeaderAction from './HeaderAction.ce.vue'

export default {
  title: 'Componentes/Header/Sub-componentes',
  component: HeaderAction,
  parameters: {
    controls: {
      exclude: ['tooltipPlace', 'tooltipText', 'tooltipTimer', 'tooltipType'],
    },
  },
  argTypes: {
    hasLogin: {
      control: 'boolean',
    },
    listFunctions: {
      control: 'text',
    },
    listLinks: {
      control: 'text',
    },
    'valor da chave "clickEventName"': {
      ...customEventStorybookArgType,
    },
  },
}

const Template = (args) => ({
  props: Object.keys(args),

  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-header-action slot="headerAction" v-bind="args" @clickEventName="handleEvent"></br-header-action>`,
  methods: { handleEvent: action('click-funcionalidade-1') },
})

export const Default = Template.bind({})
Default.storyName = 'HeaderAction'
Default.args = {
  hasLogin: true,
  labelLogin: 'Entrar',
  titleLinks: 'Acesso Rápido',
  titleFunctions: 'Funcionalidades do Sistema',
  listLinks: `[
    {
      name: 'Link de acesso 1',
      href: '#',
      tooltipText: 'Link de acesso 1'
    },
    {
      name: 'Link de acesso 2',
      href: '#'
    },
    {
      name: 'Link de acesso 3',
      href: '#'
    }
  ]`,
  listFunctions: `[
    {
      icon: 'chart-bar',
      name: 'Funcionalidade 1',
      url: '#',
      clickEventName: 'click-funcionalidade-1',
      tooltipText: 'Funcionalidade 1'
    },
    {
      icon: 'headset',
      name: 'Funcionalidade 2',
      url: '#',
      clickEventName: 'click-funcionalidade-2'
    },
    {
      icon: 'comment',
      name: 'Funcionalidade 3',
      url: '#',
      clickEventName: 'click-funcionalidade-3'
    }
  ]`,
}
