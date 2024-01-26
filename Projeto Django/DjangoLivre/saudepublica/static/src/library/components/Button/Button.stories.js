import { kebabiseArgs } from '../../util/Utils.js'
import Button from './Button.ce.vue'

export default {
  title: 'Componentes/Button',
  component: Button,
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#071D41' },
      ],
    },
    actions: {
      handles: ['click'],
    },
  },
  argTypes: {
    label: {
      control: 'text',
    },
    type: {
      type: 'select',
      options: ['secondary', 'primary'],
    },
    density: {
      type: 'select',
      options: ['large', 'middle', 'small', 'xsmall'],
    },
    circle: {
      defaultValue: false,
    },
    disabled: {
      defaultValue: false,
    },
    block: {
      defaultValue: false,
    },
    icon: {
      defaultValue: '',
    },
    inverted: {
      defaultValue: false,
    },
    active: {
      defaultValue: false,
    },
    loading: {
      defaultValue: false,
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
    default: {
      control: 'text',
      description: 'Rótulo do botão, que pode ser passado por slot',
      table: {
        type: {
          summary: `string`,
        },
        defaultValue: {
          summary: '',
        },
      },
    },
  },
}

const Template = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-button v-bind="args"></br-button>`,
})

const TemplateExternal = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-button v-bind="args">
  <br-icon-base icon-name="user"></br-icon-base>
  </br-button>`,
})

export const Primary = Template.bind({})
Primary.args = {
  label: 'Primary',
  type: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Secondary',
  type: 'secondary',
}

export const Tertiary = Template.bind({})
Tertiary.args = {
  label: 'Tertiary',
  inverted: false,
}

export const Circle = Template.bind({})
Circle.parameters = { controls: { exclude: ['label', 'block'] } }
Circle.args = {
  type: 'primary',
  circle: true,
  icon: 'trash',
  inverted: false,
}

export const Loading = Template.bind({})
Loading.parameters = {
  controls: { exclude: ['label', 'block', 'disabled', 'icon', 'circle'] },
}
Loading.args = {
  type: 'secondary',
  loading: true,
}

export const Inverted = Template.bind({})
Inverted.parameters = { backgrounds: { default: 'dark' } }
Inverted.args = {
  label: 'Inverted',
  type: 'secondary',
  inverted: true,
}

export const IconAndLabel = Template.bind({})
IconAndLabel.args = {
  label: 'Text',
  type: 'secondary',
  icon: 'city',
  inverted: false,
}

export const IconAndCircle = Template.bind({})
IconAndCircle.parameters = { controls: { exclude: ['label', 'block'] } }
IconAndCircle.args = {
  circle: true,
  type: 'secondary',
  icon: 'city',
  inverted: false,
}

export const IconAndCircleExternal = TemplateExternal.bind({})
IconAndCircleExternal.parameters = { controls: { exclude: ['label', 'block'] } }
IconAndCircleExternal.args = {
  circle: true,
  type: 'secondary',
  icon: 'city',
  inverted: false,
}

export const ComTooltip = Template.bind({})
ComTooltip.args = {
  label: 'Botão com tooltip',
  type: 'primary',
  tooltipText: 'Lorem ipsum dolor sit amet.',
  tooltipType: 'warning',
}
