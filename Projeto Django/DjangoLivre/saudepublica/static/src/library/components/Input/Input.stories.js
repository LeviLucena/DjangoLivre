import { action } from '@storybook/addon-actions'
import { customEventStorybookArgType, kebabiseArgs } from '../../util/Utils.js'
import BrInput from './Input.ce.vue'

export default {
  title: 'Componentes/Input',
  component: BrInput,
  parameters: {
    controls: { exclude: ['newclass'] },
  },
  argTypes: {
    label: {
      control: 'text',
    },
    labelInline: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    density: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
    },
    state: {
      control: { type: 'radio' },
      options: ['info', 'warning', 'danger', 'success'],
    },
    disabled: {
      control: 'boolean',
    },
    autofocus: {
      control: 'boolean',
    },
    icon: {
      control: 'text',
    },
    iconSign: {
      control: 'text',
    },
    ispassword: {
      control: 'boolean',
    },
    isHighlight: {
      control: 'boolean',
    },
    id: {
      control: 'text',
    },
    input: {
      ...customEventStorybookArgType,
    },
    change: {
      ...customEventStorybookArgType,
    },
    tooltipText: {
      control: 'text',
    },
    tooltipPlace: {
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'radio' },
      if: { arg: 'tooltipText', truthy: true },
    },
    tooltipType: {
      options: ['info', 'success', 'warning', 'error'],
      control: { type: 'radio' },
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
  template: `<br-input v-bind="args" @input="handleInput"></br-input>`,
  methods: {
    handleInput: action('input'),
  },
})

const TemplateDanger = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-input v-bind="args" @input="handleInput"></br-input>
  <br-message state="danger" show-icon feedback>Texto da mensagem.</br-message>
  `,
  methods: {
    handleInput: action('input'),
  },
})

const TemplateSuccess = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-input v-bind="args" @input="handleInput"></br-input>
  <br-message state="success" show-icon feedback>Texto da mensagem.</br-message>
  `,
  methods: {
    handleInput: action('input'),
  },
})

const TemplateWarning = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-input v-bind="args" @input="handleInput"></br-input>
  <br-message state="warning" show-icon feedback>Texto da mensagem.</br-message>
  `,
  methods: {
    handleInput: action('input'),
  },
})

const TemplateInfo = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-input v-bind="args" @input="handleInput"></br-input>
  <br-message state="info" show-icon feedback>Texto da mensagem.</br-message>
  `,
  methods: {
    handleInput: action('input'),
  },
})

const TemplateFundoEscuro = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `
  <div class="p-3 bg-primary-darken-02">
    <br-input v-bind="args" @input="handleInput"></br-input>
    <br-message state="success" show-icon feedback>Texto da mensagem.</br-message>
  </div>`,
  methods: {
    handleInput: action('input'),
  },
})

export const Padrão = Template.bind({})
Padrão.args = {
  label: 'Label / Rótulo',
  placeholder: 'Placeholder',
  disabled: false,
}

export const densitySmall = Template.bind({})
densitySmall.args = {
  label: 'Label / Rótulo',
  placeholder: 'Placeholder',
  disabled: false,
  density: 'small',
}

export const densityLarge = Template.bind({})
densityLarge.args = {
  label: 'Label / Rótulo',
  placeholder: 'Placeholder',
  disabled: false,
  density: 'large',
}

export const labelInline = Template.bind({})
labelInline.args = {
  labelInline: 'Label/Rótulo',
  placeholder: 'Placeholder',
  disabled: false,
  iconSign: 'user',
  icon: 'arrow-right',
  tooltipPlace: 'bottom',
}

export const disabled = Template.bind({})
disabled.args = {
  label: 'Label/Rótulo',
  placeholder: 'Placeholder',
  disabled: true,
  iconSign: 'user',
  icon: 'arrow-right',
}

export const danger = TemplateDanger.bind({})
danger.args = {
  label: 'CPF',
  placeholder: 'CPF inexistente.',
  state: 'danger',
  disabled: false,
}

export const success = TemplateSuccess.bind({})
success.args = {
  label: 'Nome Completo',
  placeholder: 'Fulano Beltrano',
  state: 'success',
  disabled: false,
}

export const warning = TemplateWarning.bind({})
warning.args = {
  label: 'CPF',
  placeholder: 'Digite somente números',
  state: 'warning',
  disabled: false,
}

export const info = TemplateInfo.bind({})
info.args = {
  label: 'CPF',
  placeholder: 'Digite somente números',
  state: 'info',
  disabled: false,
  mask: '###.###.###-##',
}

export const mask = Template.bind({})
mask.args = {
  label: 'Informe o telefone:',
  placeholder: '(##) ####-####',
  disabled: false,
  mask: '(##) ####-####',
}

export const icon = Template.bind({})
icon.args = {
  label: 'Logar',
  placeholder: 'Digite seu usuário',
  disabled: false,
  icon: 'arrow-right',
}

export const iconSign = Template.bind({})
iconSign.args = {
  label: 'Label/Rótulo',
  placeholder: 'Placeholder',
  disabled: false,
  iconSign: 'edit',
}

export const iconAndIconSign = Template.bind({})
iconAndIconSign.args = {
  label: 'Label/Rótulo',
  placeholder: 'Placeholder',
  disabled: false,
  iconSign: 'user',
  icon: 'arrow-right',
}

export const isPassword = Template.bind({})
isPassword.args = {
  label: 'Senha',
  placeholder: 'Digite a senha de 8 a 11 dígitos',
  disabled: false,
  ispassword: true,
}

export const isHighlight = Template.bind({})
isHighlight.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  disabled: false,
  isHighlight: true,
}

export const isHighlightWithIcon = Template.bind({})
isHighlightWithIcon.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  disabled: false,
  isHighlight: true,
  icon: 'search',
}

export const isHighlightWithIconSign = Template.bind({})
isHighlightWithIconSign.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  disabled: false,
  isHighlight: true,
  iconSign: 'user',
}

export const comFundoEscuro = TemplateFundoEscuro.bind({})
comFundoEscuro.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  disabled: false,
  iconSign: 'user',
  inverted: true,
}

export const comTooltip = TemplateInfo.bind({})
comTooltip.args = {
  label: 'CPF',
  placeholder: 'Digite somente números',
  state: 'info',
  disabled: false,
  mask: '###.###.###-##',
  tooltipText: 'Lorem ipsum dolor sit amet.',
  tooltipPlace: 'bottom',
}
