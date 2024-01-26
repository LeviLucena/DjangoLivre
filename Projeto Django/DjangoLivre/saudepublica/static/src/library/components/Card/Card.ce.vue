<template>
  <div
    v-tooltip="{ text: tooltipText, place: tooltipPlace, type: tooltipType, timer: tooltipTimer }"
    class="br-card"
    :class="[{ disabled: disabled, hover: hover, 'h-fixed': hFixed }]"
    :disabled="disabled"
    :aria-disabled="disabled"
  >
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-content" tabindex="0">
      <slot name="content"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import TooltipMixin from "../../mixins/TooltipMixin"

const BrCard = {
  name: "brCard",
  mixins: [TooltipMixin],
  props: {
    /**
     * Aplica estilo desabilitado ao componente
     */
    disabled: {
      type: Boolean,
      default: null,
    },
    /**
     * Habilita o estado hover ao card
     */
    hover: {
      type: Boolean,
      default: null,
    },
    /**
     * Habilita altura fixa e ativa barra de rolagem se necessário
     */
    hFixed: {
      type: Boolean,
      default: false,
    },
  },
}

export default BrCard
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/utilities/_states";
@import "~@govbr-ds/core/src/components/card/_card";
</style>
