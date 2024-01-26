<template>
  <div ref="breadcrumb" class="br-breadcrumb" :aria-label="label">
    <ul class="crumb-list">
      <li v-if="home && home.visible" class="crumb home" :title="home.title">
        <a
          v-tooltip="{
            text: home.tooltipText,
            place: home.tooltipPlace,
            type: home.tooltipType,
            timer: home.tooltipTimer,
          }"
          :href="home.url"
        >
          <BrButton density="small" circle>
            <span class="sr-only">{{ home.label }}</span>
            <IconBase icon-name="home"></IconBase>
          </BrButton>
        </a>
      </li>

      <li v-if="folder" class="crumb menu-mobil" @click="toggleList">
        <IconBase icon-name="chevron-right" class-name="icon"></IconBase>
        <BrButton density="small" circle>
          <IconBase :icon-name="getDinamycClassName"></IconBase>
          <span class="sr-only">Listar links do breadcrumb</span>
        </BrButton>
        <BrList v-if="isListVisible" density="medium">
          <template v-for="(crumb, index) in invisibleCrumbs" :key="index">
            <BrItem :title="crumb.label">
              <a :href="crumb.url" :target="crumb.target">
                {{ crumb.label }}
              </a>
            </BrItem>
          </template>
        </BrList>
      </li>
      <li v-for="(crumb, index) in visibleCrumbs" :key="index" class="crumb" :title="crumb.title">
        <IconBase icon-name="chevron-right" class-name="icon"></IconBase>
        <a
          v-tooltip="{
            text: crumb.tooltipText,
            place: crumb.tooltipPlace,
            type: crumb.tooltipType,
            timer: home.tooltipTimer,
          }"
          :href="crumb.url"
          :target="crumb.target"
        >
          {{ crumb.label }}
        </a>
      </li>

      <li v-if="active" class="crumb" data-active="active" :title="active.title">
        <IconBase icon-name="chevron-right" class-name="icon"></IconBase>
        <span
          v-tooltip="{
            text: active.tooltipText,
            place: active.tooltipPlace,
            type: active.tooltipType,
            timer: tooltipTimer,
          }"
          >{{ active.label }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
import TooltipMixin from "../../mixins/TooltipMixin"
import { parsePropStringToJSON } from "../../util/Utils"
import BrButton from "../Button/Button.ce.vue"
import IconBase from "../IconBase/IconBase.ce.vue"
import BrItem from "../Item/Item.ce.vue"
import BrList from "../List/List.ce.vue"

const Breadcrumb = {
  name: "br-breadcrumb",
  components: {
    BrButton,
    BrList,
    BrItem,
    IconBase,
  },
  mixins: [TooltipMixin],
  props: {
    /** Título do breabcrumb, utilizado para fins de acessibilidade */
    label: {
      type: String,
      validator: function (val) {
        return val.trim().length > 1
      },
    },
    /**
     * **[OBRIGATÓRIO]** Array de objetos que representam a lista de links do breadcrumb.
     *
     * O array deve seguir a estrutura abaixo:
     *
     *  ```
     * [
     *   {
     *     // [OBRIGATÓRIO] Rótulo do link
     *     label: 'string',
     *
     *     // [OBRIGATÓRIO] URL do link
     *     url: 'string',
     *
     *     // [OPCIONAL] Atributo target do link
     *     target: 'string',
     *
     *     // [OPCIONAL] Indica se o link é o inicial
     *     home: boolean,
     *
     *     // [OPCIONAL] Indica se o link está ativo
     *     active: boolean,
     *
     *     // [OPCIONAL] Texto do tooltip
     *     tooltipText: 'string',
     *
     *     // [OPCIONAL] Local aonde vai ser mostado o tooltip(top, right, left, bottom)
     *     tooltipPlace: 'string',
     *
     *     // [OPCIONAL] Tipo de tooltip(info, warning, error, success)
     *     tooltipType: 'string',
     *
     *     // [OPCIONAL] Tempo em que o tooltip fica aberto em milisegundos
     *     tooltipTimer: 'string'
     *   },
     *   // ...
     * ]
     * ```
     *
     * Quando passado como atributo, obrigatoriamente deve ser um array de objetos
     * convertido para string. Quando passado como propriedade, pode ser um array de
     * objetos propriamente dito.
     *
     * Referência: https://open-wc.org/guides/knowledge/attributes-and-properties
     */
    links: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      MOBILE_RESOLUTION: 575,
      crumbs: [],
      folder: false,
      isListVisible: false,
      folderIcon: "folder-plus",
    }
  },
  computed: {
    linksList() {
      const linksList = parsePropStringToJSON(this.links)
      linksList.forEach((crumb) => {
        crumb.visible = true
      })
      return linksList
    },
    home() {
      return this.crumbs.find((crumb) => crumb.home)
    },
    visibleCrumbs() {
      return this.crumbs.filter((crumb) => !crumb.home && !crumb.active && crumb.visible)
    },
    invisibleCrumbs() {
      return this.crumbs.filter((crumb) => !crumb.active && !crumb.visible)
    },
    active() {
      return this.crumbs.find((crumb) => crumb.active)
    },
    getDinamycClassName() {
      return "fas fa-" + this.folderIcon
    },
  },
  methods: {
    onClickOut(event) {
      if (this.$el.getRootNode().host !== event.target) {
        this.isListVisible = false
      }
    },
    toggleList() {
      this.isListVisible = !this.isListVisible
      if (this.isListVisible) {
        this.folderIcon = "folder-minus"
      } else {
        this.folderIcon = "folder-plus"
      }
    },
    setCrumbs() {
      this.crumbs = this.linksList
    },
    truncateCrumbs() {
      if (window.screen.width <= this.MOBILE_RESOLUTION) {
        for (let i = 0; i < this.crumbs.length - 1; i++) {
          this.crumbs[i].visible = false
          this.folder = true
        }
      } else {
        for (let i = 0; i < this.crumbs.length - 1; i++) {
          this.crumbs[i].visible = true
          this.folder = false
        }
        if (this.crumbs.length > 5) {
          for (let i = 1; i < this.crumbs.length - 2; i++) {
            this.crumbs[i].visible = false
            this.folder = true
          }
        }
      }
    },
  },
  watch: {
    links() {
      this.setCrumbs()
    },
  },
  beforeMount() {
    this.setCrumbs()
  },
  created() {
    window.addEventListener("resize", this.truncateCrumbs)
  },
  destroyed() {
    window.removeEventListener("resize", this.truncateCrumbs)
  },
  mounted() {
    this.truncateCrumbs()
    window.document.addEventListener("click", this.onClickOut)
  },
}

export default Breadcrumb
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base.scss";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/partial/scss/core-base.scss";
@import "~@govbr-ds/core/src/components/button/_button";
@import "~@govbr-ds/core/src/components/breadcrumb/_mixins";
@import "~@govbr-ds/core/src/components/list/_list";
@import "~@govbr-ds/core/src/components/item/_item";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");

:host {
  @include breadcrumb-configs;
  @include breadcrumb-crumb;
}

.br-breadcrumb {
  position: relative;
  .home {
    a {
      &:not(:disabled) {
        &:hover {
          background-image: none;
        }
      }
    }
  }
  .menu-mobil {
    padding-right: 5px;
    .icon {
      &:before {
        margin-left: -6px;
      }
    }
  }
  .crumb {
    .br-list {
      a {
        text-overflow: clip;
        white-space: normal;
      }
    }
  }
  .br-list {
    background-color: var(--color-secondary-01);
    box-shadow: var(--surface-shadow-sm);
    position: absolute;
    top: var(--spacing-scale-5x);
    min-width: max-content;
    z-index: 1;
    .br-item {
      padding: var(--spacing-scale-2x);
      &:not(disabled) {
        &:hover {
          background-image: linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)));
        }
      }
      a {
        &:not(disabled) {
          &:hover {
            background-image: none;
          }
        }
      }
    }
  }
  @media (min-width: 575px) {
    .br-list {
      left: 60px;
    }
  }
}
</style>
