<template>
  <div class="text-gray-100 bg-blue-200 py-4 px-6 flex flex-col items-center">
    <span>{{ title }}</span>
    <div class="w-full flex justify-center items-end mt-2">
      <span class="text-6xl font-bold mr-4">{{ value }}</span>
      <span class="text-4xl leading-loose">{{ postfix }}</span>
    </div>
    <slot />
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "HighlightTile",
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    postfix: {
      type: String,
      required: true
    }
  }
});
</script>
