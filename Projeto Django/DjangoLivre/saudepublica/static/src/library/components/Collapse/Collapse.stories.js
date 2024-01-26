import { action } from '@storybook/addon-actions'
import { kebabiseArgs } from '../../util/Utils.js'
import BrCollapse from './Collapse.ce.vue'

export default {
  title: 'Componentes/Collapse',
  component: BrCollapse,
  argTypes: {
    title: {
      control: 'text',
      default: '',
    },
    collapsed: {
      control: 'boolean',
      default: false,
    },
    showIcon: {
      control: 'boolean',
      default: false,
    },
    nameIconCollapsed: {
      control: 'text',
      defaultValue: '',
    },
    nameIconNotCollapsed: {
      control: 'text',
      defaultValue: '',
    },
    default: {
      control: 'text',
      defaultValue: 'Texto do item',
      description: '**[OBRIGATÓRIO]** Conteúdo interno do collapse, que deve ser passado por slot.',
      table: {
        type: {
          summary: 'string | Element',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
  },
}

const defaultContentSlot = `
  <br-list>
    <br-item>
      <div class="row">
        <div class="col-auto">
          <i class="fas fa-heartbeat" aria-hidden="true"></i>
        </div>
        <div class="col">
          <p class="m-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </br-item>
  </br-list>
`

const Template = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `
    <div class="row">
      <div class="col-8">
        <br-collapse v-bind="args" @toggle-collapse="handleCollapse">
        <br-list>
          <br-item>
            <div class="row">
              <div class="col-auto">
                <i class="fas fa-heartbeat" aria-hidden="true"></i>
              </div>
              <div class="col">
                <p class="m-0">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </br-item>
        </br-list>
        </br-collapse>
      </div>
    </div>
    <div class="row">
    <div class="col-8">
      <br-collapse v-bind="args" @toggle-collapse="handleCollapse">
      <br-list>
        <br-item>
          <div class="row">
            <div class="col-auto">
              <i class="fas fa-heartbeat" aria-hidden="true"></i>
            </div>
            <div class="col">
              <p class="m-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </br-item>
      </br-list>
      </br-collapse>
    </div>
  </div>
  <div class="row">
  <div class="col-8">
    <br-collapse v-bind="args" @toggle-collapse="handleCollapse">
    <br-list>
      <br-item>
        <div class="row">
          <div class="col-auto">
            <i class="fas fa-heartbeat" aria-hidden="true"></i>
          </div>
          <div class="col">
            <p class="m-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </br-item>
    </br-list>
    </br-collapse>
  </div>
</div>
  `,
  methods: { handleCollapse: action('toggle-collapse') },
})

export const Padrão = Template.bind({})
Padrão.args = {
  title: 'TÍTULO COLLAPSE',
  showIcon: true,
  collapsed: true,
  nameIconCollapsed: 'chevron-up',
  nameIconNotCollapsed: 'chevron-down',
  default: defaultContentSlot,
}
