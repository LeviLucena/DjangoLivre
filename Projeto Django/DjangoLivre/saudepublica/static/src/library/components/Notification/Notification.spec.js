import { shallowMount } from '@vue/test-utils'
import Button from './../Button/Button.ce.vue'
import Divider from './../Divider/Divider.ce.vue'
import List from './../List/List.ce.vue'
import Tab from './../Tab/Tab.ce.vue'
import TabItem from './../Tab/TabItem.ce.vue'
import BrNotification from './Notification.ce.vue'

describe('br-notification', () => {
  const showNotification = true
  const titleExample = 'title example'
  const subtitleExample = 'subtitle example'
  const notificationsItens = `[
    {
      tab: { icon: 'bell' },
      itens: [
        {icon: 'heartbeat', text: 'Link disable', state: 'disabled'},
        {icon: 'heartbeat', text: 'Link de acesso'},
        {icon: 'heartbeat', text: 'Link Google', href: 'https://www.google.com'}
      ]
    },
    {
      tab: { icon: 'envelope' },
      itens: [
        {icon: 'heartbeat', text: 'Link disable', state: 'disabled'},
        {icon: 'heartbeat', text: 'Link de acesso'},
        {icon: 'heartbeat', text: 'Link Google', href: 'https://www.google.com'}
      ]
    }
  ]`

  const globalConfig = {
    stubs: {
      'br-button': Button,
      'br-divider': Divider,
      'br-tab': Tab,
      'br-tab-item': TabItem,
      'br-list': List,
    },
  }

  test('check if renders class br-notification', () => {
    const wrapper = shallowMount(BrNotification, {
      propsData: {
        showNotification: showNotification,
        title: titleExample,
        subtitle: subtitleExample,
        notifications: notificationsItens,
      },
      global: globalConfig,
    })
    expect(wrapper.find('.br-notification').exists()).toBe(true)
  })

  test('check if renders class notification-header ', () => {
    const wrapper = shallowMount(BrNotification, {
      propsData: {
        showNotification: showNotification,
        title: titleExample,
        subtitle: subtitleExample,
        notifications: notificationsItens,
      },
      global: globalConfig,
    })
    expect(wrapper.find('.notification-header').exists()).toBe(true)
  })

  test('check if renders class notification-body ', () => {
    const wrapper = shallowMount(BrNotification, {
      propsData: {
        showNotification: showNotification,
        title: titleExample,
        subtitle: subtitleExample,
        notifications: notificationsItens,
      },
      global: globalConfig,
    })
    expect(wrapper.find('.notification-body').exists()).toBe(true)
  })

  test('check if prop title its visible.', () => {
    const wrapper = shallowMount(BrNotification, {
      propsData: {
        showNotification: showNotification,
        title: titleExample,
        subtitle: subtitleExample,
        notifications: notificationsItens,
      },
      global: globalConfig,
    })
    expect(wrapper.text()).toMatch(titleExample)
  })

  test('check if prop subtitle its visible.', () => {
    const wrapper = shallowMount(BrNotification, {
      propsData: {
        showNotification: showNotification,
        title: titleExample,
        subtitle: subtitleExample,
        notifications: notificationsItens,
      },
      global: globalConfig,
    })
    expect(wrapper.text()).toMatch(subtitleExample)
  })

  test('check if notifications are visible', () => {
    const wrapper = shallowMount(BrNotification, {
      propsData: {
        showNotification: showNotification,
        title: titleExample,
        subtitle: subtitleExample,
        notifications: notificationsItens,
      },
      global: globalConfig,
    })

    expect(wrapper.findAll('.br-item')).toHaveLength(6)
  })

  test('check if close button its push', () => {
    const wrapper = shallowMount(BrNotification, {
      propsData: {
        showNotification: showNotification,
        title: titleExample,
        subtitle: subtitleExample,
        notifications: notificationsItens,
      },
      global: globalConfig,
    })
    const closeNotification = wrapper.find('.col-2')
    closeNotification.trigger('click')
    wrapper.vm.close()
  })

  test('check notification without header', () => {
    const wrapper = shallowMount(BrNotification, {
      propsData: {
        showNotification: showNotification,
        disableCloseButton: true,
        notifications: notificationsItens,
      },
      global: globalConfig,
    })
    expect(wrapper.find('.notification-header').exists()).toBe(false)
  })

  test('disableCloseButton hides close button', () => {
    const wrapper = shallowMount(BrNotification, {
      propsData: { showNotification, disableCloseButton: true, notifications: notificationsItens },
      global: globalConfig,
    })
    expect(wrapper.find('.text-right').exists()).toBe(false)
  })

  test('matches snapshot', () => {
    const wrapper = shallowMount(BrNotification, {
      propsData: {
        showNotification,
        title: titleExample,
        subtitle: subtitleExample,
        notifications: notificationsItens,
      },
      global: globalConfig,
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('close button is clicked', () => {
    const wrapper = shallowMount(BrNotification, {
      propsData: {
        showNotification: showNotification,
        title: titleExample,
        subtitle: subtitleExample,
        notifications: notificationsItens,
      },
      global: globalConfig,
    })
    const closeBtn = wrapper.find('#close')
    closeBtn.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
