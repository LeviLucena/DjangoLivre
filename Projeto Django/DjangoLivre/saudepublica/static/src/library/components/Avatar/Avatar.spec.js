import { shallowMount } from '@vue/test-utils'
import IconBase from '../IconBase/IconBase.ce.vue'
import BrAvatar from './Avatar.ce.vue'

describe('BrAvatar', () => {
  test('Deve verificar se o tipo do avatar é Letra.', () => {
    const textName = 'Jhon Doe'
    const wrapper = shallowMount(BrAvatar, {
      propsData: {
        name: textName,
      },
    })
    expect(wrapper.text()).toMatch('J')
  })

  test("Deve verificar se o tipo do avatar é iconico'.", () => {
    const typeAvatar = true
    const wrapper = shallowMount(BrAvatar, {
      propsData: {
        iconic: typeAvatar,
      },
      global: {
        stubs: {
          'icon-base': IconBase,
        },
      },
    })
    expect(wrapper.find('.fa-user').exists()).toBe(true)
  })

  test("Deve verificar se o tipo do avatar é fotográfico'.", () => {
    const urlImageAvatar = 'https://picsum.photos/id/823/400'
    const wrapper = shallowMount(BrAvatar, {
      propsData: {
        image: urlImageAvatar,
      },
    })
    expect(wrapper.find("img[src='" + urlImageAvatar + "']").exists()).toBe(true)
  })

  test('Deve verificar se a densidade aplica é small', () => {
    const densitySmall = 'small'
    const wrapper = shallowMount(BrAvatar, {
      propsData: {
        name: 'Jhon Doe',
        density: densitySmall,
      },
    })
    expect(wrapper.find('span.br-avatar.small').exists()).toBe(true)
  })

  test('Deve verificar se a densidade aplica é medium', () => {
    const densityMedium = 'medium'
    const wrapper = shallowMount(BrAvatar, {
      propsData: {
        name: 'Jhon Doe',
        density: densityMedium,
      },
    })
    expect(wrapper.find('span.br-avatar.medium').exists()).toBe(true)
  })

  test('Deve verificar se a densidade aplica é large', () => {
    const densitylarge = 'large'
    const wrapper = shallowMount(BrAvatar, {
      propsData: {
        name: 'Jhon Doe',
        density: densitylarge,
      },
    })
    expect(wrapper.find('span.br-avatar.large').exists()).toBe(true)
  })

  test('has the expected html structure', () => {
    const wrapper = shallowMount(BrAvatar, {
      propsData: {
        name: 'Jhon Doe',
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
