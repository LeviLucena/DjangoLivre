import { shallowMount } from '@vue/test-utils'
import BrDivider from './Divider.ce.vue'

const tamanhos = ['small', 'medium', 'large']
describe('BrDivider', () => {
  test('Deve renderizar o divider', () => {
    const wrapper = shallowMount(BrDivider)
    expect(wrapper.classes('br-divider')).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Deve renderizar a prop vertical', () => {
    const wrapper = shallowMount(BrDivider, {
      propsData: { vertical: true },
    })
    expect(wrapper.classes()).toContain('vertical')
    expect(wrapper.element).toMatchSnapshot()
  })

  tamanhos.forEach((tamanho) => {
    test(`set size attribute ${tamanho}`, () => {
      const wrapper = shallowMount(BrDivider, {
        propsData: {
          size: tamanho,
        },
      })
      if (tamanho === 'small') {
        expect(wrapper.classes()).toContain('sm')
      } else if (tamanho === 'medium') {
        expect(wrapper.classes()).toContain('md')
      } else {
        expect(wrapper.classes()).toContain('lg')
      }
    })
  })
})
