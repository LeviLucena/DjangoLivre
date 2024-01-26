<template>
  <footer class="br-footer" :class="{ inverted: _inverted }">
    <div :class="containerFluid ? 'container-fluid' : 'container-lg'">
      <div class="logo">
        <img
          v-if="_logo && _logo.url"
          v-tooltip="{
            text: _logo.tooltipText,
            place: _logo.tooltipPlace,
            type: _logo.tooltipType,
            timer: _logo.tooltipTimer,
          }"
          :src="_logo.url"
          :alt="_logo.description"
        />
      </div>
      <BrList v-if="categories" horizontal data-toggle data-unique :space-between="_spaceBetweenCategories">
        <div v-for="category in categoriesList" :key="category.title" class="col-2">
          <a
            class="br-item header"
            :class="{ open: category.open }"
            href="javascript:void(0)"
            @click="toggle(category)"
          >
            <div class="content text-down-01 text-bold text-uppercase">
              {{ category.title }}
            </div>
            <div v-if="canToggle" class="support">
              <IconBase :icon-name="category.open ? 'angle-up' : 'angle-down'"></IconBase>
            </div>
          </a>
          <div v-if="(canToggle && category.open) || !canToggle" class="br-list">
            <span class="br-divider d-md-none"></span>
            <a
              v-for="item in category.items"
              :key="item.title"
              v-tooltip="{
                text: item.tooltipText,
                place: item.tooltipPlace,
                type: item.tooltipType,
                timer: item.tooltipTimer,
              }"
              class="br-item"
              :href="item.href"
              @click="handleClick(item, $event)"
            >
              <div class="content">{{ item.title }}</div>
            </a>
            <span class="br-divider d-md-none"></span>
          </div>
        </div>
      </BrList>

      <div v-if="(social || partners) && !canToggle" class="d-none d-sm-block">
        <div class="row align-items-end justify-content-between py-5">
          <div v-if="social" class="col social-network">
            <div class="social-network-title">
              {{ _social.label }}
            </div>
            <div class="d-flex">
              <a
                v-for="(network, index) in _social.networks"
                :key="index"
                :class="{ 'br-button circle': network.icon, 'mr-3': network.image }"
                :href="network.href"
                :title="network.description"
              >
                <img
                  v-if="network.image"
                  v-tooltip="{
                    text: network.tooltipText,
                    place: network.tooltipPlace,
                    type: network.tooltipType,
                    timer: network.tooltipTimer,
                  }"
                  :src="network.image"
                  :alt="network.description"
                />
                <IconBase v-if="network.icon" :icon-name="network.icon" :family-name="network.iconFamily" />
              </a>
            </div>
          </div>
          <div v-if="partners" class="col assigns text-right">
            <a v-for="(partner, index) in _partners" :key="index" :href="partner.href">
              <img
                v-tooltip="{
                  text: partner.tooltipText,
                  place: partner.tooltipPlace,
                  type: partner.tooltipType,
                  timer: partner.tooltipTimer,
                }"
                class="ml-4 logo-footer-ajuste"
                :src="partner.image"
                :alt="partner.description"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <span v-if="text" class="br-divider my-3" />
    <div v-if="text" class="container-lg">
      <div class="info">
        <div class="text-down-01 text-extra-bold pb-3 text-center">
          {{ text }}
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import TooltipMixin from "../../mixins/TooltipMixin"
import { parsePropStringToJSON } from "../../util/Utils.js"
import IconBase from "../IconBase/IconBase.ce.vue"
import BrList from "../List/List.ce.vue"

const MEDIA_BREAKPOINT_NOT_TOGGLE = "(min-width: 992px)"

const BrFooter = {
  name: "brFooter",
  components: {
    BrList,
    IconBase,
  },
  mixins: [TooltipMixin],
  props: {
    /**
     * **[OPCIONAL]** Inverte o tema do componente para a versão com fundo claro.
     */
    inverted: {
      type: [Boolean, String],
      default: false,
    },
    /**
     * **[OPCIONAL]** Indica que as colunas com as categorias terão espaçamento uniforme entre elas na versão desktop.
     */
    spaceBetweenCategories: {
      type: [Boolean, String],
      default: false,
    },
    /**
     * **[OPCIONAL]** Texto informativo na parte inferior do rodapé.
     */
    text: {
      type: String,
      default: null,
    },
    /**
     * **[OPCIONAL]** Array de objetos que representam as categorias dos links do rodapé.
     *
     * O array deve seguir a estrutura abaixo:
     *
     * ```
     * [
     *   {
     *     // [OBRIGATÓRIO] Título da categoria
     *     title: 'string',
     *
     *     // [OBRIGATÓRIO] Array com os itens da categoria
     *     items: [
     *       {
     *         // [OBRIGATÓRIO] Título do item da categoria
     *         title: 'string',
     *
     *         // [OBRIGATÓRIO] URL do link do item da categoria
     *         href: 'string',
     *
     *         // [OPCIONAL] Texto do tooltip
     *         tooltipText: 'string',
     *
     *         // [OPCIONAL] Local aonde vai ser mostado o tooltip(top, right, left, bottom)
     *         tooltipPlace: 'string',
     *
     *         // [OPCIONAL] Tipo de tooltip(info, warning, error, success)
     *         tooltipType: 'string',
     *
     *          // [OPCIONAL] Tempo em que o tooltip fica aberto em milisegundos
     *         tooltipTimer: 'string'
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
     */
    categories: {
      type: [String, Object],
      default: null,
    },
    /**
     * Posiciona o conteúdo do componente br-footer de maneira que ocupe todo o
     * espaço da margem.
     */
    containerFluid: {
      default: false,
      type: [Boolean],
    },
    /**
     * **[OBRIGATÓRIO]** Objeto que representa a logo principal do rodapé, localizada
     * no seu topo.
     *
     * O objeto deve seguir a estrutura abaixo:
     *
     * ```
     * {
     *   // [OBRIGATÓRIO] URL da imagem
     *   url: 'string',
     *
     *   // [OBRIGATÓRIO] Descrição da imagem que será usada como texto alternativo
     *   description: 'string',
     *
     *    // [OPCIONAL] Texto do tooltip
     *   tooltipText: 'string',
     *
     *   // [OPCIONAL] Local aonde vai ser mostado o tooltip(top, right, left, bottom)
     *   tooltipPlace: 'string',
     *
     *   // [OPCIONAL] Tipo de tooltip(info, warning, error, success)
     *   tooltipType: 'string',
     *
     *   // [OPCIONAL] Tempo em que o tooltip fica aberto em milisegundos
     *   tooltipTimer: 'string'
     * }
     * ```
     *
     * Quando passado como atributo, obrigatoriamente deve ser um objeto convertido
     * para string. Quando passado como propriedade, pode ser um objeto propriamente
     * dito.
     *
     * Referência: https://open-wc.org/guides/knowledge/attributes-and-properties
     */
    logo: {
      type: [String, Object],
      default: null,
      required: true,
    },
    /**
     * **[OPCIONAL]** Objeto que representa a área de redes sociais no rodapé.
     *
     * O objeto deve seguir a estrutura abaixo:
     *
     * ```
     * {
     *   // [OBRIGATÓRIO] Título da seção de redes sociais
     *   label: 'string',
     *
     *   // [OBRIGATÓRIO] Array com os objetos que representam as redes sociais
     *   networks: [
     *     {
     *       // [OBRIGATÓRIO] URL do link da rede social
     *       href: 'string',
     *
     *       // [OBRIGATÓRIO] URL da imagem da rede social (escolher entre image ou icon)
     *       image: 'string',
     *
     *       // [OBRIGATÓRIO] Ícone do link (escolher entre image ou icon)
     *       icon: 'string',
     *
     *       // [OPCIONAL] Família de fonte do ícone
     *       iconFamily: 'string',
     *
     *       // [OBRIGATÓRIO] Nome da rede social
     *       description: 'string',
     *
     *       // [OPCIONAL] Texto do tooltip
     *       tooltipText: 'string',
     *
     *       // [OPCIONAL] Local aonde vai ser mostado o tooltip(top, right, left, bottom)
     *       tooltipPlace: 'string',
     *
     *       // [OPCIONAL] Tipo de tooltip(info, warning, error, success)
     *       tooltipType: 'string',
     *
     *       // [OPCIONAL] Tempo em que o tooltip fica aberto em milisegundos
     *       tooltipTimer: 'string'
     *     },
     *     // ...
     *   ]
     * }
     * ```
     *
     * Quando passado como atributo, obrigatoriamente deve ser um objeto convertido
     * para string. Quando passado como propriedade, pode ser um objeto propriamente
     * dito.
     *
     * Referência: https://open-wc.org/guides/knowledge/attributes-and-properties
     */
    social: {
      type: [String, Object],
      default: null,
    },
    /**
     * **[OPCIONAL]** Array de objetos que representam os links com imagens dos parceiros
     * na parte inferior direita do rodapé.
     *
     * O array deve seguir a estrutura abaixo:
     *
     * ```
     * [
     *   {
     *     // [OBRIGATÓRIO] URL do link do parceiro
     *     href: 'string',
     *
     *     // [OBRIGATÓRIO] URL da imagem do parceiro
     *     image: 'string',
     *
     *     // [OBRIGATÓRIO] Descrição do parceiro
     *     description: 'string',
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
    partners: {
      type: [String, Object],
      default: null,
    },
  },
  emits: [
    /**
     * **[OPCIONAL]** Evento emitido ao clicar em um item do objeto da prop `categories`
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
      dataCategoriesList: null,
      canToggle: false,
    }
  },
  computed: {
    categoriesList: function () {
      if (this.dataCategoriesList) {
        const copy = [...this.dataCategoriesList]
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dataCategoriesList = null
        return copy
      }
      if (this.categories) {
        return parsePropStringToJSON(this.categories)
      }
    },
    _logo: function () {
      if (this.logo) {
        return parsePropStringToJSON(this.logo)
      }
    },
    _social: function () {
      if (this.social) {
        return parsePropStringToJSON(this.social)
      }
    },
    _partners: function () {
      if (this.partners) {
        return parsePropStringToJSON(this.partners)
      }
    },
    _inverted: function () {
      return this.inverted
    },
    _spaceBetweenCategories: function () {
      return this.spaceBetweenCategories
    },
  },
  mounted() {
    this.$nextTick(() => {
      const verifyCanToggle = () => {
        try {
          this.canToggle = !window.matchMedia(MEDIA_BREAKPOINT_NOT_TOGGLE).matches
        } catch (e) {
          e
        }
      }
      verifyCanToggle()
      window.addEventListener("resize", verifyCanToggle)
    })
  },
  methods: {
    toggle(category) {
      if (!this.dataCategoriesList) {
        this.dataCategoriesList = [...this.categoriesList]
      }

      if (!category.open) {
        this.dataCategoriesList.forEach((c) => (c.open = false))
      }
      category.open = !category.open
    },
    handleClick(item, event) {
      if (item.clickEventName) {
        event.preventDefault()
        this.$emit(item.clickEventName, item)
      }
    },
  },
}

export default BrFooter
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/core-base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/list/_list";
@import "~@govbr-ds/core/src/components/item/_item";
@import "~@govbr-ds/core/src/components/divider/_divider";
@import "~@govbr-ds/core/src/components/footer/_footer";
@import "~@govbr-ds/core/src/components/button/_button";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");

a.br-item {
  height: 4em;
}

.br-footer .assigns a {
  &:not(:disabled) {
    &:hover {
      background-image: none;
    }
  }
}

.br-footer .br-list.horizontal .br-item {
  height: auto;
}
</style>
