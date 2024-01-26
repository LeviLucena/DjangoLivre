import { shallowMount } from '@vue/test-utils'
import IconBase from '../IconBase/IconBase.ce.vue'
import Button from './Button.ce.vue'

const densidades = ['large', 'middle', 'small']
const tipo = ['secondary', 'primary']

describe('Button', () => {
  test('it renders icon', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        icon: 'home',
      },
      global: {
        stubs: {
          'icon-base': IconBase,
        },
      },
    })
    expect(wrapper.props().icon).toBe('home')
  })

  test('it renders br-button', () => {
    const wrapper = shallowMount(Button)
    expect(wrapper.classes('br-button')).toBe(true)
  })

  test('set label attribute', () => {
    const rotulo = 'Label do button'
    const wrapper = shallowMount(Button, {
      propsData: {
        label: rotulo,
      },
    })
    expect(wrapper.text()).toMatch(rotulo)
  })

  test('set circle attribute', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        circle: true,
      },
    })
    expect(wrapper.classes('circle')).toBe(true)
  })

  test('assign inverted property to button and check if it is true', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        inverted: true,
      },
    })
    expect(wrapper.find('.br-button.inverted').exists()).toBe(true)
  })

  test('set disabled attribute', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        disabled: true,
      },
    })
    expect(wrapper.find('button[disabled]').exists()).toBe(true)
  })

  test('set block attribute', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        block: true,
      },
    })
    expect(wrapper.classes('block')).toBe(true)
  })

  densidades.forEach((densidade) => {
    test(`set density attribute ${densidade}`, () => {
      const wrapper = shallowMount(Button, {
        propsData: {
          density: densidade,
        },
      })
      expect(wrapper.find(`.${densidade}`).exists()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  tipo.forEach((cor) => {
    test(`set type attribute ${cor}`, () => {
      const wrapper = shallowMount(Button, {
        propsData: {
          type: cor,
        },
      })
      expect(wrapper.find(`.${cor}`).exists()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
