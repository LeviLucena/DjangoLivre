import { shallowMount } from '@vue/test-utils'
import BrHeader from './Header.ce.vue'

describe('Header', () => {
  test('it renders Header component', () => {
    const wrapper = shallowMount(BrHeader)
    expect(wrapper.classes('br-header')).toBe(true)
  })

  test('it renders logo image and signature', () => {
    const link = 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-positive.png'
    const assinatura = 'Assinatura da Empresa'

    const wrapper = shallowMount(BrHeader, {
      props: {
        image: link,
        signature: assinatura,
      },
    })

    expect(wrapper.find("img[src='" + link + "']").exists()).toBe(true)
    expect(wrapper.find('.header-sign').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('it renders logo image with small density', () => {
    const link = 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-positive.png'
    const wrapper = shallowMount(BrHeader, {
      props: {
        image: link,
        density: 'small',
      },
    })

    expect(wrapper.find('.br-header.small').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('it renders Menu', async () => {
    const wrapper = shallowMount(BrHeader, {
      propsData: {
        hasMenu: true,
      },
    })
    expect(wrapper.find('.header-menu-trigger').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('it renders Title and subtitle', async () => {
    const wrapper = shallowMount(BrHeader, {
      props: {
        title: 'Título do Header',
        subtitle: 'Subtítulo do Header',
      },
    })
    expect(wrapper.find('.header-title').exists()).toBe(true)
    expect(wrapper.find('.header-subtitle').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('set prop container-fluid', () => {
    const wrapper = shallowMount(BrHeader, {
      props: {
        containerFluid: true,
      },
    })
    expect(wrapper.find('.container-fluid').exists()).toBe(true)
  })

  test('set sticky header', () => {
    const spyOnStickyChange = jest.spyOn(BrHeader.methods, 'onStickyChange')
    const wrapper = shallowMount(BrHeader, {
      props: {
        isSticky: true,
        hasSearch: true,
      },
    })
    expect(wrapper.find('.br-header.sticky.compact').exists()).toBe(false)
    window.scrollY = 1000
    window.dispatchEvent(new Event('scroll'))
    wrapper.vm.$nextTick(() => {
      expect(spyOnStickyChange).toHaveBeenCalled()
      expect(wrapper.find('.br-header.sticky.compact').exists()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  test('check if divider desapears on mobile', () => {
    const link = 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-positive.png'
    const assinatura = 'Assinatura da Empresa'

    const wrapper = shallowMount(BrHeader, {
      props: {
        image: link,
        signature: assinatura,
      },
    })
    expect(wrapper.find('br-divider-stub').exists()).toBe(true)

    global.innerWidth = 200
    global.dispatchEvent(new Event('resize'))

    expect(wrapper.find('.br-divider').exists()).toBe(false)
  })

  test('set small image-size', () => {
    const link = 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-positive.png'
    const wrapper = shallowMount(BrHeader, {
      props: {
        imageSize: 'small',
        image: link,
      },
    })
    expect(wrapper.find('.small-img').exists()).toBe(true)
  })
})
