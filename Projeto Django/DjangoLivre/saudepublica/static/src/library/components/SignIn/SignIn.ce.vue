<template>
  <BrButton
    v-if="!isLink"
    v-tooltip="{ text: tooltipText, place: tooltipPlace, type: tooltipType, timer: tooltipTimer }"
    class="sign-in"
    :type="type"
    :density="density"
    :inverted="inverted"
    :circle="_iconic"
    :block="block"
  >
    <IconBase
      v-if="_iconic || (icon && label && !image && !entity)"
      :icon-name="icon"
      :class-name="icon && label ? 'mr-1' : ''"
    ></IconBase>
    <span v-if="label">{{ label }}</span>
    <span v-if="entity && !image" class="ml-1 text-black">{{ entity }}</span>
    <img v-else-if="image" class="ml-1" :src="_image.url" :alt="_image.description" />
  </BrButton>
  <a v-else v-bind="$attrs" class="br-sign-in" :class="classObject" :href="href">
    <IconBase
      v-if="_iconic || (icon && label && !image && !entity)"
      :icon-name="icon"
      :class-name="icon && label ? 'mr-1' : ''"
    ></IconBase>
    <span v-if="label">{{ label }}</span>
    <span v-if="entity && !image" class="ml-1 text-black">{{ entity }}</span>
    <img v-else-if="image" class="ml-1" :src="_image.url" :alt="_image.description" />
  </a>
</template>

<script>
import TooltipMixin from "../../mixins/TooltipMixin"
import { parsePropStringToJSON } from "../../util/Utils.js"
import BrButton from "../Button/Button.ce.vue"
import IconBase from "../IconBase/IconBase.ce.vue"

const SignIn = {
  name: "brSignIn",
  components: {
    BrButton,
    IconBase,
  },
  mixins: [TooltipMixin],
  props: {
    /**
     * **[OPCIONAL]** Ênfase do sign-in, com finalidade de proporcionar mais ou menos destaque em relação a outros componentes exibidos na tela. A ênfase secundaria é padrão quando o type não é passado.
     */
    type: {
      type: String,
      validator: function (value) {
        return ["primary"].includes(value)
      },
    },
    /** **[OPCIONAL]** O ajuste da densidade consiste em aumentar ou reduzir os espaçamentos internos do sign-in de forma a deixá-los mais compactos ou mais expandidos em seu formato. **[ large | middle | small ]**
     */
    density: {
      type: String,
      validator: function (value) {
        return ["large", "middle", "small"].includes(value)
      },
      default: "middle",
    },
    /**
     * **[OPCIONAL]** Usado quando houver uma necessidade de enfatizar visualmente a ideia da ação. O ícone de usuário deverá ser localizado à esquerda do rótulo, diferentemente do sign-in to tipo externo que não possui ícone e a sua imagem localiza-se à direita do rótulo.
     */
    icon: {
      type: String,
      default: null,
    },
    /**
     * **[OBRIGATÓRIO]** O rótulo é um elemento obrigatório. A **exceção** ocorre na versão tipo icônico uma vez que não existe rótulo.
     */
    label: {
      type: String,
      default: null,
    },
    /**
     * **[OPCIONAL]** Objeto que representa a imagem destinada à utilização de uma
     * assinatura ou logo institucional do SignIn.
     *
     * O objeto deve seguir a estrutura abaixo:
     *
     * ```
     * {
     *   // [OBRIGATÓRIO] URL da imagem
     *   name: 'string',
     *
     *   // [OBRIGATÓRIO] Descrição alternativa da imagem
     *   description: 'string'
     * }
     * ```
     *
     * Quando passado como atributo, obrigatoriamente deve ser um objeto convertido
     * para string. Quando passado como propriedade, pode ser um objeto propriamente
     * dito.
     *
     * Referência: https://open-wc.org/guides/knowledge/attributes-and-properties
     */
    image: {
      type: [String, Object],
      default: null,
    },
    /**
     * **[OPCIONAL]** Nome institucional utilizado em substituição à imagem.
     */
    entity: {
      type: String,
      default: null,
    },
    /**
     * **[OPCIONAL]** Utilizado quando o background possui cores escuras.
     */
    inverted: {
      type: Boolean,
      default: false,
    },
    /** **[OPCIONAL]** Apresenta o sign-in em comportamento de bloco. o sign-in “empurra” qualquer outro elemento existente para outro espaço disponível. */
    block: {
      type: Boolean,
      default: false,
    },
    /** **[OPCIONAL]** Sign-in definido como hiperlink (button é o padrão), com possibilidade de utilizar todos os seus atributos.*/
    isLink: {
      type: Boolean,
      default: false,
    },
    /** **[OPCIONAL]** Atributo disponível para sign-in do tipo link (is-link).*/
    href: {
      type: String,
      default: null,
    },
  },
  computed: {
    _image() {
      return parsePropStringToJSON(this.image)
    },
    _iconic() {
      return this.icon?.length > 0 && !this.label && !this.image && !this.entity
    },
    classObject() {
      return [
        {
          primary: this.type === "primary",
          secondary: this.type === "secondary",
          large: this.density === "large",
          medium: this.density === "medium",
          small: this.density === "small",
          inverted: this.inverted,
          circle: this._iconic,
          block: this.block,
        },
      ]
    },
  },
}

export default SignIn
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/button/_button";
@import "~@govbr-ds/core/src/components/signin/_signin";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");
</style>
