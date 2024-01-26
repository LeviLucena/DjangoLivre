<template>
  <div class="main">
    <br-cookiebar-broad></br-cookiebar-broad>
    <br-cookiebar-category></br-cookiebar-category>
    <br-cookiebar-notes></br-cookiebar-notes>
  </div>
</template>

<script>
import BrCookiebarBroad from "./CookiebarBroad.ce.vue"
import BrCookiebarCategory from "./CookiebarCategory.ce.vue"
import BrCookiebarNotes from "./CookiebarNotes.ce.vue"

const CookiebarMainArea = {
  name: "BrCookiebarMainArea",
  components: {
    BrCookiebarBroad,
    BrCookiebarCategory,
    BrCookiebarNotes,
  },
}

export default CookiebarMainArea
</script>

<style></style>
