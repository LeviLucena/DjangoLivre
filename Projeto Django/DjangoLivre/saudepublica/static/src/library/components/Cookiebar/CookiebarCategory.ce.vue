<template>
  <div class="category">
    <BrList v-for="(category, categoryIndex) in categories" :key="categoryIndex" data-toggle density="large">
      <BrItem>
        <template #content-header>
          <div class="container-fluid">
            <div class="row justify-content-between">
              <div class="col-auto order-2 order-sm-0">
                <h3 class="category-title mt-0 mb-3">
                  {{ category.name }}
                  <span v-if="!category.optIn"
                    >({{ getCookiesEnabled(category.id) }} de {{ getRelatedCookies(category.id).length }})</span
                  >
                </h3>
              </div>
              <div class="col-sm-5 col-md-3 col-lg-2 mr-5 mb-3 mb-sm-0 order-0 order-sm-1">
                <span v-if="category.optIn" class="always-active">{{ alwaysEnabledLabel }}</span>
                <BrCheckbox
                  v-else
                  :id="`category-${categoryIndex}`"
                  :label="
                    isEnable[categoryIndex] && !isIndeterminate[categoryIndex]
                      ? disableCategoryLabel
                      : enableCategoryLabel
                  "
                  :checked="isEnable[categoryIndex]"
                  :value="String(isEnable[categoryIndex])"
                  :indeterminate="isIndeterminate[categoryIndex]"
                  :checkgroup-child="`broad`"
                  :checkgroup-parent="`category-${category.id}`"
                  @update:checked="updateEnable($event, categoryIndex, category.id)"
                  @update:indeterminate="updateIndeterminate($event, categoryIndex, category.id)"
                ></BrCheckbox>
              </div>
              <div
                v-if="category.alert && !isEnable[categoryIndex]"
                class="col-12 order-1 order-sm-2 alert-message mb-3 mb-sm-0"
              >
                <BrMessage feedback state="warning" show-icon>
                  {{ category.alert }}
                </BrMessage>
              </div>
            </div>
          </div>
          <p class="mt-3">{{ category.description }}</p>
        </template>
        <BrList>
          <BrItem v-for="(cookie, cookieIndex) in getRelatedCookies(category.id)" :key="cookieIndex">
            <br-cookiebar-cookie
              :category-index="categoryIndex"
              :category-id="category.id"
              :cookie-index="cookieIndex"
              :cookie-id="cookie.id"
            ></br-cookiebar-cookie>
          </BrItem>
        </BrList>
      </BrItem>
      <BrDivider class="mb-3"></BrDivider>
    </BrList>
  </div>
</template>

<script>
import store from "./store/index"

import BrCheckbox from "../Checkbox/Checkbox.ce.vue"
import BrDivider from "../Divider/Divider.ce.vue"
import BrItem from "../Item/Item.ce.vue"
import BrList from "../List/List.ce.vue"
import BrMessage from "../Message/Message.ce.vue"

import BrCookiebarCookie from "./CookiebarCookie.ce.vue"

const CookiebarCategory = {
  name: "BrCookiebarCategory",
  components: {
    BrCheckbox,
    BrDivider,
    BrItem,
    BrList,
    BrMessage,
    BrCookiebarCookie,
  },
  data() {
    return {
      isEnable: store.getters.categories?.map((category) => category.enable),
      isIndeterminate: store.getters.categories?.map((category) => category.indeterminate),
    }
  },
  computed: {
    alwaysEnabledLabel() {
      return store.getters.labels?.awaysEnabled
    },
    categories() {
      return store.getters.categories
    },
    disableCategoryLabel() {
      return store.getters.labels?.disableCategory
    },
    enableCategoryLabel() {
      return store.getters.labels?.enableCategory
    },
  },
  methods: {
    getCookiesEnabled(categoryId) {
      return store.getters.numberOfCookiesEnabled(categoryId)
    },
    getRelatedCookies(categoryId) {
      return store.getters.relatedCookies(categoryId)
    },
    updateEnable(value, categoryIndex, categoryId) {
      this.isEnable[categoryIndex] = value
      // this.isEnable = this.isEnable.slice()
      store.commit("setCategoryEnable", {
        id: categoryId,
        enable: value,
      })
    },
    updateIndeterminate(value, categoryIndex, categoryId) {
      this.isIndeterminate[categoryIndex] = value
      // this.isIndeterminate = this.isIndeterminate.slice()
      store.commit("setCategoryIndeterminate", {
        id: categoryId,
        indeterminate: value,
      })
    },
  },
}

export default CookiebarCategory
</script>

<style></style>
