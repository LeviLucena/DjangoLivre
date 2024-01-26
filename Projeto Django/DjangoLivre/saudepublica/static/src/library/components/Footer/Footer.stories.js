import { customEventStorybookArgType, kebabiseArgs } from '../../util/Utils.js'
import BrFooter from './Footer.ce.vue'

const commonArgs = {
  text: `Todo o conteúdo deste site está publicado sob a licença Creative Commons`,
  inverted: false,
  spaceBetweenCategories: false,
  logo: `{
  url: 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-negative.png',
  description: 'Acesso à informação'
}`,
  categories: `[
  {
    'title': 'Categoria',
    'items': [
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'},
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'}
    ]
  },
  {
    'title': 'Categoria',
    'items': [
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'},
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'}
    ]
  },
  {
    'title': 'Categoria',
    'items': [
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'},
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'}
    ]
  },
  {
    'title': 'Categoria',
    'items': [
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'},
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'}
    ]
  },
  {
    'title': 'Categoria',
    'items': [
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'},
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'}
    ]
  },
  {
    'title': 'Categoria',
    'items': [
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'},
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'}
    ]
  }
]`,
  social: `{
  label: 'Redes Sociais',
  networks: [
    {
      'icon': 'facebook-f',
      'iconFamily': 'fab',
      'description': 'Facebook'
    },
    {
      'icon': 'twitter',
      'iconFamily': 'fab',
      'description': 'Twitter'
    },
    {
      'href': '#',
      'image': 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/button-negative.png',
      'description': 'Rede social'
    },
    {
      'href': '#',
      'image': 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/button-negative.png',
      'description': 'Rede social'
    }
  ]
}`,
  partners: `[
  {
    'href': '#',
    'image': 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-assign-negative.png',
    'description': 'Parceiro'
  },
  {
    'href': '#',
    'image': 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-assign-negative.png',
    'description': 'Parceiro'
  }
]`,
}

const argsWithTooltip = {
  text: `Todo o conteúdo deste site está publicado sob a licença Creative Commons`,
  inverted: false,
  spaceBetweenCategories: false,
  logo: `{
  url: 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-negative.png',
  description: 'Acesso à informação',
  'tooltipText': 'Lorem ipsum dolor sit amet.'
}`,
  categories: `[
  {
    'title': 'Categoria',
    'items': [
      {'title': 'Texto de uma linha', 'href': '#', 'tooltipText': 'Lorem ipsum dolor sit amet.'},
      {'title': 'Texto com quebra de linha', 'href': '#'},
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'}
    ]
  },
  {
    'title': 'Categoria',
    'items': [
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'},
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'}
    ]
  },
  {
    'title': 'Categoria',
    'items': [
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'},
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'}
    ]
  },
  {
    'title': 'Categoria',
    'items': [
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'},
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'}
    ]
  },
  {
    'title': 'Categoria',
    'items': [
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'},
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'}
    ]
  },
  {
    'title': 'Categoria',
    'items': [
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'},
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'}
    ]
  }
]`,
  social: `{
  label: 'Redes Sociais',
  networks: [
    {
      'href': '#',
      'image': 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/button-negative.png',
      'description': 'Rede social',
      'tooltipText': 'Lorem ipsum dolor sit amet.'
    },
    {
      'href': '#',
      'image': 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/button-negative.png',
      'description': 'Rede social'
    }
  ]
}`,
  partners: `[
  {
    'href': '#',
    'image': 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-assign-negative.png',
    'description': 'Parceiro',
    'tooltipText': 'Lorem ipsum dolor sit amet.'
  },
  {
    'href': '#',
    'image': 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-assign-negative.png',
    'description': 'Parceiro'
  }
]`,
}

export default {
  title: 'Componentes/Footer',
  component: BrFooter,
  parameters: {
    controls: {
      exclude: ['tooltipPlace', 'tooltipText', 'tooltipTimer', 'tooltipType'],
    },
  },
  argTypes: {
    logo: {
      control: 'text',
    },
    social: {
      control: 'text',
    },
    partners: {
      control: 'text',
    },
    inverted: {
      control: 'boolean',
    },
    spaceBetweenCategories: {
      control: 'boolean',
    },
    text: {
      control: 'text',
    },
    categories: {
      control: 'text',
    },
    'valor da chave "clickEventName"': {
      ...customEventStorybookArgType,
    },
  },
}

const TemplateCompleto = (args) => {
  return {
    props: Object.keys(args),
    setup() {
      if (args.inverted) {
        if (args?.logo?.includes('negative.png')) {
          args.logo = args.logo.replaceAll('negative.png', 'positive.png')
        }
        if (args?.social?.includes('negative.png')) {
          args.social = args.social.replaceAll('negative.png', 'positive.png')
        }
        if (args?.partners?.includes('negative.png')) {
          args.partners = args.partners.replaceAll('negative.png', 'positive.png')
        }
      } else {
        if (args?.logo?.includes('positive.png')) {
          args.logo = args.logo.replaceAll('positive.png', 'negative.png')
        }
        if (args?.social?.includes('positive.png')) {
          args.social = args.social.replaceAll('positive.png', 'negative.png')
        }
        if (args?.partners?.includes('positive.png')) {
          args.partners = args.partners.replaceAll('positive.png', 'negative.png')
        }
      }

      return { args: kebabiseArgs(args) }
    },
    template: `<br-footer v-bind="args"></br-footer>`,
  }
}

export const Tema1 = TemplateCompleto.bind({})
Tema1.args = {
  ...commonArgs,
}

export const Tema2 = TemplateCompleto.bind({})
Tema2.args = {
  ...commonArgs,
  logo: `{
    url: 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-positive.png',
    description: 'Acesso à informação'
  }`,
  social: `{
    label: 'Redes Sociais',
    networks: [
      {
        'href': '#',
        'image': 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/button-positive.png',
        'description': 'Rede social'
      },
      {
        'href': '#',
        'image': 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/button-positive.png',
        'description': 'Rede social'
      },
      {
        'href': '#',
        'image': 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/button-positive.png',
        'description': 'Rede social'
      },
      {
        'href': '#',
        'image': 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/button-positive.png',
        'description': 'Rede social'
      }
    ]
  }`,
  partners: `[
    {
      'href': '#',
      'image': 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-assign-positive.png',
      'description': 'Parceiro'
    },
    {
      'href': '#',
      'image': 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-assign-positive.png',
      'description': 'Parceiro'
    }
  ]`,
  inverted: true,
}

export const EspacoEntreCategorias = TemplateCompleto.bind({})
EspacoEntreCategorias.storyName = 'Espaço entre Categorias'
EspacoEntreCategorias.args = {
  ...commonArgs,
  categories: `[
  {
    'title': 'Categoria',
    'items': [
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'},
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'}
    ]
  },
  {
    'title': 'Categoria',
    'items': [
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'},
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'}
    ]
  },
  {
    'title': 'Categoria',
    'items': [
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'},
      {'title': 'Texto de uma linha', 'href': '#'},
      {'title': 'Texto com quebra de linha', 'href': '#'}
    ]
  }
]`,
  spaceBetweenCategories: true,
}

export const ComTooltip = TemplateCompleto.bind({})
ComTooltip.args = {
  ...argsWithTooltip,
}
