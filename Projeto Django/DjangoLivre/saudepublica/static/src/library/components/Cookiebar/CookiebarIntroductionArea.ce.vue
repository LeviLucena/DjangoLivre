<template>
  <div class="introduction">
    <h1 class="main-title">{{ title }}</h1>
    <p class="update">
      {{ updateLabel }}: <span>{{ update }}</span>
    </p>
    <p>{{ observation }}</p>
  </div>
</template>

<script>
import store from "./store/index"

const CookiebarIntroductionArea = {
  name: "BrCookiebarIntroductionArea",
  computed: {
    observation() {
      return store.getters.intro?.observation
    },
    title() {
      return store.getters.intro?.title
    },
    update() {
      return store.getters.intro?.update
    },
    updateLabel() {
      return store.getters.labels?.update
    },
  },
}

export default CookiebarIntroductionArea
</script>

<style></style>
