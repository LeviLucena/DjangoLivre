import { shallowMount } from '@vue/test-utils'
import Breadcrumb from './Breadcrumb.ce.vue'

describe('Breadcrumb', () => {
  const wrapper = shallowMount(Breadcrumb, {
    propsData: {
      label: 'Default',
      links: `[
        {
          'label': 'Página Inicial',
          'url': '/',
          'target': '_blank',
          'home': true
        },
        {
          'label': 'Página Ancestral 01',
          'target': '_blank',
          'url': '#'
        },
        {
          'label': 'Página Ancestral 02',
          'target': '_blank',
          'url': '#'
        },
        {
          'label': 'Página Atual',
          'active': true
        }
      ]`,
    },
  })

  test('it renders Breadcrumb.', () => {
    expect(wrapper.find('.br-breadcrumb').exists()).toBe(true)
  })

  test("it renders aria-label'", () => {
    expect(wrapper.attributes('aria-label')).toBe('Default')
    //expect(wrapper.element).toMatchSnapshot()
  })
})
