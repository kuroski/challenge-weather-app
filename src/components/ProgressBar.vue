<template>
  <div
    class="w-full flex flex-col justify-center items-center text-gray-200 font-bold"
  >
    <div class="flex items-center justify-between w-full">
      <span>0</span>
      <span>50</span>
      <span>100</span>
    </div>
    <div class="bg-gray-100 w-full h-2 rounded mb-1 overflow-hidden">
      <div class="h-full bg-yellow" :style="{ width: `${progress}%` }"></div>
    </div>
    <span class="self-end">%</span>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "ProgressBar",
  props: {
    progress: {
      type: Number,
      required: true
    }
  }
});
</script>
