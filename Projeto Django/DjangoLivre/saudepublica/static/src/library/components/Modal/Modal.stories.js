import { kebabiseArgs } from '../../util/Utils.js'
import BrModal from './Modal.ce.vue'

const commonArgs = {
  title: 'Título',
  show: true,
  closable: true,
}

const slotDefault = `
<p>
Lorem ipsum dolor sit amet consectetur adipisicing elit.
Temporibus commodi laboriosam vel sequi quam deleniti,
laborum mollitia blanditiis dolores officiis nulla quos
dolorem repellat in nisi alias nesciunt fugit. Similique!
</p>
`

const slotDefaultMaxHeight = `
<p>Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Mauris id gravida nulla. Cras sagittis dapibus felis vitae semper. Donec vel hendrerit ante. Etiam sed blandit nisi. Praesent iaculis, nisl eget rutrum vehicula, lacus tortor feugiat diam, et euismod lacus metus eget nisi. Sed fermentum, nunc nec efficitur pharetra, felis dolor feugiat massa, et semper turpis felis quis ligula. Quisque non metus at risus maximus ultrices. Nam vel massa tellus. Vestibulum lobortis dui et pellentesque porta. Cras rhoncus augue a mauris porttitor, in malesuada metus eleifend. Praesent ac lacinia lorem. Sed cursus nisl ligula, vel ultrices ex pellentesque eu. Curabitur facilisis egestas libero, non pharetra lacus ultricies quis. Mauris non finibus justo, eu varius metus. Donec nec eros semper, consequat turpis id, fermentum dolor.</p>
<p>Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Mauris id gravida nulla. Cras sagittis dapibus felis vitae semper. Donec vel hendrerit ante. Etiam sed blandit nisi. Praesent iaculis, nisl eget rutrum vehicula, lacus tortor feugiat diam, et euismod lacus metus eget nisi. Sed fermentum, nunc nec efficitur pharetra, felis dolor feugiat massa, et semper turpis felis quis ligula. Quisque non metus at risus maximus ultrices. Nam vel massa tellus. Vestibulum lobortis dui et pellentesque porta. Cras rhoncus augue a mauris porttitor, in malesuada metus eleifend. Praesent ac lacinia lorem. Sed cursus nisl ligula, vel ultrices ex pellentesque eu. Curabitur facilisis egestas libero, non pharetra lacus ultricies quis. Mauris non finibus justo, eu varius metus. Donec nec eros semper, consequat turpis id, fermentum dolor.</p>
<p>Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Mauris id gravida nulla. Cras sagittis dapibus felis vitae semper. Donec vel hendrerit ante. Etiam sed blandit nisi. Praesent iaculis, nisl eget rutrum vehicula, lacus tortor feugiat diam, et euismod lacus metus eget nisi. Sed fermentum, nunc nec efficitur pharetra, felis dolor feugiat massa, et semper turpis felis quis ligula. Quisque non metus at risus maximus ultrices. Nam vel massa tellus. Vestibulum lobortis dui et pellentesque porta. Cras rhoncus augue a mauris porttitor, in malesuada metus eleifend. Praesent ac lacinia lorem. Sed cursus nisl ligula, vel ultrices ex pellentesque eu. Curabitur facilisis egestas libero, non pharetra lacus ultricies quis. Mauris non finibus justo, eu varius metus. Donec nec eros semper, consequat turpis id, fermentum dolor.</p>
`

const slotDefaultCarregando = `
<br-loading medium class="mt-2"></br-loading>
`

const slotButtons = `
<div slot="buttons">
  <br-button type="secondary" class="m-1">Ação 1</br-button>
  <br-button type="primary" class="m-1">Ação 2</br-button>
</div>
`

const slotButtonsCancelar = `
<br-button slot="buttons" secondary>Cancelar</br-button>
`

export default {
  title: 'Componentes/Modal',
  component: BrModal,
  argTypes: {
    show: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    width: {
      control: 'inline-radio',
      options: ['auto', 'large', 'medium', 'small', 'xsmall'],
    },
    centerButtons: {
      control: 'boolean',
    },
    default: {
      control: 'text',
      description: '**[OBRIGATÓRIO]** Conteúdo da modal.',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    buttons: {
      control: 'text',
      description: '**[OPCIONAL]** Exclusivo para botões.',
      table: {
        type: {
          summary: 'Element <br-button slot="buttons"/>',
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
  template: `<br-modal v-bind="args">${args.default}${args.buttons}</br-modal>`,
})

const TemplateComScrim = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  data() {
    return {
      displayScrim: true,
    }
  },
  methods: {
    onCloseModal() {
      this.displayScrim = false
      this.$emit('close-modal')
    },
  },
  template: `
  <br-scrim :show="displayScrim" center-content >
    <br-modal v-bind="args" :show="displayScrim" @close-modal="onCloseModal">${args.default}${args.buttons}</br-modal>
  </br-scrim>
  `,
})

export const Simples = Template.bind({})
Simples.args = {
  ...commonArgs,
  default: slotDefault,
  buttons: slotButtons,
}

export const ComScrim = TemplateComScrim.bind({})
ComScrim.args = {
  ...commonArgs,
  default: slotDefault,
  buttons: slotButtons,
  'close-modal': { action: 'close-modal' }, // Permitir ação para o evento close-modal
}

export const Carregando = Template.bind({})
Carregando.args = {
  show: true,
  width: 'xsmall',
  centerButtons: true,
  default: slotDefaultCarregando,
  buttons: slotButtonsCancelar,
}

export const ComScroll = Template.bind({})
ComScroll.args = {
  ...commonArgs,
  default: slotDefaultMaxHeight,
  buttons: slotButtons,
  maxHeight: '400',
}
