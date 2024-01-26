import { action } from '@storybook/addon-actions'
import { EventBus, customEventStorybookArgType, kebabiseArgs } from '../../util/Utils.js'
import Checkbox from '../Checkbox/Checkbox.ce.vue'

window.eventBus = new EventBus()

export default {
  title: 'Componentes/Checkbox',
  component: Checkbox,
  parameters: {
    controls: { exclude: ['value', 'v-model'] },
    actions: {
      handles: ['onChange', 'update:checked'],
    },
  },
  argTypes: {
    /** **[OPCIONAL]** Texto descritivo, localizado sempre à direita da caixa de opção.*/
    label: {
      defaultValue: '',
    },
    /** **[OPCIONAL]** Desabilita o checkbox. */
    disabled: {
      defaultValue: false,
    },
    format: {
      type: 'select',
      options: ['default', 'valid', 'invalid'],
    },
    /** **[OPCIONAL]** Formata o componente para versão horizontal. */
    inline: {
      defaultValue: false,
    },
    /** **[OPCIONAL]** Acessibilidade: define uma cadeia de caracteres para descrever o elemento. */
    ariaLabel: {
      defaultValue: '',
    },
    /** **[OPCIONAL]** Define o name que será atribuido ao checkbox. */
    name: {
      defaultValue: '',
    },
    /** Estado checked. */
    checked: {
      type: 'boolean',
      defaultValue: false,
    },
    change: {
      ...customEventStorybookArgType,
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

const defaultExcluded = ['default', 'indeterminate', 'checkgroupHeader', 'model', 'vModel']

const Template = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-checkbox v-bind="args" @onChange="handleChange"></br-checkbox>`,
  methods: {
    handleChange: action('onChange'),
  },
})

export const Base = Template.bind({})
Base.args = {
  label: 'Label do checkbox',
  name: 'base',
  model: 'check1',
}
Base.parameters = {
  controls: {
    exclude: defaultExcluded,
  },
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  vModel: 'check2',
}
WithoutLabel.parameters = {
  controls: {
    exclude: defaultExcluded,
  },
}

const TemplateChecked = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<br-checkbox v-bind="args" checked @onChange="handleChange"></br-checkbox>`,
  methods: {
    handleChange: action('onChange'),
  },
})
export const Checked = TemplateChecked.bind({})
Checked.args = {
  label: 'Label do checkbox',
  checked: true,
  vModel: 'check3',
}
Checked.parameters = {
  controls: {
    exclude: defaultExcluded,
  },
}

export const Invalid = Template.bind({})
Invalid.args = {
  label: 'Label do checkbox',
  format: 'invalid',
}
Invalid.parameters = {
  controls: {
    exclude: defaultExcluded,
  },
}

export const Valid = Template.bind({})
Valid.args = {
  label: 'Label do checkbox',
  format: 'valid',
}
Valid.parameters = {
  controls: {
    exclude: defaultExcluded,
  },
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Label do checkbox',
  disabled: true,
}
Disabled.parameters = {
  controls: {
    exclude: defaultExcluded,
  },
}

const TemplateMultiple = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `<div>
  <p class="label mb-0">Rótulo</p>
  <p class="text-down-01">Informações adicionais</p>
  <div class="mb-1">
    <br-checkbox label="Unchecked" @onChange="handleChange"></br-checkbox>
  </div>
  <div class="mb-1">
    <br-checkbox label="Checked" checked @onChange="handleChange"></br-checkbox>
  </div>
  <div class="mb-1">
    <br-checkbox label="Valid" format="valid" @onChange="handleChange"></br-checkbox>
  </div>
  <div class="mb-1">
    <br-checkbox label="Invalid" format="invalid" @onChange="handleChange"></br-checkbox>
  </div>
  <div class="mb-1">
    <br-checkbox label="Disabled" disabled></br-checkbox>
  </div>
</div>`,
  methods: {
    handleChange: action('onChange'),
  },
})

export const Multiple = TemplateMultiple.bind({})
Multiple.parameters = {
  controls: {
    exclude: [...defaultExcluded, 'format', 'label', 'disabled', 'inline', 'value', 'v-model', 'checked'],
  },
}

const TemplateInline = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `
    <div>
      <p class="label mb-0">Rótulo</p>
      <p class="text-down-01">Informações adicionais</p>
      <div class="d-inline-block mr-5">
        <br-checkbox label="Unchecked" inline @onChange="handleChange"></br-checkbox>
      </div>
      <div class="d-inline-block mr-5">
        <br-checkbox label="Checked" checked inline @onChange="handleChange"></br-checkbox>
      </div>
      <div class="d-inline-block mr-5">
        <br-checkbox label="Valid" format="valid" inline @onChange="handleChange"></br-checkbox>
      </div>
      <div class="d-inline-block mr-5">
        <br-checkbox label="Invalid" format="invalid" inline @onChange="handleChange"></br-checkbox>
      </div>
      <div class="d-inline-block mr-5">
        <br-checkbox label="Disabled" disabled inline></br-checkbox>
      </div>
    </div>
  `,
  methods: {
    handleChange: action('onChange'),
  },
})

export const Inline = TemplateInline.bind({})
Inline.parameters = {
  controls: {
    exclude: [...defaultExcluded, 'format', 'label', 'disabled', 'inline', 'value', 'v-model', 'checked'],
  },
}

const TemplateCheckgroup = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args: kebabiseArgs(args) }
  },
  template: `
  <div class="mb-1">
    <br-checkbox
      label="Parent - Grupo 1"
      checkgroup-parent="grupo-1"
      @update:indeterminate="handleIndeterminate"
      @onChange="handleChange"
    ></br-checkbox>
  </div>
  <div class="mb-1 ml-2">
    <br-checkbox
      label="Child - Grupo 1"
      checkgroup-child="grupo-1"
      @onChange="handleChange"
    ></br-checkbox>
  </div>
  <div class="mb-1 ml-2">
    <br-checkbox
      label="Child - Grupo 1"
      checkgroup-child="grupo-1"
      @onChange="handleChange"
    ></br-checkbox>
  </div>
  <div class="mb-1 ml-2">
    <br-checkbox
      label="Child - Grupo 1 / Parent - Grupo 2"
      checkgroup-child="grupo-1"
      checkgroup-parent="grupo-2"
      @update:indeterminate="handleIndeterminate"
      @onChange="handleChange"
    ></br-checkbox>
  </div>
  <div class="mb-1 ml-4">
    <br-checkbox
      label="Child - Grupo 2"
      checkgroup-child="grupo-2"
      @onChange="handleChange"
    ></br-checkbox>
  </div>
  <div class="mb-1 ml-4">
    <br-checkbox
      label="Child - Grupo 2"
      checkgroup-child="grupo-2"
      @onChange="handleChange"
    ></br-checkbox>
  </div>
  <div class="mb-1 ml-4">
    <br-checkbox
      label="Child - Grupo 2"
      checkgroup-child="grupo-2"
      @onChange="handleChange"
    ></br-checkbox>
  </div>`,
  methods: {
    handleIndeterminate: action('update:indeterminate'),
    handleChange: action('onChange'),
  },
})

export const Checkgroup = TemplateCheckgroup.bind({})
Checkgroup.parameters = {
  controls: {
    exclude: ['disabled', 'format', 'inline', 'ariaLabel', 'name', 'checked', 'value'],
  },
}

export const ComTooltip = Template.bind({})
ComTooltip.args = {
  label: 'Label do checkbox',
  format: 'valid',
  tooltipText: 'Lorem ipsum dolor sit amet.',
  tooltipPlace: 'bottom',
}
ComTooltip.parameters = {
  controls: {
    exclude: defaultExcluded,
  },
}
