import { mount } from '@vue/test-utils'
import { EventBus } from '../../util/Utils'
import Select from './Select.ce.vue'

window.eventBus = new EventBus()

const optionsList = [
  {
    value: 'item-1',
    selected: false,
  },
  {
    value: 'item-2',
    selected: false,
  },
  {
    value: 'item-3',
    selected: false,
  },
]

describe('br-select', () => {
  test('verifica se o campo input é renderizado', () => {
    const wrapper = mount(Select, {
      propsData: {
        options: optionsList,
      },
    })
    expect(wrapper.find('.br-input').exists()).toBe(true)
  })

  test('verifica se o componente br-list é renderizado', () => {
    const wrapper = mount(Select, {
      propsData: {
        options: optionsList,
      },
    })
    expect(wrapper.find('.br-list').exists()).toBe(true)
  })

  test('verifica se o select múltiplo está sendo renderizado', () => {
    const wrapper = mount(Select, {
      propsData: {
        options: optionsList,
        multiple: true,
      },
    })
    expect(wrapper.find('.br-checkbox').exists()).toBe(true)
  })

  test('verifica se a lista renderiza inicialmente de forma fechada', () => {
    const wrapper = mount(Select, {
      propsData: {
        options: optionsList,
      },
    })
    expect(wrapper.find('[expanded]').exists()).toBe(false)
  })

  test('verifica se a lista é aberta ao clicar no botão de ação', async () => {
    const wrapper = mount(Select, {
      propsData: {
        options: optionsList,
      },
    })
    const button = wrapper.find('.br-input .br-button')
    await button.trigger('click')
    expect(wrapper.find('[expanded]').exists()).toBe(true)
  })

  test('verifica se a lista é aberta ao clicar no campo input', async () => {
    const wrapper = mount(Select, {
      propsData: {
        options: optionsList,
      },
    })
    const input = wrapper.find('.br-input input')
    await input.trigger('click')
    expect(wrapper.find('[expanded]').exists()).toBe(true)
  })

  test('verifica se a opção selecionada no select simples aparece marcada como selecionada', async () => {
    const wrapper = mount(Select, {
      propsData: {
        options: optionsList,
      },
    })
    const input = wrapper.find('.br-input input')
    await input.trigger('click')

    const item = wrapper.find('.br-list .br-item')
    await item.trigger('click')

    expect(item.classes('selected')).toBe(true)
  })

  test('verifica se a opção selecionada no select simples aparece no campo input', async () => {
    const wrapper = mount(Select, {
      propsData: {
        options: optionsList,
      },
    })
    const input = wrapper.find('.br-input input')
    await input.trigger('click')

    const item = wrapper.find('.br-list .br-item')
    await item.trigger('click')

    const option = wrapper.find('.br-list .br-item span')

    expect(input.value === option.innerText).toBe(true)
  })
})
