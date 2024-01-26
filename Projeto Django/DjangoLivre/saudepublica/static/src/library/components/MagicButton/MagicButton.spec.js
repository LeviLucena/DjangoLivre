import { shallowMount } from '@vue/test-utils'
import BrMagicButton from './MagicButton.ce.vue'
import IconBase from '../IconBase/IconBase.ce.vue'

const densidades = ['large', 'medium', 'small']

describe('MagicButton', () => {
  test('it renders br-magic-button', () => {
    const rotulo = 'Label'
    const wrapper = shallowMount(BrMagicButton, {
      propsData: {
        label: rotulo,
      },
    })
    expect(wrapper.classes('br-magic-button')).toBe(true)
  })

  test('set label attribute to create pill type', () => {
    const rotulo = 'Label'
    const wrapper = shallowMount(BrMagicButton, {
      propsData: {
        label: rotulo,
      },
    })
    expect(wrapper.text()).toMatch(rotulo)
  })

  test('set icon', () => {
    const wrapper = shallowMount(BrMagicButton, {
      propsData: {
        icon: 'car',
        circle: true,
      },
      global: {
        stubs: {
          'icon-base': IconBase,
        },
      },
    })
    expect(wrapper.props().icon).toBe('car')
    expect(wrapper.element).toMatchSnapshot()
  })

  densidades.forEach((densidade) => {
    test(`set density attribute ${densidade}`, () => {
      const rotulo = 'Texto do Botão'
      const wrapper = shallowMount(BrMagicButton, {
        propsData: {
          density: densidade,
          label: rotulo,
        },
      })
      expect(wrapper.find(`.br-magic-button.${densidade}`).exists()).toBe(true)
    })
  })
})
