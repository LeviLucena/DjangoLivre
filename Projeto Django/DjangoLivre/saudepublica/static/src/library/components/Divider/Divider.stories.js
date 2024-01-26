import { kebabiseArgs } from '../../util/Utils.js'
import BrDivider from './Divider.ce.vue'

export default {
  title: 'Componentes/Divider',
  component: BrDivider,
  argTypes: {
    vertical: {
      // permite mostrar, mas desabilita a possibilidade de trocar o valor da propriedade [control: false]
      control: false,
      default: false,
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: 'inline-radio',
      defaultValue: '',
    },
  },
}

const TemplateVertical = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `
  <div class="row">
    <div class="col">
      <div class="d-flex p-3">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <br-divider v-bind="args" class="mx-3"></br-divider>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="bg-secondary-07 text-secondary-01 p-3">
        <div class="d-flex">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <br-divider v-bind="args" class="mx-3"></br-divider>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
    </div>
  </div>
  `,
})

export const Vertical = TemplateVertical.bind({})
Vertical.args = {
  vertical: true,
}

Vertical.parameters = {
  controls: { exclude: [''] },
}

export const VerticalTracejado = TemplateVertical.bind({})
VerticalTracejado.args = {
  vertical: true,
  dashed: true,
}

VerticalTracejado.parameters = {
  controls: { exclude: [''] },
}
const TemplateHorizontal = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `

  <div class="row p-3">
    <div class="col">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <br-divider v-bind="args" class="my-3"></br-divider>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
  </div>

  <div class="row">
  <div class="col">
    <div class="bg-secondary-07 text-secondary-01 p-3">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <br-divider v-bind="args" class="my-3"></br-divider>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
  </div>
</div>

  `,
})

export const Horizontal = TemplateHorizontal.bind({})
Horizontal.args = {}
Horizontal.parameters = {
  controls: { exclude: ['vertical'] },
}

export const HorizontalTracejado = TemplateHorizontal.bind({})
HorizontalTracejado.args = {
  dashed: true,
}
HorizontalTracejado.parameters = {
  controls: { exclude: ['vertical'] },
}

export const Small = TemplateHorizontal.bind({})
Small.args = {
  size: 'small',
}
Small.parameters = {
  controls: { exclude: ['vertical'] },
}

export const Medium = TemplateHorizontal.bind({})
Medium.args = {
  size: 'medium',
}
Medium.parameters = {
  controls: { exclude: ['vertical'] },
}

export const Large = TemplateHorizontal.bind({})
Large.args = {
  size: 'large',
}
Large.parameters = {
  controls: { exclude: ['vertical'] },
}
