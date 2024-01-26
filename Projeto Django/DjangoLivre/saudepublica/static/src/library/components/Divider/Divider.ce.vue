<template>
  <span class="br-divider" :class="classObject"></span>
</template>

<script>
const Divider = {
  name: "brDivider",
  props: {
    /**
     * Posiciona verticalmente o componente br-divider.
     *
     * Obs: A versão vertical só funciona caso o componente seja usado dentro de um elemento com [Flexbox](https://www.gov.br/ds/utilitarios/css/flexbox)
     */
    vertical: { type: Boolean, default: false },
    /**
     * **[OPCIONAL]** O ajuste consiste em aumentar ou reduzir o divider de forma a deixá-lo mais compacto ou mais expandido em seu formato. **[ small | medium| large ]**
     */
    size: {
      type: String,
      default: null,
      validator: function (value) {
        return ["small", "medium", "large"].includes(value)
      },
    },
    /**
     * **[OPCIONAL]** Deixa a linha do componente tracejada
     */
    dashed: { type: Boolean, default: false },
  },
  computed: {
    classObject() {
      return {
        sm: this.size === "small",
        md: this.size === "medium",
        lg: this.size === "large",
        vertical: this.vertical,
        dashed: this.dashed,
      }
    },
  },
}

export default Divider
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/components/divider/_mixins";
@import "~@govbr-ds/core/src/partial/scss/core-base.scss";

:host {
  .#{$prefix}divider,
  hr {
    @include divider-configs;
  }

  // Fix span vertical align
  .vertical {
    height: 100%;
  }
}
</style>
