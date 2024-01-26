<template>
  <div v-bind="$attrs" class="br-select">
    <br-input
      :value="inputValue"
      :label="label"
      :placeholder="placeholder"
      :icon-sign="_iconSign"
      :icon="expansionIcon"
      readonly
    ></br-input>
    <br-select-multiple-list
      v-if="multiple"
      :select-all-label="selectAllLabel"
      :unselect-all-label="unselectAllLabel"
      :options="_options"
      :expanded="expanded"
      @change="handleSelection"
    ></br-select-multiple-list>
    <br-select-simple-list
      v-else
      :options="_options"
      :expanded="expanded"
      @change="handleSelection"
    ></br-select-simple-list>
  </div>
</template>

<script>
import brInput from "../Input/Input.ce.vue"
import brSelectMultipleList from "./SelectMultipleList.ce.vue"
import brSelectSimpleList from "./SelectSimpleList.ce.vue"

const Select = {
  name: "brSelect",
  inheritAttrs: false,
  components: {
    brInput,
    brSelectMultipleList,
    brSelectSimpleList,
  },
  emits: [
    /**
     * Evento emitido quando uma opção é selecionada.
     *
     * Valores fornecidos por meio do objeto `Event`.
     *
     * Acesse em `event.detail`
     */
    "change",
  ],
  props: {
    /**
     * [OPCIONAL]
     * Rótulo que indica o tipo de informação que deve ser selecionada
     */
    label: {
      type: String,
      default: null,
    },
    /**
     * [OPCIONAL]
     * Habilita o select no modo múltiplo
     */
    multiple: {
      type: Boolean,
      default: null,
    },
    /**
     * [OPCIONAL]
     * Auxilia o usuário a preencher os dados solicitados
     */
    placeholder: {
      type: String,
      default: null,
    },
    /**
     * [OBRIGATÓRIO]
     * JSON conténdo as opções do select
     * {
     *   "value": \<string\>
     *   "selected": \<boolean\>
     * }
     */
    options: {
      type: [String, Object],
      default: null,
    },
    /**
     * [OPCIONAL]
     * Rótulo para a opção de selecionar todos
     */
    selectAllLabel: {
      type: String,
      default: "Selecionar todos",
    },
    /**
     * [OPCIONAL]
     * Rótulo para a opção de desselecionar todos
     */
    unselectAllLabel: {
      type: String,
      default: "Desselecionar todos",
    },
    /**
     * [OPCIONAL]
     * Indica se o ícone de busca está presente no campo input
     */
    showSearchIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchIcon: "search",
      expansionIcon: "chevron-down",
      expanded: null,
      inputValue: "",
      _options_: this.options,
    }
  },
  computed: {
    _iconSign() {
      return this.showSearchIcon ? this.searchIcon : null
    },

    _options() {
      try {
        if (typeof this._options_ === "object") {
          return this._options_
        } else {
          return JSON.parse(this._options_)
        }
      } catch (error) {
        throw new Error(`Propriedade options: ${error.message}`)
      }
    },
  },
  watch: {
    options(newValue) {
      this._options_ = newValue
    },
  },
  methods: {
    setExpansionTrigger(triggerSelector) {
      let trigger = null
      if (this.$el.querySelector("br-input")?.shadowRoot) {
        trigger = this.$el.querySelector("br-input").shadowRoot.querySelector(triggerSelector)
      } else {
        trigger = this.$el.querySelector(triggerSelector)
      }
      trigger.addEventListener("click", this.toggleExpansion)
    },

    toggleExpansion(event) {
      event.stopPropagation()
      this.expanded = this.expanded ? null : true
      this.expansionIcon = this.expansionIcon === "chevron-down" ? "chevron-up" : "chevron-down"
    },

    handleSelection(options) {
      this.showSelectedOptions(options)
      this.emitSelectedOptions(options)
    },

    showSelectedOptions(options) {
      const value = this.getStringValue(options)
      this.inputValue = value
    },

    getStringValue(options) {
      if (options.length > 0) {
        const firstSelected = options[0].label || options[0].value

        if (this.multiple) {
          const howManySelected = options.length > 1 ? ` + (${options.length - 1})` : ""
          return `${firstSelected}${howManySelected}`
        } else {
          return firstSelected
        }
      }
    },

    emitSelectedOptions(options) {
      this.$emit("change", options.length === 1 ? options[0] : options)
    },

    setCloseSelect() {
      window.addEventListener("click", this.closeSelect)
    },

    closeSelect(event) {
      const element = event.target.shadowRoot?.querySelector(".br-select")
      if (element !== this.$el || !this.$props.multiple) {
        this.expanded = null
      }
    },
  },
  mounted() {
    this.setExpansionTrigger(".br-input")
    this.setExpansionTrigger(".br-input .br-button")

    this.setCloseSelect()
  },
}

export default Select
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/input/_input";
@import "~@govbr-ds/core/src/components/button/_button";
@import "~@govbr-ds/core/src/components/checkbox/_checkbox";
@import "~@govbr-ds/core/src/components/item/_item";
@import "~@govbr-ds/core/src/components/list/_list";
@import "~@govbr-ds/core/src/components/select/_select";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");

.br-select {
  .br-checkbox {
    input {
      &:indeterminate {
        + label {
          &::after {
            border: solid var(--selected);
            border-color: var(--background-light);
            border-width: 0 0 3px;
            top: 16px;
            transform: none;
            content: "";
            height: var(--icon-size-sm);
            left: 24px;
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
            position: absolute;
            width: var(--checkbox-size);
          }
        }
      }
    }
  }
  .br-input {
    input {
      cursor: pointer;
    }
  }
}
</style>
