import { kebabiseArgs } from '../../util/Utils.js'
import BrBreadcrumb from './Breadcrumb.ce.vue'

export default {
  title: 'Componentes/Breadcrumb',
  component: BrBreadcrumb,
  parameters: {
    actions: {
      handles: ['click'],
    },
    controls: {
      exclude: ['tooltipPlace', 'tooltipText', 'tooltipTimer', 'tooltipType'],
    },
  },
  argTypes: {
    links: {
      control: 'text',
    },
  },
}

const Template = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-breadcrumb v-bind="args"></br-breadcrumb>`,
})

export const Curto = Template.bind({})
Curto.args = {
  label: 'Breadcrumb Curto',
  links: `[
    {
      'label': 'Página Inicial',
      'url': '/',
      'target': '_blank',
      'home': true
    },
    {
      'label': 'Página Ancestral 01',
      'target': '_blank',
      'url': '#'
    },
    {
      'label': 'Página Ancestral 02',
      'target': '_blank',
      'url': '#'
    },
    {
      'label': 'Página Atual',
      'active': true
    }
  ]`,
}

export const Longo = Template.bind({})
Longo.args = {
  label: 'Breadcrumb Longo',
  links: `[
    {
      'label': 'Página Inicial',
      'url': '/',
      'target': '_blank',
      'home': true
    },
    {
      'label': 'Página Ancestral 01',
      'target': '_blank',
      'url': '#'
    },
    {
      'label': 'Página Ancestral 02',
      'target': '_blank',
      'url': '#'
    },
    {
      'label': 'Página Ancestral 03',
      'target': '_blank',
      'url': '#'
    },
    {
      'label': 'Página Ancestral 04',
      'target': '_blank',
      'url': '#'
    },
    {
      'label': 'Página Ancestral 05',
      'target': '_blank',
      'url': '#'
    },
    {
      'label': 'Página Atual',
      'active': true
    }
  ]`,
}

export const ComTooltip = Template.bind({})
ComTooltip.args = {
  label: 'Breadcrumb Curto',
  links: `[
    {
      'label': 'Página Inicial',
      'url': '/',
      'target': '_blank',
      'home': true,
      'tooltipText': 'Lorem ipsum dolor sit amet.'
    },
    {
      'label': 'Página Ancestral 01',
      'target': '_blank',
      'url': '#'
    },
    {
      'label': 'Página Ancestral com Texto Grande',
      'target': '_blank',
      'url': '#',
      'tooltipText': 'Lorem ipsum dolor sit amet.'
    },
    {
      'label': 'Página Atual',
      'active': true
    }
  ]`,
}
