<template>
  <div v-if="error">
    <pre class="text-gray-100">{{ error }}</pre>
  </div>
  <div v-else-if="!data">
    <span class="text-gray-100">Loading...</span>
  </div>
  <div v-else>
    <div
      v-if="isSearchPlacesOpen"
      class="bg-blue-200 fixed top-0 left-0 w-full h-full z-10 flex flex-col p-3"
    >
      <v-button icon @click="isSearchPlacesOpen = false" class="self-end">
        <unicon
          name="times"
          class="text-white fill-current"
          width="22"
          height="22"
        />
      </v-button>

      <form class="flex items-center mt-4">
        <div class="flex-1 relative">
          <unicon
            name="search"
            class="text-gray-500 fill-current absolute inset-y-0 items-center ml-4"
            width="22"
            height="22"
          />
          <input
            type="text"
            class="border border-gray-100 bg-transparent h-12 w-full pr-4 pl-12"
            :placeholder="i18n.t('placeholder.searchLocation')"
          />
        </div>
        <v-button type="primary" class="h-full ml-3">
          {{ i18n.t("search") }}
        </v-button>
      </form>

      <ul class="flex flex-col mt-8">
        <li>
          <button
            class="border border-transparent hover:border hover:border-gray-500 text-gray-100 flex items-center justify-between py-6 px-4 w-full"
          >
            <span class="text-base font-medium">{{ data.title }}</span>
            <unicon
              name="angle-right"
              class="text-gray-500 fill-current"
              width="22"
              height="22"
            />
          </button>
        </li>
      </ul>
    </div>

    <div class="weather">
      <div class="flex justify-between w-full">
        <v-button shadow @click="isSearchPlacesOpen = true">
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

      <img :src="data.weather[0].icon" class="weather__icon" />

      <div class="self-center">
        <span class="text-gray-100 text-11xl">
          {{ data.weather[0].temperature }}
        </span>
        <span class="text-gray-200 text-6xl">℃</span>
      </div>

      <p class="text-gray-200 text-4xl mt-6 mb-12">
        {{ i18n.t(data.weather[0].state) }}
      </p>

      <div class="text-gray-200 flex items-center text-lg">
        <span>{{ i18n.t("today") }}</span>
        <span class="mx-4">.</span>
        <span>{{ i18n.d(new Date(), "short") }}</span>
      </div>

      <div class="text-gray-200 flex items-center mt-8">
        <unicon name="map-marker" class="fill-current" width="22" height="22" />
        <span class="ml-2">{{ data.title }}</span>
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
          <span class="text-6xl font-bold">
            {{ data.weather[0].windSpeed }}
          </span>
          <span class="text-4xl leading-loose">mph</span>
        </div>
        <div class="w-full flex justify-center items-center">
          <unicon
            name="arrow-circle-up"
            class="text-white fill-current mr-2"
            width="22"
            height="22"
            :style="{
              transform: `rotate(${data.weather[0].windDirection}deg)`
            }"
          />
          <span class="text-gray-200 text-xs">
            {{ data.weather[0].windDirectionCompass }}
          </span>
        </div>
      </div>

      <div
        class="text-gray-100 bg-blue-200 py-4 px-12 flex flex-col items-center mb-8"
      >
        <span>{{ i18n.t("highlight.humidity") }}</span>
        <div class="w-full flex justify-center items-end my-2">
          <span class="text-6xl font-bold">{{ data.weather[0].humidity }}</span>
          <span class="text-4xl leading-loose">%</span>
        </div>
        <div
          class="w-full flex flex-col justify-center items-center text-gray-200 font-bold"
        >
          <div class="flex items-center justify-between w-full">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
          <div class="bg-gray-100 w-full h-2 rounded mb-1 overflow-hidden">
            <div
              class="h-full bg-yellow"
              :style="{ width: `${data.weather[0].humidity}%` }"
            ></div>
          </div>
          <span class="self-end">%</span>
        </div>
      </div>

      <div
        class="text-gray-100 bg-blue-200 py-4 px-6 flex flex-col items-center mb-8"
      >
        <span>{{ i18n.t("highlight.visibility") }}</span>
        <div class="w-full flex justify-center items-end mt-2">
          <span class="text-6xl font-bold mr-4">
            {{ data.weather[0].visibility }}
          </span>
          <span class="text-4xl leading-loose">miles</span>
        </div>
      </div>

      <div
        class="text-gray-100 bg-blue-200 py-4 px-6 flex flex-col items-center"
      >
        <span>{{ i18n.t("highlight.airPressure") }}</span>
        <div class="w-full flex justify-center items-end mt-2">
          <span class="text-6xl font-bold mr-4">
            {{ data.weather[0].airPressure }}
          </span>
          <span class="text-4xl leading-loose">mb</span>
        </div>
      </div>
    </div>

    <div class="mt-12 mb-8 text-gray-500 text-sm text-center">
      Kuroski @ DevChallenges.io
    </div>

    <pre class="text-gray-400">
      {{ data }}
    </pre>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import { useI18n } from "@/hooks/useI18n";
import useMetaWeatherApi from "@/hooks/useMetaWeatherApi";

export default defineComponent({
  name: "App",
  setup() {
    const i18n = useI18n();
    const isSearchPlacesOpen = ref(false);

    const { getFromId } = useMetaWeatherApi();

    const BERLIN = 638242;
    const { data, error } = getFromId(BERLIN);

    return {
      data,
      error,
      i18n,
      isSearchPlacesOpen
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
