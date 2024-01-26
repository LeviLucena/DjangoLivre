import { createStore } from 'vuex'

const store = createStore({
  state: {
    open: null,
    lang: null,
    labels: null,
    intro: null,
    all: null,
    categories: null,
    cookies: null,
    notes: null,
    links: null,
  },

  getters: {
    isOpen(state) {
      return state.open
    },
    lang(state) {
      return state.lang
    },
    labels(state) {
      return state.labels
    },
    intro(state) {
      return state.intro
    },
    all(state) {
      return state.all
    },
    categories(state) {
      return state.categories
    },
    cookies(state) {
      return state.cookies
    },
    notes(state) {
      return state.notes
    },
    links(state) {
      return state.links
    },
    relatedCookies(state) {
      return (id) => {
        return state.cookies
          .filter((cookie) => {
            return cookie.categoryId === id
          })
          .map((cookie) => {
            return { id: cookie.id }
          })
      }
    },
    cookiesByCategory(state) {
      return (id) => {
        const cookies = state.cookies.filter((cookie) => {
          return cookie.categoryId === id
        })
        return cookies
      }
    },
    numberOfCookiesEnabled(state) {
      return (categoryId) => {
        let count = 0
        state.cookies.forEach((cookie) => {
          if (cookie.categoryId === categoryId && cookie.enable === true) {
            count++
          }
        })
        return count
      }
    },
    numberOfCookiesDisabled(state) {
      return (categoryId) => {
        let count = 0
        state.cookies.forEach((cookie) => {
          if (cookie.categoryId === categoryId && cookie.enable === false) {
            count++
          }
        })
        return count
      }
    },
    cookie(state) {
      return (categoryId, cookieId) => {
        return state.cookies.filter((cookie) => {
          return cookie.categoryId === categoryId && cookie.id === cookieId
        })[0]
      }
    },
    isCategoryOptIn(state) {
      return (categoryId) => {
        return state.categories.filter((category) => category.id === categoryId)[0]?.optIn
      }
    },
    isCookieOptIn(state) {
      return (categoryId, cookieId) => {
        return state.cookies.filter((cookie) => cookie.categoryId === categoryId && cookie.id === cookieId)[0]?.optIn
      }
    },
    report(state, getters) {
      const report = []
      state.categories.forEach((category) => {
        const cookies = {}
        getters.cookiesByCategory(category.id).forEach((cookie) => {
          cookies[cookie.id] = Number(cookie.enable)
        })
        report.push({
          [category.id]: cookies,
        })
      })

      return report
    },
  },

  mutations: {
    setOpen(state, isOpen) {
      state.open = isOpen
    },
    setLang(state, lang) {
      state.lang = lang
    },
    setLabels(state, labels) {
      state.labels = labels
    },
    setIntro(state, intro) {
      state.intro = intro
    },
    setAll(state, all) {
      state.all = all
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setCookies(state, cookies) {
      state.cookies = cookies
    },
    setNotes(state, notes) {
      state.notes = notes
    },
    setLinks(state, links) {
      state.links = links
    },
    setAllEnable(state, isEnable) {
      state.all.enable = isEnable
    },
    setAllIndeterminate(state, isIndeterminate) {
      state.all.indeterminate = isIndeterminate
      if (isIndeterminate) {
        state.all.anable = true
      }
    },
    setCategoryEnable(state, payload) {
      const categories = state.categories
      categories.forEach((category) => {
        if (category.id === payload.id) {
          category.enable = payload.enable
        }
      })
      state.categories = categories
    },
    setCategoryIndeterminate(state, payload) {
      const categories = state.categories
      categories.forEach((category) => {
        if (category.id === payload.id) {
          category.indeterminate = payload.indeterminate
          if (payload.indeterminate) {
            category.enable = true
          }
        }
      })
      state.categories = categories
    },
    setCookieEnable(state, payload) {
      const cookies = state.cookies
      cookies.forEach((cookie) => {
        if (cookie.categoryId === payload.categoryId && cookie.id === payload.cookieId) {
          cookie.enable = payload.enable
        }
      })
      state.cookies = cookies
    },
  },

  actions: {
    isOpen(context, isOpen) {
      context.commit('setOpen', isOpen)
    },
    setLang(context, lang) {
      context.commit('setLang', lang)
    },
    setLabels(context, labels) {
      context.commit('setLabels', labels)
    },
    setIntro(context, intro) {
      context.commit('setIntro', intro)
    },
    setAll(context, all) {
      context.commit('setAll', {
        alert: all?.alert || null,
        optIn: all?.optIn || false,
        enable: all?.optIn || all?.enable || false,
      })
    },
    setCategories(context, categories) {
      categories.forEach((category) => {
        ;(category.alert = category?.alert || null),
          (category.optIn = context.getters.all.optIn || category?.optIn || false),
          (category.enable = context.getters.all?.enable || category?.optIn || category?.enable || false)
      })
      context.commit('setCategories', categories)
    },
    setCookies(context, cookies) {
      cookies.forEach((cookie) => {
        ;(cookie.alert = cookie?.alert || null),
          (cookie.optIn =
            context.getters.categories.filter((category) => category.id === cookie.catetoryId)[0]?.optIn ||
            cookie.optIn ||
            false),
          (cookie.enable = cookie.optIn
            ? context.getters.categories.filter((category) => category.id === cookie.categoryId)[0]?.enable
            : cookie?.enable || false)
      })
      context.commit('setCookies', cookies)
      context.dispatch('setCategoriesInitialIndeterminate')
      context.dispatch('setAllInitialIndeterminate')
    },
    setNotes(context, notes) {
      context.commit('setNotes', notes)
    },
    setLinks(context, links) {
      context.commit('setLinks', links)
    },
    setAllEnable(context, isEnable) {
      context.commit('setAllEnable', isEnable)
    },
    setAllInitialIndeterminate(context) {
      let indeterminate = false
      context.getters.categories.forEach((category) => {
        if (category.indeterminate) {
          indeterminate = true
        }
      })
      if (indeterminate) {
        context.dispatch('setAllIndeterminate', true)
      } else if (
        context.getters.categories.filter((category) => category.enable === true).length ===
          context.getters.categories.length ||
        context.getters.categories.filter((category) => category.enable === false).length ===
          context.getters.categories.length
      ) {
        context.dispatch('setAllIndeterminate', false)
      } else {
        context.dispatch('setAllIndeterminate', true)
      }
    },
    setAllIndeterminate(context, isIndeterminate) {
      context.commit('setAllIndeterminate', isIndeterminate)
    },
    setCategoryEnable(context, payload) {
      context.commit('setCategoryEnable', payload)
    },
    setCategoriesInitialIndeterminate(context) {
      context.getters.categories.forEach((category) => {
        if (
          context.getters.numberOfCookiesEnabled(category.id) ===
            context.getters.cookiesByCategory(category.id).length ||
          context.getters.numberOfCookiesDisabled(category.id) === context.getters.cookiesByCategory(category.id).length
        ) {
          context.dispatch('setCategoryIndeterminate', {
            id: category.id,
            indeterminate: false,
          })
        } else {
          context.dispatch('setCategoryIndeterminate', {
            id: category.id,
            indeterminate: true,
          })
        }
      })
    },
    setCategoryIndeterminate(context, payload) {
      context.commit('setCategoryIndeterminate', payload)
    },
    setCookieEnable(context, payload) {
      context.commit('setCookieEnable', payload)
    },
    rejectAll(context) {
      context.commit('setAllEnable', false)
      context.getters.categories.forEach((category) => {
        if (!category.optIn) {
          context.commit('setCategoryEnable', {
            id: category.id,
            enable: false,
          })
          context.getters.cookies.forEach((cookie) => {
            if (cookie.categoryId === category.id) {
              context.commit('setCookieEnable', {
                categoryId: category.id,
                cookieId: cookie.id,
                enable: false,
              })
            }
          })
        }
      })
    },
  },
})

export default store
