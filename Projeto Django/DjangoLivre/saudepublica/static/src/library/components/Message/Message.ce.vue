<template>
  <div v-if="active && !feedback" class="br-message" :class="stateClass" role="alert">
    <div v-if="showIcon" class="icon">
      <IconBase :icon-name="checkIconState(state)" class-name="fa-lg"></IconBase>
    </div>
    <div class="content">
      <!-- Se o usuario do componente nao passar a propriedade message indica que ele vai usar o slot -->
      <div v-if="!message">
        <strong v-if="title">{{ title }}</strong>
        <br v-if="title && !inline" />
        <slot></slot>
      </div>
      <div v-else>
        <span class="message-title mr-1">
          {{ title }}
        </span>
        <span class="message-body">
          {{ message }}
        </span>
      </div>
    </div>
    <div v-if="closable && !feedback" class="close">
      <button class="br-button circle small" type="button" aria-label="Fechar" @click="dismiss()">
        <IconBase icon-name="times"></IconBase>
      </button>
    </div>
  </div>
  <p v-if="feedback">
    <span class="feedback" role="alert" :class="stateClass">
      <IconBase v-if="showIcon" :icon-name="checkIconState(state)" />
      <div v-if="!message">
        <slot></slot>
      </div>
      <div v-else>
        {{ message }}
      </div>
    </span>
  </p>
</template>

<script>
import IconBase from "../IconBase/IconBase.ce.vue"
const Message = {
  name: "brMessage",
  components: {
    IconBase,
  },
  props: {
    /**
     * **[OPCIONAL]** Mensagem contextual, refere-se diretamente à ação do usuário sobre algum Componente. Por exemplo, a mensagem de validação de campo de texto.
     */
    feedback: {
      default: false,
      type: Boolean,
    },
    /**
     * **[OBRIGATÓRIO]** Define os estados. **state = "info | warning | danger |success"**
     */
    state: {
      default: "info",
      type: String,
      validator: function (value) {
        return ["info", "warning", "danger", "success"].includes(value)
      },
    },
    /**
     * **[OPCIONAL]** Por padrão, o título é posicionado no início, ACIMA da mensagem. Serve dar destaque à mensagem textual. Não disponível para mensagem do tipo feedback.
     */
    title: {
      type: String,
      default: "",
    },
    /**
     * **[OBRIGATÓRIO]** Define se a mensagem deve ser exibida.
     */
    message: {
      type: String,
      default: "",
    },
    /**
     * **[OPCIONAL]** Para que a propriedade "title" seja incluída no início, NA MESMA LINHA da mensagem.
     */
    inline: {
      default: false,
      type: Boolean,
    },
    /**
     * **[OPCIONAL]** Tem a função de ocultar o Componente Message da tela por meio do botão de fechar. Não disponível para mensagem do tipo feedback.
     */
    closable: {
      default: false,
      type: Boolean,
    },
    /**
     * **[OPCIONAL]** Tem a função de ocultar/mostrar o ícone da Message da tela.
     */
    showIcon: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      active: true,
    }
  },
  computed: {
    stateClass() {
      return [
        {
          info: this.state === "info",
          warning: this.state === "warning",
          danger: this.state === "danger",
          success: this.state === "success",
        },
      ]
    },
  },
  methods: {
    dismiss() {
      this.active = false
    },
    checkIconState() {
      const iconMap = {
        success: "check-circle",
        warning: "exclamation-triangle",
        danger: "times-circle",
        info: "info-circle",
      }
      return iconMap[this.state] || "check-circle"
    },
  },
}

export default Message
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/message/_message";
@import "~@govbr-ds/core/src/components/button/_button";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");
</style>
