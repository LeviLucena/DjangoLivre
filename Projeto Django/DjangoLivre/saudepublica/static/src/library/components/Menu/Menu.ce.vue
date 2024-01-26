<template>
  <div :id="id" ref="menu" class="br-menu" :class="menuClass">
    <div v-if="isContextual" class="menu-trigger">
      <BrButton type="primary" block @click="toggleScrim">
        <span class="mr-1">{{ contextualLabel }}</span>
        <IconBase icon-name="angle-up"></IconBase>
      </BrButton>
    </div>
    <div class="menu-container" :class="[{ active: displayMenu }]">
      <div class="menu-panel">
        <div v-if="!isContextual" class="menu-header">
          <div v-if="logoHeader || signature" class="menu-title">
            <img v-if="logoHeader" :src="logoHeader" alt="Imagem ilustrativa" />
            <span v-if="signature">{{ signature }}</span>
          </div>
          <div class="menu-close">
            <BrButton circle aria-label="Fechar o menu" data-dismiss="menu" icon="times" @click="toggleMenu"></BrButton>
          </div>
        </div>
        <nav class="menu-body">
          <!-- Primeiro Nível -->
          <template v-for="(Group, groupIndex) in menu" :key="Group.id">
            <a
              v-if="!Group.list || !Group.list.length"
              v-tooltip="{
                text: Group.tooltipText,
                place: Group.tooltipPlace,
                type: Group.tooltipType,
                timer: Group.tooltipTimer,
              }"
              class="menu-item divider"
              :href="Group.url || 'javascript:void(0)'"
              :class="{ active: activeItem[LEVEL_1] === `${groupIndex}` }"
              @click="handleClick(Group, LEVEL_1, `${groupIndex}`, $event)"
            >
              <span v-if="Group.icon" class="icon">
                <IconBase v-if="Group.icon" :icon-name="Group.icon"></IconBase>
              </span>
              <span class="content">{{ Group.name }}</span>
            </a>
            <div v-if="Group.list && Group.list.length" class="menu-folder">
              <a
                v-if="!isContextual"
                v-tooltip="{
                  text: Group.tooltipText,
                  place: Group.tooltipPlace,
                  type: Group.tooltipType,
                  timer: Group.tooltipTimer,
                }"
                class="menu-item"
                :href="Group.url || 'javascript:void(0)'"
                :class="{ active: activeItem[LEVEL_1] === `${groupIndex}` }"
                @click="handleClick(Group, LEVEL_1, `${groupIndex}`, $event)"
              >
                <span v-if="Group.icon" class="icon">
                  <IconBase v-if="Group.icon" :icon-name="Group.icon"></IconBase>
                </span>

                <span class="content">{{ Group.name }}</span>
                <span class="support">
                  <IconBase icon-name="angle-down"></IconBase>
                </span>
              </a>
              <div
                v-if="isContextual"
                v-tooltip="{
                  text: Group.tooltipText,
                  place: Group.tooltipPlace,
                  type: Group.tooltipType,
                  timer: Group.tooltipTimer,
                }"
                class="menu-item"
                :class="{ active: activeItem[LEVEL_1] === `${groupIndex}` }"
                @click="handleClick(Group, LEVEL_1, `${groupIndex}`, $event)"
              >
                <span class="content">{{ Group.name }}</span>
              </div>

              <ul>
                <!-- Segundo Nível -->
                <li v-for="(SubGroup, subGroupIndex) in Group.list" :key="SubGroup.id">
                  <a
                    v-tooltip="{
                      text: SubGroup.tooltipText,
                      place: SubGroup.tooltipPlace,
                      type: SubGroup.tooltipType,
                      timer: SubGroup.tooltipTimer,
                    }"
                    class="menu-item"
                    :href="SubGroup.url || 'javascript:void(0)'"
                    :class="{ active: activeItem[LEVEL_2] === `${groupIndex}${subGroupIndex}` }"
                    @click="handleClick(Group, LEVEL_2, `${groupIndex}${subGroupIndex}`, $event)"
                  >
                    <span v-if="!isContextual" class="icon">
                      <i v-if="SubGroup.icon" :class="`fas fa-${SubGroup.icon}`" aria-hidden="true" />
                    </span>
                    <span class="content"> {{ SubGroup.name }} </span>
                    <span v-if="!isContextual && SubGroup.list !== undefined" class="support">
                      <IconBase icon-name="angle-right"></IconBase>
                    </span>
                  </a>
                  <!-- Terceiro Nível -->
                  <ul v-if="!isContextual && SubGroup.list !== undefined">
                    <li v-for="(SubGroupItem, subGroupItemIndex) in SubGroup.list" :key="SubGroupItem.id">
                      <a
                        v-tooltip="{
                          text: SubGroupItem.tooltipText,
                          place: SubGroupItem.tooltipPlace,
                          type: SubGroupItem.tooltipType,
                          timer: SubGroupItem.tooltipTimer,
                        }"
                        class="menu-item"
                        :href="SubGroupItem.url || 'javascript:void(0)'"
                        :class="{
                          active: activeItem[LEVEL_3] === `${groupIndex}${subGroupIndex}${subGroupItemIndex}`,
                        }"
                        @click="
                          handleClick(Group, LEVEL_3, `${groupIndex}${subGroupIndex}${subGroupItemIndex}`, $event)
                        "
                      >
                        <span v-if="SubGroupItem.icon" class="icon">
                          <IconBase v-if="SubGroupItem.icon" :icon-name="SubGroupItem.icon"></IconBase>
                        </span>
                        <span class="content">{{ SubGroupItem.name }}</span>
                        <span v-if="SubGroupItem.list !== undefined" class="support">
                          <IconBase icon-name="angle-right"></IconBase>
                        </span>
                      </a>
                      <ul v-if="SubGroupItem.list !== undefined">
                        <li v-for="(item, itemIndex) in SubGroupItem.list" :key="item.id">
                          <a
                            v-tooltip="{
                              text: item.tooltipText,
                              place: item.tooltipPlace,
                              type: item.tooltipType,
                              timer: item.tooltipTimer,
                            }"
                            class="menu-item"
                            :href="item.url || 'javascript:void(0)'"
                            :class="{
                              active:
                                activeItem[LEVEL_4] === `${groupIndex}${subGroupIndex}${subGroupItemIndex}${itemIndex}`,
                            }"
                            @click="
                              handleClick(
                                Group,
                                LEVEL_4,
                                `${groupIndex}${subGroupIndex}${subGroupItemIndex}${itemIndex}`,
                                $event
                              )
                            "
                          >
                            <span class="content">{{ item.name }}</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </template>
        </nav>
        <div v-if="!isContextual && (logos || links || social || info)" class="menu-footer">
          <div v-if="logos" class="menu-logos">
            <img
              v-for="logo in menuLogos"
              :key="logo.id"
              v-tooltip="{
                text: logo.tooltipText,
                place: logo.tooltipPlace,
                type: logo.tooltipType,
                timer: logo.tooltipTimer,
              }"
              :src="logo.src"
              :alt="logo.alt"
            />
          </div>
          <div v-if="links" class="menu-links">
            <a
              v-for="(link, linkIndex) in menuLinks"
              :key="link.id"
              v-tooltip="{
                text: link.tooltipText,
                place: link.tooltipPlace,
                type: link.tooltipType,
                timer: link.tooltipTimer,
              }"
              :href="link.url"
              :class="{ active: activeItem[LINK] === `${linkIndex}` }"
              @click="handleClick(Group, LINK, `${linkIndex}`, $event)"
            >
              <span class="mr-1">{{ link.titulo }}</span>
              <IconBase v-if="link.icon" :icon-name="link.icon"></IconBase>
            </a>
          </div>
          <div v-if="social || socialTitle" class="social-network">
            <div v-if="socialTitle" class="social-network-title">
              {{ socialTitle }}
            </div>
            <div v-if="social" class="d-flex">
              <div v-for="(item, itemIndex) in menuSocial" :key="item.id" class="share">
                <a
                  v-tooltip="{
                    text: item.tooltipText,
                    place: item.tooltipPlace,
                    type: item.tooltipType,
                    timer: item.tooltipTimer,
                  }"
                  class="br-button circle"
                  :href="item.url"
                  :aria-label="item.ariaLabel"
                  :class="{ active: activeItem[ITEM] === `${itemIndex}` }"
                  @click="handleClick(Group, ITEM, `${itemIndex}`, $event)"
                >
                  <IconBase v-if="item.icon" :icon-name="item.icon" :family-name="item.iconFamily"></IconBase>
                </a>
              </div>
            </div>
          </div>
          <div v-if="info" class="menu-info">
            <div class="text-center text-down-01">
              {{ info }}
            </div>
          </div>
        </div>
      </div>
      <BrScrim v-if="!isPush" :show="displayMenu" tabindex="0" data-dismiss="menu" @click="toggleScrim"></BrScrim>
    </div>
  </div>
</template>

<script>
import BRMenu from "@govbr-ds/core/dist/components/menu/menu"
import TooltipMixin from "../../mixins/TooltipMixin"
import { parsePropStringToJSON } from "../../util/Utils"
import BrButton from "../Button/Button.ce.vue"
import BrScrim from "../Scrim/Scrim.ce.vue"
import IconBase from "../IconBase/IconBase.ce.vue"

const Menu = {
  name: "brMenu",
  components: {
    BrButton,
    IconBase,
    BrScrim,
  },
  mixins: [TooltipMixin],
  props: {
    /**
     * **[OPCIONAL]** Menu principal do tipo Empurrando (Push). Padrão: menu flutuando (Off Canvas).
     */
    isPush: {
      type: [Boolean, String],
      default: false,
    },
    /**
     * **[OPCIONAL]** Menu principal do tipo Contextual. Padrão: menu flutuando (Off Canvas).
     */
    isContextual: {
      type: [Boolean, String],
      default: false,
    },
    /**
     * **[OPCIONAL]** Exibe o menu ao carregar a pagina.
     */
    showMenu: {
      type: [Boolean, String],
      default: false,
    },

    /**
     * **[OPCIONAL]** Array de objetos que representam os itens do menu.
     *
     * O array deve seguir a estrutura abaixo:
     *
     * ```
     * [
     *   {
     *     // [OBRIGATÓRIO] ID do item do menu
     *     id: 'string',
     *
     *     // [OBRIGATÓRIO] Ícone do item do menu
     *     icon: 'string',
     *
     *     // [OBRIGATÓRIO] Título do item do menu
     *     name: 'string',
     *
     *     // [OPCIONAL] Nome do evento emitido pelo <br-menu> ao clicar no item do menu
     *     clickEventName: 'string',
     *
     *     // [OPCIONAL] Indica que o menu terá um comportamento de spa, ou seja, não faz reload quando acessa uma nova rota
     *     isSpaLinkBehavior: [string, boolean],
     *
     *     // [OPCIONAL] URL do item do menu
     *     url: 'string',
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
     *
     *     // [OPCIONAL] Sub-itens do item do menu, que deve ser um array de objetos com esta mesma estrutura
     *     list: [
     *       {
     *         // id, icon, name, clickEventName, url, list, tooltipText, tooltipPlace, tooltipType, tooltipTimer
     *       },
     *       // ...
     *     ]
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
    list: {
      default: null,
      type: [String, Object],
    },
    /**
     * **[OPCIONAL]** O atributo data-breakpoint é opcional. Por padrão serão aplicadas as classes de breakpoint .col-sm-4 e .col-lg-3 no menu OffCanvas.
     */
    dataBreakpoints: {
      default: "col-sm-4 col-lg-3",
      type: String,
      validator: function (value) {
        return value.length > 0
      },
    },
    /**
     * **[OPCIONAL]** Título ou assinatura que identifica o site ou o sistema, localizado no cabeçalho do menu.
     */
    signature: {
      default: null,
      type: String,
      validator: function (value) {
        return value.length > 0
      },
    },
    /**
     * **[OPCIONAL]** Logo ou imagem que aponta para o endereço do arquivo de imagem, localizado no cabeçalho do menu.
     */
    logoHeader: {
      default: null,
      type: String,
    },
    /**
     * **[OPCIONAL]** Array de objetos que representam a lista de logos localizada
     * no rodapé do menu.
     *
     * O array deve seguir a estrutura abaixo:
     *
     * ```
     * [
     *   {
     *     // [OBRIGATÓRIO] URL da imagem
     *     src: 'string',
     *
     *     // [OBRIGATÓRIO] Texto alternativo da imagem
     *     alt: 'string',
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
     */
    logos: {
      default: null,
      type: [String, Object],
    },
    /**
     * **[OPCIONAL]** Array de objetos que representam a lista de links para acesso  a sites externos.
     * Está localizada no rodapé do menu.
     *
     * O array deve seguir a estrutura abaixo:
     *
     *  ```
     * [
     *   {
     *     // [OBRIGATÓRIO] URL do link
     *     url: 'string',
     *
     *     // [OBRIGATÓRIO] Título do link
     *     titulo: 'string',
     *
     *     // [OPCIONAL] Ícone do link
     *     icon: 'string',
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
     */
    links: {
      default: null,
      type: [String, Object],
    },
    /**
     * **[OPCIONAL]** Array de objetos que representam a lista de links para acesso
     * a redes sociais.
     *
     * O array deve seguir a estrutura abaixo:
     *
     *  ```
     * [
     *   {
     *     // [OBRIGATÓRIO] URL do link
     *     url: 'string',
     *
     *     // [OBRIGATÓRIO] Rótulo para acessibilidade
     *     ariaLabel: 'string',
     *
     *     // [OPCIONAL] Ícone do link
     *     icon: 'string',
     *
     *     // [OPCIONAL] Nome da familia de fonte do ícone.
     *     iconFamily: 'string',
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
     */
    social: {
      default: null,
      type: [String, Object],
    },
    /**
     * **[OPCIONAL]** Título para a seção que contém a lista de Links para acesso a redes sociais, localizado no rodapé do menu.
     */
    socialTitle: {
      default: null,
      type: String,
    },
    /**
     * **[OPCIONAL]** Informações adicionais em formato de texto, localizado no rodapé do menu.
     */
    info: {
      default: null,
      type: String,
      validator: function (value) {
        return value.length > 0
      },
    },
    /**
     * **[OPCIONAL]** Se refere ao nível de espaçamento interno nos itens. Padrão é a densidade média **[ large | small]**.
     */
    density: {
      default: null,
      type: String,
      validator: function (value) {
        return ["large", "small"].includes(value)
      },
    },
    /**
     * **[OPCIONAL]** Rótulo do menu contextual, apresentado como uma barra na base da área visível da tela no redimensionamento para grid de 4 colunas.
     */
    contextualLabel: {
      default: null,
      type: String,
    },
  },
  emits: [
    /**
     * **[OPCIONAL]** Evento emitido ao clicar em um item do objeto da prop `list`
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
      LEVEL_1: 0,
      LEVEL_2: 1,
      LEVEL_3: 2,
      LEVEL_4: 3,
      LINK: 4,
      ITEM: 5,
      activeClass: null,
      activeItem: [-1, -1, -1, -1],
      displayMenu: this.showMenu,
      id: this.isContextual ? null : "br-menu-" + this._.uid,
    }
  },
  watch: {
    showMenu(newValue) {
      this.displayMenu = newValue
    },
  },
  computed: {
    menu() {
      return parsePropStringToJSON(this.list)
    },
    menuLogos() {
      return parsePropStringToJSON(this.logos)
    },
    menuLinks() {
      return parsePropStringToJSON(this.links)
    },
    menuSocial() {
      return parsePropStringToJSON(this.social)
    },
    menuClass() {
      return {
        active: this.displayMenu,
        push: this.isPush,
        contextual: this.isContextual,
        large: this.density === "large",
        small: this.density === "small",
      }
    },
  },
  updated() {
    this.instance = new BRMenu("br-menu", this.$refs.menu)
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$el.classList.contains("push")) {
        this.$el.dataset.breakpoints = "col"
      }

      this.instance = new BRMenu("br-menu", this.$refs.menu)

      // Para monitorar a abertura/fechamento do menu push
      this.observer = new MutationObserver(this.insertColumnClass)

      if (this.instance.component.classList.contains("push")) {
        this.observeMenuPushActiveState()
      }

      if (this.instance.component.classList.contains("contextual")) {
        this.setupMenuContextualObserver()
        this.removeBreakpointClass()
      }
    })
  },
  methods: {
    // Verificar se é um link interno da spa nos frameworks
    isInternalLink(link) {
      if (link) {
        return link.startsWith("/") || link.startsWith("#")
      }
    },

    // Método para tratar o comportamento do menu push ao abrir e fechar
    observeMenuPushActiveState() {
      this.observer.observe(this.instance.component, {
        attributes: true,
        attributesFilter: ["class"],
        attributeOldValue: true,
      })
    },

    // Callback do mutationObserver para o menu push
    insertColumnClass(mutations) {
      for (let mutation of mutations) {
        if (mutation.type === "attributes") {
          if (mutation.target.classList.contains("active")) {
            this.instance.component.getRootNode().host.parentNode.classList.add(...this.dataBreakpoints.split(" "))
          } else {
            this.instance.component.getRootNode().host.parentNode.classList.remove(...this.dataBreakpoints.split(" "))
          }
        }
      }
    },
    // Callback do mutationObserver para o remover breakpoints do menu contextual inseridos pelo Javascript
    setupMenuContextualObserver() {
      const menuPanel = this.$refs.menu.querySelector(".menu-panel")

      // Cria uma instância do MutationObserver
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class" &&
            mutation.target.classList.contains("col-sm-4", "col-lg-3")
          ) {
            mutation.target.classList.remove("col-sm-4", "col-lg-3")
          }
        }
      })

      // Configurações do MutationObserver
      const config = { attributes: true }
      observer.observe(menuPanel, config)
    },

    removeBreakpointClass() {
      // Remove a classe de breakpoint do menu-panel do menu Contextual
      if (this.isContextual && this.displayMenu) {
        const menuPanel = this.$refs.menu.querySelector(".menu-panel")
        menuPanel.classList.remove("col-sm-4", "col-lg-3")
      }
    },

    handleClick(menuItemOrLink, level, value, event) {
      if (menuItemOrLink.clickEventName) {
        event.preventDefault()
        this.$emit(menuItemOrLink.clickEventName, menuItemOrLink)
      }
      /*
       * Aplica comportamento no link para trabalhar com SPAs e não permitir o reload da página
       */
      if (menuItemOrLink.isSpaLinkBehavior) {
        event.preventDefault()

        if (this.isInternalLink(menuItemOrLink.url)) {
          this.$emit("navigate", menuItemOrLink.url)
        }
      }

      if (!event?.currentTarget?.hasAttribute("data-click-listener")) {
        for (let index = 0; index < this.activeItem.length; index++) {
          if (index === level) {
            this.activeItem[index] = value
          } else {
            this.activeItem[index] = -1
          }
        }
      }
    },
    toggleMenu() {
      this.displayMenu = !this.displayMenu
    },
    toggleScrim() {
      const menuElement = this.$refs.menu
      if (menuElement.classList.contains("contextual")) {
        this.displayMenu && menuElement.classList.contains("active")
          ? menuElement.classList.remove("active")
          : menuElement.classList.add("active")
      }

      this.displayMenu = !this.displayMenu
    },
  },
}

export default Menu
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/menu/_menu";
@import "~@govbr-ds/core/src/components/button/_button";
@import "~@govbr-ds/core/src/components/scrim/_scrim";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");
</style>
