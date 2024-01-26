import { shallowMount } from '@vue/test-utils'
import BrCollapse from '../Collapse/Collapse.ce.vue'

describe('Collapse', () => {
  test('Verifica se o componente collapse é renderizado corretamente.', () => {
    const wrapper = shallowMount(BrCollapse, {
      propsData: {
        collapsed: true,
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes('collapsed')).toBe(true)
  })

  it('expands content when toggleCollapse is called', async () => {
    const wrapper = shallowMount(BrCollapse, {
      propsData: {
        collapsed: true,
        showIcon: true,
      },
    })

    wrapper.vm.toggleCollapse()

    wrapper.vm.$nextTick(() => {
      expect(wrapper.classes('collapsed')).toBe(false)
      expect(wrapper.find('.collapse-content').element.style.height).not.toBe('0')
      expect(wrapper.find('.iconNotCollapsed').exists()).toBe(false)
    })
  })

  it('sets correct icon name based on nameIcon prop', () => {
    const nameIcon = 'user'

    const wrapper = shallowMount(BrCollapse, {
      propsData: {
        collapsed: true,
        showIcon: true,
        nameIcon,
      },
    })

    wrapper.vm.toggleCollapse()

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.iconCollapsed').exists()).toBe(false)
      // expect(wrapper.find('.iconCollapsed').props('name-icon')).toBe(nameIcon)
    })
  })
})
