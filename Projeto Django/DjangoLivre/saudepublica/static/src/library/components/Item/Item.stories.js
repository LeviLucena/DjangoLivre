import { action } from '@storybook/addon-actions'
import { customEventStorybookArgType, kebabiseArgs } from '../../util/Utils.js'
import BrItem from './Item.ce.vue'

import BrList from '../List/List.ce.vue'

const defaultSimpleText = `Um texto simples`

const defaultImageAndText = `
  <div class="row align-items-center">
    <div class="col-auto"><img class="rounded" src="https://picsum.photos/40/40" alt="imagem de exemplo 1" /></div>
    <div class="col"><span>Item 1 - uma imagem e um texto (sem elemento de formulário)</span></div>
  </div>
`
const checkboxItem = `
<br-checkbox id="check-01" label="Item 1"
  onchange="(function(e) {
    const checkboxItem = document.getElementById('check-01').addEventListener('onChange', (e) => {
      const clickedCheckbox = e.detail[0].checked
      const item = document.getElementById('item-01')
      clickedCheckbox ? item.setAttribute('selected', true) : item.removeAttribute('selected')
    })
  })()">
</br-checkbox>`

const itemClick = `
  (function(e) {
    const item = document.getElementById('item-01')
    item.toggleAttribute('selected')
    item.addEventListener('toggle-selected', (e) => {
      const itemSelected = e.detail[0]
      document.getElementById('check-01').shadowRoot.querySelector('input').checked = itemSelected
    })
  })()
`

export default {
  title: 'Componentes/Item',
  component: BrItem,
  BrList,
  argTypes: {
    active: {
      control: 'boolean',
      defaultValue: false,
    },
    hover: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    selected: {
      control: 'boolean',
      defaultValue: false,
    },
    'toggle-selected': {
      ...customEventStorybookArgType,
    },
    'toggle-open': {
      ...customEventStorybookArgType,
    },
    default: {
      control: 'text',
      defaultValue: 'Texto do item',
      description: '**[OBRIGATÓRIO]** Conteúdo do item, que deve ser passado por slot.',
      table: {
        type: {
          summary: 'string | Element',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    open: {
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
  },
}

const TemplateDefault = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-item v-bind="args">${args.default}</br-item>`,
})

export const TextoSimples = TemplateDefault.bind({})
TextoSimples.args = {
  default: defaultSimpleText + '.',
  hover: false,
}

export const ImagemETexto = TemplateDefault.bind({})
ImagemETexto.storyName = 'Imagem e Texto'
ImagemETexto.args = {
  default: defaultImageAndText,
  hover: false,
}

export const Desabilitado = TemplateDefault.bind({})
Desabilitado.args = {
  default: defaultSimpleText + ' desabilitado.',
  disabled: true,
}

const TemplateWithCheckbox = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `
 <br-item v-bind="args"
    id="item-01"
    onclick="${args.onclick}"
    @toggle-selected="handleSelected"
    >${args.default}</br-item>`,
  methods: { handleSelected: action('toggle-selected') },
})

export const ItemDeSelecao = TemplateWithCheckbox.bind({})
ItemDeSelecao.storyName = 'Item de Seleção'
ItemDeSelecao.parameters = { controls: { exclude: ['default', 'onclick', 'selected', 'disabled'] } }
ItemDeSelecao.args = {
  default: checkboxItem,
  hover: true,
  onclick: itemClick,
}

const TemplateComList = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-list title="Exemplo de item com title e open" data-toggle>
    <br-item v-bind="args" @toggle-open="handleOpen">
      <br-list>
        <br-item>Subitem 1.1</br-item>
        <br-item>Subitem 1.2</br-item>
        <br-item>Subitem 1.3</br-item>
      </br-list>
    </br-item>
  </br-list>`,
  methods: { handleOpen: action('toggle-open') },
})

export const TitleEOpen = TemplateComList.bind({})
TitleEOpen.storyName = 'Item com List: "title" e "open"'
TitleEOpen.args = {
  title: 'Título do item',
  open: true,
}

export const ComTooltip = TemplateDefault.bind({})
ComTooltip.args = {
  default: defaultSimpleText + '.',
  hover: false,
  tooltipText: 'Lorem ipsum dolor sit amet.',
}
