<template>
  <div class="br-tab" :class="verifiedClassesActive" :data-counter="counter">
    <nav class="tab-nav" :aria-label="label">
      <ul>
        <li
          v-for="(tab, index) in tabs"
          :key="tab.title"
          class="tab-item"
          :class="{ active: index == selectedIndex }"
          @click="selectTab(index)"
        >
          <template v-if="!tab.icon">
            <button
              v-tooltip="{
                text: tab.tooltipText,
                place: tab.tooltipPlace,
                type: tab.tooltipType,
                timer: tab.tooltipTimer,
              }"
              type="button"
              :data-panel="tab.id"
              :aria-label="tab.ariaLabel ? tab.ariaLabel : tab.id"
              @click="$emit('onTabItemClick', tab)"
            >
              <span class="name">
                {{ tab.title }}
              </span>
            </button>
          </template>

          <template v-if="tab.icon">
            <button
              v-tooltip="{
                text: tab.tooltipText,
                place: tab.tooltipPlace,
                type: tab.tooltipType,
                timer: tab.tooltipTimer,
              }"
              type="button"
              :data-panel="tab.id"
              :aria-label="tab.ariaLabel ? tab.ariaLabel : tab.id"
            >
              <span class="name">
                <span class="d-flex flex-column flex-sm-row">
                  <span class="icon mb-1 mb-sm-0 mr-sm-1">
                    <IconBase :icon-name="tab.icon" />
                  </span>
                  <span class="name">{{ tab.title }}</span>
                </span>
              </span>
            </button>
          </template>
          <span v-if="tab.results !== ''" class="results"> {{ tab.results }} </span>
        </li>
      </ul>
    </nav>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TooltipMixin from "../../mixins/TooltipMixin"
import IconBase from "../IconBase/IconBase.ce.vue"

const BrTab = {
  name: "brTab",
  components: {
    IconBase,
  },
  mixins: [TooltipMixin],
  provide() {
    return {
      parentTab: this,
    }
  },
  props: {
    /** **[OPCIONAL]** Aria-label para descrição da tabela. */
    label: {
      type: String,
      default: "Abas de Navegação Simples",
    },
    /** **[OPCIONAL]** Tipo das densidades do tab as opções válidas são "small", "medium" e "large" */
    density: {
      default: "small",
      type: String,
      validator: function (value) {
        return ["small", "medium", "large"].includes(value)
      },
    },
    /** **[OPCIONAL]** Aplica background escuro e inverte as cores das fontes. */
    inverted: {
      type: Boolean,
      default: false,
    },
    /** **[OPCIONAL]** Indica que o tab apresenta contadores. Se verdadeiro, utilizar o atributo 'results' do subcomponente 'br-tab-item'. */
    counter: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    /**
     * **[OPCIONAL]** Evento emitido quando oum item do br-tab é clicado.
     *
     * Referência sobre o consumo de eventos:
     * [Eventos Emitidos pelos Componentes](/?path=/story/eventos-emitidos-pelos-componentes--page)
     */
    "onTabItemClick",
  ],
  data() {
    return {
      tabs: [],
      selectedIndex: 0,
      densityProp: this.density,
    }
  },
  computed: {
    verifiedClassesActive() {
      return {
        small: this.densityProp === "small",
        medium: this.densityProp === "medium",
        large: this.densityProp === "large",
        "dark-mode": this.inverted,
      }
    },
  },
  created() {
    this.tabs = this.$children
  },
  mounted() {
    this.$nextTick(function () {
      if (this.tabs) {
        let foundActive = false

        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i].isActive) {
            this.selectTab(i)
            foundActive = true
            break
          }
        }

        if (!foundActive && this.tabs.length > 0) {
          this.selectTab(0)
        }
      }
    })
  },
  methods: {
    selectTab(i) {
      if (this.tabs) {
        this.selectedIndex = i
        this.tabs.forEach((tab, index) => {
          tab.setActive(index === i)
        })
      }
    },
    addTabItem(tabItem) {
      if (!this.tabs) {
        this.tabs = []
      }
      this.tabs.push(tabItem)
    },
  },
}

export default BrTab
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/tab/_tab";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");
</style>
