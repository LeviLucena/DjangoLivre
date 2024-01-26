import { mount, shallowMount } from '@vue/test-utils'
import { mask } from 'vue-the-mask'
import BrButton from '../Button/Button.ce.vue'
import IconBase from '../IconBase/IconBase.ce.vue'
import BrInput from './Input.ce.vue'

const densidades = ['large', 'medium', 'small']
const cores = ['info', 'warning', 'danger', 'success']

describe('Input', () => {
  test('find Input component and class "br-input"', () => {
    const wrapper = shallowMount(BrInput, {
      propsData: {},
    })
    expect(wrapper.classes('br-input')).toBe(true)
  })

  test('setValue on input', async () => {
    const wrapper = shallowMount(BrInput)
    const textInput = wrapper.find('input[type="text"]')
    await textInput.setValue('Inserindo texto no input')
    expect(wrapper.find('input[type="text"]').element.value).toBe('Inserindo texto no input')
  })

  test('setValue on input mask type cpf', async () => {
    const wrapper = shallowMount(BrInput, {
      propsData: {
        mask: '###.###.###-##',
      },
      directives: {
        mask,
      },
    })
    const textInput = wrapper.find('input[type="text"]')
    await textInput.setValue('614.523.270-68')
    await textInput.trigger('blur')
    expect(wrapper.find('input[type="text"]').element.value).toBe('614.523.270-68')
  })

  test('set label attribute', () => {
    const rotulo = 'Label do input'
    const wrapper = shallowMount(BrInput, {
      props: {
        label: rotulo,
      },
    })
    expect(wrapper.text()).toMatch(rotulo)
  })

  test('set label-inline attribute', () => {
    const rotulo = 'Label do input'
    const wrapper = shallowMount(BrInput, {
      props: {
        'label-inline': rotulo,
      },
    })
    expect(wrapper.text()).toMatch(rotulo)
    expect(wrapper.find('.input-inline').exists()).toBe(true)
    expect(wrapper.find('.input-group').exists()).toBe(false)
    const input = wrapper.findComponent('.br-input')
    expect(input.vm.isLabelInline).toBeTruthy()
    expect(wrapper.vm.isHighlight).toBe(false)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('set label-inline and icon-sign attributes', () => {
    const rotulo = 'Label do input'
    const wrapper = shallowMount(BrInput, {
      props: {
        'label-inline': rotulo,
        'icon-sign': 'edit',
      },
    })
    expect(wrapper.find('.input-group').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('set icon', () => {
    const icone = 'car'
    const wrapper = shallowMount(BrInput, {
      props: {
        icon: icone,
      },
    })

    expect(wrapper.classes()).toContain('br-input')
    expect(wrapper.classes()).toContain('input-button')
    expect(wrapper.props().icon).toBe(icone)
  })

  test('set is-highlight', () => {
    const wrapper = shallowMount(BrInput, {
      props: {
        isHighlight: true,
      },
    })
    expect(wrapper.find('.input-highlight').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('set iconSign', () => {
    const iconSign = 'user'
    const wrapper = shallowMount(BrInput, {
      props: {
        'icon-sign': iconSign,
      },
      global: {
        stubs: {
          'br-button': BrButton,
          'icon-base': IconBase,
        },
      },
    })

    const input = wrapper.findComponent('.br-input')
    expect(input.vm.hasIconsign).toBeTruthy()
    expect(wrapper.findComponent(IconBase).exists()).toBe(true)
  })

  test('has the expected html structure', () => {
    const wrapper = shallowMount(BrInput, {
      props: {},
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  densidades.forEach((densidade) => {
    test(`set density attribute ${densidade}`, () => {
      const wrapper = shallowMount(BrInput, {
        props: {
          density: densidade,
        },
      })
      expect(wrapper.find(`.${densidade}`).exists()).toBe(true)
    })
  })

  cores.forEach((cor) => {
    test(`set state attribute ${cor}`, () => {
      const wrapper = shallowMount(BrInput, {
        props: {
          state: cor,
        },
      })
      expect(wrapper.find(`.${cor}`).exists()).toBe(true)
    })
  })

  test("changing the element's value, updates the v-model", () => {
    const parent = mount({
      data() {
        return { login: '' }
      },
      methods: {
        logInput(e) {
          this.login = e
        },
        logChange(e) {
          this.login = e
        },
      },
      template: `<div>
        <br-input
          type="text"
          id="login"
          label="Login"
          v-model="login"
          @input="logInput"
          @change="logChange"
        >
        </br-input>
        </div>`,
      components: { BrInput },
    })

    const username = 'username_login'
    parent.find('input').setValue(username)

    expect(parent.vm.$data.login).toBe(username)
  })

  test('when is-password is passed as a prop, type must be "password"', () => {
    const wrapper = shallowMount(BrInput, {
      props: {
        ispassword: true,
      },
    })
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('checks if the toggleIcon method is called', () => {
    const spyTogglePassword = jest.spyOn(BrInput.methods, 'toggleIcon')
    const wrapper = shallowMount(BrInput, {
      props: {
        ispassword: true,
      },
      global: {
        stubs: {
          'br-button': BrButton,
          'icon-base': IconBase,
        },
      },
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find('.fas.fa-eye-slash').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.vm.$data.pswIcon).toBe('eye-slash')
    wrapper.find('.br-button').trigger('click')
    expect(wrapper.vm.toggleIcon).toBeTruthy()
    expect(spyTogglePassword).toHaveBeenCalled()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.fa-eye').exists()).toBe(true)
      expect(wrapper.find('input[type="text"]').exists()).toBe(true)
      expect(wrapper.vm.$data.pswIcon).toBe('eye')
      expect(wrapper.element).toMatchSnapshot()
    })
    spyTogglePassword.mockReset()
  })

  test('it renders inverted', () => {
    const rotulo = 'Label do input'
    const wrapper = shallowMount(BrInput, {
      props: {
        label: rotulo,
        inverted: true,
      },
    })
    expect(wrapper.classes('inverted')).toBe(true)
  })
})
