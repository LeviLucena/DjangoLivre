<template>
  <div class="header-actions" :style="{ float: isCompact ? floatRight : null }">
    <div v-if="listLinks" class="header-links dropdown" :class="{ show: showLink }">
      <BrButton
        circle
        density="small"
        :class="{ active: showLink }"
        data-toggle="dropdown"
        :aria-label="titleLinks"
        @click="openLinks()"
      >
        <IconBase icon-name="ellipsis-v"></IconBase>
      </BrButton>
      <BrList :title="titleLinks" hide-title-divider>
        <BrItem
          v-for="item in menuLinks"
          v-bind="{ ...item }"
          :key="item.name"
          v-tooltip="{
            text: item.tooltipText,
            place: item.tooltipPlace,
            type: item.tooltipType,
            timer: item.tooltipTimer,
          }"
          hover
          @click="handleClick(item, $event)"
        >
          {{ item.name }}
        </BrItem>
      </BrList>
    </div>
    <BrDivider v-if="listLinks && listFunctions" vertical class="mx-half mx-sm-1"></BrDivider>
    <div v-if="listFunctions" class="header-functions dropdown" :class="{ show: showFunction }">
      <BrButton
        circle
        density="small"
        :class="{ active: showFunction }"
        data-toggle="dropdown"
        :aria-label="titleFunctions"
        @click="openFunctions()"
      >
        <IconBase icon-name="th"></IconBase>
      </BrButton>
      <BrList :title="titleFunctions" hide-title-divider>
        <BrItem
          v-for="item in menuIcons"
          :key="item.name"
          class="align-items-center"
          :href="item.url"
          :title="item.title"
          @click="handleClick(item, $event)"
        >
          <BrButton
            v-tooltip="{
              text: item.tooltipText,
              place: item.tooltipPlace,
              type: item.tooltipType,
              timer: item.tooltipTimer,
            }"
            circle
            density="small"
            :title="item.name"
          >
            <IconBase v-if="item.icon" :icon-name="item.icon" :family-name="item.iconFamily" />
            <span class="text"> {{ item.name }}</span>
          </BrButton>
        </BrItem>
      </BrList>
    </div>
    <div
      v-if="isSearch || (isCompact && isSearch) || isStickyCompact"
      class="header-search-trigger"
      :style="{ display: (isCompact && isSearch) || isStickyCompact ? displayBlock : null }"
    >
      <BrHeaderActionSearch @open-search="openInputSearch($event)"></BrHeaderActionSearch>
    </div>
    <div v-if="hasLogin" class="header-login">
      <div class="header-sign-in">
        <a v-if="linkLogin" :href="linkLogin" class="br-button sign-in" data-trigger="login">
          <IconBase icon-name="user"></IconBase>
          <span class="d-sm-inline">{{ labelLogin }}</span>
        </a>
        <BrButton v-else density="small" class="sign-in" data-trigger="login">
          <IconBase icon-name="user"></IconBase>
          <span class="d-sm-inline">{{ labelLogin }}</span>
        </BrButton>
      </div>
    </div>
  </div>
</template>
<script>
import TooltipMixin from "../../mixins/TooltipMixin"
import { parsePropStringToJSON } from "../../util/Utils.js"
import BrButton from "../Button/Button.ce.vue"
import BrDivider from "../Divider/Divider.ce.vue"
import IconBase from "../IconBase/IconBase.ce.vue"
import BrItem from "../Item/Item.ce.vue"
import BrList from "../List/List.ce.vue"
import BrHeaderActionSearch from "./HeaderActionSearch.ce.vue"

const HeaderAction = {
  name: "brHeaderAction",
  components: {
    BrHeaderActionSearch,
    BrButton,
    BrItem,
    BrList,
    BrDivider,
    IconBase,
  },
  mixins: [TooltipMixin],
  inject: {
    provideAction: { default: null },
  },
  props: {
    /**
     * Insere botão de login.
     */
    hasLogin: {
      default: false,
      type: [Boolean, String],
    },
    /**
     * Label do botão de login.
     */
    labelLogin: {
      default: null,
      type: String,
    },
    /**
     * URL para login. Quando utilizado, renderiza um link no lugar de um botão.
     */
    linkLogin: {
      default: null,
      type: String,
    },
    /**
     * Título para a listagem de links.
     */
    titleLinks: {
      default: null,
      type: String,
    },
    /**
     * Título para a listagem de funções.
     */
    titleFunctions: {
      default: null,
      type: String,
    },
    /**
     * Array de objetos que representam a lista de links do cabeçalho.
     *
     * O array deve seguir a estrutura abaixo:
     *
     * ```
     * [
     *   {
     *     // [OBRIGATÓRIO] Título do link
     *     name: 'string',
     *
     *     // [OPCIONAL] URL do link
     *     href: 'string',
     *
     *     // [OPCIONAL] Nome do evento emitido ao clicar no link
     *     clickEventName: 'string',
     *
     *     // [OPCIONAL] Texto do tooltip
     *     tooltipText: 'string',
     *
     *     // [OPCIONAL] Local aonde vai ser mostado o tooltip(top, right, left, bottom)
     *     tooltipPlace: 'string',
     *
     *     // [OPCIONAL] Tipo de tooltip(info, warning, error, success)
     *     tooltipType: 'string',
     *
     *     // [OPCIONAL] Tempo em que o tooltip fica aberto em milisegundos
     *     tooltipTimer: 'string'
     *   },
     *   // ...
     * ]
     * ```
     *
     * Quando passado como atributo, obrigatoriamente deve ser um array de objetos
     * convertido para string. Quando passado como propriedade, pode ser um array de
     * objetos propriamente dito.
     *
     * Referência: https://open-wc.org/guides/knowledge/attributes-and-properties
     *
     * Referência sobre o consumo de eventos através da chave `clickEventName`:
     * [Eventos Emitidos pelos Componentes](/?path=/story/eventos-emitidos-pelos-componentes--page)
     */
    listLinks: {
      default: null,
      type: [String, Object],
    },
    /**
     * Array de objetos que representam a lista de funções do cabeçalho.
     *
     * O array deve seguir a estrutura abaixo:
     *
     * ```
     * [
     *   {
     *     // [OBRIGATÓRIO] Ícone da função
     *     icon: 'string',
     *
     *     // [OPCIONAL] Nome da família de fonte do ícone
     *     iconFamily: 'string',
     *
     *     // [OBRIGATÓRIO] Título da função
     *     name: 'string',
     *
     *     // [OPCIONAL] URL da função
     *     url: 'string',
     *
     *     // [OPCIONAL] Nome do evento emitido ao clicar na função
     *     clickEventName: 'string',
     *
     *     // [OPCIONAL] Texto do tooltip
     *     tooltipText: 'string',
     *
     *     // [OPCIONAL] Local aonde vai ser mostado o tooltip(top, right, left, bottom)
     *     tooltipPlace: 'string',
     *
     *     // [OPCIONAL] Tipo de tooltip(info, warning, error, success)
     *     tooltipType: 'string',
     *
     *     // [OPCIONAL] Tempo em que o tooltip fica aberto em milisegundos
     *     tooltipTimer: 'string'
     *   },
     *   // ...
     * ]
     * ```
     *
     * Quando passado como atributo, obrigatoriamente deve ser um array de objetos
     * convertido para string. Quando passado como propriedade, pode ser um array de
     * objetos propriamente dito.
     *
     * Referência: https://open-wc.org/guides/knowledge/attributes-and-properties
     *
     * Referência sobre o consumo de eventos através da chave `clickEventName`:
     * [Eventos Emitidos pelos Componentes](/?path=/story/eventos-emitidos-pelos-componentes--page)
     */
    listFunctions: {
      default: null,
      type: [String, Object],
    },
  },
  emits: [
    /**
     * Evento emitido ao clicar em um item de `list-functions` ou de `list-links`
     * que possua uma chave `clickEventName`. O nome do evento emitido será o
     * string passado como valor da referida chave.
     *
     * Referência sobre o consumo de eventos através da chave `clickEventName`:
     * [Eventos Emitidos pelos Componentes](/?path=/story/eventos-emitidos-pelos-componentes--page)
     */
    'valor da chave "clickEventName"',
  ],
  data() {
    return {
      showLink: false,
      showFunction: false,
      displayBlock: "block",
      floatRight: "right",
    }
  },

  computed: {
    isSearch() {
      return this.provideAction?.isSearch()
    },

    isCompact() {
      return this.provideAction?.isCompact()
    },

    isStickyCompact() {
      return this.provideAction?.isStickyCompact()
    },

    menuIcons() {
      return parsePropStringToJSON(this.listFunctions)
    },

    menuLinks() {
      return parsePropStringToJSON(this.listLinks)
    },
  },

  created() {
    window.addEventListener("resize", this.onResize)
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize)
  },

  methods: {
    openLinks() {
      this.showLink = !this.showLink
      if (this.showFunction) {
        this.showFunction = !this.showFunction
      }
    },

    openFunctions() {
      this.showFunction = !this.showFunction
      if (this.showLink) {
        this.showLink = !this.showLink
      }
    },

    openInputSearch(open) {
      this.$parent.isActive = open
      if (this.showLink) {
        this.showLink = !this.showLink
      }
      if (this.showFunction) {
        this.showFunction = !this.showFunction
      }
    },

    onResize() {
      if (window.innerWidth > 1279) {
        this.showLink = false
        this.showFunction = false
      }
    },

    handleClick(item, event) {
      if (item.clickEventName) {
        event.preventDefault()
        event.stopPropagation()
        this.$emit(item.clickEventName, item)
      }
    },
  },
}

export default HeaderAction
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/header/_mixins";
@import "~@govbr-ds/core/src/components/divider/_divider";
@import "~@govbr-ds/core/src/components/button/_button";
@import "~@govbr-ds/core/src/components/list/_list";
@import "~@govbr-ds/core/src/components/signin/_signin";
@import "~@govbr-ds/core/src/components/item/_item";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");

:host {
  @include header-actions;
}

.header-actions .header-functions .br-item {
  &:not(:disabled) {
    &:hover {
      background-image: none;
    }
  }
  [class*="fa-"] {
    width: unset !important;
  }
}

.header-actions .header-links .br-list .item-wrapper {
  align-items: center;
  display: flex;
}
</style>
