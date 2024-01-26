<template>
  <div
    v-if="progress"
    ref="root"
    v-tooltip="{ text: tooltipText, place: tooltipPlace, type: tooltipType, timer: tooltipTimer }"
    :progress="progress"
    class="br-loading"
    :data-progress="percent"
  >
    <div class="br-loading-mask full">
      <div class="br-loading-fill"></div>
    </div>
    <div class="br-loading-mask">
      <div class="br-loading-fill"></div>
    </div>
  </div>

  <div
    v-else
    v-tooltip="{ text: tooltipText, place: tooltipPlace, type: tooltipType, timer: tooltipTimer }"
    :style="{ display: 'block', textAlign: 'center' }"
  >
    <div class="loading" :class="{ medium: medium }"></div>
    <span class="rotulo">{{ label }}</span>
  </div>
</template>

<script>
import TooltipMixin from "../../mixins/TooltipMixin"

const Loading = {
  name: "brLoading",
  mixins: [TooltipMixin],
  props: {
    /**
     * **[OPCIONAL]** Elemento visual que representa dinamicamente a progressão percentual de 0% a 100%.
     */
    progress: {
      default: false,
      type: Boolean,
    },
    /**
     * **[OPCIONAL]** Elemento visual que representa dinamicamente a progressão percentual de 0% a 100%.
     */
    percent: {
      default: 100,
      type: Number,
      validator: (value) => value >= 0 && value <= 100,
    },
    /**
     * **[OPCIONAL]** Disponível apenas no Loading Indeterminado. Restrito para uso dentro de outros componentes, onde o espaço é menor ou em situações em que se quer dar pouco destaque ao processamento. Também pode ser utilizado com ou sem o rótulo.
     */
    medium: {
      default: false,
      type: Boolean,
    },
    /**
     * **[OPCIONAL]** Elemento visual usado apenas no Loading Indeterminado. Recomenda-se o uso em situações em que a probabilidade de demora do processamento do sistema seja maior.
     */
    label: {
      type: String,
      default: "",
    },
  },
}

export default Loading
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/loading/_loading";

.loading.medium {
  margin-bottom: 16px;
}
</style>
