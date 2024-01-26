<template>
  <div class="global mb-6">
    <div v-if="!isOpen" class="global-default p-2xh">
      <br-cookiebar-foreword-area v-if="!isOpen"></br-cookiebar-foreword-area>
    </div>
    <div v-else class="global-open p-2xh">
      <br-cookiebar-introduction-area></br-cookiebar-introduction-area>
      <br-cookiebar-main-area></br-cookiebar-main-area>
      <br-cookiebar-complementary-area v-if="hasComplementaryContent"></br-cookiebar-complementary-area>
    </div>
  </div>
</template>

<script>
import store from "./store/index"

import BrButton from "../Button/Button.ce.vue"

import BrCookiebarComplementaryArea from "./CookiebarComplementaryArea.ce.vue"
import BrCookiebarForewordArea from "./CookiebarForewordArea.ce.vue"
import BrCookiebarIntroductionArea from "./CookiebarIntroductionArea.ce.vue"
import BrCookiebarMainArea from "./CookiebarMainArea.ce.vue"

import IconBase from "../IconBase/IconBase.ce.vue"

const CookiebarGlobalArea = {
  name: "BrCookiebarGlobalArea",
  components: {
    BrButton,
    BrCookiebarComplementaryArea,
    BrCookiebarForewordArea,
    BrCookiebarIntroductionArea,
    BrCookiebarMainArea,
    IconBase,
  },
  computed: {
    isOpen() {
      return store.getters.isOpen
    },
    hasComplementaryContent() {
      if (store.getters.links?.length > 0) {
        return true
      } else {
        return false
      }
    },
  },
}

export default CookiebarGlobalArea
</script>

<style></style>
