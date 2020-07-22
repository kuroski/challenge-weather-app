<template>
  <div class="w-full flex justify-center items-center">
    <unicon
      name="arrow-circle-down"
      class="text-white fill-current mr-2"
      width="22"
      height="22"
      :style="{
        transform: `rotate(${direction}deg)`
      }"
    />
    <span class="text-gray-200 text-xs">{{ compass }}</span>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "WindDirection",
  props: {
    direction: {
      type: Number,
      required: true
    },
    compass: {
      type: String,
      required: true
    }
  }
});
</script>
