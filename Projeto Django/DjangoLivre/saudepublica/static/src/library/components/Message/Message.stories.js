import { kebabiseArgs } from '../../util/Utils.js'
import BrMessage from './Message.ce.vue'

const slotDefault = `Texto da mensagem.`

export default {
  title: 'Componentes/Message',
  component: BrMessage,
  argTypes: {
    state: {
      type: 'radio',
      options: ['info', 'warning', 'danger', 'success'],
      defaultValue: '',
    },
    title: {
      control: 'text',
      defaultValue: '',
    },
    inline: {
      control: 'boolean',
      defaultValue: false,
    },
    feedback: {
      control: 'boolean',
      defaultValue: false,
    },
    closable: {
      control: 'boolean',
      defaultValue: false,
    },
    showIcon: {
      control: 'boolean',
      defaultValue: false,
    },
    default: {
      control: 'text',
      description: '**[OBRIGATÓRIO]** Transmissão de informação de feedback do sistema.',
      table: {
        type: {
          summary: 'string | NodeList',
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
  template: `<br-message v-bind="args">${args.default}</br-message>`,
})

export const Padrão = Template.bind({})
Padrão.args = {
  state: 'info',
  default: slotDefault,
}

export const feedback = Template.bind({})
feedback.args = {
  state: 'info',
  feedback: true,
  default: slotDefault,
}

export const closable = Template.bind({})
closable.args = {
  state: 'info',
  closable: true,
  default: slotDefault,
}

export const title = Template.bind({})
title.args = {
  state: 'info',
  title: 'Texto da mensagem com título.',
  default: slotDefault,
}

export const titleInline = Template.bind({})
titleInline.args = {
  state: 'info',
  title: 'Texto da mensagem com título inline.',
  inline: true,
  default: slotDefault,
}
