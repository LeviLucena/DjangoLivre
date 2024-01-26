<template>
  <div class="br-checkbox" :class="classList" :checkgroup-parent="checkgroupParent" :checkgroup-child="checkgroupChild">
    <input
      v-bind="$attrs"
      :id="_id"
      type="checkbox"
      :name="name"
      :value="_value"
      :checked="_checked"
      :aria-label="ariaLabel"
      :disabled="disabled"
      :indeterminate="_indeterminate"
      @change="runChangeHandlers"
      @innerChange="runInnerChangeHandlers"
      @click.stop
    />
    <label
      v-tooltip="{
        text: tooltipText,
        place: tooltipPlace,
        type: tooltipType,
        timer: tooltipTimer,
      }"
      :for="_id"
      @click.stop
    >
      {{ label }}
    </label>
    <slot></slot>
  </div>
</template>

<script>
import Checkgroup from "../../mixins/checkgroup"
import TooltipMixin from "../../mixins/TooltipMixin"

const Checkbox = {
  name: "brCheckbox",
  inheritAttrs: false,
  emits: [
    "onChange", // Evento emitido quando o estado do checkbox é modificado.
    "update:checked", // Evento emitido para fazer o two-way data binding com a prop checked.
    /**
     * Referência sobre o consumo de eventos:
     * [Eventos Emitidos pelos Componentes](/?path=/story/eventos-emitidos-pelos-componentes--page)
     */
  ],
  mixins: [Checkgroup, TooltipMixin],
  props: {
    /** **[OPCIONAL]** Acessibilidade: define uma cadeia de caracteres para descrever o elemento. */
    ariaLabel: {
      type: String,
      default: null,
    },
    /** **[OPCIONAL]** Estado checked do checkbox. */
    checked: {
      type: [Array, Boolean],
      default: false,
    },
    /** **[OPCIONAL]** Desabilita o checkbox. */
    disabled: {
      type: Boolean,
      default: false,
    },
    /** **[OPCIONAL]** Formata o checkbox para valido ou invalido. */
    format: {
      type: String,
      validator: function (value) {
        return ["invalid", "valid"].includes(value)
      },
      default: null,
    },
    /** **[OPCIONAL]** Id do componente. Usado, também para conectar label correspondente. */
    id: {
      type: String,
      default: null,
    },
    /** **[OPCIONAL]** Formata o componente para versão horizontal. */
    inline: {
      type: Boolean,
      default: false,
    },
    /** **[OPCIONAL]** Texto descritivo, localizado sempre à direita da caixa de opção.*/
    label: {
      type: String,
      default: "",
    },
    /** **[OPCIONAL]** Define o name que será atribuido ao checkbox. */
    name: {
      type: String,
      default: null,
    },
    /** O valor da caixa de seleção. */
    value: {
      type: String,
      default: null,
    },
    /** **[OPCIONAL]** Define se o label do checkbox deve ser escondido. */
    hiddenLabel: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isChecked: this.checked, // [DATA] Estado atual do checkbox.
    }
  },
  computed: {
    /**
     * [PROPRIEDADE COMPUTADA] - Lista de classes.
     * @return {Object} Objeto contendo classes aplicadas na raiz do componente.
     */
    classList() {
      return {
        invalid: this.format == "invalid",
        valid: this.format == "valid",
        "d-inline": this.inline,
        disabled: this.disabled,
        "hidden-label": this.hiddenLabel,
      }
    },
    /**
     * [PROPRIEDADE COMPUTADA] Controla o two-way data binding do estado checked com propriedades get and set.
     * @return {Object} Objeto contendo métodos get e set.
     */
    _checked: {
      /**
       * Pega o estado checked passado ao componente. Só pode ser alterado pelo "lado de fora do checkbox" usando a prop "checked".
       * @return {Boolean} Prop checked.
       */
      get() {
        return this.checked
      },
      /**
       * Guarda o estado do checkbox no data "isChecked".
       * Emite o evento "update:checked" usado para two-way data binding.
       * @param {Boolean} value Estado checked do checkbox.
       */
      set(value) {
        this.isChecked = value
        this.$emit("update:checked", value)
      },
    },
    /**
     * [PROPRIEDADE COMPUTADA] Computa qual id será usado no checkbox.
     * @return {String} Valor da prop id se houver, senão valor computado usando o uid.
     */
    _id() {
      return this.id || "br-checkbox-" + this._.uid
    },
    /**
     * [PROPRIEDADE COMPUTADA] Computa o valor usado no atributo value do checkbox.
     * @return {String, Boolean} Valor da prop value se houver, senão valor do data isChecked.
     */
    _value() {
      return this.value || this.isChecked
    },
  },
  methods: {
    /**
     * Emite evento customizado com o nome "onChange"
     */
    emitOnChangeEvent() {
      this.$emit("onChange", this.$el.querySelector("input"))
    },
    /**
     * Emite evento customizado com o nome "update:checked", usado para two-way data bindind.
     * @param {Object} event Objeto Event.
     */
    emitUpdateCheckedEvent(event) {
      this.$emit("update:checked", event.target.checked)
    },
    /**
     * Executa os handlers para o evento "change".
     * @param {Object} event Objeto Event
     */
    runChangeHandlers(event) {
      this.updateCheckedState(event)
      this.updateIndeterminateState(event)
      this.emitOnChangeEvent()
    },
    /**
     * Executa os handlers para o evento customizado "innerChange"
     * @param {Object} event Objeto Event
     */
    runInnerChangeHandlers(event) {
      this.updateCheckedState(event)
      this.updateIndeterminateState(event)
    },
    /**
     * Atualiza o estado checked do checkbox por meio da propriedade computada _checked.
     * @param {Object} event Objeto Event
     */
    updateCheckedState(event) {
      this._checked = event.target.checked
    },
  },
}

export default Checkbox
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/checkbox/_checkbox";
@import "~@govbr-ds/core/src/components/input/_input";

.br-checkbox {
  input {
    &:indeterminate {
      + label {
        &::after {
          border: solid var(--selected);
          border-color: var(--background-light);
          border-width: 0 0 3px;
          top: 2px;
          transform: none;
          content: "";
          height: var(--icon-size-sm);
          left: 8px;
          position: absolute;
          width: 8px;
        }
        &::before {
          --interactive-rgb: var(--color-rgb);
          background: var(--selected);
          border-color: var(--selected);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          content: "";
          height: var(--checkbox-size);
          left: 0;
          position: absolute;
          width: var(--checkbox-size);
        }
      }
    }
  }
}
</style>
