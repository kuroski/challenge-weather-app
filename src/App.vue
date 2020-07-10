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

    <div class="weather-timeline">
      <div class="text-gray-100 bg-blue-200 py-4 px-4">
        <span>{{ i18n.t("tomorrow") }}</span>
        <img src="./assets/Shower.png" class="pt-3 pb-8 mx-auto" width="55" />
        <div class="w-full flex justify-between font-medium">
          <span class="mr-4">15℃</span>
          <span class="text-gray-200">15℃</span>
        </div>
      </div>

      <div class="text-gray-100 bg-blue-200 py-4 px-4">
        <span>{{ i18n.t("tomorrow") }}</span>
        <img src="./assets/Shower.png" class="pt-3 pb-8 mx-auto" width="55" />
        <div class="w-full flex justify-between font-medium">
          <span class="mr-4">15℃</span>
          <span class="text-gray-200">15℃</span>
        </div>
      </div>

      <div class="text-gray-100 bg-blue-200 py-4 px-4">
        <span>{{ i18n.t("tomorrow") }}</span>
        <img src="./assets/Shower.png" class="pt-3 pb-8 mx-auto" width="55" />
        <div class="w-full flex justify-between font-medium">
          <span class="mr-4">15℃</span>
          <span class="text-gray-200">15℃</span>
        </div>
      </div>

      <div class="text-gray-100 bg-blue-200 py-4 px-4">
        <span>{{ i18n.t("tomorrow") }}</span>
        <img src="./assets/Shower.png" class="pt-3 pb-8 mx-auto" width="55" />
        <div class="w-full flex justify-between font-medium">
          <span class="mr-4">15℃</span>
          <span class="text-gray-200">15℃</span>
        </div>
      </div>
    </div>

    <div class="p-5">
      <h2 class="text-gray-100 text-2xl mb-8">
        {{ i18n.t("highlight.title") }}
      </h2>

      <div
        class="text-gray-100 bg-blue-200 py-4 px-6 mb-8 flex flex-col items-center"
      >
        <span>{{ i18n.t("highlight.wind") }}</span>
        <div class="w-full flex justify-center items-end mt-2 mb-6">
          <span class="text-6xl font-bold">7</span>
          <span class="text-4xl leading-loose">mph</span>
        </div>
        <div class="w-full flex justify-center items-center">
          <unicon
            name="arrow-circle-up"
            class="text-white fill-current mr-2"
            width="22"
            height="22"
          />
          <span class="text-gray-200 text-xs">WSW</span>
        </div>
      </div>

      <div
        class="text-gray-100 bg-blue-200 py-4 px-6 flex flex-col items-center mb-8"
      >
        <span>{{ i18n.t("highlight.humidity") }}</span>
        <div class="w-full flex justify-center items-end mt-2 mb-6">
          <span class="text-6xl font-bold">84</span>
          <span class="text-4xl leading-loose">%</span>
        </div>
        <div class="w-full flex justify-center items-center">
          ...
        </div>
      </div>

      <div
        class="text-gray-100 bg-blue-200 py-4 px-6 flex flex-col items-center mb-8"
      >
        <span>{{ i18n.t("highlight.visibility") }}</span>
        <div class="w-full flex justify-center items-end mt-2">
          <span class="text-6xl font-bold mr-4">6,4</span>
          <span class="text-4xl leading-loose">miles</span>
        </div>
      </div>

      <div
        class="text-gray-100 bg-blue-200 py-4 px-6 flex flex-col items-center"
      >
        <span>{{ i18n.t("highlight.airPressure") }}</span>
        <div class="w-full flex justify-center items-end mt-2">
          <span class="text-6xl font-bold mr-4">998</span>
          <span class="text-4xl leading-loose">mb</span>
        </div>
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
  @apply relative bg-blue-200 px-5 pt-5 pb-24 flex flex-col items-center overflow-hidden;
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

.weather-timeline {
  @apply justify-center text-center p-12;
  display: grid;
  grid-template-columns: repeat(auto-fill, 120px);
  grid-gap: 15px;
}
</style>
