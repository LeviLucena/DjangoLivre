import { kebabiseArgs } from '../../util/Utils.js'
import BrLoading from './Loading.ce.vue'

export default {
  title: 'Componentes/Loading',
  component: BrLoading,
  argTypes: {
    percent: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
    progress: {
      defaultValue: false,
    },
    medium: {
      defaultValue: false,
    },
    label: {
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
  template: `<br-loading v-bind="args"></br-loading>`,
})

export const Progress = Template.bind({})
Progress.args = {
  progress: true,
  percent: 10,
}

export const Indeterminate = Template.bind({})
Indeterminate.args = {
  label: 'Carregando...',
}

export const IndeterminateMedium = Template.bind({})
IndeterminateMedium.args = {
  label: 'Carregando...',
  medium: true,
}

export const ComTooltip = Template.bind({})
ComTooltip.args = {
  label: 'Carregando...',
  tooltipText: 'Lorem ipsum dolor sit amet.',
}
