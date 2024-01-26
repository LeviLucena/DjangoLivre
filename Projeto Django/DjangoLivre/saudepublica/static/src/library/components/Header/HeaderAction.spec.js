import { shallowMount } from '@vue/test-utils'
import BrButton from '../Button/Button.ce.vue'
import IconBase from '../IconBase/IconBase.ce.vue'
import BrItem from '../Item/Item.ce.vue'
import BrList from '../List/List.ce.vue'
import BrHeader from './Header.ce.vue'
import BrHeaderAction from './HeaderAction.ce.vue'
import BrHeaderActionSearch from './HeaderActionSearch.ce.vue'

describe('HeaderAction', () => {
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

  test('it renders Search Button in compact mode', () => {
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
        },
      },
    })

    expect(wrapper.find('.header-search-trigger').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  //Verifica se botao login eh renderizado
  test('it renders Login button', async () => {
    const wrapper = shallowMount(BrHeader, {
      slots: {
        headerAction: `
      <div slot="headerAction">
        <br-header-action has-login label-login="Entrar">
        </br-header-action>
      </div>
      `,
      },
      global: {
        stubs: {
          'br-header-action': BrHeaderAction,
          'br-button': BrButton,
        },
      },
    })

    expect(wrapper.find('.header-login').exists()).toBe(true)
    expect(wrapper.text()).toMatch('Entrar')
    expect(wrapper.element).toMatchSnapshot()
  })

  test('checks if the onResize method is called', () => {
    const onResize = jest.spyOn(BrHeaderAction.methods, 'onResize')
    const wrapper = shallowMount(BrHeader, {
      slots: {
        headerAction: slotActionsFunctions,
      },
      global: {
        stubs: {
          'br-header-action': BrHeaderAction,
          'br-list': BrList,
          'br-item': BrItem,
          'br-button': BrButton,
        },
      },
    })
    global.innerWidth = 200
    global.dispatchEvent(new Event('resize'))
    wrapper.find('.header-links.dropdown > button').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      expect(wrapper.find('.header-functions.dropdown.show').exists()).toBe(false)
      expect(wrapper.find('.header-links.dropdown.show').exists()).toBe(true)
      // muda a resolução para chamar o método onResize
      global.innerWidth = 1500
      global.dispatchEvent(new Event('resize'))
      wrapper.vm.$nextTick(() => {
        expect(onResize).toHaveBeenCalled()
        expect(wrapper.find('.header-links.dropdown.show').exists()).toBe(false)
        expect(wrapper.element).toMatchSnapshot()
      })
    })
  })

  test('it calls openInputSearch method and checks if showFunction is false', () => {
    const openInputSearch = jest.spyOn(BrHeaderAction.methods, 'openInputSearch')
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

    global.innerWidth = 200
    global.dispatchEvent(new Event('resize'))

    //clica no botão dropdown functions
    wrapper.find('.header-functions.dropdown > button').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      expect(wrapper.find('.header-functions.dropdown.show').exists()).toBe(true)
      expect(wrapper.find('.header-links.dropdown.show').exists()).toBe(false)
      //clica no botão de pesquisa
      wrapper.find('[data-target=".header-search"]').trigger('click')
      wrapper.vm.$nextTick(() => {
        expect(wrapper.element).toMatchSnapshot()
        expect(openInputSearch).toHaveBeenCalled()
        expect(wrapper.find('.header-search.active').exists()).toBe(true)
        expect(wrapper.find('.header-links.dropdown.show').exists()).toBe(false)
        expect(wrapper.find('.header-functions.dropdown.show').exists()).toBe(false)
      })
    })
  })

  test('it calls openInputSearch method and checks if showLinks is false', () => {
    const openInputSearch = jest.spyOn(BrHeaderAction.methods, 'openInputSearch')
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

    global.innerWidth = 200
    global.dispatchEvent(new Event('resize'))

    //clica no botão dropdown links
    wrapper.find('.header-links.dropdown > button').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.header-links.dropdown.show').exists()).toBe(true)
      expect(wrapper.find('.header-functions.dropdown.show').exists()).toBe(false)
      wrapper.find('[data-target=".header-search"]').trigger('click')
      wrapper.vm.$nextTick(() => {
        expect(openInputSearch).toHaveBeenCalled()
        expect(wrapper.find('.header-search.active').exists()).toBe(true)
        expect(wrapper.find('.header-links.dropdown.show').exists()).toBe(false)
        expect(wrapper.find('.header-functions.dropdown.show').exists()).toBe(false)
      })
    })
  })
})

describe('HeaderAction - Functions', () => {
  const slotFunctions = `
  <div slot="headerAction">
    <br-header-action
    title-functions="Funcionalidades do Sistema"
    list-functions="[
      {
        icon: 'chart-bar',
        name: 'Funcionalidade 1',
        url: 'http://www.url'
      }
    ]"
    >
    </br-header-action>
  </div>
  `

  const slotActionsFunctions = `
  <div slot="headerAction">
    <br-header-action
    title-functions="Funcionalidades do Sistema"
    list-functions="[
      {
        icon: 'chart-bar',
        name: 'Funcionalidade 1',
        url: '#',
        clickEventName: 'click-function'
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

  /* Verifica as as funcionalidades sao renderizadas */
  test('it renders functionalities', async () => {
    const wrapper = shallowMount(BrHeader, {
      slots: {
        headerAction: slotFunctions,
      },
      global: {
        stubs: {
          'br-header-action': BrHeaderAction,
          'br-button': BrButton,
          'br-list': BrList,
          'br-item': BrItem,
          'icon-base': IconBase,
        },
      },
    })

    const titleClass = wrapper.find('.title')
    expect(titleClass.exists()).toBe(true)
    expect(titleClass.text().trim()).toBe('Funcionalidades do Sistema')

    expect(wrapper.find("a[href='http://www.url']").exists()).toBe(true)
    expect(wrapper.find('.fa-chart-bar').exists()).toBe(true)

    const funcClass = wrapper.find('.br-item')
    expect(funcClass.exists()).toBe(true)
    expect(funcClass.text().trim()).toBe('Funcionalidade 1')
  })

  test('check ifs the method handleClick is called', async () => {
    const wrapper = shallowMount(BrHeaderAction, {
      props: {
        listFunctions: JSON.stringify([
          {
            icon: 'chart-bar',
            name: 'Funcionalidade 1',
            url: '#',
          },
        ]),
      },
      global: {
        stubs: {
          'br-header-action': BrHeaderAction,
          'br-button': BrButton,
          'br-list': BrList,
          'br-item': BrItem,
        },
      },
    })

    const itemFunction = wrapper.find('.br-item')
    itemFunction.trigger('click')
    wrapper.vm.handleClick(itemFunction)
  })

  test('check ifs the lifecycle method beforeUnmount its called', async () => {
    const wrapper = shallowMount(BrHeaderAction)
    wrapper.unmount()
  })

  test('checks if the openFunctions method is called and if it closes openLinks and vice-versa', () => {
    const openFunctions = jest.spyOn(BrHeaderAction.methods, 'openFunctions')
    const openLinks = jest.spyOn(BrHeaderAction.methods, 'openLinks')
    const wrapper = shallowMount(BrHeader, {
      slots: {
        headerAction: slotActionsFunctions,
      },
      global: {
        stubs: {
          'br-header-action': BrHeaderAction,
          'br-list': BrList,
          'br-item': BrItem,
          'br-button': BrButton,
        },
      },
    })
    global.innerWidth = 200
    global.dispatchEvent(new Event('resize'))
    //clica no botão dropdown functions
    wrapper.find('.header-functions.dropdown > button').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      expect(openFunctions).toHaveBeenCalled()
      expect(wrapper.find('.header-functions.dropdown.show').exists()).toBe(true)
      expect(wrapper.find('.header-links.dropdown.show').exists()).toBe(false)
      expect(wrapper.findAll('.br-item').length).toEqual(4)
      //clica no botão dropdown links
      wrapper.find('.header-links.dropdown > button').trigger('click')
      wrapper.vm.$nextTick(() => {
        expect(wrapper.element).toMatchSnapshot()
        expect(openLinks).toHaveBeenCalled()
        expect(wrapper.find('.header-links.dropdown.show').exists()).toBe(true)
        expect(wrapper.find('.header-functions.dropdown.show').exists()).toBe(false)
        expect(wrapper.findAll('.br-item').length).toEqual(4)
      })
    })
  })

  test('checks if the openLinks method is called and if it closes openFunctions and vice-versa', () => {
    const openFunctions = jest.spyOn(BrHeaderAction.methods, 'openFunctions')
    const openLinks = jest.spyOn(BrHeaderAction.methods, 'openLinks')
    const wrapper = shallowMount(BrHeader, {
      slots: {
        headerAction: slotActionsFunctions,
      },
      global: {
        stubs: {
          'br-header-action': BrHeaderAction,
          'br-list': BrList,
          'br-item': BrItem,
          'br-button': BrButton,
        },
      },
    })
    global.innerWidth = 200
    global.dispatchEvent(new Event('resize'))
    //clica no botão dropdown functions
    wrapper.find('.header-links.dropdown > button').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      expect(openLinks).toHaveBeenCalled()
      expect(wrapper.find('.header-functions.dropdown.show').exists()).toBe(false)
      expect(wrapper.find('.header-links.dropdown.show').exists()).toBe(true)
      expect(wrapper.findAll('.br-item').length).toEqual(4)
      //clica no botão dropdown links
      wrapper.find('.header-functions.dropdown > button').trigger('click')
      wrapper.vm.$nextTick(() => {
        expect(wrapper.element).toMatchSnapshot()
        expect(openFunctions).toHaveBeenCalled()
        expect(wrapper.find('.header-links.dropdown.show').exists()).toBe(false)
        expect(wrapper.find('.header-functions.dropdown.show').exists()).toBe(true)
        expect(wrapper.findAll('.br-item').length).toEqual(4)
      })
    })
  })
})

describe('HeaderAction - Links', () => {
  const slotLinks = `
  <div slot="headerAction">
    <br-header-action
    title-links="Acesso Rápido"
    list-links="[
    {
      name: 'Link de acesso 1',
      href: 'http://www.link'
    }
  ]"
    >
    </br-header-action>
  </div>
  `

  /* Verifica se os links sao renderizados*/
  test('it renders links', () => {
    const wrapper = shallowMount(BrHeader, {
      slots: {
        headerAction: slotLinks,
      },
      global: {
        stubs: {
          'br-header-action': BrHeaderAction,
          'br-list': BrList,
          'br-item': BrItem,
        },
      },
    })
    expect(wrapper.find("a[href='http://www.link']").exists()).toBe(true)
    const linkClass = wrapper.find('.br-item')
    expect(linkClass.exists()).toBe(true)
    expect(linkClass.text().trim()).toBe('Link de acesso 1')
    expect(wrapper.element).toMatchSnapshot()
  })

  test('checks if the openLinks and onResize methods are called', () => {
    const spyOpenLinks = jest.spyOn(BrHeaderAction.methods, 'openLinks')
    const spyOnResize = jest.spyOn(BrHeaderAction.methods, 'onResize')
    const wrapper = shallowMount(BrHeader, {
      slots: {
        headerAction: slotLinks,
      },
      global: {
        stubs: {
          'br-header-action': BrHeaderAction,
          'br-list': BrList,
          'br-item': BrItem,
          'br-button': BrButton,
        },
      },
    })
    global.innerWidth = 200
    global.dispatchEvent(new Event('resize'))
    wrapper.find('button[data-toggle="dropdown"]').trigger('click')
    expect(spyOpenLinks).toHaveBeenCalled()

    global.innerWidth = 1300
    global.dispatchEvent(new Event('resize'))
    expect(spyOnResize).toHaveBeenCalled()
  })

  test('check if handleClick methos is called and fire only one event', async () => {
    const wrapper = shallowMount(BrHeaderAction, {
      props: {
        listFunctions: JSON.stringify([
          {
            icon: 'chart-bar',
            name: 'Funcionalidade 1',
            clickEventName: 'event',
          },
        ]),
      },
      global: {
        stubs: {
          'br-header-action': BrHeaderAction,
          'br-button': BrButton,
          'br-list': BrList,
          'br-item': BrItem,
        },
      },
    })

    const handleClickSpy = jest.spyOn(wrapper.vm, 'handleClick')

    const brItem = wrapper.find('.br-item')
    await brItem.trigger('click')

    expect(handleClickSpy).toHaveBeenCalled()
    // Verifica se o método handleClick foi chamado apenas uma vez
    expect(handleClickSpy).toHaveBeenCalledTimes(1)

    // verifica se evento personalizado passado para a chave "clickEventName"
    //  foi emitido ao clicar em um item de `list-functions` ou de `list-links`
    expect(wrapper.emitted().event).toBeTruthy()
    expect(wrapper.emitted().event.length).toBe(1)

    handleClickSpy.mockRestore()
  })
})
