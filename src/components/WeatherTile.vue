<template>
  <div class="text-gray-100 bg-blue-200 py-4 px-4 flex flex-col justify-around">
    <span class="pb-3">{{ i18n.d(weather.date, "short") }}</span>
    <img
      :src="weather.icon"
      class="mx-auto"
      width="55"
      :alt="i18n.t(weather.state)"
      aria-hidden="true"
    />
    <div class="w-full flex justify-between font-medium pt-8">
      <span class="mr-4">{{ weather.maxTemperature }}℃</span>
      <span class="text-gray-200">{{ weather.minTemperature }}℃</span>
    </div>
  </div>
</template>

<script>
import { guard, number, object, string, date } from "decoders";
import { defineComponent } from "@vue/composition-api";
import { useI18n } from "@/hooks/useI18n";

export default defineComponent({
  name: "WeatherTile",
  props: {
    weather: {
      type: Object,
      required: true,
      validator(value) {
        const decoder = guard(
          object({
            date: date,
            icon: string,
            maxTemperature: number,
            minTemperature: number
          })
        );

        return decoder(value);
      }
    }
  },
  setup() {
    const i18n = useI18n();

    return {
      i18n
    };
  }
});
</script>
