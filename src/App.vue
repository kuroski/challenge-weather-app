<template>
  <div>
    <div class="weather">
      <div class="flex justify-between w-full">
        <v-button shadow>
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

      <img src="./assets/Shower.png" class="weather__icon" />

      <div class="self-center">
        <span class="text-gray-100 text-11xl">15</span>
        <span class="text-gray-200 text-6xl">℃</span>
      </div>

      <p class="text-gray-200 text-4xl mt-6 mb-12">
        {{ i18n.t("weather.shower") }}
      </p>

      <div class="text-gray-200 flex items-center text-lg">
        <span>{{ i18n.t("today") }}</span>
        <span class="mx-4">.</span>
        <span>{{ i18n.d(new Date(), "short") }}</span>
      </div>

      <div class="text-gray-200 flex items-center mt-8">
        <unicon name="map-marker" class="fill-current" width="22" height="22" />
        <span class="ml-2">Berlin</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { useI18n } from "@/hooks/i18n";

export default defineComponent({
  name: "App",
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
  @apply relative bg-blue-200 p-5 flex flex-col items-center;
}

.weather > * {
  @apply relative;
}

.weather::before {
  @apply absolute w-full h-full top-0 left-0 bg-contain bg-no-repeat bg-center;
  content: "";
  background-image: url("./assets/Cloud-background.png");
  opacity: 0.05;
  transform: scale(1.4) translateX(-0.5rem);
}

.weather__icon {
  @apply flex justify-center mt-20 mb-10;
  max-width: 150px;
}
</style>
