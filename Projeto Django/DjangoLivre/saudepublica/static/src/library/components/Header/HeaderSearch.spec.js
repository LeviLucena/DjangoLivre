import { shallowMount } from '@vue/test-utils'
import BrHeader from './Header.ce.vue'
import BrHeaderAction from './HeaderAction.ce.vue'
import BrHeaderActionSearch from './HeaderActionSearch.ce.vue'
import BrHeaderSearch from './HeaderSearch.ce.vue'

describe('Header - Search', () => {
  test('it renders BrHeadersearch', async () => {
    const wrapper = shallowMount(BrHeader, {
      propsData: {
        hasSearch: true,
      },
    })
    expect(wrapper.find('.header-search').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('it calls "closeInputSearch" method', async () => {
    const spyCloseInputSearch = jest.spyOn(BrHeaderSearch.methods, 'closeInputSearch')
    const wrapper = shallowMount(BrHeader, {
      props: {
        hasSearch: true,
        compact: true,
      },
      slots: {
        headerAction: `
        <div slot="headerAction">
          <div >
            <br-header-action>
            </br-header-action>
          </div>
        </div>
        `,
      },
      global: {
        stubs: {
          'br-header-action': BrHeaderAction,
          'br-header-search': BrHeaderSearch,
          'br-header-action-search': BrHeaderActionSearch,
        },
      },
    })
    expect(wrapper.element).toMatchSnapshot()
    wrapper.find('[data-target=".header-search"]').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      expect(wrapper.find('.header-search.active').exists()).toBe(true)
      wrapper.find('[data-dismiss="search"]').trigger('click')
      expect(spyCloseInputSearch).toHaveBeenCalled()
    })
  })
})
