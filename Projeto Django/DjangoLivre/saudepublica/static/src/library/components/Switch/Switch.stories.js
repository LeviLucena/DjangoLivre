import { action } from '@storybook/addon-actions'
import { customEventStorybookArgType, kebabiseArgs } from '../../util/Utils.js'
import BrSwitch from './Switch.ce.vue'

const slotDefault = `
  Label
`
export default {
  title: 'Componentes/Switch',
  component: BrSwitch,
  argTypes: {
    checked: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      defaultValue: false,
    },
    icon: {
      control: 'boolean',
      defaultValue: false,
    },
    id: {
      control: 'text',
      defaultValue: '',
    },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    label: {
      control: 'text',
      defaultValue: '',
    },
    default: {
      control: 'text',
      defaultValue: '',
      table: {
        type: {
          summary: 'NodeList',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    labelChecked: {
      control: 'text',
      defaultValue: '',
    },
    labelNotChecked: {
      control: 'text',
      defaultValue: '',
    },
    top: {
      defaultValue: false,
    },
    right: {
      defaultValue: false,
    },
    change: {
      ...customEventStorybookArgType,
    },
    tooltipText: {
      control: 'text',
    },
    tooltipPlace: {
      options: ['top', 'right', 'bottom', 'left'],
      control: 'inline-radio',
      if: { arg: 'tooltipText', truthy: true },
    },
    tooltipType: {
      options: ['info', 'success', 'warning', 'error'],
      control: 'inline-radio',
      if: { arg: 'tooltipText', truthy: true },
    },
    tooltipTimer: {
      control: 'number',
      if: { arg: 'tooltipText', truthy: true },
    },
  },
}

const Template = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-switch v-bind="args" @onChange="handleChange"></br-switch>`,
  methods: {
    handleChange: action('onChange'),
  },
})

const TemplateComSlot = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-switch v-bind="args" @onChange="handleChange">
    ${args.default}
  </br-switch>`,
  methods: {
    handleChange: action('onChange'),
  },
})

const defaultExcluded = ['checkgroupParent', 'checkgroupChild', 'indeterminate', 'update:indeterminate']

export const Completo = TemplateComSlot.bind({})
Completo.args = {
  icon: true,
  checked: true,
  size: 'large',
  labelChecked: 'Sucesso',
  labelNotChecked: 'Erro',
  default: slotDefault,
}
Completo.parameters = {
  controls: {
    exclude: defaultExcluded,
  },
}

export const Simples = Template.bind({})
Simples.args = {
  label: 'Simples',
}
Simples.parameters = {
  controls: {
    exclude: defaultExcluded,
  },
}

export const ComTooltip = TemplateComSlot.bind({})
ComTooltip.args = {
  icon: true,
  checked: true,
  size: 'large',
  labelChecked: 'Sucesso',
  labelNotChecked: 'Erro',
  default: slotDefault,
  tooltipText: 'Lorem ipsum dolor sit amet.',
  tooltipPlace: 'bottom',
}
ComTooltip.parameters = {
  controls: {
    exclude: defaultExcluded,
  },
}
