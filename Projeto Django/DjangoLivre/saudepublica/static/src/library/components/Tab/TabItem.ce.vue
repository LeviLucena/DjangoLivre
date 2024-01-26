<template>
  <div v-show="active" :id="id" class="tab-panel" :class="{ active: active }" :aria-label="ariaLabel">
    <slot></slot>
  </div>
</template>

<script>
import TooltipMixin from "../../mixins/TooltipMixin"

export default {
  name: "TabItem",
  mixins: [TooltipMixin],
  inject: ["parentTab"],
  props: {
    /** **[OPCIONAL]** Título da aba */
    title: {
      type: String,
      default: "",
    },
    /** **[OPCIONAL]** Identificador da aba */
    id: {
      type: String,
      default: "",
    },
    /** **[OPCIONAL]** Ícone que é mostrado na aba */
    icon: {
      type: String,
      default: "",
    },
    /**
     * **[OPCIONAL]** Define o valor do contador.
     * */
    results: {
      type: String,
      default: "",
    },
    /**
     * **[OPCIONAL]** Define se a aba está ativa/aberta.
     * */
    isActive: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Texto descritivo para o atributo `aria-label` (acessibilidade).
     */
    ariaLabel: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      active: this.isActive,
    }
  },
  mounted() {
    this.parentTab.addTabItem(this)
  },
  methods: {
    setActive(active) {
      this.active = active
    },
  },
}
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/components/tab/_tab";

.tab-panel {
  color: var(--text-color);
}
</style>
