<template>
  <div class="br-cookiebar px-2xh pt-2xh pb-3x bg-pure-0" :class="{ default: !isOpen }">
    <br-cookiebar-global-area></br-cookiebar-global-area>
    <br-cookiebar-actions-area @report="emitReport"></br-cookiebar-actions-area>
  </div>
</template>

<script>
import store from "./store/index"

import BrCookiebarActionsArea from "./CookiebarActionsArea.ce.vue"
import BrCookiebarGlobalArea from "./CookiebarGlobalArea.ce.vue"

const Cookiebar = {
  name: "brCookieBar",
  emits: ["report"],
  components: {
    BrCookiebarActionsArea,
    BrCookiebarGlobalArea,
  },
  props: {
    content: {
      type: [String, Object],
      default: null,
      required: true,
    },
    lang: {
      type: String,
      default: "pt-br",
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _content() {
      if (typeof this.content === "string") {
        return JSON.parse(this.content)
      } else {
        return this.content
      }
    },
    _lang() {
      return store.getters.lang
    },
    isOpen() {
      return store.getters.isOpen
    },
  },
  watch: {
    content() {
      this.setContent()
    },
    lang() {
      this.setLang()
    },
    open() {
      this.setOpenState()
    },
  },
  methods: {
    setContent() {
      if (this._content) {
        store.dispatch("setLabels", this._content[this._lang]?.labels)
        store.dispatch("setIntro", this._content[this._lang]?.intro)
        store.dispatch("setAll", this._content[this._lang]?.all)
        store.dispatch("setCategories", this._content[this._lang]?.categories)
        store.dispatch("setCookies", this._content[this._lang]?.cookies)
        store.dispatch("setNotes", this._content[this._lang]?.notes)
        store.dispatch("setLinks", this._content[this._lang]?.links)
      }
    },
    setLang() {
      store.dispatch("setLang", this.lang)
    },
    setOpenState() {
      store.dispatch("isOpen", this.open)
    },
    /**
     * Emite um evento response com um json contendo os resultados da seleção
     * Disparado ao clicar no botão de aceitar
     * @param {string} json
     */
    emitReport(json) {
      this.$emit("report", json)
    },
  },
  created() {
    this.setLang()
    this.setContent()
    this.setOpenState()
  },
}

export default Cookiebar
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/button/_button";
@import "~@govbr-ds/core/src/components/card/_card";
@import "~@govbr-ds/core/src/components/checkbox/_checkbox";
@import "~@govbr-ds/core/src/components/divider/_divider";
@import "~@govbr-ds/core/src/components/item/_item";
@import "~@govbr-ds/core/src/components/list/_list";
@import "~@govbr-ds/core/src/components/message/_message";
@import "~@govbr-ds/core/src/components/switch/_switch";
@import "~@govbr-ds/core/src/components/cookiebar/_cookiebar";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");

.br-cookiebar {
  .global {
    overflow-y: scroll;
    height: calc(100vh - 100px);
  }
  &.default {
    .global {
      overflow-y: unset;
      height: unset;
    }
  }
  .actions,
  .close {
    display: flex;
    justify-content: end;
    flex-wrap: wrap;
  }
  .actions {
    background-color: var(--color-secondary-01);
    position: fixed;
    bottom: 0;
    right: 20px;
    left: 20px;
  }
  .alert-message {
    display: flex;
    justify-content: end;
    p {
      margin-bottom: 0;
    }
  }
  .broad {
    margin-bottom: var(--spacing-scale-3x);
  }
  .card-header {
    .message {
      display: flex;
      justify-content: end;
      p {
        margin-bottom: 0;
      }
    }
  }
  .categories-list-title {
    font-size: var(--font-size-scale-base);
    font-weight: var(--font-weight-bold);
    padding: 0;
    margin: 0;
  }
  .category-title,
  .notes-title {
    color: var(--color-primary-default);
    font-size: var(--font-size-scale-up-01);
    font-weight: var(--font-weight-regular);
  }
  .main-title {
    font-weight: var(--font-weight-regular);
  }
  .update {
    font-size: var(--font-size-scale-up-01);
    font-weight: var(--font-weight-semi-bold);
  }
  .br-list {
    .selection {
      margin-right: var(--spacing-scale-3x);
    }
    .br-item {
      &[data-toggle] {
        .content {
          i {
            color: var(--message-text);
          }
        }
      }
      [class*="fa-"] {
        width: calc(var(--icon-size) + 8px) !important;
      }
      .br-button {
        &.circle {
          min-width: var(--button-size);
        }
      }
    }
  }
  .br-checkbox {
    input {
      &:indeterminate {
        + label {
          &::after {
            border: solid var(--selected);
            border-color: var(--background-light);
            border-width: 0 0 3px;
            top: 2px;
            transform: none;
            content: "";
            height: var(--icon-size-sm);
            left: 8px;
            position: absolute;
            width: 8px;
          }
          &::before {
            --interactive-rgb: var(--color-rgb);
            background: var(--selected);
            border-color: var(--selected);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            content: "";
            height: var(--checkbox-size);
            left: 0;
            position: absolute;
            width: var(--checkbox-size);
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 576px) {
  .br-cookiebar {
    .global {
      overflow-y: scroll;
      height: calc(100vh - 200px);
    }
    &.default {
      .global {
        overflow-y: unset;
        height: unset;
        margin-bottom: 156px !important;
        padding-bottom: 0 !important;
      }
    }
  }
}
@media only screen and (max-width: 627px) {
  .br-cookiebar {
    .actions {
      .br-button {
        &.secondary {
          margin-bottom: var(--spacing-scale-2xh);
          margin-right: 0;
        }
      }
    }
  }
}
</style>
