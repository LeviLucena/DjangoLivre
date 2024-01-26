import { action } from '@storybook/addon-actions'
import { kebabiseArgs } from '../../util/Utils.js'
import BrList from './List.ce.vue'

export default {
  title: 'Componentes/List',
  component: BrList,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: '',
    },
    hideTitleDivider: {
      control: 'boolean',
      defaultValue: false,
    },
    horizontal: {
      control: 'boolean',
      defaultValue: false,
    },
    dataToggle: {
      defaultValue: false,
    },
    dataUnique: {
      defaultValue: false,
    },
    checkable: {
      defaultValue: false,
    },
    default: {
      control: 'text',
      description:
        '**[OBRIGATÓRIO]** Conteúdo da lista, que deve ser passado por slot. Preferencialmente, devem ser do tipo **<br-item>**.',
      table: {
        type: {
          summary: 'NodeList of <br-item>',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    density: {
      control: 'inline-radio',
      options: ['large', 'medium', 'small'],
      defaultValue: 'small',
    },
  },
}

const TemplateDefault = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-list v-bind="args">
    <br-item title="Item 1" @toggle-open="handleOpen">
      <br-list>
        <br-item>Subitem 1.1</br-item>
        <br-item>Subitem 1.2</br-item>
        <br-item>Subitem 1.3</br-item>
      </br-list>
    </br-item>
    <br-item title="Item 2" @toggle-open="handleOpen">
      <br-list>
        <br-item>Detalhes do item 2</br-item>
      </br-list>
    </br-item>
    <br-item title="Item 3" @toggle-open="handleOpen">
      <br-list> Mais detalhes sobre o item 3 </br-list>
    </br-item>
    <br-item title="Item 4" @toggle-open="handleOpen">
      <br-list> Mais detalhes sobre o item 4 </br-list>
    </br-item>
  </br-list>`,
  methods: { handleOpen: action('toggle-open') },
})

const TemplateHorizontal = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-list v-bind="args">
    <br-item title="Item 1" @toggle-open="handleOpen">
      <br-list>
        <br-item>Subitem 1.1</br-item>
        <br-item>Subitem 1.2</br-item>
        <br-item>Subitem 1.3</br-item>
      </br-list>
    </br-item>
    <br-item title="Item 2" @toggle-open="handleOpen">
      <br-list>
        <br-item>Detalhes do item 2</br-item>
      </br-list>
    </br-item>
    <br-item title="Item 3" @toggle-open="handleOpen">
      <br-list> Mais detalhes sobre o item 3 </br-list>
    </br-item>
  </br-list>`,
  methods: { handleOpen: action('toggle-open') },
})

const TemplateComTooltip = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `
  <br-list v-bind="args">
    <br-item title="Item 1" tooltip-text="Lorem ipsum">
      <br-list>
        <br-item hover tooltip-text="Lorem ipsum">Subitem 1.1</br-item>
        <br-item hover>Subitem 1.2</br-item>
        <br-item hover>Subitem 1.3</br-item>
      </br-list>
    </br-item>
    <br-divider></br-divider>
    <br-item title="Item 2" tooltip-text="Lorem ipsum">
      <br-list>
        <br-item hover tooltip-text="Lorem ipsum">Subitem 2.1</br-item>
        <br-item hover>Subitem 2.2</br-item>
        <br-item hover>Subitem 2.3</br-item>
      </br-list>
    </br-item>
  </br-list>`,
})

const TemplateAgrupamentoPorSeparador = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-list v-bind="args">
    <br-item title="Item 1">
      <br-list>
        <br-item>Subitem 1.1</br-item>
        <br-item>Subitem 1.2</br-item>
        <br-item>Subitem 1.3</br-item>
      </br-list>
    </br-item>
    <br-divider></br-divider>
    <br-item title="Item 2">
      <br-list>
        <br-item>Detalhes do item 2</br-item>
      </br-list>
    </br-item>
    <br-divider></br-divider>
    <br-item title="Item 3">
      <br-list> Mais detalhes sobre o item 3 </br-list>
    </br-item>
    <br-divider></br-divider>
    <br-item title="Item 4">
      <br-list> Mais detalhes sobre o item 4 </br-list>
    </br-item>
  </br-list>`,
})

export const ListaVertical = TemplateDefault.bind({})
ListaVertical.args = {
  title: 'Lista vertical',
}

export const ListaHorizontal = TemplateHorizontal.bind({})
ListaHorizontal.args = {
  title: 'Lista horizontal',
  horizontal: true,
}
export const AgrupamentoPorExpansao = TemplateHorizontal.bind({})
AgrupamentoPorExpansao.args = {
  title: 'Agrupamento por expansão',
  horizontal: true,
  dataToggle: true,
}

export const AgrupamentoPorSeparador = TemplateAgrupamentoPorSeparador.bind({})
AgrupamentoPorSeparador.args = {
  title: 'Agrupamento por separador',
}

export const DataUnique = TemplateDefault.bind({})
DataUnique.args = {
  title: 'Isto é um <br-list data-unique dataToggle> que contém vários <br-item>',
  dataUnique: true,
  dataToggle: true,
}

export const DensityLarge = TemplateDefault.bind({})
DensityLarge.args = {
  title: 'Density Large',
  density: 'large',
}

export const DensityMedium = TemplateDefault.bind({})
DensityMedium.args = {
  title: 'Density Medium',
  density: 'medium',
}

export const DensitySmall = TemplateDefault.bind({})
DensitySmall.args = {
  title: 'Density Small',
}

export const ComTooltip = TemplateComTooltip.bind({})
ComTooltip.args = {
  title: 'Lista vertical',
  dataToggle: true,
}
