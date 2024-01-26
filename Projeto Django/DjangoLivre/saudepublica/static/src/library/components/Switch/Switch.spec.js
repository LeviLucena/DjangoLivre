import { shallowMount } from '@vue/test-utils'
import Switch from './Switch.ce.vue'

jest.spyOn(global.console, 'error').mockImplementation((s) => {
  throw s
})

describe('br-switch', () => {
  test('Testa se o uso da classe br-switch está sendo renderizado.', () => {
    const wrapper = shallowMount(Switch, {
      propsData: {
        id: '123',
      },
    })
    expect(wrapper.find('.br-switch').exists()).toBeTruthy()
  })

  test('Testa se a prop checked está sendo renderizada.', () => {
    const wrapper = shallowMount(Switch, {
      propsData: {
        id: '123',
        checked: true,
      },
    })
    expect(wrapper.find('input').element.checked).toBeTruthy()
  })

  test('Testa se a prop disabled está sendo renderizada.', () => {
    const wrapper = shallowMount(Switch, {
      propsData: {
        id: '123',
        disabled: true,
      },
    })
    expect(wrapper.find('input').element.disabled).toBeTruthy()
  })

  test('Testa se a prop icon está sendo renderizada.', () => {
    const wrapper = shallowMount(Switch, {
      propsData: {
        id: '123',
        icon: true,
      },
    })
    expect(wrapper.find('.br-switch.icon').exists()).toBeTruthy()
  })

  test('Testa se a prop size com valor small está sendo renderizada.', () => {
    const wrapper = shallowMount(Switch, {
      propsData: {
        id: '123',
        size: 'small',
      },
    })
    expect(wrapper.find('.br-switch.small').exists()).toBeTruthy()
  })

  test('Testa se a prop size com valor large está sendo renderizada.', () => {
    const wrapper = shallowMount(Switch, {
      propsData: {
        id: '123',
        size: 'large',
      },
    })
    expect(wrapper.find('.br-switch.large').exists()).toBeTruthy()
  })

  test('Testa se a prop label está sendo renderizada.', () => {
    const textoHello = 'hello'
    const wrapper = shallowMount(Switch, {
      propsData: {
        id: '123',
        label: textoHello,
      },
    })
    expect(wrapper.text()).toMatch(textoHello)
  })

  test('Testa se as props labelChecked e labelNotChecked estão sendo renderizadas.', () => {
    const labelChecked = 'ON'
    const labelNotChecked = 'OFF'
    const wrapper = shallowMount(Switch, {
      propsData: {
        id: '123',
        labelChecked: labelChecked,
        labelNotChecked: labelNotChecked,
      },
    })
    expect(wrapper.html()).toMatch('data-enabled="' + labelChecked + '"')
    expect(wrapper.html()).toMatch('data-disabled="' + labelNotChecked + '"')
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Testa se o evento change foi emitido, ao alterar o estado do switch', async () => {
    const wrapper = shallowMount(Switch, {
      propsData: {
        id: '123',
      },
    })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted().change).toBeTruthy()
  })
})
