<template>
  <div class="complementary">
    <BrDivider class="mb-2"></BrDivider>
    <BrList density="large">
      <BrItem v-for="(link, index) in links" :key="index" class="text-center">
        <a :href="link.url">{{ link.name }}</a>
      </BrItem>
    </BrList>
  </div>
</template>

<script>
import store from "./store/index"

import BrDivider from "../Divider/Divider.ce.vue"
import BrItem from "../Item/Item.ce.vue"
import BrList from "../List/List.ce.vue"

const CookiebarComplementaryArea = {
  name: "BrCookiebarComplementaryArea",
  components: {
    BrDivider,
    BrItem,
    BrList,
  },
  computed: {
    links() {
      return store.getters.links
    },
  },
}

export default CookiebarComplementaryArea
</script>

<style></style>
