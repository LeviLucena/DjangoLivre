import { kebabiseArgs } from '../../util/Utils.js'
import BrAvatar from './Avatar.ce.vue'

export default {
  title: 'Componentes/Avatar',
  component: BrAvatar,
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  argTypes: {
    name: {
      control: 'text',
    },
    iconic: {
      control: 'boolean',
    },
    density: {
      options: ['small', 'medium', 'large'],
      control: { type: 'inline-radio' },
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
  template: `<br-avatar v-bind="args"></br-avatar>`,
})

export const Iconico = Template.bind({})
Iconico.args = {
  name: 'Jhon Doe',
  iconic: true,
}

export const Fotografico = Template.bind({})
Fotografico.args = {
  name: 'Jhon Doe',
  iconic: false,
  image: 'https://picsum.photos/id/823/400',
}

export const Letra = Template.bind({})
Letra.args = {
  name: 'Jhon Doe',
  iconic: false,
}

export const ComTooltip = Template.bind({})
ComTooltip.args = {
  name: 'Jhon Doe',
  iconic: false,
  tooltipText: 'Lorem ipsum',
  tooltipPlace: 'right',
}
