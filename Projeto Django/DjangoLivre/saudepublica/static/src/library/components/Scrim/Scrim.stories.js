import { action } from '@storybook/addon-actions'
import { kebabiseArgs } from '../../util/Utils.js'
import BrScrim from './Scrim.ce.vue'

const slotDefault = `
<div class="p-3x">
<br-input
  label="Label / Rótulo"
  placeholder="Placeholder"
></br-input>

</div>
`

export default {
  title: 'Componentes/Scrim',
  component: BrScrim,
  argTypes: {
    id: {
      control: 'text',
    },
    show: {
      control: 'boolean',
    },
    default: {
      control: 'text',
      description:
        '**[OBRIGATÓRIO]** Elemento que surge na tela juntamente com o Scrim, que deve ser passado por slot.',
      table: {
        type: {
          summary: 'string | Element',
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
  template: `

  <br-scrim v-bind="args" @hide="handleEvent" @update:show="handleShow" >
      ${args.default}
  </br-scrim>
  `,
  methods: { handleEvent: action('hide'), handleShow: action('update:show') },
})

export const Padrão = Template.bind({})
Padrão.args = {
  id: 'scrimexample',
  show: true,
  default: slotDefault,
  centerContent: true,
  autofocusContent: true,
}
