<template>
  <div class="item-wrapper">
    <a
      v-if="href"
      v-tooltip="{ text: tooltipText, place: tooltipPlace, type: tooltipType, timer: tooltipTimer }"
      v-bind="$attrs"
      :href="href"
      :title="title"
      class="br-item"
      :class="{
        active: active,
        disabled: disabled,
        selected: selected,
      }"
      :data-toggle="hover && !disabled ? 'selection' : null"
    >
      <div class="content"><slot></slot></div>
    </a>

    <div
      v-else
      v-tooltip="{ text: tooltipText, place: tooltipPlace, type: tooltipType, timer: tooltipTimer }"
      v-bind="$attrs"
      class="br-item align-items-center"
      :class="{
        active: active,
        disabled: disabled,
        selected: selected,
        open: isOpen,
        'py-3': parentDensity === 'medium',
        'py-4': parentDensity === 'small',
      }"
      :role="dataToggleParentBrList ? 'listitem' : null"
      :data-toggle="hover && !disabled ? 'selection' : null"
    >
      <div v-if="dataToggleParentBrList" class="content">
        <div class="flex-fill">
          {{ title }}
          <slot name="content-header"></slot>
        </div>
        <BrButton
          circle
          type="tertiary"
          density="small"
          :icon="isOpen ? 'chevron-up' : 'chevron-down'"
          class="ml-1"
          :data-toggle="dataToggleParentBrList ? 'collapse' : hover ? 'selection' : null"
          @click="dataToggleParentBrList ? toggleOpen() : void 0"
        ></BrButton>
      </div>
      <span v-if="!dataToggleParentBrList">
        <slot></slot>
      </span>
    </div>
    <span v-show="dataToggleParentBrList && isOpen">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import TooltipMixin from "../../mixins/TooltipMixin"
import BrButton from "../Button/Button.ce.vue"
import IconBase from "../IconBase/IconBase.ce.vue"

const Item = {
  name: "br-item",
  components: {
    BrButton,
    IconBase,
  },
  mixins: [TooltipMixin],
  inject: {
    parentList: {
      default: null,
    },
    parentDensity: {
      default: "small",
    },
  },
  provide() {
    return {
      parentList: this,
      parentDensity: this.parentDensity,
    }
  },
  props: {
    /**
     * **[OPCIONAL]** Coloca o item como ênfase, destacando-o dos demais.
     * */
    active: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Efeito Hover, destaca o item ao passar o mouse por cima do mesmo.
     */
    hover: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Desabilita o item, mudando o cursor do mouse para símbolo de desabilitado e oculta o item para clique.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Destaca o item como selecionado. Possui um watcher que dispara um evento quando o seu valor é modificado.
     */
    selected: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Indica se o item está aberto/fechado quando o br-list pai é data-toggle. Possui um watcher que dispara um evento quando o seu valor é modificado.
     * */
    open: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Título visível para o item quando o br-list pai é data-toggle.
     * */
    title: {
      type: String,
      default: null,
    },
    /**
     * **[OPCIONAL]** URL ou PATH pelo qual o usuario sera encaminhado ao clicar no item. Adicionar um link torna o item do tipo link.
     * */
    href: {
      type: String,
      default: null,
    },
  },
  emits: [
    /**
     * **[OPCIONAL]** Evento disparado quando a prop *selected* é modificada.
     *
     * Referência sobre o consumo de eventos:
     * [Eventos Emitidos pelos Componentes](/?path=/story/eventos-emitidos-pelos-componentes--page)
     */
    "toggle-selected",
    /**
     * **[OPCIONAL]** Evento disparado quando a prop *open* é modificada.
     *
     * Referência sobre o consumo de eventos:
     * [Eventos Emitidos pelos Componentes](/?path=/story/eventos-emitidos-pelos-componentes--page)
     */
    "toggle-open",
  ],
  data() {
    return {
      isOpen: this.open,
    }
  },
  computed: {
    dataToggleParentBrList: function () {
      return this.parentList && this.parentList.isDataToggle()
    },

    dataUniqueParentBrList: function () {
      return this.parentList && this.parentList.isDataToggle() && this.parentList.isDataUnique()
    },
  },
  watch: {
    /**

     * Dispara o evento toggle-selected quando a prop selected é modificada.
     */
    selected: function (newValue) {
      this.$emit("toggle-selected", newValue)
    },
    /**
     * Dispara o evento toggle-open quando a prop open é modificada.
     */
    open: function (newValue) {
      this.$emit("toggle-open", newValue)
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.dataToggleParentBrList) {
        this.parentList.addItem(this)
        this.isOpen = this.open
      } else {
        this.isOpen = true
      }
    })
  },
  methods: {
    toggleOpen() {
      if (!this.isOpen && this.dataUniqueParentBrList) {
        this.parentList.closeAllItems()
      }
      this.isOpen = !this.isOpen
      this.$emit("toggle-open", this.isOpen)
    },
  },
}

export default Item
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/item/_item";
@import "~@govbr-ds/core/src/components/item/_mixins";
@import "~@govbr-ds/core/src/components/tag/_tag";
@import "~@govbr-ds/core/src/components/button/_button";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");

// Corrige a quebra de alinhamento no item quando o mesmo faz parte de uma lista horizontal, devido ao shadow-root.
:host {
  @include item-align-horizontal-list;
}

/* .br-item[data-toggle] {
  cursor: default;
} */
</style>
