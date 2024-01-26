<template>
  <form v-if="isActive" :action="action" @submit="handleSubmit">
    <BrInput
      :id="id"
      :name="nameInput"
      :value="valueInputModel"
      is-highlight
      newclass="has-icon"
      :label="label"
      :placeholder="test"
      icon="search"
      icon-submit
      @input="handleInput"
    ></BrInput>
    <BrButton
      v-if="isActive"
      circle
      class="search-close ml-1"
      aria-label="Fechar Busca"
      data-dismiss="search"
      @click="closeInputSearch()"
    >
      <IconBase icon-name="times"></IconBase>
    </BrButton>
  </form>
</template>

<script>
import BrButton from "../Button/Button.ce.vue"
import IconBase from "../IconBase/IconBase.ce.vue"
import BrInput from "../Input/Input.ce.vue"

const HeaderSearch = {
  name: "brHeaderSearch",
  components: {
    BrButton,
    BrInput,
    IconBase,
  },
  inject: {
    isSearch: { default: false },
  },
  props: {
    /**
     * **[OPCIONAL]** Atributo action do formulário de busca.
     */
    action: {
      type: String,
      default: null,
    },
    /**
     * **[OPCIONAL]** Atributo *name* do input de busca.
     */
    nameInput: {
      type: String,
      default: null,
    },
    /**
     * **[OPCIONAL]** Atributo *value* do input de busca.
     */
    valueInput: {
      type: String,
      default: null,
    },
    /**
     * **[OPCIONAL]** PROPRIEDADE HERDADA DO INPUT: Indicando que tipo de informação deverá ser digitada no Campo de Texto.
     */
    label: {
      type: [String, Number],
      validator: function (value) {
        return value.length > 0
      },
      default: "Texto da pesquisa",
    },
    /**
     * **[OPCIONAL]** PROPRIEDADE HERDADA DO INPUT: Tem a função de auxiliar o usuário em como preencher os dados solicitados. Obrigatoriamente deverá trazer uma informação mais completa que a contida no Rótulo/Label.
     */
    placeholder: {
      type: String,
      validator: function (value) {
        return value.length > 0
      },
      default: "O que você procura?",
    },
    /**
     * **[OPCIONAL]** Recomenda-se a inclusão do atributo **id** no input, responsável também pela inclusão automática do atributo **for** do label (importante para especificar a qual elemento do formulário o label está vinculado).
     */
    id: {
      type: [String],
      validator: function (value) {
        return value.length > 0
      },
      default: "searchbox-91098",
    },
  },
  data() {
    return {
      isActive: true,
      valueInputModel: this.valueInput,
    }
  },
  computed: {
    test: function () {
      return this.placeholder
    },
  },
  beforeUpdate() {
    this.isActive = true
  },
  methods: {
    closeInputSearch() {
      this.isActive = false
      this.$parent.isActive = this.isActive
    },
    handleSubmit(e) {
      if (!this.action) {
        e.preventDefault()
        this.$emit("search-submit", this.valueInputModel)
      }
    },
    handleInput(e) {
      this.valueInputModel = e
      this.$emit("search-input", e)
    },
  },
}

export default HeaderSearch
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/header/_mixins";
@import "~@govbr-ds/core/src/components/input/_input";
@import "~@govbr-ds/core/src/components/button/_button";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");

:host {
  @include header-search;
}
</style>
