<template>
  <header ref="header" class="br-header mb-4" :class="checkClass">
    <div :class="containerFluid ? 'container-fluid' : 'container-lg'">
      <div class="header-top">
        <div class="header-logo">
          <img v-if="image" :src="image" alt="logo" :class="checkImageSize" />
          <BrDivider v-if="signature && image && !isMobile && !compact" vertical class="mx-half mx-sm-1" />
          <div v-if="signature" class="header-sign">
            {{ signature }}
          </div>
        </div>
        <slot name="headerAction"></slot>
      </div>
      <div class="header-bottom">
        <div class="header-menu">
          <div v-if="hasMenu" class="header-menu-trigger">
            <slot name="headerMenu">
              <BrButton
                id="navigation"
                circle
                density="small"
                aria-label="Menu"
                data-toggle="menu"
                data-target="#main-navigation"
              >
                <IconBase icon-name="bars"></IconBase>
              </BrButton>
            </slot>
          </div>
          <div class="header-info">
            <div v-if="title" class="header-title">
              <a v-if="hasTitleLink" :href="titleLinkUrl ?? '#'" @click="handleTitleLinkClick">
                {{ title }}
              </a>
              <template v-else>{{ title }}</template>
            </div>
            <div v-if="subtitle && showSubtitle" class="header-subtitle">
              {{ subtitle }}
            </div>
          </div>
        </div>
        <div v-if="hasSearch" class="header-search" :class="{ active: isActive || (isActive && compact) }">
          <BrHeaderSearch
            :id="id"
            :label="labelSearch"
            :placeholder="placeholderSearch"
            :action="actionSearch"
            :name-input="nameInputSearch"
            :value-input="valueInputSearchModel"
            @search-input="handleSearchInput"
            @search-submit="handleSearchSubmit"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import TooltipMixin from "../../mixins/TooltipMixin"
import BrButton from "../Button/Button.ce.vue"
import BrDivider from "../Divider/Divider.ce.vue"
import IconBase from "../IconBase/IconBase.ce.vue"
import BrHeaderSearch from "./HeaderSearch.ce.vue"

const Header = {
  name: "brHeader",
  components: {
    BrButton,
    BrHeaderSearch,
    BrDivider,
    IconBase,
  },
  mixins: [TooltipMixin],
  provide() {
    return {
      provideAction: this,
    }
  },
  props: {
    /**
     * O tipo Compacto é mais utilizado quando as informações a serem exibidas forem mais
     * sucintas ou seja necessário dar mais espaço visível à área de conteúdo.
     */
    compact: {
      default: false,
      type: [Boolean],
    },
    /**
     * A assinatura serve para identificar uma subcategoria ou descrição relacionada à marca.
     * Descreve uma categoria superior ao título do cabeçalho. Fica localizada ao lado da logo/marca.
     */
    signature: {
      default: null,
      type: String,
    },
    /**
     * *Aponta para o endereço do arquivo de imagem.
     */
    image: {
      default: null,
      type: String,
    },
    /**
     * Especifica o tamanho da imagem. Padrão é o 'large'.
     * Em Headers do tipo Compacto e em comportamentos de Sticky Headers, o padrão é o 'small'.
     */
    imageSize: {
      type: String,
      default: "large",
      validator: function (value) {
        return ["large", "medium", "small"].includes(value)
      },
    },
    /**
     * Especifica a densidade do cabeçalho. Padrão é o 'large'.
     *
     * No tipo 'Compacto' e 'Sticky', o padrão é o 'small'.
     */
    density: {
      default: null,
      type: String,
      validator: function (value) {
        return ["large", "medium", "small"].includes(value)
      },
    },
    /**
     * **[OBRIGATÓRIO]** Título que identifica o site, sistema ou aplicativo. Em alguns dispositivos (como celulares),
     * o título pode identificar a página atual. É possível utilizar um texto ou outro elemento para substituí-lo.
     */
    title: {
      default: null,
      type: String,
      validator: function (value) {
        return value.length > 0
      },
    },
    /**
     * Indica que o título possuirá um link, cujo comportamento pode ser o redirecionamento
     * para uma URL passada pela prop *title-link-url* ou o tratamento do evento *title-link-click*.
     */
    hasTitleLink: {
      default: false,
      type: [Boolean, String],
    },
    /**
     * URL do link opcional para o título.
     */
    titleLinkUrl: {
      type: String,
      default: null,
    },
    /**
     * Serve para reforçar a identificação de uma categoria associada ao título da
     * página, ou descrição do mesmo. Fica localizado logo abaixo do título principal do cabeçalho.
     */
    subtitle: {
      default: null,
      type: String,
      validator: function (value) {
        return value.length > 0
      },
    },
    /**
     * Mostra o ícone do menu ao lado do Title.
     */
    hasMenu: {
      default: false,
      type: [Boolean],
    },
    /**
     * Mostra o input de busca
     */
    hasSearch: {
      default: false,
      type: [Boolean],
    },
    /**
     * Label para o input de busca (screen reader only)
     */
    labelSearch: {
      type: [String, Number],
      validator: function (value) {
        return value.length > 0
      },
      default: "Texto da pesquisa",
    },
    /**
     * Atributo *action* para o formulário da busca.
     */
    actionSearch: {
      type: String,
      default: null,
    },
    /**
     * Atributo *name* do input de busca.
     */
    nameInputSearch: {
      type: String,
      default: null,
    },
    /**
     * Atributo *value* do input de busca.
     */
    valueInputSearch: {
      type: String,
      default: null,
    },
    /**
     * Placeholder para o input de busca
     */
    placeholderSearch: {
      type: String,
      validator: function (value) {
        return value.length > 0
      },
      default: "O que você procura?",
    },
    /**
     * Posiciona o conteúdo do componente br-header de maneira que ocupe todo o
     * espaço da margem.
     */
    containerFluid: {
      default: false,
      type: [Boolean],
    },
    /**
     * Deixa o header fixado no topo da tela ao rolar o conteudo da pagina.
     */
    isSticky: {
      default: false,
      type: [Boolean],
    },
  },
  emits: [
    /**
     * Evento emitido ao clicar no link do título do header caso a prop *has-title-link*
     * seja true e a prop *title-link-url* seja nula ou não definida.
     *
     * Exemplo de uso, considerando que `header` é uma referência ao elemento do br-header no DOM:
     *
     * ```
     * header.addEventListener('title-link-click', (e) => {
     *   alert('O título do header foi clicado')
     * })
     * ```
     *
     * Exemplo de uso, considerando que `header` é uma referência ao elemento do br-header no DOM:
     *
     * ```
     * header.addEventListener('title-link-click', (e) => {
     *   alert('O título do header foi clicado')
     * })
     * ```
     *
     * Referência sobre o consumo de eventos:
     * [Eventos Emitidos pelos Componentes](/?path=/story/eventos-emitidos-pelos-componentes--page)
     */
    "title-link-click",
    /**
     * Evento emitido ao digitar no campo de texto do formulário de busca do header,
     * que é renderizado com a prop *has-search*.
     *
     * Exemplo de uso, considerando que `header` é uma referência ao elemento do br-header no DOM:
     *
     * ```
     * header.addEventListener('search-input', (e) => {
     *   alert(`Texto digitado na busca: ${e.detail[0]}`)
     * })
     * ```
     *
     * Referência sobre o consumo de eventos:
     * [Eventos Emitidos pelos Componentes](/?path=/story/eventos-emitidos-pelos-componentes--page)
     */
    "search-input",
    /**
     * Evento emitido ao submeter o formulário de busca do header, que é
     * renderizado com a prop *has-search*, quando a prop *action-search* (que causa o
     * reload da página) é nula ou não definida.
     *
     * Exemplo de uso, considerando que `header` é uma referência ao elemento do br-header no DOM:
     *
     * ```
     * header.addEventListener('search-submit', (e) => {
     *   alert(`Texto submetido na busca: ${e.detail[0]}`)
     * })
     * ```
     *
     * Referência sobre o consumo de eventos:
     * [Eventos Emitidos pelos Componentes](/?path=/story/eventos-emitidos-pelos-componentes--page)
     */
    "search-submit",
  ],
  data() {
    return {
      isActive: false,
      showSubtitle: true,
      windowWidth: window.innerWidth,
      id: "searchbox" + this._.uid,
      valueInputSearchModel: this.valueInputSearch,
      hasCompact: false,
    }
  },
  computed: {
    checkClass() {
      return {
        large: this.density === "large",
        medium: this.density === "medium",
        small: this.density === "small",
        compact: this.compact,
      }
    },
    checkImageSize() {
      return {
        "large-img": this.imageSize === "large",
        "small-img": this.imageSize === "small",
        "medium-img": this.imageSize === "medium",
      }
    },
    isMobile() {
      return this.windowWidth < 576
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth
    })

    if (this.isSticky) {
      let header = this.$refs.header

      // Para monitorar a classe compact do sticky
      this.observer = new MutationObserver(this.onStickyChange)

      this.observer.observe(header, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ["class"],
      })

      window.onscroll = () => {
        if (window.scrollY > header.offsetTop) {
          this.$refs.header.setAttribute("data-sticky", true)
          header.classList.add("sticky", "compact")
        } else {
          this.$refs.header.removeAttribute("data-sticky")
          header.classList.remove("sticky", "compact")
        }
      }
    }
  },
  beforeDestroy() {
    this.observer.disconnect()
  },
  methods: {
    isSearch() {
      return this.hasSearch
    },
    isCompact() {
      return this.compact
    },
    isStickyCompact() {
      return this.isSticky && this.hasCompact && this.hasSearch
    },
    onStickyChange(mutations) {
      for (let mutation of mutations) {
        if (mutation.type === "attributes") {
          if (mutation.target.classList.contains("compact", "sticky")) {
            this.hasCompact = true
          } else {
            this.hasCompact = false
          }
        }
      }
    },
    handleTitleLinkClick(e) {
      if (this.titleLinkUrl) {
        e.preventDefault()
        this.$emit("title-link-click")
      }
    },
    handleSearchInput(e) {
      this.valueInputSearchModel = e
      this.$emit("search-input", e)
    },
    handleSearchSubmit(e) {
      this.$emit("search-submit", e)
    },
  },
}

export default Header
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/input/_input";
@import "~@govbr-ds/core/src/components/button/_button";
@import "~@govbr-ds/core/src/components/header/_header";
@import "~@govbr-ds/core/src/components/header/_mixins";
@import "~@govbr-ds/core/src/components/divider/_divider";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");

.large-img {
  height: var(--header-logo-large);
}

.medium-img {
  height: var(--header-logo-medium);
}

.small-img {
  height: var(--header-logo-small);
}

form {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.br-header[data-sticky] {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>
