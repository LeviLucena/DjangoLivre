import { kebabiseArgs } from '../../util/Utils.js'
import BrNotification from './Notification.ce.vue'

const commonArgs = {
  title: 'Fulano da silva',
  subtitle: 'nome.sobrenome@dominio.gov',
  showNotification: true,
  notifications: `[
    {
      tab: { icon: 'bell' },
      itens: [
        {icon: 'heartbeat', text: 'Link disable', state: 'disabled'},
        {icon: 'heartbeat', text: 'Link de acesso'},
        {icon: 'heartbeat', text: 'Link Google', href: 'https://www.google.com'}
      ]
    },
    {
      tab: { icon: 'envelope', isActive: 'true'  },
      itens: [
        {
          tag: 'warning',
          title: 'Titulo',
          timeInfo: '25 de out',
          text: 'Nostrud consequat culpa ex mollit aute. Ex ex veniam ea labore laboris duis duis elit. Ex aute dolor enim aute Lorem dolor. Duis labore ad anim culpa. Non aliqua excepteur sunt eiusmod ex consectetur ex esse laborum velit ut aute.'
        },
        {
          title: 'Titulo',
          timeInfo: '25 de out',
          text: 'Nostrud consequat culpa ex mollit aute. Ex ex veniam ea labore laboris duis duis elit. Ex aute dolor enim aute Lorem dolor. Duis labore ad anim culpa. Non aliqua excepteur sunt eiusmod ex consectetur ex esse laborum velit ut aute.'
        },
        {
          tag: 'info',
          title: 'Titulo',
          timeInfo: '25 de out',
          text: 'Nostrud consequat culpa ex mollit aute. Ex ex veniam ea labore laboris duis duis elit. Ex aute dolor enim aute Lorem dolor. Duis labore ad anim culpa. Non aliqua excepteur sunt eiusmod ex consectetur ex esse laborum velit ut aute.'
        }
      ]
    }
  ]`,
}

const listWithTooltip = `[
  {
    tab: { icon: 'bell', 'tooltipText': 'Lorem ipsum' },
    itens: [
      {icon: 'heartbeat', text: 'Link disable', state: 'disabled'},
      {icon: 'heartbeat', text: 'Link de acesso', tooltipText: 'Lorem ipsum', tooltipPlace: 'right'},
      {icon: 'heartbeat', text: 'Link Google', href: 'https://www.google.com'}
    ]
  },
  {
    tab: { icon: 'envelope', 'tooltipText': 'Lorem ipsum'  },
    itens: [
      {
        tag: 'warning',
        title: 'Titulo',
        timeInfo: '25 de out',
        text: 'Nostrud consequat culpa ex mollit aute. Ex ex veniam ea labore laboris duis duis elit. Ex aute dolor enim aute Lorem dolor. Duis labore ad anim culpa. Non aliqua excepteur sunt eiusmod ex consectetur ex esse laborum velit ut aute.',
        tooltipText: 'Lorem ipsum',
        tooltipPlace: 'right'
      },
      {
        title: 'Titulo',
        timeInfo: '25 de out',
        text: 'Nostrud consequat culpa ex mollit aute. Ex ex veniam ea labore laboris duis duis elit. Ex aute dolor enim aute Lorem dolor. Duis labore ad anim culpa. Non aliqua excepteur sunt eiusmod ex consectetur ex esse laborum velit ut aute.'
      },
      {
        tag: 'info',
        title: 'Titulo',
        timeInfo: '25 de out',
        text: 'Nostrud consequat culpa ex mollit aute. Ex ex veniam ea labore laboris duis duis elit. Ex aute dolor enim aute Lorem dolor. Duis labore ad anim culpa. Non aliqua excepteur sunt eiusmod ex consectetur ex esse laborum velit ut aute.'
      }
    ]
  }
]`

const slotHeader = `
<span slot="header">
  <small>11.222.333.444-55</small><br/>
  <small>Editor</small>
</span>
`

export default {
  title: 'Componentes/Notification',
  component: BrNotification,
  parameters: {
    controls: {
      exclude: ['tooltipPlace', 'tooltipText', 'tooltipTimer', 'tooltipType'],
    },
  },
  argTypes: {
    title: {
      defaultValue: 'Título da notificação',
    },
    subtitle: {
      defaultValue: 'Subtítulo da notificação',
    },
    disableCloseButton: {
      defaultValue: false,
    },
    showNotification: {
      control: 'boolean',
      defaultValue: true,
    },
    notifications: {
      control: 'text',
      table: {
        defaultValue: {
          summary: null,
        },
      },
    },
    header: {
      control: 'text',
      description:
        '** **[OPCIONAL]** Conteúdo do cabeçalho personalizado para o notification, que deve ser passado por slot.',
      table: {
        type: {
          summary: 'Element',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
  },
}

const TemplateDefault = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-notification v-bind="args"></br-notification>`,
})

const TemplateHeader = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `
  <br-notification v-bind="args">
    ${args.header}
  </br-notification>`,
})

export const Completo = TemplateDefault.bind({})
Completo.args = {
  ...commonArgs,
}

export const HeaderPersonalizado = TemplateHeader.bind({})
HeaderPersonalizado.storyName = 'Cabeçalho Personalizado'
HeaderPersonalizado.args = {
  ...commonArgs,
  subtitle: '',
  header: slotHeader,
}

export const ComTooltip = TemplateDefault.bind({})
ComTooltip.args = {
  ...commonArgs,
  notifications: listWithTooltip,
}
