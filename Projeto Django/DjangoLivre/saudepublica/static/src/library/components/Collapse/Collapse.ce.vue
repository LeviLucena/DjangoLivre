<template>
  <br-list class="collapse-wrapper" :class="{ collapsed: collapse }" @click="showIcon ? toggleCollapse() : null">
    <br-item v-if="showIcon || title" hover>
      <div class="content">
        <div class="flex-fill">{{ title }}</div>
        <IconBase v-if="showIcon" :icon-name="getIconName()"></IconBase>
      </div>
    </br-item>

    <div v-show="!collapse" class="collapse-content">
      <slot></slot>
    </div>
  </br-list>
</template>

<script>
import { action } from "@storybook/addon-actions"
import IconBase from "../IconBase/IconBase.ce.vue"

export default {
  name: "BrCollapse",
  components: {
    IconBase,
  },
  props: {
    /**
     * Atributo que informa se o componente está collapsado ou não
     */
    collapsed: {
      type: Boolean,
      default: true,
    },
    /**
     * Atributo que informa se o componente deve exibir um ícone
     */
    showIcon: {
      type: Boolean,
      default: false,
    },
    /**
     * Atributo que define o nome do ícone a ser exibido quando o componente estiver collapsado
     */
    nameIconCollapsed: {
      type: String,
      default: "chevron-up",
    },
    /**
     * Atributo que define o nome do ícone a ser exibido quando o componente não estiver collapsado
     */
    nameIconNotCollapsed: {
      type: String,
      default: "chevron-down",
    },
    /**
     * Atributo que define o título  do collapse
     */
    title: {
      type: String,
      default: "",
    },
  },
  emits: [
    /**
     * **[OPCIONAL]** Evento disparado quando a prop *collapsed* é modificada.
     *
     * Referência sobre o consumo de eventos:
     * [Eventos Emitidos pelos Componentes](/?path=/story/eventos-emitidos-pelos-componentes--page)
     */
    "toggle-collapse",
  ],
  data() {
    return {
      collapse: this.collapsed,
    }
  },
  watch: {
    collapsed(val) {
      this.collapse = val
      this.toggleCollapse(val)
    },
  },
  methods: {
    toggleCollapse(newValue) {
      this.collapse = !this.collapse
      this.$emit("toggle-collapse", newValue)
      action("toggle-collapse")
    },
    getIconName() {
      return this.collapse ? this.nameIconNotCollapsed : this.nameIconCollapsed
    },
  },
}
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/item/_item";
@import "~@govbr-ds/core/src/components/list/_list";
@import "~@govbr-ds/core/src/components/button/_button";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");

.content {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Define a cor da fonte para a cor de interatividade
.content i {
  color: var(--interactive);
}

.collapse-wrapper .collapse-content {
  transition: height 0.3s;
  overflow: hidden;
}

.collapse-wrapper.collapsed .collapse-content {
  height: 0;
}

.br-item[data-toggle]:not(:disabled):hover {
  background-image: none;
}

.br-item[data-toggle] {
  cursor: default;
}
</style>
