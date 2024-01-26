import { shallowMount } from '@vue/test-utils'
import Loading from './Loading.ce.vue'

describe('br-loading', () => {
  test('Testa se o componente com a barra de progresso esta renderizando.', () => {
    const wrapper = shallowMount(Loading, {
      propsData: {
        progress: true,
        percent: 80,
      },
    })
    expect(wrapper.find('.br-loading-mask').exists()).toBe(true)
    expect(wrapper.attributes('data-progress')).toBe('80')
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Testa se o componente esta renderizando o loading circular do tipo medium', () => {
    const wrapper = shallowMount(Loading, {
      propsData: { medium: true },
    })
    expect(wrapper.find('.loading').exists()).toBe(true)
    expect(wrapper.find('.medium').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Testa se o componente esta renderizando o loading circular do tipo pequeno', () => {
    const wrapper = shallowMount(Loading)
    expect(wrapper.find('.loading').exists()).toBe(true)
    expect(wrapper.find('.medium').exists()).toBe(false)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Testa se o componente esta renderizando o label do loading circular', () => {
    const wrapper = shallowMount(Loading, {
      propsData: { rotulo: 'Carregando ...' },
    })
    expect(wrapper.find('.loading').exists()).toBe(true)
    expect(wrapper.find('.rotulo').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Testa se a propriedade de porcentagem foi informada corretamente', () => {
    const wrapper = shallowMount(Loading, {
      propsData: { medium: true, percent: 100 },
    })

    expect(wrapper.find('.loading').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()

    // Extract the validator
    const validator = wrapper.vm.$options.props.percent.validator

    // invoke the validator
    expect(validator(wrapper.vm.$props.percent)).toBe(true)
  })
})
