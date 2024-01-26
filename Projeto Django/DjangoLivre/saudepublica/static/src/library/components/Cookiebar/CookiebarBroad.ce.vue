<template>
  <div class="broad container-fluid">
    <div class="row justify-content-between">
      <div class="col-auto">
        <h2 class="categories-list-title">{{ categoriesLabel }}</h2>
      </div>
      <div class="col-sm-5 col-md-3 col-lg-2 mt-3 mt-sm-0">
        <BrCheckbox
          v-if="!isAllOptIn"
          :id="`broad`"
          :label="checkLabel"
          :checked="isEnable"
          :value="String(isEnable)"
          :indeterminate="isIndeterminate"
          :checkgroup-parent="`broad`"
          @update:checked="updateEnable"
          @update:indeterminate="updateIndeterminate"
        ></BrCheckbox>
      </div>
    </div>
    <div class="alert-message mt-3">
      <BrMessage v-if="alertMessage && !isEnable" feedback state="warning" show-icon>
        {{ alertMessage }}
      </BrMessage>
    </div>
  </div>
  <BrDivider class="mb-3"></BrDivider>
</template>

<script>
import store from "./store/index"

import BrCheckbox from "../Checkbox/Checkbox.ce.vue"
import BrDivider from "../Divider/Divider.ce.vue"
import BrMessage from "../Message/Message.ce.vue"

const CookiebarBroad = {
  name: "BrCookiebarBroad",
  components: {
    BrCheckbox,
    BrDivider,
    BrMessage,
  },
  data() {
    return {
      isEnable: store.getters.all?.enable,
      isIndeterminate: store.getters.all?.indeterminate,
    }
  },
  computed: {
    alertMessage() {
      return store.getters.all?.alert
    },
    categoriesLabel() {
      return store.getters.labels?.categories
    },
    checkLabel() {
      if (this.isEnable && !this.isIndeterminate) {
        return store.getters.labels?.disableAll
      } else {
        return store.getters.labels?.enableAll
      }
    },
    isAllOptIn() {
      return store.getters.all?.optIn
    },
  },
  methods: {
    updateEnable(value) {
      this.isEnable = value
      store.commit("setAllEnable", value)
    },
    updateIndeterminate(value) {
      this.isIndeterminate = value
      store.dispatch("setAllIndeterminate", value)
    },
  },
}

export default CookiebarBroad
</script>

<style></style>
