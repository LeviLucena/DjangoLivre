<template>
  <BrButton
    circle
    icon="search"
    aria-label="Abrir Busca"
    data-toggle="search"
    data-target=".header-search"
    @click="openSearch()"
  ></BrButton>
</template>

<script>
import BrButton from "../Button/Button.ce.vue"

const HeaderActionSearch = {
  name: "brHeaderActionSearch",
  components: {
    BrButton,
  },
  emits: ["open-search"],
  data() {
    return {
      open: true,
    }
  },
  methods: {
    openSearch() {
      this.$emit("open-search", this.open)
    },
  },
}

export default HeaderActionSearch
</script>
