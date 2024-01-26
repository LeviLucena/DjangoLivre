import { shallowMount } from '@vue/test-utils'
import IconBase from '../IconBase/IconBase.ce.vue'
import BrList from '../List/List.ce.vue'
import BrFooter from './Footer.ce.vue'

describe('Footer', () => {
  const propLogo = `{url: 'https://url-da-logo', description: 'descricao-da-logo'}`
  const propCategorias = `[
    {
      title: 'Categoria 1',
      items: [
        {title: 'item 1', href: '/item1'},
        {title: 'item 2', href: '/item1'},
        {title: 'item 3', href: '/item1'},
        {title: 'item 4', href: '/item1'}
      ]
    },
    {
      title: 'Categoria 2',
      items: [
        {title: 'item 5', href: 'http://www.google.com'},
        {title: 'item 6', href: '/item1'},
        {title: 'item 7', href: '/item1'},
        {title: 'item 8', href: '/item1'}
      ]
    }
  ]`
  const propSocial = `{
    label: 'Título',
    networks: [
      {
        href: '#',
        image: 'https://url-da-rede-social',
        description: 'descricao-da-rede-social'
      },
      {
        href: '#',
        image: 'https://url-da-rede-social',
        description: 'descricao-da-rede-social'
      },
      {
        'href': '#',
        'icon': 'facebook-f',
        'iconFamily': 'fab',
        'description': 'Facebook'
      },
      {
        'href': '#',
        'icon': 'twitter',
        'iconFamily': 'fab',
        'description': 'Twitter'
      }
    ]
  }`
  const propPartners = `[
    {
      href: '#',
      image: 'https://url-do-parceiro',
      description: 'descricao-do-parceiro'
    },
    {
      href: '#',
      image: 'https://url-do-parceiro',
      description: 'descricao-do-parceiro'
    }
  ]`

  const textHello = 'hello'
  const wrapperFooter = shallowMount(BrFooter, {
    propsData: {
      text: textHello,
      inverted: false,
      categories: propCategorias,
      logo: propLogo,
      social: propSocial,
      partners: propPartners,
    },
    global: {
      stubs: {
        'br-list': BrList,
        'icon-base': IconBase,
      },
    },
  })

  const wrapperFooterInverted = shallowMount(BrFooter, {
    propsData: {
      logo: propLogo,
      text: textHello,
      inverted: true,
      categories: propCategorias,
    },
  })

  test('it renders footer text', () => {
    expect(wrapperFooter.text()).toMatch(textHello)
  })

  test('it renders inverted mode', () => {
    expect(wrapperFooterInverted.find('.inverted').exists()).toBe(true)
  })

  test('it renders categories', () => {
    expect(wrapperFooter.findAll('.br-list')).toHaveLength(3)
    expect(wrapperFooter.findAll('.br-item')).toHaveLength(10)
  })

  test('it opens and close category list when click on it', () => {
    global.innerWidth = 200
    global.dispatchEvent(new Event('resize'))
    wrapperFooter
      .find('a')
      .trigger('click')
      .then(() => {
        expect(wrapperFooter.find('.open').exists()).toBe(true)
        wrapperFooter
          .find('a')
          .trigger('click')
          .then(() => {
            expect(wrapperFooter.find('.open').exists()).toBe(false)
          })
      })
  })

  test('it renders logo', () => {
    expect(wrapperFooter.find('.logo').exists()).toBe(true)
  })

  test('it renders logo image', () => {
    expect(wrapperFooter.find(`img[src="https://url-da-logo"]`).exists()).toBe(true)
  })

  test('it renders social networks', () => {
    expect(wrapperFooter.find('.social-network').exists()).toBe(true)
    expect(wrapperFooter.element).toMatchSnapshot()
  })

  test('it renders social networks label', () => {
    expect(wrapperFooter.text()).toMatch('Título')
  })

  test('it renders social networks itens', () => {
    expect(wrapperFooter.find(`img[src="https://url-da-rede-social"]`).exists()).toBe(true)
  })

  test('it renders footer images', () => {
    expect(wrapperFooter.find(`img[src="https://url-do-parceiro"]`).exists()).toBe(true)
  })
})

describe('Footer Basico', () => {
  const wrapperFooter = shallowMount(BrFooter, {
    propsData: {
      logo: 'propLogo',
    },
  })
  const wrapperFooterInverted = shallowMount(BrFooter, {
    propsData: {
      logo: 'propLogo',
      inverted: true,
    },
  })

  test('it renders footer text', () => {
    expect(wrapperFooter.find('.info').exists()).toBe(false)
  })

  test('it renders inverted mode', () => {
    expect(wrapperFooterInverted.find('.inverted').exists()).toBe(true)
  })

  test('it renders categories', () => {
    expect(wrapperFooter.find('.br-list').exists()).toBe(false)
  })

  test('it renders logo', () => {
    expect(wrapperFooter.find('.logo').exists()).toBe(true)
  })

  test('it renders logo image', () => {
    expect(wrapperFooter.find(`img[src]`).exists()).toBe(false)
  })

  test('it renders social networks', () => {
    expect(wrapperFooter.find('.social-network').exists()).toBe(false)
  })

  test('it renders social networks itens', () => {
    expect(wrapperFooter.find(`img[src="https://url-da-rede-social"]`).exists()).toBe(false)
  })

  test('it renders footer images', () => {
    expect(wrapperFooter.find(`img[src="https://url-do-parceiro"]`).exists()).toBe(false)
  })
})
