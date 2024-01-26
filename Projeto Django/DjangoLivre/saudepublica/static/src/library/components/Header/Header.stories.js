import { action } from '@storybook/addon-actions'
import { customEventStorybookArgType, kebabiseArgs } from '../../util/Utils.js'
import BrHeader from './Header.ce.vue'
import HeaderAction from './HeaderAction.ce.vue'
import HeaderActionSearch from './HeaderActionSearch.ce.vue'
import HeaderSearch from './HeaderSearch.ce.vue'

const slotHeaderAction = `<br-header-action
  slot="headerAction"
  has-login
  label-login="Entrar"
  image-avatar-login="https://picsum.photos/id/823/400"
  title-links="Acesso Rápido"
  title-functions="Funcionalidades do Sistema"
  list-links="[
    {
      name: 'Link de acesso 1',
      href: '#'
    },
    {
      name: 'Link de acesso 2',
      href: '#'
    },
    {
      name: 'Link de acesso 3',
      href: '#'
    }
  ]"
  list-functions="[
    {
      icon: 'chart-bar',
      name: 'Funcionalidade 1',
      url: '#',
      clickEventName: 'click-funcionalidade-1'
    },
    {
      icon: 'headset',
      name: 'Funcionalidade 2',
      url: '#',
      clickEventName: 'click-funcionalidade-2'
    },
    {
      icon: 'comment',
      name: 'Funcionalidade 3',
      url: '#',
      clickEventName: 'click-funcionalidade-3'
    }
  ]"
>
</br-header-action>`

const slotHeaderActionComTooltip = `<br-header-action
  slot="headerAction"
  has-login
  label-login="Entrar"
  image-avatar-login="https://picsum.photos/id/823/400"
  title-links="Acesso Rápido"
  title-functions="Funcionalidades do Sistema"
  list-links="[
    {
      name: 'Link de acesso 1',
      href: '#',
      tooltipText: 'Lorem ipsum dolor sit amet.'
    },
    {
      name: 'Link de acesso 2',
      href: '#'
    },
    {
      name: 'Link de acesso 3',
      href: '#'
    }
  ]"
  list-functions="[
    {
      icon: 'chart-bar',
      name: 'Funcionalidade 1',
      url: '#',
      clickEventName: 'click-funcionalidade-1',
      tooltipText: 'Lorem ipsum dolor sit amet.'
    },
    {
      icon: 'headset',
      name: 'Funcionalidade 2',
      url: '#',
      clickEventName: 'click-funcionalidade-2'
    },
    {
      icon: 'comment',
      name: 'Funcionalidade 3',
      url: '#',
      clickEventName: 'click-funcionalidade-3'
    }
  ]"
>
</br-header-action>`

export default {
  title: 'Componentes/Header',
  component: BrHeader,
  parameters: {
    controls: {
      exclude: ['tooltipPlace', 'tooltipText', 'tooltipTimer', 'tooltipType'],
    },
  },
  subcomponents: {
    'br-header-action': HeaderAction,
    'br-header-search': HeaderSearch,
    'br-header-action-search': HeaderActionSearch,
  },
  argTypes: {
    density: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
    headerAction: {
      description: `Conteúdo das ações do cabeçalho, que deve ser passado por slot.
      [Documentação do sub-componente <br-header-action>](/?path=/story/componentes-header-sub-componentes-headeraction)`,
      control: 'text',
      table: {
        type: {
          summary: 'Element <br-header-action slot="headerAction">',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    headerMenu: {
      description: 'Conteúdo do menu, que pode ser passado por slot.',
      control: 'text',
      table: {
        type: {
          summary: 'Element <br-menu slot="headerMenu">',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    imageSize: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
    compact: {
      control: 'boolean',
    },
    containerFluid: {
      control: 'boolean',
    },
    hasMenu: {
      control: 'boolean',
    },
    hasSearch: {
      control: 'boolean',
    },
    isSticky: {
      control: 'boolean',
    },
    hasTitleLink: {
      control: 'boolean',
    },
    'search-input': {
      ...customEventStorybookArgType,
    },
    'search-submit': {
      ...customEventStorybookArgType,
    },
    'title-link-click': {
      ...customEventStorybookArgType,
    },
  },
}

const Template = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `
  <br-header v-bind="args"
    @title-link-click="onClickTitleLink"
    @search-input="onClickSearchInput"
    @search-submit="onClickSearchSubmit"
    @clickEventName="handleEvent"
    >
    ${args.headerAction ?? ''}
    ${args.headerMenu ?? ''}
  </br-header>`,
  methods: {
    onClickTitleLink: action('title-link-click'),
    onClickSearchInput: action('search-input'),
    onClickSearchSubmit: action('search-submit'),
    handleEvent: action('clickEventName'),
  },
})

export const Padrao = Template.bind({})
Padrao.storyName = 'Padrão'
Padrao.args = {
  headerAction: slotHeaderAction,
  image: 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-positive.png',
  signature: 'Assinatura da empresa',
  title: 'Título do Header',
  subtitle: 'Subtítulo do Header',
  hasMenu: true,
  hasSearch: true,
  placeholderSearch: 'Digite o texto da pesquisa',
  labelSearch: 'O que você procura?',
}

export const Compacto = Template.bind({})
Compacto.args = {
  headerAction: slotHeaderAction,
  image: 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-positive.png',
  signature: 'Assinatura da empresa',
  title: 'Título do Header',
  subtitle: 'Subtítulo do Header',
  hasMenu: true,
  hasSearch: true,
  placeholderSearch: 'Digite o texto da pesquisa',
  compact: true,
  labelSearch: 'O que você procura?',
}

export const LinkNoTitulo = Template.bind({})
LinkNoTitulo.storyName = 'Com link no título'
LinkNoTitulo.args = {
  ...Padrao.args,
  hasTitleLink: true,
  titleLinkUrl: 'javascript:void(0)',
}

export const ComTooltip = Template.bind({})
ComTooltip.storyName = 'Com Tooltip'
ComTooltip.args = {
  headerAction: slotHeaderActionComTooltip,
  image: 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-positive.png',
  signature: 'Assinatura da empresa',
  title: 'Título do Header',
  subtitle: 'Subtítulo do Header',
  hasMenu: true,
  hasSearch: true,
  placeholderSearch: 'Digite o texto da pesquisa',
  labelSearch: 'O que você procura?',
}
