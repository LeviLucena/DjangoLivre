import { shallowMount } from '@vue/test-utils'
import BrButton from '../Button/Button.ce.vue'
import BrItem from '../Item/Item.ce.vue'
import BrList from '../List/List.ce.vue'
import BrHeader from './Header.ce.vue'
import BrHeaderAction from './HeaderAction.ce.vue'
import BrHeaderActionSearch from './HeaderActionSearch.ce.vue'

describe('HeaderAction - HeaderActionSearch', () => {
  const slotActionsFunctions = `
  <div slot="headerAction">
    <br-header-action
    title-functions="Funcionalidades do Sistema"
    list-functions="[
      {
        icon: 'chart-bar',
        name: 'Funcionalidade 1',
        url: '#'
      }
    ]"
    title-links="Acesso Rápido"
    list-links="[
    {
      name: 'Link de acesso 1',
      href: '#'
    },
    {
      name: 'Link de acesso 2',
      href: '#'
    },
    {
      name: 'Link de acesso 3',
      href: '#'
    }
  ]"
    />
  </div>
  `

  test('it emits "open-search" and calls "openSearch" method', async () => {
    const spyOpenSearch = jest.spyOn(BrHeaderActionSearch.methods, 'openSearch')
    const wrapper = shallowMount(BrHeader, {
      props: {
        hasSearch: true,
        compact: true,
      },
      slots: {
        headerAction: slotActionsFunctions,
      },
      global: {
        stubs: {
          'br-header-action': BrHeaderAction,
          'br-header-action-search': BrHeaderActionSearch,
          'br-list': BrList,
          'br-item': BrItem,
          'br-button': BrButton,
        },
      },
    })
    const childWrapper = wrapper.findComponent(BrHeaderActionSearch)
    childWrapper.vm.openSearch()
    childWrapper.vm.$emit('open-search')
    expect(childWrapper.emitted('open-search')).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
    wrapper.find('[data-target=".header-search"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(spyOpenSearch).toHaveBeenCalled()
    expect(wrapper.find('.header-links.dropdown.show').exists()).toBe(false)
    expect(wrapper.find('.header-functions.dropdown.show').exists()).toBe(false)
    expect(wrapper.find('.header-search.active').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })
})
