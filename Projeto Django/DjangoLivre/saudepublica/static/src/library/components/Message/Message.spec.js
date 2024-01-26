import { shallowMount } from '@vue/test-utils'
import Message from './Message.ce.vue'

describe('br-message', () => {
  test('checks if the message is feedback type', () => {
    const wrapper = shallowMount(Message, {
      propsData: {
        feedback: true,
      },
    })
    expect(wrapper.find('.feedback').exists()).toBe(true)
  })

  test('assign state danger and check if it is true', () => {
    const wrapper = shallowMount(Message, {
      propsData: {
        state: 'danger',
      },
    })
    expect(wrapper.find('.br-message.danger').exists()).toBe(true)
  })

  test('assign state info and check if it is true', () => {
    const wrapper = shallowMount(Message, {
      propsData: {
        state: 'info',
      },
    })
    expect(wrapper.find('.br-message.info').exists()).toBe(true)
  })

  test('assign state warning and check if it is true', () => {
    const wrapper = shallowMount(Message, {
      propsData: {
        state: 'warning',
      },
    })
    expect(wrapper.find('.br-message.warning').exists()).toBe(true)
  })

  test('assign state success and check if it is true', () => {
    const wrapper = shallowMount(Message, {
      propsData: {
        state: 'success',
      },
    })
    expect(wrapper.find('.br-message.success').exists()).toBe(true)
  })

  test('assign and checks if title property exists in a message', () => {
    const titulo = 'Titulo da mensagem'
    const wrapper = shallowMount(Message, {
      propsData: {
        title: titulo,
      },
    })
    expect(wrapper.text()).toMatch(titulo)
  })

  test('checks if title property do NOT exists in feedback', () => {
    const titulo = 'Titulo da mensagem'
    const wrapper = shallowMount(Message, {
      propsData: {
        feedback: true,
        title: titulo,
      },
    })
    expect(wrapper.find('strong').exists()).toBe(false)
  })

  test('assign inline property to title and check if it is true', () => {
    const titulo = 'Titulo da mensagem'
    const wrapper = shallowMount(Message, {
      propsData: {
        title: titulo,
        inline: true,
      },
    })
    expect(wrapper.find('p').exists()).toBe(false)
  })

  test('assign closable property to message and check if it is true', () => {
    const wrapper = shallowMount(Message, {
      propsData: {
        closable: true,
      },
    })
    expect(wrapper.find('.close').exists()).toBe(true)
  })

  test('assign closable property to feedback and check if it do NOT exists', () => {
    const wrapper = shallowMount(Message, {
      propsData: {
        feedback: true,
        closable: true,
      },
    })
    expect(wrapper.find('.close').exists()).toBe(false)
  })

  test('emit dismiss method on closable message', () => {
    const spyClose = jest.spyOn(Message.methods, 'dismiss')
    const wrapper = shallowMount(Message, {
      propsData: {
        closable: true,
      },
    })
    const btnClose = wrapper.find('.close button')
    btnClose.trigger('click')
    expect(spyClose).toHaveBeenCalled()
    spyClose.mockReset()
    expect(wrapper.element).toMatchSnapshot()
  })

  test('message has the expected html structure - snapshot', () => {
    const titulo = 'Titulo da mensagem'
    const wrapper = shallowMount(Message, {
      propsData: {
        closable: true,
        title: titulo,
      },
      slots: {
        default: 'Texto da mensagem.',
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('feedback has the expected html structure - snapshot', () => {
    const wrapper = shallowMount(Message, {
      propsData: {
        feedback: true,
      },
      slots: {
        default: 'Texto da mensagem.',
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
