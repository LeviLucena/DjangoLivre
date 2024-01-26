<template>
  <div class="br-list" :expanded="expanded">
    <div
      v-for="(option, index) in _options_"
      :key="index"
      class="br-item"
      :class="{ selected: option.selected }"
      @click="handleSelection(index)"
    >
      <span>{{ option.label || option.value }}</span>
    </div>
  </div>
</template>

<script>
import brItem from "../Item/Item.ce.vue"
import brList from "../List/List.ce.vue"

const SelectSimpleList = {
  name: "brSelectSimple",
  components: {
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
     * JSON contendo as opções do select
     * {
     *   "value": \<string\>
     *   "selected": \<boolean\>
     * }
     */
    options: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      selectedOption: null,
      selectedOptionIndex: null,
      _options_: this.options,
    }
  },
  methods: {
    handleSelection(index) {
      this.selectOption(index)
      this.emitSelectedOptions(index)
    },

    selectOption(index) {
      for (let i = 0; i < this._options_.length; i++) {
        if (i === index) {
          this._options_[i].selected = true
        } else {
          this._options_[i].selected = false
        }
      }
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
  },
  watch: {
    options(newValue) {
      this._options_ = newValue
    },
  },
}

export default SelectSimpleList
</script>
