<template>
  <i :class="iconClasses" aria-hidden="true"></i>
</template>

<script>
const IconBase = {
  name: "IconBase",
  props: {
    /**
     * Nome do ícone que será apresentado
     */
    iconName: {
      type: String,
      default: "",
      validator: function (val) {
        return val.trim().length > 1
      },
    },
    /**
     * Se informado define que o nome da familia de fonte que será aplicada ao ícone
     */
    familyName: {
      type: String,
      default: "fas",
      validator: function (val) {
        return val.trim().length > 1
      },
    },
    /**
     * Se informado define qual o estilo de classe css que será aplicada ao ícone
     */
    className: {
      type: [String, Object],
      default: null,
    },
  },
  computed: {
    /**
     * Retorna o nome do ícone que será aplicado ao componente
     */
    iconClasses() {
      return [this.familyName, `fa-${this.processIconName(this.iconName)}`, this.className].join(" ")
    },
  },
  methods: {
    /**
     * Retorna o nome processado do ícone que será
     * apresentado
     */
    processIconName(iconName) {
      // Remove o prefixo "fa-" se estiver presente
      return iconName.replace(/^fa-/, "")
    },
  },
}

export default IconBase
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");
</style>
