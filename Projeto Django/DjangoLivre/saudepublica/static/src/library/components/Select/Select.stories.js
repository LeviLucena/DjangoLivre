import { action } from '@storybook/addon-actions'
import { kebabiseArgs } from '../../util/Utils.js'
import brSelect from './Select.ce.vue'

export default {
  title: 'Componentes/Select',
  component: brSelect,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: null,
    },
    multiple: {
      control: 'boolean',
      defaultValue: false,
    },
    placeholder: {
      control: 'text',
      defaultValue: null,
    },
    options: {
      control: 'array',
      defaulValue: null,
    },
    showSearchIcon: {
      control: 'boolean',
      default: false,
    },
  },
}

const STATES = [
  {
    value: 'acre',
    label: 'Acre',
    selected: false,
  },
  {
    value: 'alagoas',
    label: 'Alagoas',
    selected: false,
  },
  {
    value: 'amapá',
    label: 'Amapá',
    selected: false,
  },
  {
    value: 'amazonas',
    label: 'Amazonas',
    selected: false,
  },
  {
    value: 'bahia',
    label: 'Bahia',
    selected: false,
  },
  {
    value: 'ceará',
    label: 'Ceará',
    selected: false,
  },
  {
    value: 'distrito Federal',
    label: 'Distrito Federal',
    selected: false,
  },
  {
    value: 'espírito Santo',
    label: 'Espírito Santo',
    selected: false,
  },
  {
    value: 'goiás',
    label: 'Goiás',
    selected: false,
  },
  {
    value: 'maranhão',
    label: 'Maranhão',
    selected: false,
  },
  {
    value: 'mato Grosso',
    label: 'Mato Grosso',
    selected: false,
  },
  {
    value: 'mato Grosso do Sul',
    label: 'Mato Grosso do Sul',
    selected: false,
  },
  {
    value: 'minas Gerais',
    label: 'Minas Gerais',
    selected: false,
  },
  {
    value: 'pará',
    label: 'Pará',
    selected: false,
  },
  {
    value: 'paraíba',
    label: 'Paraíba',
    selected: false,
  },
  {
    value: 'paraná',
    label: 'Paraná',
    selected: false,
  },
  {
    value: 'pernambuco',
    label: 'Pernambuco',
    selected: false,
  },
  {
    value: 'piauí',
    label: 'Piauí',
    selected: false,
  },
  {
    value: 'rio de Janeiro',
    label: 'Rio de Janeiro',
    selected: false,
  },
  {
    value: 'rio Grande do Norte',
    label: 'Rio Grande do Norte',
    selected: false,
  },
  {
    value: 'rio Grande do Sul',
    label: 'Rio Grande do Sul',
    selected: false,
  },
  {
    value: 'rondônia',
    label: 'Rondônia',
    selected: false,
  },
  {
    value: 'roraima',
    label: 'Roraima',
    selected: false,
  },
  {
    value: 'santa Catarina',
    label: 'Santa Catarina',
    selected: false,
  },
  {
    value: 'são Paulo',
    label: 'São Paulo',
    selected: false,
  },
  {
    value: 'sergipe',
    label: 'Sergipe',
    selected: false,
  },
  {
    value: 'tocantins',
    label: 'Tocantins',
    selected: false,
  },
]

const Template = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-select v-bind="args" @change="handleMultiple"></br-select>`,
  methods: { handleMultiple: action('change') },
})

export const Simples = Template.bind({})
Simples.args = {
  label: 'Estados Brasileiros',
  placeholder: 'Selecione o Estado',
  options: STATES,
}

export const Multiplo = Template.bind({})
Multiplo.args = {
  label: 'Estados Brasileiros',
  placeholder: 'Selecione o Estado',
  multiple: true,
  options: STATES,
}
