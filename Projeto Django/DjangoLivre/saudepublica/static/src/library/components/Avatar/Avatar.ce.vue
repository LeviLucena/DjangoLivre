<template>
  <span
    v-tooltip="{ text: tooltipText, place: tooltipPlace, type: tooltipType, timer: tooltipTimer }"
    class="br-avatar"
    :class="[
      {
        small: density === 'small',
        medium: density === 'medium',
        large: density === 'large',
      },
    ]"
  >
    <span v-if="isIcon || image" class="image">
      <IconBase v-if="isIcon" icon-name="user"></IconBase>
      <img v-else :src="image" alt="Avatar" loading="lazy" />
    </span>
    <span v-else class="image bg-support-01 text-secondary-01">
      {{ avatarLetter }}
    </span>
  </span>
</template>

<script>
import TooltipMixin from "../../mixins/TooltipMixin"
import IconBase from "../IconBase/IconBase.ce.vue"

const Avatar = {
  name: "brAvatar",
  components: {
    IconBase,
  },
  mixins: [TooltipMixin],
  props: {
    /**
     * Nome do usuário que será apresentado no avatar pela letra
     */
    name: {
      type: String,
      default: "John Doe",
      validator: function (val) {
        return val.trim().length > 1
      },
    },
    /**
     * Se informado define que o avatar apresentado será do tipo fotográfico
     */
    image: {
      type: String,
      validator: function (val) {
        return val.match(/^https?:\/\/[\w\d/.]*/g)
      },
      default: null,
    },
    /**
     * Se informado define que o avatar apresentado será do tipo ícone
     */
    iconic: {
      type: Boolean,
      default: false,
    },
    /**
     * Niveis de densidade para o elemento avatar, opções validas são "small",
     * "medium" e "large" e "smallint", "biginyt" e "default"
     */
    density: {
      type: String,
      default: "small",
      validator: function (value) {
        return ["small", "medium", "large"].includes(value)
      },
    },
  },
  computed: {
    isIcon() {
      return this.iconic && !this.image
    },
    avatarLetter() {
      return this.name[0].toUpperCase()
    },
  },
}

export default Avatar
</script>

<style lang="scss">
@import "~@govbr-ds/core/src/partial/scss/_base";
@import "~@govbr-ds/core/src/partial/scss/_utilities";
@import "~@govbr-ds/core/src/components/avatar/_avatar";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");
</style>
