<template>
  <div
    v-show="isActive"
    :id="id"
    ref="scrim"
    class="br-scrim foco"
    :class="isActive ? 'active' : null"
    :show="isActive"
    :data-visible="isActive"
    :aria-expanded="isActive"
    @click="cancel()"
  >
    <div
      ref="content"
      :class="contentClass"
      :tabindex="autofocusContent ? 0 : -1"
      @keydown.stop="handleKeyDown"
      @click.stop
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
const Scrim = {
  name: "br-scrim",
  props: {
    /** **[OPCIONAL]** Id do componente scrim. */
    id: {
      type: String,
      default: null,
    },
    /** **[OPCIONAL]** Ativa/desativa o scrim. */
    show: {
      type: Boolean,
      default: false,
    },
    /** **[OPCIONAL]** Centraliza o conteúdo dentro do scrim. */
    centerContent: {
      type: Boolean,
      default: false,
    },
    /** **[OPCIONAL]** Define se o conteúdo deve receber foco ao ser acionado. */
    autofocusContent: {
      type: Boolean,
      default: false,
    },
    /** **[OPCIONAL]** Desativa o fechamento do scrim ao ser clicado. */
    disableCloseOnClick: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:show", "hide"],
  data() {
    return {
      isActive: this.show,
    }
  },
  watch: {
    show(value) {
      this.isActive = value
      this.$emit("update:show", value)
    },
  },
  mounted() {
    document.addEventListener("keyup", this.keyPress)
    if (this.autofocusContent) {
      this.$nextTick(() => {
        this.$refs.content.focus()
      })
    }
  },
  computed: {
    contentClass() {
      return {
        "br-modal": this.centerContent,
      }
    },
  },
  methods: {
    cancel() {
      if (!this.disableCloseOnClick) {
        this.isActive = !this.isActive
        this.hide()
      }
    },
    hide() {
      this.$emit("hide", "true")
      this.$emit("update:show", false)
    },
    keyPress(event) {
      if (event.key === "Escape" || event.key === "27") this.cancel()
    },
    handleKeyDown(event) {
      if (this.isActive && event.target === this.$refs.content && this.autofocusContent) {
        this.keyPress()
        event.stopPropagation()
      }
    },
  },
}

export default Scrim
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/scrim/_scrim";

.br-modal {
  outline: none;
}
</style>
