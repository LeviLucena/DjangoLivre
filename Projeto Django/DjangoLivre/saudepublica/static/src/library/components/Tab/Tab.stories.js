import { action } from '@storybook/addon-actions'
import { customEventStorybookArgType, kebabiseArgs } from '../../util/Utils.js'
import Tab from './Tab.ce.vue'
import BrTabItem from './TabItem.ce.vue'

const slotDefault = `
  <br-tab-item title="Sobre" id="panel-1" aria-label="Sobre"><p>Sobre</p></br-tab-item>
  <br-tab-item title="Todos" id="panel-2" aria-label="Todos"><p>Todos</p></br-tab-item>
  <br-tab-item title="Notícias" is-active id="panel-3" aria-label="Notícias"><p>Notícias</p></br-tab-item>
  <br-tab-item title="Serviços" id="panel-4" aria-label="Serviços"><p>Serviços</p></br-tab-item>
`

const slotComIcone = `
  <br-tab-item title="Sobre" id="panel-1" icon="home"><p>Sobre</p></br-tab-item>
  <br-tab-item title="Todos" id="panel-2" icon="image"><p>Todos</p></br-tab-item>
  <br-tab-item title="Notícias" id="panel-3" icon="image"><p>Notícias</p></br-tab-item>
  <br-tab-item title="Serviços" id="panel-4" icon="image"><p>Serviços</p></br-tab-item>
`

const slotComContador = `
  <br-tab-item title="Sobre" id="panel-1" results="120">
    <p>Sobre</p>
  </br-tab-item>
  <br-tab-item title="Todos" id="panel-2" results="124">
    <p>Todos</p>
  </br-tab-item>
  <br-tab-item title="Notícias" id="panel-3" results="74">
    <p>Notícias</p>
  </br-tab-item>
  <br-tab-item title="Serviços" id="panel-4" results="16">
    <p>Serviços</p>
  </br-tab-item>
`

const slotSomenteIcone = `
  <br-tab-item id="panel-1" icon="home" tooltip-text="Home"><p>Sobre</p></br-tab-item>
  <br-tab-item id="panel-2" icon="image" tooltip-text="Todos"><p>Todos</p></br-tab-item>
  <br-tab-item id="panel-3" icon="image" tooltip-text="Notícias"><p>Notícias</p></br-tab-item>
  <br-tab-item id="panel-4" icon="image" tooltip-text="Serviços"><p>Serviços</p></br-tab-item>
`

const slotComIconeETooltip = `
  <br-tab-item title="Sobre" id="panel-1" icon="home" tooltip-text="Lorem ipsum dolor sit amet" tooltip-place="bottom"><p>Sobre</p></br-tab-item>
  <br-tab-item title="Todos" id="panel-2" icon="image" ><p>Todos</p></br-tab-item>
  <br-tab-item title="Notícias" id="panel-3" icon="image"><p>Notícias</p></br-tab-item>
  <br-tab-item title="Serviços" id="panel-4" icon="image"><p>Serviços</p></br-tab-item>
`

export default {
  title: 'Componentes/Tab',
  component: Tab,
  subcomponents: {
    'br-tab-item': BrTabItem,
  },
  parameters: {
    controls: {
      exclude: ['tooltipPlace', 'tooltipText', 'tooltipTimer', 'tooltipType'],
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#071D41' },
      ],
    },
  },
  argTypes: {
    density: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
    },
    default: {
      description:
        '**[OBRIGATÓRIO]** Abas do tab, que devem ser nós do tipo **<br-tab-item>** passados por slot. Propriedades possíveis: title (título), id (identificador), icon (ícone), results (valor do contador), isActive (aba ativa/aberta), tooltipText (texto do tooltip), tooltipPlace (top, right, left, bottom), tooltipType (info, warning, error, success), tooltipTimer (tempo em milisegundos)',
      control: 'text',
      type: {
        required: true,
      },
      table: {
        type: {
          summary: 'NodeList of <br-tab-item>',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    inverted: {
      defaultValue: false,
    },
    label: {
      defaultValue: '',
    },
    onTabItemClick: {
      ...customEventStorybookArgType,
    },
  },
}

const Template = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-tab v-bind="args" @onTabItemClick="handleTabItemClick">${args.default}</br-tab>`,
  methods: { handleTabItemClick: action('onTabItemClick') },
})

const TemplateFundoEscuro = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `
  <div class="bg-gray-60 p-3">
    <br-tab v-bind="args">${args.default}</br-tab>
  </div>`,
})

export const Default = Template.bind({})
Default.args = {
  default: slotDefault,
}

export const ComIcone = Template.bind({})
ComIcone.args = {
  default: slotComIcone,
}

export const ComContador = Template.bind({})
ComContador.args = {
  default: slotComContador,
  counter: true,
}

export const SomenteIcone = Template.bind({})
SomenteIcone.args = {
  default: slotSomenteIcone,
}

export const ComFundoEscuro = TemplateFundoEscuro.bind({})
ComFundoEscuro.args = {
  default: slotDefault,
  inverted: true,
}

export const ComTooltip = Template.bind({})
ComTooltip.args = {
  default: slotComIconeETooltip,
}
