import { action } from '@storybook/addon-actions'
import { kebabiseArgs } from '../../util/Utils.js'
import BrCard from './Card.ce.vue'
import CardHeader from './CardHeader.ce.vue'

let icon = 'chevron-down'

const actionsClick = {
  onClick: action('click'),
}

const slotContent = `
    <br-card-content slot="content">
      <img src="https://picsum.photos/id/0/500" alt="Imagem de exemplo"/>
    </br-card-content>
`

const slotContent2 = `
    <br-card-content slot="content">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Tempore perferendis nam porro atque ex at, numquam non optio ab
        eveniet error vel ad exercitationem, earum et fugiat recusandae
        harum? Assumenda.
      </p>
    </br-card-content>
`

const slotHeader = `
    <br-card-header slot="header">
      <div class="d-flex">
        <br-avatar image="https://picsum.photos/id/823/400"></br-avatar>
        <div class="ml-3">
          <div class="text-weight-semi-bold text-up-02">Maria Amorim</div>
          <div>UX Designer</div>
        </div>
        <div class="ml-auto">
          <br-button circle icon="ellipsis-v" @click="onClick"></br-button>
        </div>
      </div>
    </br-card-header>
`

const slotHeaderDisabled = `
    <br-card-header slot="header">
      <div class="d-flex">
        <br-avatar image="https://picsum.photos/id/823/400" @click="onClick"></br-avatar>
        <div class="ml-3">
          <div class="text-weight-semi-bold text-up-02">Maria Amorim</div>
          <div>UX Designer</div>
        </div>
        <div class="ml-auto">
          <br-button circle icon="ellipsis-v" disabled></br-button>
        </div>
      </div>
    </br-card-header>
`

const slotFooter = `
    <br-card-footer slot="footer">
      <div class="d-flex">
        <div>
          <br-button label="Button" @click="onClick"></br-button>
        </div>
        <div class="ml-auto">
          <br-button circle icon="share-alt" @click="onClick"></br-button>
          <br-button circle icon="heart" @click="onClick"></br-button>
        </div>
      </div>
    </br-card-footer>
`

const slotFooterDisabled = `
    <br-card-footer slot="footer">
      <div class="d-flex">
        <div>
          <br-button label="Button" disabled></br-button>
        </div>
        <div class="ml-auto">
          <br-button circle icon="share-alt" disabled></br-button>
          <br-button circle icon="heart" disabled></br-button>
        </div>
      </div>
    </br-card-footer>
`

const slotHeaderComTooltip = `
    <br-card-header slot="header">
      <div class="d-flex">
        <br-avatar image="https://picsum.photos/id/823/400" tooltip-text="Lorem ipsum dolor sit amet." @click="onClick"></br-avatar>
        <div class="ml-3">
          <div class="text-weight-semi-bold text-up-02">Maria Amorim</div>
          <div>UX Designer</div>
        </div>
        <div class="ml-auto">
          <br-button circle icon="ellipsis-v" tooltip-text="Lorem ipsum dolor sit amet." @click="onClick"></br-button>
        </div>
      </div>
    </br-card-header>
`

const slotFooterComTooltip = `
<br-card-footer slot="footer">
  <div class="d-flex">
    <div>
      <br-button label="Button" @click="onClick"></br-button>
    </div>
    <div class="ml-auto">
      <br-button circle icon="share-alt" tooltip-text="Lorem ipsum dolor sit amet." @click="onClick"></br-button>
      <br-button circle icon="heart" tooltip-text="Lorem ipsum dolor sit amet." @click="onClick"></br-button>
    </div>
  </div>
</br-card-footer>
`

const slotFooterComCollapse = `
  <br-card-footer slot="footer">
    <div class="text-right">
      <br-button circle icon="${icon}" type="tertiary" id="item-01" @click="this.toggle()"></br-button>
    </div>
    <br-collapse id="br-item-collapse" @toggle-collapse="handleCollapse">
      <br-list>
        <br-item>
          <br-list>
            <br-item>
              <div class="row">
                <div class="col-auto"><i class="fas fa-heartbeat" aria-hidden="true"></i></div>
                <div class="col">
                  <p class="m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
              </div>
            </br-item>
            <br-divider></br-divider>
            <br-item>
              <div class="row">
                <div class="col-auto"><i class="fas fa-heartbeat" aria-hidden="true"></i>
                </div>
                <div class="col">
                  <p class="m-0">Nesciunt, laudantium ea officiis hic tempora velit aperiam nemo accusamus nisi, eligendi ducimus! Incidunt ullam minima ratione amet sequi.</p>
                </div>
              </div>
            </br-item>
            <br-divider></br-divider>
            <br-item>
              <div class="row">
                <div class="col-auto"><i class="fas fa-heartbeat" aria-hidden="true"></i>
                </div>
                <div class="col">
                  <p class="m-0">Voluptates, iste recusandae.</p>
                </div>
              </div>
            </br-item>
          </br-list>
        </br-item>
      </br-list>
    </br-collapse>
  </br-card-footer>
`

export default {
  title: 'Componentes/Card',
  component: BrCard,
  subcomponents: {
    'br-card-header': CardHeader,
  },
  argTypes: {
    header: {
      control: 'text',
      description: '** header slot - exclusivo para títulos, subtítulos, ícones, avatares e tags.',
      table: {
        type: {
          summary: 'Element <br-card-header slot="header">',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    content: {
      control: 'text',
      description:
        '** content slot - qualquer componente é aceitável, exceto componentes relacionados à navegação, como: carrossel, paginação, abas e menu.',
      table: {
        type: {
          summary: 'Element <br-card-content slot="content">',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    footer: {
      control: 'text',
      description: '** footer slot - exclusivo para botões e links.',
      table: {
        type: {
          summary: 'Element <br-card-footer slot="footer">',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    disabled: {
      defaultValue: false,
    },
    hover: {
      defaultValue: false,
    },
    hFixed: {
      defaultValue: false,
    },
  },
}

const TemplateContent = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `
  <div class="col-sm-6 col-md-4 col-lg-3">
    <br-card v-bind="args">${args.content}</br-card>
  </div>
  `,
})

const Template = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `
  <div class="col-sm-6 col-md-4 col-lg-3">
    <br-card v-bind="args">${args.header}${args.content}${args.footer}</br-card>
  </div>
  `,
  methods: actionsClick,
})

const TemplateHeader = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<div class="col-sm-6 col-md-4 col-lg-3">
  <br-card v-bind="args">${args.header}  </br-card>
</div>
  `,
  methods: actionsClick,
})

const TemplateFooter = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<div class="col-sm-6 col-md-4 col-lg-3">
  <br-card v-bind="args">${args.footer}  </br-card>
</div>
  `,
  methods: actionsClick,
})

const TemplateFooterComCollapse = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<div class="col-sm-6 col-md-4 col-lg-3">
  <br-card v-bind="args">${args.header}${args.content}${args.footer}  </br-card>
</div>
  `,
  methods: {
    toggle() {
      // this.$refs['collapse'].toggle()
      console.log('toggle()')

      const item = document?.getElementById('item-01')
      const itemCollapse = document?.getElementById('br-item-collapse')

      // TODO: Usar actions nessa parte do projeto para acionar via actions esse metódo
      if (itemCollapse?.hasAttribute('collapsed') === false) {
        itemCollapse.setAttribute('collapsed', true)
        if (item?.icon) item.icon = 'chevron-up'
      } else {
        itemCollapse?.removeAttribute('collapsed')
        if (item?.icon) item.icon = 'chevron-down'
      }
    },
    handleCollapse: action('toggle-collapse'),
    onClick: action('click'),
  },
})

export const Simples = TemplateContent.bind({})
Simples.parameters = { controls: { exclude: ['header'] } }
Simples.args = {
  content: slotContent,
}

export const HeaderSlot = TemplateHeader.bind({})
HeaderSlot.args = {
  header: slotHeader,
}

export const ContentSlot = TemplateContent.bind({})
ContentSlot.args = {
  content: slotContent2,
}
//ContentSlot.parameters = { controls: { exclude: ['slotTemplate'] } }

export const FooterSlot = TemplateFooter.bind({})
FooterSlot.args = {
  footer: slotFooter,
}
//FooterSlot.parameters = { controls: { exclude: ['slotTemplate'] } }

export const Completo = Template.bind({})
Completo.args = {
  header: slotHeader,
  content: slotContent2,
  footer: slotFooter,
}
//Completo.parameters = { controls: { exclude: ['slotTemplate'] } }

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  header: slotHeaderDisabled,
  content: slotContent2,
  footer: slotFooterDisabled,
}
//Disabled.parameters = { controls: { exclude: ['slotTemplate'] } }

export const Hover = Template.bind({})
Hover.args = {
  hover: true,
  header: slotHeader,
  content: slotContent2,
  footer: slotFooter,
}

export const ComTooltip = Template.bind({})
ComTooltip.args = {
  header: slotHeaderComTooltip,
  content: slotContent2,
  footer: slotFooterComTooltip,
}

export const ComCollapse = TemplateFooterComCollapse.bind({})
ComCollapse.args = {
  header: slotHeader,
  content: slotContent2,
  footer: slotFooterComCollapse,
  // onclick: itemClickCollapsed,
}
