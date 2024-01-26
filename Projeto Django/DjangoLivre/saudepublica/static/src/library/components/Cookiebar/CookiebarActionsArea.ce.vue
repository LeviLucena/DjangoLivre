<template>
  <div class="actions pb-3x">
    <BrButton
      :class="{ block: isSpecialBreakpoint }"
      :label="!isOpen ? (optIn ? optInLabel : optOutLabel) : closeLabel"
      type="secondary"
      density="small"
      v-on="{ click: !isOpen ? openCookiebar : closeCookiebar }"
    ></BrButton>
    <BrButton
      :class="{ block: isSpecialBreakpoint }"
      :label="rejectLabel"
      type="secondary"
      density="small"
      @click="reject"
    ></BrButton>
    <BrButton
      :class="{ block: isSpecialBreakpoint }"
      :label="acceptLabel"
      type="primary"
      density="small"
      @click="emitReport"
    ></BrButton>
  </div>
</template>

<script>
import store from "./store/index"

import BrButton from "../Button/Button.ce.vue"

const CookiebarActionsArea = {
  name: "BrCookiebarActionsArea",
  emits: ["report"],
  components: {
    BrButton,
  },
  data() {
    return {
      isSpecialBreakpoint: false,
    }
  },
  computed: {
    isOpen() {
      return store.getters.isOpen
    },
    optIn() {
      return store.getters.all?.optIn
    },
    acceptLabel() {
      return store.getters.labels?.acceptButton
    },
    rejectLabel() {
      return store.getters.labels?.rejectButton
    },
    optInLabel() {
      return store.getters.labels?.optInButton
    },
    optOutLabel() {
      return store.getters.labels?.optOutButton
    },
    closeLabel() {
      return store.getters.labels?.close
    },
  },
  methods: {
    openCookiebar() {
      store.dispatch("isOpen", true)
    },
    getReport() {
      return JSON.stringify(store.getters.report)
    },
    emitReport() {
      this.$emit("report", this.getReport())
    },
    setSpecialBreakpoint() {
      if (window.innerWidth <= 627) {
        this.isSpecialBreakpoint = true
      } else {
        this.isSpecialBreakpoint = false
      }
    },
    reject() {
      store.dispatch("rejectAll")
      this.$emit("report", this.getReport())
    },
    closeCookiebar() {
      store.dispatch("isOpen", false)
    },
  },
  created() {
    window.addEventListener("resize", this.setSpecialBreakpoint)
  },
  mounted() {
    this.setSpecialBreakpoint()
  },
}

export default CookiebarActionsArea
</script>

<style></style>
