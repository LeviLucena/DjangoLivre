<template>
  <div
    v-tooltip="{ text: tooltipText, place: tooltipPlace, type: tooltipType, timer: tooltipTimer }"
    class="br-switch"
    :class="classList"
  >
    <input
      v-bind="$attrs"
      :id="_id"
      type="checkbox"
      :name="name"
      :value="_value"
      :checked="_checked"
      :disabled="disabled"
      :indeterminate="isIndeterminate"
      @change="runChangeHandlers"
      @innerChange="runInnerChangeHandlers"
    />
    <label :for="_id">
      <slot>{{ label }}</slot>
    </label>
    <div
      v-if="labelChecked && labelNotChecked"
      class="switch-data"
      :data-enabled="labelChecked"
      :data-disabled="labelNotChecked"
    ></div>
  </div>
</template>

<script>
import Checkgroup from "../../mixins/checkgroup"
import TooltipMixin from "../../mixins/TooltipMixin"

const Switch = {
  name: "brSwitch",
  inheritAttrs: false,
  emits: [
    "onChange", // Evento emitido quando o estado do switch é modificado.
    "update:checked", // Evento emitido para fazer o two-way data binding com a prop checked.
    /**
     * Referência sobre o consumo de eventos:
     * [Eventos Emitidos pelos Componentes](/?path=/story/eventos-emitidos-pelos-componentes--page)
     */
  ],
  mixins: [Checkgroup, TooltipMixin],
  props: {
    /** **[OPCIONAL]** Se estiver presente, indica que o estado inicial do switch é true. */
    checked: {
      type: Boolean,
      default: false,
    },
    /** **[OPCIONAL]** Se estiver presente, indica que o switch está desabilitado. */
    disabled: {
      type: Boolean,
      default: false,
    },
    /** **[OPCIONAL]** Se estiver presente, coloca um ícone na chave de seleção para indicar a mudança de estado. */
    icon: {
      type: Boolean,
      default: false,
    },
    /** **[OPCIONAL]** Id do componente. Usado, também para conectar label correspondente. */
    id: {
      type: String,
      default: null,
    },
    /** **[OPCINAL]** Indica o tamanho do switch. */
    size: {
      type: String,
      validator: function (value) {
        return [null, "large", "small"].includes(value)
      },
      default: null,
    },
    /** **[OPCIONAL]** Descreve o que o switch faz quando a alternância estiver ativada. Se estiver presente sobrescre a label passada por slot. */
    label: {
      type: String,
      default: null,
    },
    /** **[OPCIONAL]** Rótulo para a chave ativada, que complementa a label, auxiliando no entendimento da posição em que a chave se encontra */
    labelChecked: {
      type: String,
      default: null,
    },
    /** **[OPCIONAL]** Rótulo para a chave desativada, que complementa a label, auxiliando no entendimento da posição em que a chave se encontra */
    labelNotChecked: {
      type: String,
      default: null,
    },
    /** **[OPCIONAL]** Define o atributo name que será atribuido ao switch. */
    name: {
      type: String,
      default: null,
    },
    /** **[OPCIONAL]** Label localizado acima do switch */
    top: {
      type: Boolean,
      default: false,
    },
    /** **[OPCIONAL]** Label localizado a direita do switch */
    right: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isChecked: this.checked, // [DATA] Estado atual do switch.
    }
  },
  computed: {
    /**
     * [PROPRIEDADE COMPUTADA] - Lista de classes.
     * @return {Object} Objeto contendo classes aplicadas na raiz do componente.
     */
    classList() {
      return {
        icon: this.icon,
        top: this.top,
        right: this.right,
        large: this.size === "large",
        small: this.size === "small",
      }
    },
    /**
     * [PROPRIEDADE COMPUTADA] Controla o two-way data binding do estado checked com propriedades get and set.
     * @return {Object} Objeto contendo métodos get e set.
     */
    _checked: {
      /**
       * Pega o estado checked passado ao componente. Só pode ser alterado pelo "lado de fora do switch" usando a prop "checked".
       * @return {Boolean} Prop checked.
       */
      get() {
        return this.checked
      },
      /**
       * Guarda o estado do switch no data "isChecked".
       * Emite o evento "update:checked" usado para two-way data binding.
       * @param {Boolean} value Estado checked do switch.
       */
      set(value) {
        this.isChecked = value
        this.$emit("update:checked", value)
      },
    },
    /**
     * [PROPRIEDADE COMPUTADA] Computa qual id será usado no switch.
     * @return {String} Valor da prop id se houver, senão valor computado usando o uid.
     */
    _id() {
      return this.id || "br-switch-input-" + this._.uid
    },
    /**
     * [PROPRIEDADE COMPUTADA] Computa o valor usado no atributo value do switch.
     * @return {String, Boolean} Valor do estado do switch ou das props "labelChecked" e "labelNotChecked".
     */
    _value() {
      return this.isChecked ? this.labelChecked || this.isChecked : this.labelNotChecked || this.isChecked
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
     * Atualiza o estado checked do switch por meio da propriedade computada _checked.
     * @param {Object} event Objeto Event
     */
    updateCheckedState(event) {
      this._checked = event.target.checked
    },
  },
}

export default Switch
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/switch/_switch";
</style>
