import { kebabiseArgs } from '../../util/Utils.js'
import IconBase from './IconBase.ce.vue'

export default {
  title: 'Componentes/Icon',
  component: IconBase,
  argTypes: {
    iconName: {
      control: {
        type: 'text',
      },
    },
    familyName: {
      control: {
        type: 'text',
      },
    },
    className: {
      control: {
        type: 'text',
      },
    },
  },
}

const Template = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-icon-base v-bind="args"></br-icon-base>`,
})

export const Padrão = Template.bind({})
Padrão.args = {
  iconName: 'home',
  familyName: 'fas',
  className: '',
}
