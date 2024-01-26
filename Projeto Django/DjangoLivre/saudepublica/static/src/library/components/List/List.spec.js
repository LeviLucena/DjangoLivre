import { shallowMount } from '@vue/test-utils'
import BrItem from '../Item/Item.ce.vue'
import BrList from './List.ce.vue'

describe('br-list', () => {
  test('Testa se a classe br-list está renderizando.', () => {
    const wrapper = shallowMount(BrList)
    expect(wrapper.find('.br-list').exists()).toBe(true)
  })

  test('Testa se a prop horizontal está renderizando a classe respectiva.', () => {
    const wrapper = shallowMount(BrList, {
      propsData: { horizontal: true },
    })
    expect(wrapper.find('.horizontal').exists()).toBe(true)
  })

  test('Testa se a prop title é exibida.', () => {
    const titleExample = 'title example'
    const wrapper = shallowMount(BrList, {
      propsData: {
        title: titleExample,
      },
    })
    expect(wrapper.text()).toMatch(titleExample)
  })

  test('Testa se a prop data-unique foi acionada.', () => {
    const wrapper = shallowMount(BrList, {
      propsData: {
        dataUnique: true,
      },
    })
    expect(wrapper.attributes('data-unique')).toBe('true')
  })

  test('Testa se a prop data-toggle foi acionada.', () => {
    const wrapper = shallowMount(BrList, {
      propsData: {
        dataToggle: true,
      },
    })
    expect(wrapper.attributes('data-toggle')).toBe('true')
  })

  test('Inclui item no slot default', () => {
    const wrapper = shallowMount(BrList, {
      propsData: {
        title: 'Título do List',
      },
      slots: {
        default: `
          <br-item title="Título do Item">
          </br-item>`,
      },
      global: {
        stubs: {
          'br-item': BrItem,
        },
      },
    })
    expect(wrapper.findComponent(BrItem))
    expect(wrapper.element).toMatchSnapshot()
  })

  test('set density attribute small', () => {
    const wrapper = shallowMount(BrList, {
      propsData: {
        density: 'small',
        title: 'Título do List',
      },
      slots: {
        default: `<br-item title="Título do Item"></br-item>`,
      },
      global: {
        stubs: {
          'br-item': BrItem,
        },
      },
    })
    expect(wrapper.find('.py-4').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('set density attribute medium', () => {
    const wrapper = shallowMount(BrList, {
      propsData: {
        density: 'medium',
        title: 'Título do List',
      },
      slots: {
        default: `<br-item title="Título do Item"></br-item>`,
      },
      global: {
        stubs: {
          'br-item': BrItem,
        },
      },
    })
    expect(wrapper.find('.py-3').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('set density attribute large', () => {
    const wrapper = shallowMount(BrList, {
      propsData: {
        density: 'large',
        title: 'Título do List',
      },
      slots: {
        default: `<br-item title="Título do Item"></br-item>`,
      },
      global: {
        stubs: {
          'br-item': BrItem,
        },
      },
    })
    expect(wrapper.find('.py-3').exists()).toBe(false)
    expect(wrapper.find('.py-4').exists()).toBe(false)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('if the hideTitleDivider property hides the divider', () => {
    const wrapper = shallowMount(BrList, {
      propsData: {
        hideTitleDivider: true,
        title: 'Título do List',
      },
      slots: {
        default: `<br-item title="Título do Item"></br-item>`,
      },
      global: {
        stubs: {
          'br-item': BrItem,
        },
      },
    })
    expect(wrapper.find('.br-divider').exists()).toBe(false)
    expect(wrapper.element).toMatchSnapshot()
  })
})
