import { shallowMount } from '@vue/test-utils'
import Tab from './Tab.ce.vue'
import TabItem from './TabItem.ce.vue'

describe('Tab', () => {
  it('Deve renderizar o componente tab', () => {
    const wrapper = shallowMount(Tab)
    expect(wrapper.classes(`br-tab`)).toBe(true)
  })

  it('Deve exibir o texto da propriedade aria-label do br-tab', () => {
    const wrapper = shallowMount(Tab, {
      propsData: { label: 'Sobre' },
    })
    const tab = wrapper.find('nav[aria-label]').attributes('aria-label')
    expect(tab).toMatch('Sobre')
  })

  it('Deve aplicar a densidade baixa ao br-tab componente', () => {
    const wrapper = shallowMount(Tab, {
      propsData: { density: 'small' },
    })
    expect(wrapper.classes(`small`)).toBe(true)
  })

  it('Deve aplicar o tab invertido', () => {
    const wrapper = shallowMount(Tab, {
      propsData: { inverted: true },
    })
    expect(wrapper.classes('dark-mode')).toBe(true)
  })
})

describe('TabItem', () => {
  it('Deve renderizar o componente tabItem', () => {
    const wrapper = shallowMount(Tab, {
      slots: {
        default: TabItem,
      },
    })
    expect(wrapper.find('.tab-content').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Deve alterar a prop title da aba (tabItem)', () => {
    const slotItens = `
      <br-tab-item title="Sobre" id="panel-1" icon="image">
        <p>Sobre</p>
      </br-tab-item>
      <br-tab-item title="Todos" id="panel-2" icon="image">
        <p>Todos</p>
      </br-tab-item>
      <br-tab-item title="Notícias" id="panel-3">
        <p>Notícias</p>
      </br-tab-item>
      <br-tab-item title="Serviços" id="panel-4">
        <p>Serviços</p>
      </br-tab-item>
      <br-tab-item title="Aplicativos" id="panel-5">
        <p>Aplicativos</p>
      </br-tab-item>
      <br-tab-item title="Mídias" id="panel-6">
        <p>Mídias</p>
      </br-tab-item>
    `

    const wrapper = shallowMount(Tab, {
      slots: {
        default: slotItens,
      },
      global: {
        stubs: {
          'br-tab-item': TabItem,
        },
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
