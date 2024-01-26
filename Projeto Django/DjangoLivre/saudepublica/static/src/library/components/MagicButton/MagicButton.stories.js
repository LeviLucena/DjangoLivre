import { kebabiseArgs } from '../../util/Utils.js'
import BrMagicButton from './MagicButton.ce.vue'

export default {
  title: 'Componentes/Magic-button',
  component: BrMagicButton,
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  argTypes: {
    density: {
      type: 'select',
      options: ['small', 'medium', 'large'],
    },
    label: {
      defaultValue: '',
    },
    icon: {
      defaultValue: '',
    },
    circle: {
      defaultValue: false,
    },
    ariaLabel: {
      defaultValue: '',
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
  template: `<br-magic-button v-bind="args"></br-magic-button>`,
})

export const base = Template.bind({})
base.args = {
  label: 'Label',
}

export const circle = Template.bind({})
circle.args = {
  icon: 'cart-plus',
  circle: true,
}

export const comTooltip = Template.bind({})
comTooltip.args = {
  icon: 'cart-plus',
  circle: true,
  tooltipText: 'Lorem ipsum dolor sit amet.',
}
