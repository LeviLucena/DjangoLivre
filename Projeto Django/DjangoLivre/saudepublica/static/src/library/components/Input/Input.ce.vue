<template>
  <div class="br-input" :class="[classObject, hasNewClass]">
    <label v-if="label && !isLabelInline" :class="isInputHighLight ? 'sr-only' : null" :for="[id ? id : idDefault]">
      {{ label }}
    </label>
    <div v-if="isLabelInline && !label" class="input-label">
      <label class="text-nowrap" :for="[id ? id : idDefault]">{{ labelInline }}</label>
    </div>

    <!-- Input com máscaras -->
    <input
      v-if="!hasIconsign && mask"
      v-bind="$attrs"
      :id="[id ? id : idDefault]"
      ref="input"
      v-mask="mask"
      v-tooltip="{
        text: tooltipText,
        place: tooltipPlace,
        type: tooltipType,
        timer: tooltipTimer,
      }"
      :type="inputType"
      :autofocus="autofocus"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="_value"
      @input.prevent.stop="handleInput"
      @change.prevent.stop="handleChange"
    />

    <!-- Input sem máscaras -->
    <input
      v-if="!hasIconsign && !mask"
      v-bind="$attrs"
      :id="[id ? id : idDefault]"
      ref="input"
      v-tooltip="{
        text: tooltipText,
        place: tooltipPlace,
        type: tooltipType,
        timer: tooltipTimer,
      }"
      :type="inputType"
      :autofocus="autofocus"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="_value"
      @input.prevent.stop="handleInput"
      @change.prevent.stop="handleChange"
    />

    <div v-if="hasIconsign" ref="inputgroup" class="input-group">
      <div class="input-icon">
        <IconBase v-if="iconSign" :icon-name="iconSign" />
      </div>
      <input
        v-bind="$attrs"
        :id="[id ? id : idDefault]"
        v-tooltip="{
          text: tooltipText,
          place: tooltipPlace,
          type: tooltipType,
          timer: tooltipTimer,
        }"
        :type="inputType"
        :autofocus="autofocus"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="_value"
        @input.prevent.stop="handleInput"
        @change.prevent.stop="handleChange"
      />
      <BrButton
        v-if="ispassword"
        ref="brinputIcon"
        :icon="pswIcon"
        :disabled="isDisabled"
        circle
        density="small"
        @click="toggleIcon()"
      />
      <BrButton
        v-if="icon && !ispassword"
        :icon="icon"
        :disabled="isDisabled"
        :submit="iconSubmit"
        circle
        density="small"
      />
    </div>

    <BrButton
      v-if="ispassword && !hasIconsign"
      ref="brinputIcon"
      :icon="pswIcon"
      :disabled="isDisabled"
      circle
      density="small"
      @click="toggleIcon()"
    />
    <BrButton
      v-if="icon && !ispassword && !hasIconsign"
      ref="buttonIconSign"
      :icon="icon"
      :disabled="isDisabled"
      :submit="iconSubmit"
      circle
      density="small"
    />
  </div>
</template>

<script>
import { mask } from "vue-the-mask"
import TooltipMixin from "../../mixins/TooltipMixin"
import BrButton from "../Button/Button.ce.vue"
import IconBase from "../IconBase/IconBase.ce.vue"

const Input = {
  name: "brInput",
  components: {
    BrButton,
    IconBase,
  },
  mixins: [TooltipMixin],
  props: {
    /**
     * **[OPCIONAL]** Indicando que tipo de informação deverá ser digitada no Campo de Texto. Posiciona-se por padrão no topo do Campo de Texto.
     */
    label: {
      default: null,
      type: [String, Number],
    },
    /**
     * **[OPCIONAL]** Posicionamento alternativo do label, alinhado à esquerda do Campo de Texto, centralizado em sua altura.
     */
    labelInline: {
      default: null,
      type: [String, Number],
    },
    /**
     * **[OPCIONAL]** Tem a função de auxiliar o usuário em como preencher os dados solicitados. Obrigatoriamente deverá trazer uma informação mais completa que a contida no Rótulo/Label.
     */
    placeholder: {
      default: null,
      type: String,
    },
    /**
     * **[OPCIONAL]** Quando a página é carregada o elemento deve receber automaticamente o foco.
     */
    autofocus: {
      default: false,
      type: Boolean,
    },
    /**
     * **[OPCIONAL]** Ocorre quando o Input está desabilitado temporariamente para o uso. Neste caso, ele se apresenta com uma opacidade menor, o cursor do Mouse muda de forma e não tem ação sobre o campo.
     */
    disabled: {
      default: null,
      type: Boolean,
    },
    /**
     * **[OPCIONAL]** Estado no qual o Componente Input se apresenta **[ success | danger | info | warning ]**.
     */
    state: {
      type: String,
    },
    /**
     * **[OPCIONAL]** Tem relação direta com as dimensões de altura do Campo de Entrada de Texto. Padrão é o medium **[ large | medium | small]**.
     */
    density: {
      type: String,
      default: null,
      validator: function (value) {
        return ["large", "medium", "small"].includes(value)
      },
    },
    /**
     * **[OPCIONAL]** Ícone representativo e sem interatividade, posicionado à esquerda do Input.
     */
    iconSign: {
      default: null,
      type: String,
    },
    /**
     * **[OPCIONAL]** Ícone do botão que será posicionado à direita do Input. Quando a propriedade is-password for utilizada, não é necessário inserir a propriedade 'icon'.
     */
    icon: {
      default: null,
      type: String,
    },
    /**
     * **[OPCIONAL]** Indica que o botão à direita do input será do tipo submit.
     */
    iconSubmit: {
      type: Boolean,
      default: null,
    },
    /**
     * **[OPCIONAL]** Transforma o campo input em campo de entrada de senha, com o botão apresentando a opção de visualizar/ocultar senha. O ícone do botão é inserido automaticamente.
     */
    ispassword: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OPCIONAL]** Permite dar um destaque maior na interface, sendo utilizado em situações onde há necessidade de chamar atenção do usuário para este componente, como campos de busca por exemplo.
     */
    isHighlight: {
      type: [Boolean, String],
      default: false,
    },
    /**
     * **[OPCIONAL]** Recomenda-se a inclusão do atributo **id** no input, responsável também pela inclusão automática do atributo **for** do label (importante para especificar a qual elemento do formulário o label está vinculado).
     */
    id: {
      default: null,
      type: String,
    },
    /**
     * **[OPCIONAL]** Facilidade criada para inclusão de nova classe na tag 'br-input'.
     */
    newclass: {
      default: null,
      type: [String],
    },
    /**
     * **[OPCIONAL]** Usado para recuperar o valor digitado no input.
     */
    value: {
      type: String,
      default: "",
    },
    /**
     * **[OPCIONAL]** Usado para definir a máscara que será aplicada na entrada de texto.
     * Leia mais sobre máscaras em [vue-the-mask](https://vuejs-tips.github.io/vue-the-mask/)
     */
    mask: {
      type: String,
      default: "",
    },
    /**
     *  **[OPCIONAL]** Utilizado quando o background possui cores escuras.
     */
    inverted: {
      type: Boolean,
      default: null,
    },
  },
  emits: [
    /**
     * **[OPCIONAL]** Evento emitido quando o atributo *value* é modificado e o br-input perde o foco.
     *
     * Referência sobre o consumo de eventos:
     * [Eventos Emitidos pelos Componentes](/?path=/story/eventos-emitidos-pelos-componentes--page)
     */
    "change",

    /**
     * **[OPCIONAL]** Evento emitido imediatamente após o atributo *value* ser modificado.
     *
     * Referência sobre o consumo de eventos:
     * [Eventos Emitidos pelos Componentes](/?path=/story/eventos-emitidos-pelos-componentes--page)
     */
    "input",
  ],
  data() {
    return {
      _value: this.value,
      pswIcon: "eye-slash",
      pswType: "password",
      nwclass: this.newclass ? this.newclass : null,
      idDefault: "br-input-" + this._.uid,
    }
  },
  computed: {
    inputType: function () {
      if (!this.ispassword) {
        return this.$attrs.type ? this.$attrs.type : "text"
      } else {
        return this.pswType
      }
    },
    isLabelInline() {
      return this.labelInline && !this.isInputHighLight
    },
    isInputHighLight() {
      return this.isHighlight
    },
    classObject() {
      return {
        info: this.state === "info",
        warning: this.state === "warning",
        danger: this.state === "danger",
        success: this.state === "success",
        large: this.density === "large",
        medium: this.density === "medium",
        small: this.density === "small",
        "input-button": this.ispassword || this.icon,
        "input-inline": this.labelInline && !this.isHighlight,
        "input-highlight": this.isHighlight,
        inverted: this.inverted,
      }
    },
    hasNewClass() {
      return this.nwclass
    },
    hasIconsign() {
      return this.iconSign
    },
    isDisabled() {
      return this.disabled
    },
  },
  watch: {
    /**
     * Watch da prop value.
     * @param {String} value Valor recebido pela prop value.
     */
    value(val) {
      this._value = val
    },
  },

  mounted() {
    if (this.isLabelInline) {
      let div = document.createElement("div")
      div.className = "input-content"
      if (!this.hasIconsign) {
        this.$refs.input.outerHTML = '<div class="input-content">' + this.$refs.input.outerHTML + "</div>"
      } else if (this.hasIconsign) {
        this.$refs.inputgroup.outerHTML = '<div class="input-content">' + this.$refs.inputgroup.outerHTML + "</div>"
      }
    }
  },
  methods: {
    toggleIcon() {
      this.pswIcon = this.pswIcon === "eye-slash" ? "eye" : "eye-slash"
      this.pswType = this.pswType === "password" ? "text" : "password"
    },
    handleInput(event) {
      this._value = event.target.value
      this.$emit("input", event.target.value)
    },
    handleChange(event) {
      this.$emit("change", event.target.value)
    },
  },
  directives: { mask },
}

export default Input
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/input/_input";
@import "~@govbr-ds/core/src/components/button/_button";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");
</style>
