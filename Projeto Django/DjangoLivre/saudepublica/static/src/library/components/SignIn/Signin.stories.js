import { kebabiseArgs } from '../../util/Utils.js'
import Signin from './SignIn.ce.vue'

export default {
  title: 'Componentes/Signin',
  component: Signin,
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  argTypes: {
    label: {
      control: 'text',
      defaultValue: null,
    },
    type: {
      control: {
        type: 'inline-radio',
        options: [null, 'primary'],
        labels: {
          null: 'Secundário',
          primary: 'Primário',
        },
      },
      defaultValue: '',
    },
    density: {
      control: 'inline-radio',
      options: ['large', 'middle', 'small'],
      defaultValue: 'middle',
    },
    block: {
      defaultValue: false,
    },
    icon: {
      defaultValue: null,
    },
    inverted: {
      defaultValue: false,
    },
    image: {
      defaultValue: null,
    },
    entity: {
      defaultValue: null,
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
      isLink: {
        defaultValue: null,
      },
    },
    href: {
      control: 'text',
      if: { arg: 'isLink' },
      defaultValue: '#url',
    },
  },
}

const Template = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-sign-in v-bind="args"></br-sign-in>`,
})

const TemplateFundoEscuro = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `
  <div class="p-3 bg-primary-darken-02">
    <br-sign-in v-bind="args"></br-sign-in>
  </div>`,
})

export const TipoInterno = Template.bind({})
TipoInterno.args = {
  type: 'primary',
  density: 'middle',
  icon: 'user',
  label: 'Entrar',
}

export const TipoExternoComTexto = Template.bind({})
TipoExternoComTexto.args = {
  type: 'primary',
  density: 'middle',
  label: 'Entrar com',
  entity: 'gov.br',
}

export const TipoExternoComImagem = Template.bind({})
TipoExternoComImagem.args = {
  type: '',
  density: 'middle',
  label: 'Entrar com',
  image: "{ 'url': 'https://www.gov.br/++theme++padrao_govbr/img/govbr-colorido-b.png', 'description': 'gov.br' }",
}

export const Iconico = Template.bind({})
Iconico.args = {
  type: 'primary',
  density: 'large',
  icon: 'user',
}

export const EnfasePrimariaComFundoEscuro = TemplateFundoEscuro.bind({})
EnfasePrimariaComFundoEscuro.args = {
  type: 'primary',
  inverted: true,
  density: 'middle',
  label: 'Entrar com',
  image: "{ 'url': 'https://www.gov.br/++theme++padrao_govbr/img/govbr-colorido-b.png', 'description': 'gov.br' }",
}
EnfasePrimariaComFundoEscuro.parameters = {
  controls: {
    exclude: ['iconic'],
  },
}

export const Bloco = Template.bind({})
Bloco.args = {
  type: 'primary',
  density: 'middle',
  icon: 'user',
  label: 'Entrar',
  block: true,
}

export const ComTooltip = Template.bind({})
ComTooltip.args = {
  type: 'primary',
  density: 'large',
  icon: 'user',
  tooltipText: 'Lorem ipsum dolor sit amet.',
}

export const Hiperlink = Template.bind({})
Hiperlink.args = {
  type: 'primary',
  density: 'middle',
  icon: 'user',
  label: 'Entrar',
  isLink: true,
}
