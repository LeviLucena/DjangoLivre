<template>
  <div class="cookie">
    <BrCard>
      <template #header>
        <div class="container-fluid">
          <div class="row justify-content-end">
            <div class="col-sm-5 col-md-3 col-lg-2 mb-3">
              <BrSwitch
                v-show="!isCookieOptIn && !isCategoryOptIn"
                :id="`cookie-${categoryIndex}${cookieIndex}`"
                :label="isEnable ? disableCookieLabel : enableCookieLabel"
                :checked="isEnable"
                :value="String(isEnable)"
                :checkgroup-child="`category-${categoryId}`"
                @update:checked="updateEnable"
              ></BrSwitch>
            </div>
            <div v-if="cookie.alert && !isEnable" class="col-12 message">
              <BrMessage feedback state="warning" show-icon>
                {{ cookie.alert }}
              </BrMessage>
            </div>
          </div>
        </div>
      </template>
      <template #content>
        <div class="container-fluid">
          <div class="row mb-1">
            <div class="col-sm-3 col-md-2 col-xl-1">
              <span
                ><strong>{{ cookieLabel }}</strong></span
              >
            </div>
            <div class="col-sm">
              <span>{{ cookie.name }}</span>
            </div>
          </div>
          <div class="row mb-1">
            <div class="col-sm-3 col-md-2 col-xl-1">
              <span
                ><strong>{{ expiryLabel }}</strong></span
              >
            </div>
            <div class="col-sm">
              <span>{{ cookie.expiry }}</span>
            </div>
          </div>
          <div class="row mb-1">
            <div class="col-sm-3 col-md-2 col-xl-1">
              <span
                ><strong>{{ domainLabel }}</strong></span
              >
            </div>
            <div class="col-sm">
              <span>{{ cookie.domain }}</span>
            </div>
          </div>
          <div class="row mb-1">
            <div class="col-sm-3 col-md-2 col-xl-1">
              <span
                ><strong>{{ companyLabel }}</strong></span
              >
            </div>
            <div class="col-sm">
              <span>{{ cookie.company }}</span>
            </div>
          </div>
          <div class="row mb-1">
            <div class="col-sm-3 col-md-2 col-xl-1">
              <span
                ><strong>{{ purposeLabel }}</strong></span
              >
            </div>
            <div class="col-sm">
              <span>{{ cookie.purpose }}</span>
            </div>
          </div>
          <div class="row mb-1">
            <div class="col-sm-3 col-md-2 col-xl-1">
              <span
                ><strong>{{ descriptionLabel }}</strong></span
              >
            </div>
            <div class="col-sm">
              <span>{{ cookie.description }}</span>
            </div>
          </div>
        </div>
      </template>
    </BrCard>
  </div>
</template>

<script>
import store from "./store/index"

import BrCard from "../Card/Card.ce.vue"
import BrMessage from "../Message/Message.ce.vue"
import BrSwitch from "../Switch/Switch.ce.vue"

const CookiebarCookie = {
  name: "BrCookiebarCookie",
  components: {
    BrCard,
    BrSwitch,
    BrMessage,
  },
  props: {
    categoryIndex: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    cookieIndex: {
      type: Number,
      required: true,
    },
    cookieId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isEnable: store.getters.cookie(this.categoryId, this.cookieId)?.enable,
    }
  },
  computed: {
    cookie() {
      return store.getters.cookie(this.categoryId, this.cookieId)
    },
    cookieLabel() {
      return store.getters.labels?.cookie
    },
    expiryLabel() {
      return store.getters.labels?.expiry
    },
    domainLabel() {
      return store.getters.labels?.domain
    },
    companyLabel() {
      return store.getters.labels?.company
    },
    purposeLabel() {
      return store.getters.labels?.purpose
    },
    descriptionLabel() {
      return store.getters.labels?.description
    },
    enableCookieLabel() {
      return store.getters.labels?.enableCookie
    },
    disableCookieLabel() {
      return store.getters.labels?.disableCookie
    },
    isCategoryOptIn() {
      return store.getters.isCategoryOptIn(this.categoryId)
    },
    isCookieOptIn() {
      return store.getters.isCookieOptIn(this.categoryId, this.cookieId)
    },
  },
  methods: {
    updateEnable(value) {
      this.isEnable = value
      store.commit("setCookieEnable", {
        categoryId: this.categoryId,
        cookieId: this.cookieId,
        enable: value,
      })
    },
  },
}

export default CookiebarCookie
</script>

<style></style>
