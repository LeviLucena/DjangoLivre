import { shallowMount } from '@vue/test-utils'
import BrButton from '../Button/Button.ce.vue'
import IconBase from '../IconBase/IconBase.ce.vue'
import SignIn from './SignIn.ce.vue'

const densidades = ['large', 'middle', 'small']
const tipo = ['primary']

describe('SignIn', () => {
  const wrapperInternalSignIn = shallowMount(SignIn, {
    propsData: {
      icon: 'user',
      label: 'Entrar',
    },
    global: {
      stubs: {
        'icon-base': IconBase,
        'br-button': BrButton,
      },
    },
  })
  test('it renders br-button', () => {
    expect(wrapperInternalSignIn.classes('br-button')).toBe(true)
  })
  test('it renders icon', () => {
    expect(wrapperInternalSignIn.find('.fas.fa-user').exists()).toBe(true)
  })
  test('it renders label', () => {
    expect(wrapperInternalSignIn.text()).toMatch('Entrar')
  })

  const wrapperExternalSignInWithImage = shallowMount(SignIn, {
    propsData: {
      icon: 'user',
      label: 'Entrar com',
      image: "{ 'url': 'https://www.gov.br/++theme++padrao_govbr/img/govbr-colorido-b.png', 'description': 'gov.br' }",
    },
    global: {
      stubs: {
        'icon-base': IconBase,
        'br-button': BrButton,
      },
    },
  })
  test('it renders image', () => {
    expect(
      wrapperExternalSignInWithImage
        .find('img[src="https://www.gov.br/++theme++padrao_govbr/img/govbr-colorido-b.png"]')
        .exists()
    ).toBe(true)
  })
  test('it not renders icon', () => {
    expect(wrapperExternalSignInWithImage.find('.fa-user').exists()).toBe(false)
  })

  const wrapperExternalSignInWithName = shallowMount(SignIn, {
    propsData: {
      icon: 'user',
      label: 'Entrar com',
      image: "{ 'url': 'https://www.gov.br/++theme++padrao_govbr/img/govbr-colorido-b.png', 'description': 'gov.br' }",
      entity: 'gov.br',
    },
    global: {
      stubs: {
        'icon-base': IconBase,
        'br-button': BrButton,
      },
    },
  })
  test('it renders image', () => {
    expect(
      wrapperExternalSignInWithName
        .find('img[src="https://www.gov.br/++theme++padrao_govbr/img/govbr-colorido-b.png"]')
        .exists()
    ).toBe(true)
  })
  test('it not renders entity name', () => {
    expect(wrapperExternalSignInWithName.text()).not.toMatch('gov.br')
  })
  test('it not renders icon', () => {
    expect(wrapperExternalSignInWithName.find('.fa-user').exists()).toBe(false)
  })

  const wrapperIconicSignIn = shallowMount(SignIn, {
    propsData: {
      icon: 'user',
    },
    global: {
      stubs: {
        'icon-base': IconBase,
        'br-button': BrButton,
      },
    },
  })
  test('it has class circle', () => {
    expect(wrapperIconicSignIn.classes('circle')).toBe(true)
  })
  test('it renders icon', () => {
    expect(wrapperIconicSignIn.find('.fa-user').exists()).toBe(true)
  })

  densidades.forEach((densidade) => {
    test(`set density attribute ${densidade}`, () => {
      const wrapperSignInDensity = shallowMount(SignIn, {
        propsData: {
          icon: 'user',
          label: 'Entrar',
          density: densidade,
        },
        global: {
          stubs: {
            'icon-base': IconBase,
            'br-button': BrButton,
          },
        },
      })
      expect(wrapperSignInDensity.find(`.${densidade}`).exists()).toBe(true)
    })
  })

  tipo.forEach((cor) => {
    test(`set type attribute ${cor}`, () => {
      const wrapperSignInType = shallowMount(SignIn, {
        propsData: {
          type: cor,
        },
        global: {
          stubs: {
            'icon-base': IconBase,
            'br-button': BrButton,
          },
        },
      })
      expect(wrapperSignInType.find(`.${cor}`).exists()).toBe(true)
    })
  })

  const wrapperSignInInverted = shallowMount(SignIn, {
    propsData: {
      inverted: true,
      icon: 'user',
      label: 'Entrar',
    },
    global: {
      stubs: {
        'icon-base': IconBase,
        'br-button': BrButton,
      },
    },
  })
  test('it renders inverted', () => {
    expect(wrapperSignInInverted.classes('inverted')).toBe(true)
  })

  const wrapperSignInBlock = shallowMount(SignIn, {
    propsData: {
      block: true,
      icon: 'user',
      label: 'Entrar',
    },
    global: {
      stubs: {
        'icon-base': IconBase,
        'br-button': BrButton,
      },
    },
  })
  test('it renders sign-in block', () => {
    expect(wrapperSignInBlock.find('.block').exists()).toBe(true)
  })

  test('it renders hiperlink instead of button', () => {
    const wrapper = shallowMount(SignIn, {
      propsData: {
        label: 'Entrar',
        isLink: true,
      },
    })
    expect(wrapper.find('a.br-sign-in').exists()).toBe(true)
    expect(wrapper.find('button.br-sign-in').exists()).toBe(false)
    expect(wrapper.element).toMatchSnapshot()
  })
})
