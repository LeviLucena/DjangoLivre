<template>
  <button
    v-tooltip="{ text: tooltipText, place: tooltipPlace, type: tooltipType, timer: tooltipTimer }"
    v-bind="$attrs"
    class="br-button"
    :class="{
      primary: type === 'primary',
      secondary: type === 'secondary',
      large: density === 'large',
      middle: density === 'middle',
      small: density === 'small',
      xsmall: density === 'xsmall',
      loading,
      inverted,
      active,
      circle,
      block,
    }"
    aria-label=""
    :type="submit ? 'submit' : 'button'"
    :disabled="disabled"
  >
    <slot>
      <IconBase v-if="icon" :icon-name="icon" :class-name="getShowCircle"></IconBase>
      <span v-if="!circle">
        <slot>{{ label }}</slot>
      </span>
    </slot>
  </button>
</template>

<script>
import TooltipMixin from "../../mixins/TooltipMixin"
import IconBase from "../IconBase/IconBase.ce.vue"

const Button = {
  name: "brButton",
  components: {
    IconBase,
  },
  mixins: [TooltipMixin],
  props: {
    /**
     * **[OBRIGATÓRIO]** O rótulo é um elemento obrigatório. A **exceção** ocorre na versão tipo circular uma vez que não existe rótulo.
     */
    label: {
      type: String,
      default: null,
    },
    /**
     * **[OPCIONAL]** Ênfase do botão, com finalidade de proporcionar hierarquia visual a esses elementos e ações. Os botões mudam de aparência conforme a ênfase utilizada. A ênfase terciária é padrão. **[ primary | secondary ]**".
     */
    type: {
      type: String,
      validator: function (value) {
        return ["secondary", "primary", "tertiary"].includes(value)
      },
      default: null,
    },
    /**
     * **[Opcional]** Indica que o botão é do tipo *submit*.
     */
    submit: {
      type: Boolean,
      default: null,
    },
    /**
     * **[Opcional]** Tipo de botão muito usado dentro de outros componentes ou em situações onde a representação do ícone é suficiente para transmitir a mensagem ao usuário.
     */
    circle: {
      type: Boolean,
      default: false,
    },
    /** **[OPCIONAL]** O ajuste da densidade consiste em aumentar ou reduzir os espaçamentos internos do botão de forma a deixá-los mais compactos ou mais expandidos em seu formato. **[ large | middle | small ]**
     */
    density: {
      type: String,
      default: "middle",
      validator: function (value) {
        return ["large", "middle", "small", "xsmall"].includes(value)
      },
    },
    /** **[OPCIONAL]** Desabilita o botão */
    disabled: {
      type: Boolean,
      default: false,
    },
    /** **[OPCIONAL]** Apresenta o botão em comportamento de bloco. o botão “empurra” qualquer outro elemento existente para outro espaço disponível. */
    block: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Usado quando houver uma necessidade de enfatizar visualmente a ideia da ação. **Nos botões do tipo circular a utilização é obrigatória, visto que a mensagem da ação é transmitida apenas pelo ícone.**
     */
    icon: {
      type: [String],
      default: null,
    },
    /**
     * **[OPCIONAL]** Utilizado quando o background possui cores escuras.
     */
    inverted: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Utilizado para enfatizar o estado ativo do botão
     */
    active: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Aplica carregando
     */
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getShowCircle() {
      return this.circle ? "" : "mr-1"
    },
  },
}

export default Button
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/button/_button";
@import "~@govbr-ds/core/src/components/loading/_loading";
@import "~@govbr-ds/core/src/components/notification/_notification";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");
</style>
