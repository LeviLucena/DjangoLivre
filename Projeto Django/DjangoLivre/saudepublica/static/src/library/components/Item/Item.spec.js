import { shallowMount } from '@vue/test-utils'
import BrDivider from '../Divider/Divider.ce.vue'
import BrList from '../List/List.ce.vue'
import Item from './Item.ce.vue'

describe('br-item', () => {
  test('Testa se a prop active está renderizando.', () => {
    const wrapper = shallowMount(Item, {
      propsData: { active: true },
    })
    expect(wrapper.find('.active').exists()).toBe(true)
  })

  test('Testa se a prop disabled está renderizando', () => {
    const wrapper = shallowMount(Item, {
      propsData: { disabled: true },
    })
    expect(wrapper.find('.disabled').exists()).toBe(true)
  })

  test('Testa se a prop selected está renderizando.', () => {
    const wrapper = shallowMount(Item, {
      propsData: { selected: true },
    })
    expect(wrapper.find('.selected').exists()).toBe(true)
  })

  test('Testa se o evento toggle-selected foi disparado', async () => {
    const wrapper = shallowMount(Item, {
      propsData: { selected: false },
    })
    wrapper.setProps({ selected: true })
    wrapper.vm.$emit('toggle-selected')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('toggle-selected')).toBeTruthy()
  })

  test('Testa se o evento toggle-open foi disparado', async () => {
    const wrapper = shallowMount(Item, {
      propsData: { open: false },
    })
    wrapper.setProps({ open: true })
    wrapper.vm.$emit('toggle-open')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('toggle-open')).toBeTruthy()
  })

  test('has the expected html structure', () => {
    const wrapper = shallowMount(Item)
    expect(wrapper.element).toMatchSnapshot()
  })

  const listItens = `
    <br-item title="Item 1">
      <br-list>
        <br-item>Subitem 1.1</br-item>
        <br-item>Subitem 1.2</br-item>
        <br-item>Subitem 1.3</br-item>
      </br-list>
    </br-item>

    <br-divider></br-divider>
    <br-item title="Item 2">
      <br-list>
        <br-item>Detalhes do item 2</br-item>
      </br-list>
    </br-item>
  `

  test('insert item into list', () => {
    const wrapper = shallowMount(BrList, {
      propsData: {
        dataToggle: true,
        dataUnique: true,
      },
      slots: {
        default: listItens,
      },
      global: {
        stubs: {
          'br-item': Item,
          'br-list': BrList,
          'br-divider': BrDivider,
        },
      },
    })
    expect(wrapper.findComponent(Item))
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Testa se o valor de dataToggleParentBrList para List com propriedade data-toggle igual a true', () => {
    const wrapper = shallowMount(BrList, {
      propsData: {
        dataToggle: true,
      },
      slots: {
        default: listItens,
      },
      global: {
        stubs: {
          'br-item': Item,
          'br-list': BrList,
          'br-divider': BrDivider,
        },
      },
    })
    const item = wrapper.findComponent(Item)
    expect(item.vm.dataToggleParentBrList).toBeTruthy()
  })

  test('Testa se o valor de dataUniqueParentBrList para List com propriedade data-unique igual a true', () => {
    const wrapper = shallowMount(BrList, {
      propsData: {
        dataToggle: true,
        dataUnique: true,
      },
      slots: {
        default: listItens,
      },
      global: {
        stubs: {
          'br-item': Item,
          'br-list': BrList,
          'br-divider': BrDivider,
        },
      },
    })
    const list = wrapper.findComponent(Item)
    expect(list.vm.dataUniqueParentBrList).toBeTruthy()
  })

  test('Testa se o método dataToggle foi chamado', () => {
    const wrapper = shallowMount(Item, {
      propsData: { open: false },
    })
    const item = wrapper.find('.br-item')
    item.trigger('click')
    wrapper.vm.toggleOpen()
  })
})
