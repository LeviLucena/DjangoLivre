<template>
  <div class="br-list" :expanded="expanded" density="small">
    <div class="br-item highlighted" :class="{ selected: isAllSelected && !isIndeterminate }">
      <br-checkbox
        :label="_broadSelectionLabel"
        :checked="isAllSelected"
        :indeterminate="isIndeterminate"
        :checkgroup-parent="_groupName"
        @update:checked="updateAllSelected"
        @update:indeterminate="updateIndeterminate"
      ></br-checkbox>
    </div>
    <div
      v-for="(option, index) in _options_"
      :key="index"
      class="br-item"
      :class="{ selected: option.selected === true }"
    >
      <br-checkbox
        :label="option.label || option.value"
        :checked="option.selected === true"
        :checkgroup-child="_groupName"
        @update:checked="handleSelection($event, index)"
        @change.stop
      ></br-checkbox>
    </div>
  </div>
</template>

<script>
import brCheckbox from "../Checkbox/Checkbox.ce.vue"
import brItem from "../Item/Item.ce.vue"
import brList from "../List/List.ce.vue"

const SelectMultiple = {
  name: "brSelectMultiple",
  components: {
    brCheckbox,
    brItem,
    brList,
  },
  emits: ["change"],
  props: {
    /**
     * [OBRIGATÓRIO]
     * Indica se a lista de opções está aberta ou fechada
     */
    expanded: {
      type: Boolean,
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
      default: null,
    },
    /**
     * [OPCIONAL]
     * Rótulo para a opção de desselecionar todos
     */
    unselectAllLabel: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isAllSelected: false,
      isIndeterminate: false,
      _options_: this.options,
    }
  },
  computed: {
    _broadSelectionLabel() {
      return this.isAllSelected && !this.isIndeterminate ? this.unselectAllLabel : this.selectAllLabel
    },

    _groupName() {
      return `ms-${this._.uid}`
    },
  },
  methods: {
    handleSelection(value, index) {
      this.selectOption(value, index)
      this.emitSelectedOptions()
    },

    selectOption(value, index) {
      this._options_[index].selected = value
    },

    emitSelectedOptions() {
      const selectedOptions = this._options_
        .filter((option) => {
          return option.selected === true
        })
        .map((option) => {
          if (option.label) return option
          return option.value
        })
      this.$emit("change", selectedOptions)
    },

    updateAllSelected(value) {
      this.isAllSelected = value
    },

    updateIndeterminate(value) {
      this.isIndeterminate = value
    },
  },
  watch: {
    options(newValue) {
      this._options_ = newValue
    },
  },
}

export default SelectMultiple
</script>
