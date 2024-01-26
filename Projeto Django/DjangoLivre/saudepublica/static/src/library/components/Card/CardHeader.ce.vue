<template>
  <slot :disabled="disabled"></slot>
</template>

<script>
const CardHeader = {
  name: "brCardHeader",
  props: {
    /**
     * Aplica estilo desabilitado ao componente
     */
    disabled: {
      type: Boolean,
      default: null,
    },
  },
}

export default CardHeader
</script>
