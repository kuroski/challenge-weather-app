<template>
  <div class="weather">
    <div class="flex justify-between w-full">
      <v-button shadow @click="$emit('searchPlaces')">
        {{ i18n.t("btn.search-places") }}
      </v-button>

      <v-button fab>
        <unicon
          name="crosshair"
          class="text-white fill-current"
          width="22"
          height="22"
        />
      </v-button>
    </div>

    <img :src="weather.icon" class="weather__icon" />

    <div class="self-center">
      <span class="text-gray-100 text-11xl">{{ weather.temperature }}</span>
      <span class="text-gray-200 text-6xl">℃</span>
    </div>

    <p class="text-gray-200 text-4xl mt-6 mb-12">
      {{ i18n.t(weather.state) }}
    </p>

    <div class="text-gray-200 flex items-center text-lg">
      <span>{{ i18n.t("today") }}</span>
      <span class="mx-4">.</span>
      <span>{{ i18n.d(new Date(), "short") }}</span>
    </div>

    <div class="text-gray-200 flex items-center mt-8">
      <unicon name="map-marker" class="fill-current" width="22" height="22" />
      <span class="ml-2">{{ weather.title }}</span>
    </div>
  </div>
</template>

<script>
import { guard, number, object, string } from "decoders";
import { defineComponent } from "@vue/composition-api";
import { useI18n } from "@/hooks/useI18n";

export default defineComponent({
  name: "WeatherSummary",
  props: {
    weather: {
      type: Object,
      required: true,
      validator(value) {
        const decoder = guard(
          object({
            icon: string,
            temperature: number,
            state: string,
            title: string
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

<style scoped>
.weather {
  @apply relative bg-blue-200 px-5 pt-5 pb-24 flex flex-col items-center overflow-hidden;
}

.weather > * {
  @apply relative;
}

.weather::before {
  @apply absolute w-full h-full top-0 left-0 bg-contain bg-no-repeat bg-center;
  content: "";
  background-image: url("../assets/Cloud-background.png");
  opacity: 0.05;
  transform: scale(1.4) translateX(-0.5rem);
}

.weather__icon {
  @apply flex justify-center mt-20 mb-10;
  max-width: 150px;
}
</style>
