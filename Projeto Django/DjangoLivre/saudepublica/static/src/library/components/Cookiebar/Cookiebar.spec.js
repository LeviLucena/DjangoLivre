import { mount } from '@vue/test-utils'
import Cookiebar from './Cookiebar.ce.vue'
import CookiebarActionsArea from './CookiebarActionsArea.ce.vue'
import CookiebarBroad from './CookiebarBroad.ce.vue'
import CookiebarCategory from './CookiebarCategory.ce.vue'
import CookiebarComplementaryArea from './CookiebarComplementaryArea.ce.vue'
import CookiebarCookie from './CookiebarCookie.ce.vue'
import CookiebarForewordArea from './CookiebarForewordArea.ce.vue'
import CookiebarGlobalArea from './CookiebarGlobalArea.ce.vue'
import CookiebarIntroductionArea from './CookiebarIntroductionArea.ce.vue'
import CookiebarMainArea from './CookiebarMainArea.ce.vue'
import CookiebarNotes from './CookiebarNotes.ce.vue'

import { EventBus } from '../../util/Utils'

window.eventBus = new EventBus()

describe('Cookiebar fechado', () => {
  const wrapper = mount(Cookiebar, {
    propsData: {
      lang: 'pt-br',
      content: `{
        "pt-br": {
          "labels": {
            "close": "fechar",
            "update": "atualizar",
            "categories": "categorias",
            "enableAll": "habilitar tudo",
            "disableAll": "desabilitar tudo",
            "enableCategory": "habilitar categoria",
            "disableCategory": "desabilitar categoria",
            "enableCookie": "habilitar cookie",
            "disableCookie": "desabilitar cookie",
            "awaysEnabled": "sempre habilitado",
            "cookie": "cookie",
            "expiry": "vencimento",
            "domain": "domínio",
            "company": "empresa",
            "purpose": "finalidade",
            "description": "descrição",
            "acceptButton": "aceitar",
            "optInButton": "ver políticas",
            "optOutButton": "definir cookies",
            "notes": "avisos"
          },
          "intro": {
            "observation": "observação",
            "title": "título",
            "update": "01/01/0001",
            "foreword": "prefácio"
          },
          "all": {
            "alert": "mensagem global"
          },
          "categories": [{
            "id": "1",
            "name": "categoria-1",
            "description": "descrição"
          }],
          "cookies": [{
            "id": "1",
            "categoryId": "1",
            "name": "cookie-1",
            "expiry": "001 dias",
            "domain": "domínio",
            "company": "compania",
            "purpose": "finalidade",
            "description": "descrição"
          }],
          "notes": [{
            "question": "pergunta",
            "answer": "resposta"
          }],
          "links": [{
            "name": "nome",
            "url": "url"
          }]
        },
        "en": {
          "labels": {
            "close": "close",
            "update": "update",
            "categories": "categories",
            "enableAll": "enable all",
            "disableAll": "disable all",
            "enableCategory": "enable category",
            "disableCategory": "disable category",
            "enableCookie": "enable cookie",
            "disableCookie": "disable cookie",
            "awaysEnabled": "always enable",
            "cookie": "cookie",
            "expiry": "expriry",
            "domain": "domain",
            "company": "company",
            "purpose": "purpose",
            "description": "description",
            "acceptButton": "accept",
            "optInButton": "see policy",
            "optOutButton": "define coookies",
            "notes": "notes"
          },
          "intro": {
            "observation": "observation",
            "title": "title",
            "update": "01/01/0001",
            "foreword": "foreword"
          },
          "all": {
            "alert": "global message"
          },
          "categories": [{
            "id": "1",
            "name": "category-1",
            "optIn": true,
            "description": "description"
          },
          {
            "id": "2",
            "name": "category-2",
            "alert": "category message",
            "description": "description"
          }],
          "cookies": [{
            "id": "1",
            "categoryId": "1",
            "name": "cookie-1",
            "expiry": "001 day",
            "domain": "domain",
            "company": "company",
            "purpose": "purpose",
            "description": "description"
          },
          {
            "id": "2",
            "categoryId": "2",
            "name": "cookie-2",
            "expiry": "expiry",
            "domain": "domain",
            "company": "company",
            "purpose": "purpose",
            "description": "description"
          }],
          "notes": [{
            "question": "question",
            "answer": "answer"
          }],
          "links": [{
            "name": "name",
            "url": "url"
          }]
        }
      }`,
    },
    global: {
      stubs: {
        'br-cookiebar-actions-area': CookiebarActionsArea,
        'br-cookiebar-broad': CookiebarBroad,
        'br-cookiebar-category': CookiebarCategory,
        'br-cookiebar-complementary-area': CookiebarComplementaryArea,
        'br-cookiebar-cookie': CookiebarCookie,
        'br-cookiebar-foreword-area': CookiebarForewordArea,
        'br-cookiebar-global-area': CookiebarGlobalArea,
        'br-cookiebar-introduction-area': CookiebarIntroductionArea,
        'br-cookiebar-main-area': CookiebarMainArea,
        'br-cookiebar-notes': CookiebarNotes,
      },
    },
  })

  let content = null
  let lang = wrapper.props('lang')

  beforeAll(() => {
    content = JSON.parse(wrapper.props().content.replaceAll(`'`, `"`))
  })

  test('renderiza um elemento html com a classe br-cookiebar.', () => {
    const cookiebarClassList = wrapper.classes().toString()
    expect(cookiebarClassList).toContain('br-cookiebar')
  })

  test('contem a classe "default" quando a prop "open" possui o valor "false"', () => {
    expect(wrapper.classes()).toContain('default')
  })

  test('mostra o valor da propriedade intro.foreword do json de entrada', () => {
    const element = wrapper.find('.foreword')
    expect(element.text()).toContain(content[lang].intro.foreword)
  })

  test('mostra o valor da propriedade labels.optOutButton do json de entrada', () => {
    const element = wrapper.find('.actions button.secondary')
    expect(element.text()).toContain(content[lang].labels.optOutButton)
  })

  test('mostra o valor da propriedade labels.acceptButton do json de entrada', () => {
    const element = wrapper.find('.actions button.primary')
    expect(element.text()).toContain(content[lang].labels.acceptButton)
  })

  test('abre o cookiebar ao clicar no botão de definir cookies', async () => {
    const element = wrapper.find('.actions button.secondary')
    await element.trigger('click')
    expect(wrapper.classes).not.toContain('default')
  })

  wrapper.unmount()
})

describe('Cookiebar aberto', () => {
  const wrapper = mount(Cookiebar, {
    propsData: {
      open: true,
      lang: 'pt-br',
      content: `{
        "pt-br": {
          "labels": {
            "close": "fechar",
            "update": "atualizar",
            "categories": "categorias",
            "enableAll": "habilitar tudo",
            "disableAll": "desabilitar tudo",
            "enableCategory": "habilitar categoria",
            "disableCategory": "desabilitar categoria",
            "enableCookie": "habilitar cookie",
            "disableCookie": "desabilitar cookie",
            "awaysEnabled": "sempre habilitado",
            "cookie": "cookie",
            "expiry": "vencimento",
            "domain": "domínio",
            "company": "empresa",
            "purpose": "finalidade",
            "description": "descrição",
            "acceptButton": "aceitar",
            "optInButton": "ver políticas",
            "optOutButton": "definir cookies",
            "notes": "avisos"
          },
          "intro": {
            "observation": "observação",
            "title": "título",
            "update": "01/01/0001",
            "foreword": "prefácio"
          },
          "all": {
            "alert": "mensagem global"
          },
          "categories": [{
            "id": "1",
            "name": "categoria-1",
            "description": "descrição"
          }],
          "cookies": [{
            "id": "1",
            "categoryId": "1",
            "name": "cookie-1",
            "expiry": "001 dias",
            "domain": "domínio",
            "company": "compania",
            "purpose": "finalidade",
            "description": "descrição"
          }],
          "notes": [{
            "question": "pergunta",
            "answer": "resposta"
          }],
          "links": [{
            "name": "nome",
            "url": "url"
          }]
        }
      }`,
    },
    global: {
      stubs: {
        'br-cookiebar-actions-area': CookiebarActionsArea,
        'br-cookiebar-broad': CookiebarBroad,
        'br-cookiebar-category': CookiebarCategory,
        'br-cookiebar-complementary-area': CookiebarComplementaryArea,
        'br-cookiebar-cookie': CookiebarCookie,
        'br-cookiebar-foreword-area': CookiebarForewordArea,
        'br-cookiebar-global-area': CookiebarGlobalArea,
        'br-cookiebar-introduction-area': CookiebarIntroductionArea,
        'br-cookiebar-main-area': CookiebarMainArea,
        'br-cookiebar-notes': CookiebarNotes,
      },
    },
  })

  let content = null
  let lang = wrapper.props('lang')

  beforeAll(() => {
    content = JSON.parse(wrapper.props().content.replaceAll(`'`, `"`))
  })

  test('não contém a classe "default" quando a prop open possui o valor true', () => {
    expect(wrapper.classes()).not.toContain('default')
  })

  test('mostra o valor da propriedade intro.title do json de entrada', () => {
    const element = wrapper.find('.main-title')
    expect(element.text()).toContain(content[lang].intro.title)
  })

  test('mostra o valor da propriedade labels.update do json de entrada', () => {
    const element = wrapper.find('.update')
    expect(element.text()).toContain(content[lang].labels.update)
  })

  test('mostra o valor da propriedade intro.observation do json de entrada', () => {
    const element = wrapper.find('.introduction p:last-child')
    expect(element.text()).toContain(content[lang].intro.observation)
  })

  test('mostra o valor da propriedade labels.categories do json de entrada', () => {
    const element = wrapper.find('.categories-list-title')
    expect(element.text()).toContain(content[lang].labels.categories)
  })

  test('mostra o valor da propriedade categories.name do json de entrada', () => {
    const element = wrapper.find('.category-title')
    expect(element.text()).toContain(content[lang].categories[0].name)
  })

  test('mostra o valor da propriedade categories.description do json de entrada', () => {
    const element = wrapper.find('.content .flex-fill p:last-child')
    expect(element.text()).toContain(content[lang].categories[0].description)
  })

  test('mostra o valor da propriedade labels.notes do json de entrada', () => {
    const element = wrapper.find('.notes-title .category-title')
    expect(element.text()).toContain(content[lang].labels.notes)
  })

  test('mostra o valor da propriedade links.name do json de entrada', () => {
    const element = wrapper.find('.complementary .br-item span a')
    expect(element.text()).toContain(content[lang].links[0].name)
  })

  test('mostra o valor da propriedade links.url do json de entrada', () => {
    const element = wrapper.find('.complementary .br-item span a')
    expect(element.html()).toContain(content[lang].links[0].url)
  })

  test('renderiza o card de cookie ao abrir a categoria', async () => {
    const elementTrigger = wrapper.find('.category [data-toggle="collapse"]')
    await elementTrigger.trigger('click')
    expect(wrapper.text()).toContain('cookie')
    await elementTrigger.trigger('click')
  })

  test('mostra o valor da propriedade labels.cookie do json de entrada', async () => {
    const elementTrigger = wrapper.find('.category [data-toggle="collapse"]')
    await elementTrigger.trigger('click')
    const element = wrapper.find('.cookie .row:nth-child(1) div:nth-child(1) span')
    expect(element.text()).toContain(content[lang].labels.cookie)
    await elementTrigger.trigger('click')
  })

  test('mostra o valor da propriedade cookies.name do json de entrada', async () => {
    const elementTrigger = wrapper.find('.category [data-toggle="collapse"]')
    await elementTrigger.trigger('click')
    const element = wrapper.find('.cookie .row:nth-child(1) div:nth-child(2) span')
    expect(element.text()).toContain(content[lang].cookies[0].name)
    await elementTrigger.trigger('click')
  })

  test('mostra o valor da propriedade labels.expiry do json de entrada', async () => {
    const elementTrigger = wrapper.find('.category [data-toggle="collapse"]')
    await elementTrigger.trigger('click')
    const element = wrapper.find('.cookie .row:nth-child(2) div:nth-child(1) span')
    expect(element.text()).toContain(content[lang].labels.expiry)
    await elementTrigger.trigger('click')
  })

  test('mostra o valor da propriedade cookies.expiry do json de entrada', async () => {
    const elementTrigger = wrapper.find('.category [data-toggle="collapse"]')
    await elementTrigger.trigger('click')
    const element = wrapper.find('.cookie .row:nth-child(2) div:nth-child(2) span')
    expect(element.text()).toContain(content[lang].cookies[0].expiry)
    await elementTrigger.trigger('click')
  })

  test('mostra o valor da propriedade labels.domain do json de entrada', async () => {
    const elementTrigger = wrapper.find('.category [data-toggle="collapse"]')
    await elementTrigger.trigger('click')
    const element = wrapper.find('.cookie .row:nth-child(3) div:nth-child(1) span')
    expect(element.text()).toContain(content[lang].labels.domain)
    await elementTrigger.trigger('click')
  })

  test('mostra o valor da propriedade cookies.domain do json de entrada', async () => {
    const elementTrigger = wrapper.find('.category [data-toggle="collapse"]')
    await elementTrigger.trigger('click')
    const element = wrapper.find('.cookie .row:nth-child(3) div:nth-child(2) span')
    expect(element.text()).toContain(content[lang].cookies[0].domain)
    await elementTrigger.trigger('click')
  })

  test('mostra o valor da propriedade labels.company do json de entrada', async () => {
    const elementTrigger = wrapper.find('.category [data-toggle="collapse"]')
    await elementTrigger.trigger('click')
    const element = wrapper.find('.cookie .row:nth-child(4) div:nth-child(1) span')
    expect(element.text()).toContain(content[lang].labels.company)
    await elementTrigger.trigger('click')
  })

  test('mostra o valor da propriedade cookies.company do json de entrada', async () => {
    const elementTrigger = wrapper.find('.category [data-toggle="collapse"]')
    await elementTrigger.trigger('click')
    const element = wrapper.find('.cookie .row:nth-child(4) div:nth-child(2) span')
    expect(element.text()).toContain(content[lang].cookies[0].company)
    await elementTrigger.trigger('click')
  })

  test('mostra o valor da propriedade labels.purpose do json de entrada', async () => {
    const elementTrigger = wrapper.find('.category [data-toggle="collapse"]')
    await elementTrigger.trigger('click')
    const element = wrapper.find('.cookie .row:nth-child(5) div:nth-child(1) span')
    expect(element.text()).toContain(content[lang].labels.purpose)
    await elementTrigger.trigger('click')
  })

  test('mostra o valor da propriedade cookies.purpose do json de entrada', async () => {
    const elementTrigger = wrapper.find('.category [data-toggle="collapse"]')
    await elementTrigger.trigger('click')
    const element = wrapper.find('.cookie .row:nth-child(5) div:nth-child(2) span')
    expect(element.text()).toContain(content[lang].cookies[0].purpose)
    await elementTrigger.trigger('click')
  })

  test('mostra o valor da propriedade labels.description do json de entrada', async () => {
    const elementTrigger = wrapper.find('.category [data-toggle="collapse"]')
    await elementTrigger.trigger('click')
    const element = wrapper.find('.cookie .row:nth-child(6) div:nth-child(1) span')
    expect(element.text()).toContain(content[lang].labels.description)
    await elementTrigger.trigger('click')
  })

  test('mostra o valor da propriedade cookies.description do json de entrada', async () => {
    const elementTrigger = wrapper.find('.category [data-toggle="collapse"]')
    await elementTrigger.trigger('click')
    const element = wrapper.find('.cookie .row:nth-child(6) div:nth-child(2) span')
    expect(element.text()).toContain(content[lang].cookies[0].description)
    await elementTrigger.trigger('click')
  })

  test('mostra o valor da propriedade notes.question do json de entrada', async () => {
    const elementTrigger = wrapper.find('.notes [data-toggle="collapse"]')
    await elementTrigger.trigger('click')
    const element = wrapper.find('.notes span .br-list .br-item.open span p:first-child')
    expect(element.text()).toContain(content[lang].notes[0].question)
    await elementTrigger.trigger('click')
  })

  test('mostra o valor da propriedade notes.answer do json de entrada', async () => {
    const elementTrigger = wrapper.find('.notes [data-toggle="collapse"]')
    await elementTrigger.trigger('click')
    const element = wrapper.find('.notes span .br-list .br-item.open span p:last-child')
    expect(element.text()).toContain(content[lang].notes[0].answer)
    await elementTrigger.trigger('click')
  })
})
