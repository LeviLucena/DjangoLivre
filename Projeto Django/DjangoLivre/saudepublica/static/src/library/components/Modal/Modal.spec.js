import { mount } from '@vue/test-utils'
import BrButton from '../Button/Button.ce.vue'
import Modal from './Modal.ce.vue'

describe('br-modal', () => {
  const commonArgs = {
    title: 'Título',
    show: true,
    closable: true,
  }

  it('renders correctly with default props', () => {
    const wrapper = mount(Modal, {
      props: commonArgs,
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.br-modal-header').text()).toContain('Título')
  })

  it('closes modal when close button is clicked', () => {
    const closeModal = jest.spyOn(Modal.methods, 'closeModal')

    const wrapper = mount(Modal, {
      props: commonArgs,
    })

    expect(wrapper.find('.br-modal').exists()).toBe(true)
    wrapper.find('.close').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(closeModal).toHaveBeenCalled()
      expect(wrapper.find('.br-modal').exists()).toBe(false)
    })
  })

  it('renders with provided width prop', () => {
    const wrapper = mount(Modal, {
      props: {
        ...commonArgs,
        width: 'large',
      },
    })
    expect(wrapper.classes()).toContain('large')
  })

  it('renders with centered buttons', () => {
    const wrapper = mount(Modal, {
      props: {
        ...commonArgs,
        centerButtons: true,
      },
    })
    expect(wrapper.find('.br-modal-footer').classes()).toContain('justify-content-center')
  })

  it('renders buttons correctly in the slot', () => {
    const wrapper = mount(Modal, {
      props: {
        ...commonArgs,
        closable: false,
      },
      slots: {
        buttons: `
          <br-button type="secondary">Ação 1</br-button>
          <br-button type="primary" class="mt-3 mt-sm-0 ml-sm-3">Ação 2</br-button>
        `,
      },
      global: {
        stubs: {
          'br-button': BrButton,
        },
      },
    })
    const buttons = wrapper.findAll('.br-button')
    expect(buttons).toHaveLength(2) // Verifica se há dois botões presentes no slot
  })
})
