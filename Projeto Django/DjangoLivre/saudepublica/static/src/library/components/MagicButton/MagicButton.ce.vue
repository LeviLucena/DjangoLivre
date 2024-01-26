<template>
  <div
    v-tooltip="{ text: tooltipText, place: tooltipPlace, type: tooltipType, timer: tooltipTimer }"
    class="br-magic-button"
    :class="checkClassDensity"
  >
    <button v-bind="$attrs" class="br-button" :class="checkClassCircle" type="button" :aria-label="ariaLabel">
      <IconBase v-if="icon" :icon-name="icon" :class-name="CheckLabelIcon"></IconBase>
      {{ label }}
    </button>
  </div>
</template>

<script>
import TooltipMixin from "../../mixins/TooltipMixin"
import IconBase from "../IconBase/IconBase.ce.vue"

const MagicButton = {
  name: "brMagicButton",
  components: {
    IconBase,
  },
  mixins: [TooltipMixin],
  props: {
    /**
     * **[OBRIGATÓRIO]** Obrigatório no magic button pílula.
     */
    label: {
      type: String,
      default: "",
    },
    /**
     * **[OBRIGATÓRIO]** Obrigatório no magic-button circular. Possibilidade de uso de ícone no magic button pílula, no entanto é recomendado o uso apenas de texto curto e direto e que cause grande impacto.
     */
    icon: {
      type: String,
      default: "",
    },
    /**
     *  **[OPCIONAL]** O ajuste da densidade consiste em aumentar ou reduzir os espaçamentos internos do botão de forma a deixá-los mais compactos ou mais expandidos em seu formato. **[ large | middle | small ]**
     */
    density: {
      type: String,
      default: "medium",
      validator: function (value) {
        return ["large", "medium", "small"].includes(value)
      },
    },
    /**
     *  **[OPCIONAL]** O ajuste da button magic consiste em tornar o botão em um formato circular. **[ cicle ]**
     */
    circle: {
      type: Boolean,
      default: false,
    },
    /**
     *  **[OPCIONAL]** Acessibilidade - Recomenda-se seu uso em botões que tenham somente ícone como conteúdo.
     */
    ariaLabel: {
      type: String,
      default: null,
    },
  },
  computed: {
    checkClassDensity() {
      return {
        large: this.density === "large",
        medium: this.density === "medium",
        small: this.density === "small",
      }
    },
    checkClassCircle() {
      return {
        circle: this.circle && !this.label,
      }
    },
    CheckLabelIcon() {
      return this.label && this.icon ? "label-icon" : ""
    },
  },
}

export default MagicButton
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/button/_button";
@import "~@govbr-ds/core/src/components/magicbutton/_magicbutton";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");

.label-icon {
  margin-right: 0.5rem;
}
</style>
