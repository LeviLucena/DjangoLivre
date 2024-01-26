import { mount } from '@vue/test-utils'
import Scrim from './Scrim.ce.vue'

describe('Scrim', () => {
  it('renders when show is true', async () => {
    const wrapper = mount(Scrim, {
      props: {
        show: true,
      },
    })
    expect(wrapper.isVisible()).toBe(true)
    expect(wrapper.find('.br-scrim.active').exists()).toBe(true)
  })

  it('does not render when show is false', async () => {
    const wrapper = mount(Scrim, {
      props: {
        show: false,
      },
    })
    expect(wrapper.isVisible()).toBe(false)
    expect(wrapper.find('.br-scrim.active').exists()).toBe(false)
  })

  it('emits hide event when canceled', async () => {
    const wrapper = mount(Scrim, {
      props: {
        show: true,
      },
    })
    await wrapper.find('.br-scrim.active').trigger('click')
    expect(wrapper.emitted('hide')).toBeTruthy()
  })

  it('does not hide when disableCloseOnClick is true', async () => {
    const wrapper = mount(Scrim, {
      props: {
        show: true,
        disableCloseOnClick: true,
      },
    })
    wrapper.find('.br-scrim.active').trigger('click')
    expect(wrapper.emitted('hide')).toBeFalsy()
  })

  it('closes when Esc key is pressed', async () => {
    const wrapper = mount(Scrim, {
      props: {
        isActive: true,
      },
    })
    wrapper.vm.$nextTick(() => {
      wrapper.vm.keyPress({ key: 'Escape' })
      expect(wrapper.emitted('hide')).toBeTruthy()
    })
  })

  it('closes when "27" key is pressed', async () => {
    const wrapper = mount(Scrim, {
      props: {
        isActive: true,
      },
    })
    wrapper.vm.$nextTick(() => {
      wrapper.vm.keyPress({ key: '27' })
      expect(wrapper.emitted('hide')).toBeTruthy()
    })
  })

  it('autofocusContent should set focus on content on mount', () => {
    const wrapper = mount(Scrim, {
      props: {
        show: true,
        autofocusContent: true,
      },
      slots: {
        default: '<div id="content">Scrim Content</div>',
      },
    })
    expect(wrapper.find('[tabindex="0"]').exists()).toBe(true)
  })

  it('autofocusContent false should not set focus on content on mount', () => {
    const wrapper = mount(Scrim, {
      props: {
        show: true,
        autofocusContent: false,
      },
      slots: {
        default: '<div id="content">Scrim Content</div>',
      },
    })
    expect(wrapper.find('[tabindex="-1"]').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('centerContent should center the content', () => {
    const wrapper = mount(Scrim, {
      props: {
        show: true,
        centerContent: true,
      },
      slots: {
        default: '<div id="content">Scrim Content</div>',
      },
    })
    expect(wrapper.find('.br-modal').exists()).toBe(true)
  })
})
