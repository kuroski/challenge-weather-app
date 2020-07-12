<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    class="v-button"
    :class="{
      'v-button--fab': fab,
      'v-button--shadow': shadow,
      'v-button--icon': icon,
      [typeClass]: typeClass
    }"
  >
    <slot />
  </button>
</template>

<script>
import { defineComponent, computed } from "@vue/composition-api";

export default defineComponent({
  name: "VButton",
  props: {
    fab: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const typeClass = computed(() => props.type && `v-button--${props.type}`);
    return {
      typeClass
    };
  }
});
</script>

<style scoped>
.v-button {
  @apply bg-gray-400 text-gray-100 py-2 px-4 flex justify-center items-center;
}

.v-button--fab {
  @apply rounded-full w-10 h-10 p-0 text-xl;
}

.v-button--icon {
  @apply bg-transparent w-10 h-10 p-0 text-xl;
}

.v-button--primary {
  @apply bg-blue-100;
}

.v-button--shadow {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
