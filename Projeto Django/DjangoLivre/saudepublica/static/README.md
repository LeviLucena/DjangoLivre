# Web Components GovBR-DS

Nosso objetivo é disponibilizar uma biblioteca de componentes baseada no [GovBR-DS](https://gov.br/ds 'GovBR-DS') que possa ser consumida independente de frameworks ou tecnologias utilizadas nos projetos.

## Demonstração

Acesse nossos sites e veja nossos componentes em ação:

- [Storybook - Produção](https://gov.br/ds/webcomponents/)
- [Storybook - Desenvolvimento](https://gitlab.com/govbr-ds/bibliotecas/wc/govbr-ds-wc/)

## Tecnologias

Esse projeto é desenvolvido usando:

1. [GovBR-DS](https://gov.br/ds/ 'GovBR-DS')
2. [Font Awesome](https://fontawesome.com/ 'Font Awesome')
3. [Fonte Rawline](https://www.cdnfonts.com/rawline.font/ 'Fonte Rawline')
4. [VueJS 3](https://v3.vuejs.org/ 'VueJS 3')
5. [Storybook](https://storybook.js.org/ 'Storybook')
6. [Jest](https://jestjs.io/ 'Jest')

> Para saber mais detalhes sobre Web Components sugerimos que consulte o [MDN](https://developer.mozilla.org/pt-BR/docs/Web/Web_Components 'Web Components | MDN').

## Documentações Complementares

Consulte nossa a seção sobre Web Componente na nossa [Wiki](https://govbr-ds.gitlab.io/tools/wiki/desenvolvimento/web-components) para obter mais informações.

## Uso

Existem 2 maneiras de usar nossos Web Components:

- Pacote NPM

```bash
npm install --save @govbr-ds/webcomponents
```

Depois de instalada, importe a biblioteca de dentro da pasta *node_modules*:

```javascript
@import "node_modules/@govbr-ds/webcomponents/dist/webcomponents.umd.min.js"
```

- CDN

```html
<script src="https://unpkg.com/@govbr-ds/webcomponents@VERSÃO/dist/webcomponents.umd.min.js"></script>
```

> Troque **versão** pela versão do pacote que deseja

**Importante**: O CDN <https://unpkg.com/> não é mantido por nossa equipe e portanto não podemos garantir um SLO. Considere importar os arquivos necessários para uma infraestrutura interna caso isso seja um impedimento para seu projeto.

### Font Awesome e Fonte Rawline

Nossos componentes usam a [Fonte Rawline](https://www.cdnfonts.com/rawline.font/ 'Fonte Rawline') juntamente com a [Font Awesome](https://fontawesome.com/ 'Font Awesome') padrão do DS.

Consulte a documentação no site do [GovBR-DS](https://www.gov.br/ds/como-comecar/instalacao 'GovBR-DS') para mais detalhes sobre como importá-los de seus respectivos CDNs.

### Exemplos de uso

Disponibilizamos alguns exemplos de como usar esse projeto com algumas tecnologias. Consulte o [nosso grupo aqui no gitlab](https://gitlab.com/govbr-ds/bibliotecas/wc/govbr-ds-wc 'GovBR-DS/WC') e procure pelos projetos de 'Quickstart' para mais detalhes.

## Estrutura de pastas

> Vamos explicar apenas as pastas/arquivos que são importantes para o entendimento do projeto e contribuição.

```markdown
/raiz
└───src
│───assets
│───library
│ │───lib.js
│ │───components
│ │───mixins
│ └───util
└───stories
```

- **src**
  - **assets**: pasta com arquivos estáticos
  - **library**
    - **lib.js**: inicializa todos os custom elements e define o que faz parte da biblioteca. É usado para fazer o build final.
    - **components**: pasta com os componentes da biblioteca, seus testes e stories do storybook.
    - **mixins**: mixins que são usados em vários componentes.
    - **util**: funções criadas para facilitar ações dentro dos componentes
  - **stories**: Arquivos com as stories gerais do storybook

> Aplicação Vue é uma aplicação criada para testar rapidamente nossos componentes. Ela não é disponibilizada no build e nem disponibilizamos um site com ela.

## Rodar o projeto na máquina local

Clone o projeto:

```bash
git clone git@gitlab.com:govbr-ds/bibliotecas/wc/govbr-ds-wc.git

cd govbr-ds-wc

npm install

npm run storybook
```

## Documentação

Nossa documentação está disponível em <https://gov.br/ds/webcomponents/>.

> Para outras informações, consulte nossa [Wiki](https://gov.br/ds/wiki/desenvolvimento/web-components/).

## Polyfill

Acesse os seguintes links para entender mais sobre o suporte dos browsers a [Custom Elements](https://caniuse.com/custom-elementsv1) e a [Shadow Dom](https://caniuse.com/shadowdomv1).

Caso os requisitos do seu projeto incluam navegadores que não suportam completamente os Web Components, adicione os [polyfills](https://www.webcomponents.org/polyfills) ao seu projeto.

Para aprender com instalar, consulte a [documentação oficial](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs 'Polyfills')

## Contribuindo

Antes de abrir um Merge Request tenha em mente algumas informações:

- Esse é um projeto opensource e contribuições são bem-vindas.
- Para facilitar a aprovação da sua contribuição, escolha um título curto, simples e explicativo para o MR, e siga os padrões da nossa [wiki](https://gov.br/ds/wiki/ 'Wiki').
- Quer contribuir com o projeto? Confira o nosso guia [como contribuir](./CONTRIBUTING.md 'Como contribuir?').

### Reportar bugs/necessidades

Você pode usar as [issues](https://gitlab.com/govbr-ds/bibliotecas/wc/govbr-ds-wc/-/issues/new) para nos informar os problemas que tem enfrentado ao usar nossa biblioteca ou mesmo o que gostaria que fizesse parte do projeto. Por favor use o modelo que mais se encaixa na sua necessidade e preencha com o máximo de detalhes possível.

Nos comprometemos a responder a todas as issues.

## Commits

Nesse projeto usamos um padrão para branches e commits. Por favor observe a documentação na nossa [wiki](https://gov.br/ds/wiki/ 'Wiki') para aprender sobre os nossos padrões.

## Precisa de ajuda?

> Por favor **não** crie issues para fazer perguntas...

Use nossos canais abaixo para obter tirar suas dúvidas:

- Site do GovBR-DS <http://gov.br/ds>

- Web Components <https://gov.br/ds/webcomponents/>

- Usando nosso canal no discord <https://discord.gg/U5GwPfqhUP>

## Créditos

Os Web Components do [GovBR-DS](https://gov.br/ds/ 'GovBR-DS') são criados pelo [SERPRO](https://www.serpro.gov.br/ 'SERPRO | Serviço Federal de Processamento de Dados') e [Dataprev](https://www.dataprev.gov.br/ 'Dataprev | Empresa de Tecnologia e Informações da Previdência') juntamente com a participação da comunidade.

## Licença

Nesse projeto usamos a licença MIT.
