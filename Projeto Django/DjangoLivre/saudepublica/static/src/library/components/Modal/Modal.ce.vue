<template>
  <div v-if="displayModal" class="br-modal" :class="modalClasses" :style="{ maxHeight: styleHeight }">
    <div class="br-modal-header">
      {{ title }}
      <BrButton
        v-if="closable"
        data-dismiss="br-modal"
        class="close mt-2"
        circle
        aria-label="Fechar modal"
        icon="fa-times"
        aria-hidden="true"
        @click="closeModal"
      ></BrButton>
    </div>
    <div class="br-modal-body">
      <slot></slot>
    </div>
    <div class="br-modal-footer" :class="buttonClasses">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script>
import BrButton from "../Button/Button.ce.vue"

const Modal = {
  name: "brModal",
  components: {
    BrButton,
  },
  emits: [
    "close-modal", //  Evento emitido ao acionar o botão de fechar modal.
    /**
     * Referência sobre o consumo de eventos:
     * [Eventos Emitidos pelos Componentes](/?path=/story/eventos-emitidos-pelos-componentes--page)
     */
    "update:show", //  Evento emitido junto com a atualização do estado de ativação da modal (quando é fechada ou oculta).
    /**
     * Referência sobre o consumo de eventos:
     * [Eventos Emitidos pelos Componentes](/?path=/story/eventos-emitidos-pelos-componentes--page)
     */
  ],
  props: {
    /**
     * **[OPCIONAL]** Exibe a modal ao carregar a página.
     */
    show: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Título da modal.
     */
    title: {
      type: String,
      default: null,
    },
    /**
     * **[OPCIONAL]** Insere botão fechar no cabeçalho da modal.
     * */
    closable: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Modifica a largura da modal **[ xsmall, small, medium, large ou auto]**.
     */
    width: {
      type: String,
      default: null,
      validator: function (value) {
        return ["auto", "large", "medium", "small", "xsmall"].includes(value)
      },
    },
    /**
     * **[OPCIONAL]** Indica se os botões devem ser centralizados na modal.
     */
    centerButtons: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Altura máxima da modal em pixels."
     */
    maxHeight: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      displayModal: this.show,
    }
  },
  computed: {
    modalClasses() {
      return this.width
    },
    buttonClasses() {
      return this.centerButtons ? "justify-content-center" : "justify-content-end"
    },
    styleHeight() {
      return this.maxHeight ? `${this.maxHeight}px` : null
    },
  },
  methods: {
    closeModal() {
      this.$emit("close-modal")
      this.displayModal = !this.displayModal
      this.$emit("update:show", false)
    },
  },
}
export default Modal
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/modal/_modal";
@import "~@govbr-ds/core/src/components/button/_button";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");
</style>
