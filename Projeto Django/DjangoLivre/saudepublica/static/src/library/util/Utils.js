const kebabise = (string) => {
  const upper = /(?<!\p{Uppercase_Letter})\p{Uppercase_Letter}|\p{Uppercase_Letter}(?!\p{Uppercase_Letter})/gu
  return string.replace(upper, '-$&').replace(/^-/, '').toLowerCase()
}

const possibleSlots = [
  'default',
  'header',
  'headerAction',
  'headerMenu',
  'content',
  'body',
  'footer',
  'categorias',
  'redesSociais',
  'slotTemplate',
]

export const kebabiseArgs = (args) => {
  const argsKebabCase = {}
  Object.keys(args)
    .filter((key) => !possibleSlots.includes(key))
    .forEach((key) => {
      argsKebabCase[kebabise(key)] = typeof args[key] === 'boolean' && !args[key] ? null : args[key]
    })
  return argsKebabCase
}

export const templateSourceCode = (templateSource, args, argTypes, replacing = 'v-bind="args"') => {
  const componentArgs = {}
  for (const [k, t] of Object.entries(argTypes)) {
    const val = args[k]
    if (
      typeof val !== 'undefined' &&
      !(typeof val === 'boolean' && val === false) &&
      t.table &&
      t.table.category === 'props' &&
      val !== t.defaultValue
    ) {
      componentArgs[k] = val
    }
  }

  const propToSource = (key, val) => {
    const type = typeof val
    switch (type) {
      case 'boolean':
        return val ? kebabise(key) : ''
      default:
        return `${kebabise(key)}="${val}"`
    }
  }

  const propsAndValuesArray = Object.keys(componentArgs)
    .filter((key) => !possibleSlots.includes(key))
    .map((key) => propToSource(key, args[key]))

  return templateSource.replaceAll(
    propsAndValuesArray.length ? replacing : ' ' + replacing,
    propsAndValuesArray.join(' ')
  )
}

export const parsePropStringToJSON = (prop, fallback = []) => {
  try {
    if (typeof prop === 'string') {
      // Tratando a prop passando um string em formato JSON
      return JSON.parse(
        prop.replaceAll(/(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9]+)(['"])?:/g, "$1'$3':").replaceAll("'", '"')
      )
    } else if (typeof prop === 'object') {
      /*
        A prop pode ser passada como um objeto através de property (não como atributo).
        Referência: https://open-wc.org/guides/knowledge/attributes-and-properties/
      */
      return prop
    }
    // Caso a prop seja undefined, retorna-se o fallback
    return fallback
  } catch {
    // Caso o JSON tenha um formato incorreto, JSON.parse lançará exceção e retorna-se o fallback
    return fallback
  }
}

export const customEventStorybookArgType = {
  table: {
    type: {
      summary: 'CustomEvent',
    },
  },
  control: {
    type: null,
  },
}
/**
 * Classe que controla um event-bus
 */
export class EventBus {
  /**
   * O event-bus é um elemento HTML que recebe os eventos customizados e serve como ponte na comunicação entre componentes
   * Esse elemento HTML não é renderizado. Ele existe apenas no JavaScript.
   */
  constructor() {
    this.bus = document.createElement('div')
  }
  /**
   * Registra um evento customizado
   * @param {String} event Nome do evento
   * @param {Function} callback Função de callback
   */
  register(event, callback) {
    this.bus.addEventListener(event, callback)
  }
  /**
   * Remove um evento customizado
   * @param {String} event Nome do evento
   * @param {Function} callback Função de callback
   */
  remove(event, callback) {
    this.bus.removeEventListener(event, callback)
  }
  /**
   * Dispara o evento customizado
   * @param {String} event Nome do evento
   * @param {Any} detail Conteúdo (payload) passado no disparo do evento
   */
  fire(event, detail = {}) {
    this.bus.dispatchEvent(new CustomEvent(event, { detail }))
  }
}
