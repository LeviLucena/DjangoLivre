<template>
  <div
    v-tooltip="{ text: tooltipText, place: tooltipPlace, type: tooltipType, timer: tooltipTimer }"
    class="br-list"
    :class="{ horizontal: horizontal, 'justify-content-between': spaceBetween }"
    role="list"
    :density="getDensity"
    :data-toggle="dataToggle"
    :data-unique="dataUnique"
  >
    <div v-if="title" class="header">
      <div class="title">
        {{ title }}
      </div>
    </div>
    <BrDivider v-if="title && !hideTitleDivider"></BrDivider>
    <slot></slot>
  </div>
</template>

<script>
import TooltipMixin from "../../mixins/TooltipMixin"
import BrDivider from "../Divider/Divider.ce.vue"

const List = {
  name: "brList",
  components: {
    BrDivider,
  },
  mixins: [TooltipMixin],
  inject: {
    parentDensity: {
      default: "small",
    },
  },
  provide() {
    return {
      parentList: this,
      parentDensity: this.getDensity,
    }
  },
  props: {
    /**
     * **[OPCIONAL]** Título da lista.
     * */
    title: {
      type: String,
      default: "",
    },
    /**
     * **[OPCIONAL]** Oculta o "divider" abaixo do título da lista.
     * */
    hideTitleDivider: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Indica se a lista será horizontal. por padrão, a lista é vertical.
     * */
    horizontal: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Indica que os itens da lista terão espaçamento uniforme entre eles.
     * */
    spaceBetween: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Ativa a lista expansiva, onde os \<br-item\> filhos abrem/fecham ao clicá-los.
     * */
    dataToggle: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Ativa a abertura de um \<br-item\> da lista por vez quando a mesma é data-toggle.
     * */
    dataUnique: {
      type: Boolean,
      default: false,
    },
    /**
     * TODO: documentação
     * */
    checkable: {
      type: Boolean,
      default: false,
    },
    /**
     * Niveis de densidade para o list, opções validas são "small", "medium" e "large"
     */
    density: {
      type: String,
      default: "large",
      validator: function (value) {
        return ["small", "medium", "large"].includes(value)
      },
    },
  },
  data() {
    return {
      items: [],
      getDensity: this.density,
    }
  },
  methods: {
    closeAllItems() {
      if (this.items && this.items.length) {
        this.items.forEach((item) => (item.isOpen = false))
      }
    },
    isDataToggle() {
      return this.dataToggle
    },
    isDataUnique() {
      return this.dataUnique
    },
    addItem(item) {
      return this.items.push(item)
    },
  },
}

export default List
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/list/_list";
@import "~@govbr-ds/core/src/components/divider/_divider";
</style>
