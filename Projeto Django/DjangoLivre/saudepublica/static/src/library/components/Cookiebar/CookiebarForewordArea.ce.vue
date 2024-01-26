<template>
  <div class="foreword">
    <p>{{ foreword }}</p>
  </div>
</template>

<script>
import store from "./store/index"

const CookiebarForewordArea = {
  name: "BrCookiebarForewordArea",
  computed: {
    foreword() {
      return store.getters.intro?.foreword
    },
  },
}

export default CookiebarForewordArea
</script>

<style></style>
