import { shallowMount } from '@vue/test-utils'
import { EventBus } from '../../util/Utils'
import Checkbox from './Checkbox.ce.vue'

window.eventBus = new EventBus()

describe('Checkbox', () => {
  test('it renders br-checkbox', () => {
    const wrapper = shallowMount(Checkbox)
    expect(wrapper.classes('br-checkbox')).toBe(true)
  })

  test('set label attribute', () => {
    const rotulo = 'Label do checkbox'
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        label: rotulo,
      },
    })
    expect(wrapper.text()).toMatch(rotulo)
  })

  test('set inline attribute', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        inline: true,
      },
    })
    expect(wrapper.find('.br-checkbox.d-inline').exists()).toBe(true)
  })

  test('set disabled attribute', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        disabled: true,
      },
    })
    expect(wrapper.props('disabled')).toBe(true)
  })

  test('set format attribute = valid', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        format: 'valid',
      },
    })
    expect(wrapper.find('.br-checkbox.valid').exists()).toBe(true)
  })

  test('set format attribute = invalid', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        format: 'invalid',
      },
    })
    expect(wrapper.find('.br-checkbox.invalid').exists()).toBe(true)
  })

  test('set checked checkbox', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        checked: true,
      },
    })
    expect(wrapper.props('checked')).toBe(true)
  })

  // test('has the expected html structure', () => {
  //   const wrapper = shallowMount(Checkbox)
  //   expect(wrapper.element).toMatchSnapshot()
  // })

  // test('has the expected html structure', () => {
  //   const wrapper = shallowMount(Checkbox)
  //   expect(wrapper.element).toMatchSnapshot()
  // })

  test('set checkbox checked', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        indeterminate: true,
      },
    })
    const checkbox = wrapper.find('.br-checkbox')
    checkbox.setChecked()
    expect(checkbox.element.checked).toBeTruthy()
  })
  // test('call toogleChecked method', () => {
  //   const toogleChecked = jest.spyOn(Checkbox.methods, 'toogleChecked')
  //   const wrapper = shallowMount(Checkbox, {
  //     propsData: {
  //       checked: false,
  //     },
  //   })
  //   const checkbox = wrapper.find('input[type="checkbox"]')
  //   checkbox.trigger('input')
  //   checkbox.trigger('change')
  //   expect(toogleChecked).toBeCalled()
  // })
})

describe('Checkgroup', () => {
  let wrapperParent = null
  let wrapperChild_1 = null
  let wrapperChild_2 = null

  beforeEach(() => {
    wrapperParent = shallowMount(Checkbox, {
      propsData: {
        checkgroupParent: 'group-1',
        checked: false,
      },
    })
    wrapperChild_1 = shallowMount(Checkbox, {
      propsData: {
        checkgroupChild: 'group-1',
        checked: false,
      },
    })
    wrapperChild_2 = shallowMount(Checkbox, {
      propsData: {
        checkgroupChild: 'group-1',
        checked: false,
      },
    })
  })

  afterEach(() => {
    wrapperParent.unmount()
    wrapperChild_1.unmount()
    wrapperChild_2.unmount()
  })

  test('o checkbox pai altera o estado dos checkboxes filho', async () => {
    const checkboxParent = wrapperParent.find('.br-checkbox input')
    const checkboxChild_1 = wrapperChild_1.find('.br-checkbox input')
    const checkboxChild_2 = wrapperChild_2.find('.br-checkbox input')

    await checkboxParent.setChecked()

    expect(checkboxChild_1.element.checked).toBe(true)
    expect(checkboxChild_2.element.checked).toBe(true)
  })

  test('se todos os checkboxes filho forem true, então o checkbox pai tem que ser true', async () => {
    const checkboxParent = wrapperParent.find('.br-checkbox input')
    const checkboxChild_1 = wrapperChild_1.find('.br-checkbox input')
    const checkboxChild_2 = wrapperChild_2.find('.br-checkbox input')

    await checkboxChild_1.setChecked()
    await checkboxChild_2.setChecked()

    expect(checkboxParent.element.checked).toBe(true)
  })

  test('se todos os checkboxes filho forem false, então o checkbox pai tem que ser false', async () => {
    const checkboxParent = wrapperParent.find('.br-checkbox input')

    await wrapperParent.trigger('click')
    await wrapperChild_1.trigger('click')
    await wrapperChild_2.trigger('click')

    expect(checkboxParent.element.checked).toBe(false)
  })
})
