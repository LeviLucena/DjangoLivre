<template>
  <div v-if="displayNotification" class="br-notification" :class="{ close: !displayNotification }">
    <div v-if="hasHeader" class="notification-header">
      <div class="row">
        <div class="col-10">
          <template v-if="title">
            <span class="text-bold">{{ title }}</span>
            <br />
          </template>
          <template v-if="subtitle">
            <small>
              <a>{{ subtitle }}</a>
            </small>
            <br />
          </template>
          <slot name="header"></slot>
        </div>
        <div v-if="!disableCloseButton" class="col-2">
          <div class="text-right">
            <br-button id="close" circle icon="times" aria-label="Fechar" @click="close()"> </br-button>
          </div>
        </div>
      </div>
    </div>
    <div class="notification-body">
      <BrTab v-if="hasTabs">
        <BrTabItem
          v-for="(notification, indexTab) in notificationsList"
          :key="indexTab"
          :title="notification.tab.title"
          :icon="notification.tab.icon"
          :is-active="notification.tab.isActive"
          :tooltip-text="notification.tab.tooltipText"
          :tooltip-place="notification.tab.tooltipPlace"
          :tooltip-type="notification.tab.tooltipType"
          :tooltip-timer="notification.tab.tooltipTimer"
        >
          <BrList>
            <div v-for="(item, indexItem) in notification.itens" :key="'tab' + indexTab + '-item' + indexItem">
              <a
                v-if="item.href"
                v-tooltip="{
                  text: item.tooltipText,
                  place: item.tooltipPlace,
                  type: item.tooltipType,
                  timer: item.tooltipTimer,
                }"
                :href="item.href"
              >
                <button
                  class="br-item"
                  :class="{
                    active: item.state == 'active',
                    disabled: item.state == 'disabled',
                    selected: item.state == 'selected',
                  }"
                  type="button"
                >
                  <span
                    v-if="item.tag"
                    class="br-tag status small"
                    :class="{
                      warning: item.tag == 'warning',
                      success: item.tag == 'success',
                      danger: item.tag == 'danger',
                      info: item.tag == 'info',
                    }"
                  ></span>
                  <div v-if="item.title" class="text-bold">
                    {{ item.title }}
                  </div>
                  <span v-if="item.timeInfo" class="text-medium mb-2">{{ item.timeInfo }}</span>
                  <IconBase v-if="item.icon" :icon-name="item.icon"></IconBase>
                  {{ item.text }}
                </button>
              </a>
              <button
                v-else
                v-tooltip="{
                  text: item.tooltipText,
                  place: item.tooltipPlace,
                  type: item.tooltipType,
                  timer: item.tooltipTimer,
                }"
                class="br-item"
                :class="{
                  active: item.state == 'active',
                  disabled: item.state == 'disabled',
                  selected: item.state == 'selected',
                }"
                type="button"
              >
                <span
                  v-if="item.tag"
                  class="br-tag status small"
                  :class="{
                    warning: item.tag == 'warning',
                    success: item.tag == 'success',
                    danger: item.tag == 'danger',
                    info: item.tag == 'info',
                  }"
                ></span>
                <div v-if="item.title" class="text-bold">
                  {{ item.title }}
                </div>
                <span v-if="item.timeInfo" class="text-medium mb-2">{{ item.timeInfo }}</span>
                <IconBase v-if="item.icon" :icon-name="item.icon"></IconBase>
                {{ item.text }}
              </button>
              <BrDivider></BrDivider>
            </div>
          </BrList>
        </BrTabItem>
      </BrTab>
    </div>
  </div>
</template>

<script>
import TooltipMixin from "../../mixins/TooltipMixin"
import { parsePropStringToJSON } from "../../util/Utils.js"
import BrButton from "../Button/Button.ce.vue"
import BrDivider from "../Divider/Divider.ce.vue"
import IconBase from "../IconBase/IconBase.ce.vue"
import BrList from "../List/List.ce.vue"
import BrTab from "../Tab/Tab.ce.vue"
import BrTabItem from "../Tab/TabItem.ce.vue"

const Notification = {
  name: "brNotification",
  components: {
    BrButton,
    BrDivider,
    IconBase,
    BrList,
    BrTab,
    BrTabItem,
  },
  mixins: [TooltipMixin],
  emits: ["close"],
  props: {
    /**
     * **[OPCIONAL]** Título da lista de notificações, localizado na seção dos dados do usuário.
     * */
    title: {
      type: String,
    },
    /**
     * **[OPCIONAL]** Subtítulo da lista de notificações, localizado na seção dos dados do usuário.
     * */
    subtitle: {
      type: String,
    },
    /**
     * **[OPCIONAL]** Remove botão fechar no cabeçalho das notificações.
     * */
    disableCloseButton: {
      type: Boolean,
      default: false,
    },
    /**
     * **[OBRIGATÓRIO]** Array de objetos que representam a lista de notificações
     * separadas por abas.
     *
     * O array deve seguir a estrutura abaixo:
     *
     * ```
     * [
     *   {
     *     // [OBRIGATÓRIO] Objeto que representa a aba de notificações
     *     tab: {
     *       // [OPCIONAL] Título da aba
     *       title: 'string',
     *
     *       // [OPCIONAL] Ícone de aba
     *       icon: 'string',
     *
     *       // [OPCIONAL] Texto do tooltip
     *       tooltipText: 'string',
     *
     *       // [OPCIONAL] Local aonde vai ser mostado o tooltip(top, right, left, bottom)
     *       tooltipPlace: 'string',
     *
     *       // [OPCIONAL] Tipo de tooltip(info, warning, error, success)
     *       tooltipType: 'string',
     *
     *        // [OPCIONAL] Tempo em que o tooltip fica aberto em milisegundos
     *       tooltipTimer: 'string'
     *     },
     *     // [OBRIGATÓRIO] Itens da notificação
     *     itens: [
     *       {
     *         // [OBRIGATÓRIO] Texto do item da notificação
     *         text: 'string',
     *
     *         // [OBRIGATÓRIO] Estado do item da notificação
     *         state: 'string',
     *
     *         // [OPCIONAL] Ícone do item da notificação
     *         icon: 'string',
     *
     *         // [OPCIONAL] Título do item da notificação
     *         title: 'string',
     *
     *         // [OPCIONAL] URL do item da notificação
     *         href: 'string',
     *
     *         // [OPCIONAL] Tag do item da notificação
     *         tag: 'string',
     *
     *         // [OPCIONAL] Data/hora do item da notificação
     *         timeInfo: 'string',
     *
     *         // [OPCIONAL] Texto do tooltip
     *         tooltipText: 'string',
     *
     *         // [OPCIONAL] Local aonde vai ser mostado o tooltip(top, right, left, bottom)
     *         tooltipPlace: 'string',
     *
     *         // [OPCIONAL] Tipo de tooltip(info, warning, error, success)
     *         tooltipType: 'string',
     *
     *         // [OPCIONAL] Tempo em que o tooltip fica aberto em milisegundos
     *         tooltipTimer: 'string'
     *       },
     *       // ...
     *     ]
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
    notifications: {
      type: [String, Object],
      default: null,
    },
    /**
     * **[OPCIONAL]** Exibe a tela de notificações ao carregar a pagina.
     * */
    showNotification: {
      type: [Boolean, String],
      default: false,
    },
  },
  data() {
    return {
      displayNotification: this.showNotification,
      selectedIndex: 0,
      dataNotificationsList: null,
    }
  },
  watch: {
    showNotification(newVal) {
      this.displayNotification = newVal
    },
  },
  computed: {
    hasHeader: function () {
      return this.title || this.subtitle || !this.disableCloseButton
    },
    hasTabs: function () {
      return this.notificationsList.some((notification) => notification.tab !== undefined)
    },
    notificationsList: function () {
      if (this.notifications) {
        return parsePropStringToJSON(this.notifications)
      }
    },
  },

  methods: {
    close() {
      this.displayNotification = false
      this.$emit("close")
    },
  },
}

export default Notification
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/notification/_notification";
@import "~@govbr-ds/core/src/components/tag/_tag";
@import "~@govbr-ds/core/src/components/tab/_tab";
@import "~@govbr-ds/core/src/components/item/_item";
@import "~@govbr-ds/core/src/components/list/_list";
@import "~@govbr-ds/core/src/components/button/_button";
@import "~@govbr-ds/core/src/components/divider/_divider";
@import "~@govbr-ds/core/src/components/scrim/_scrim";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");
</style>
