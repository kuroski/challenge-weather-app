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

    <weather-summary
      @searchPlaces="isSearchPlacesOpen = true"
      :weather="weatherSummary"
    />

    <div class="weather-timeline">
      <weather-tile
        v-for="weather in data.history"
        :key="weather.id"
        :weather="weather"
      />
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
          <span class="text-6xl font-bold">{{ data.weather.windSpeed }}</span>
          <span class="text-4xl leading-loose">mph</span>
        </div>
        <div class="w-full flex justify-center items-center">
          <unicon
            name="arrow-circle-down"
            class="text-white fill-current mr-2"
            width="22"
            height="22"
            :style="{
              transform: `rotate(${data.weather.windDirection}deg)`
            }"
          />
          <span class="text-gray-200 text-xs">{{
            data.weather.windDirectionCompass
          }}</span>
        </div>
      </div>

      <div
        class="text-gray-100 bg-blue-200 py-4 px-12 flex flex-col items-center mb-8"
      >
        <span>{{ i18n.t("highlight.humidity") }}</span>
        <div class="w-full flex justify-center items-end my-2">
          <span class="text-6xl font-bold">{{ data.weather.humidity }}</span>
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
              :style="{ width: `${data.weather.humidity}%` }"
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
          <span class="text-6xl font-bold mr-4">{{
            data.weather.visibility
          }}</span>
          <span class="text-4xl leading-loose">miles</span>
        </div>
      </div>

      <div
        class="text-gray-100 bg-blue-200 py-4 px-6 flex flex-col items-center"
      >
        <span>{{ i18n.t("highlight.airPressure") }}</span>
        <div class="w-full flex justify-center items-end mt-2">
          <span class="text-6xl font-bold mr-4">{{
            data.weather.airPressure
          }}</span>
          <span class="text-4xl leading-loose">mb</span>
        </div>
      </div>
    </div>

    <div class="mt-12 mb-8 text-gray-500 text-sm text-center">
      Kuroski @ DevChallenges.io
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "@vue/composition-api";
import { useI18n } from "@/hooks/useI18n";
import useMetaWeatherApi from "@/hooks/useMetaWeatherApi";
import WeatherSummary from "@/components/WeatherSummary";
import WeatherTile from "@/components/WeatherTile";

export default defineComponent({
  name: "App",
  components: {
    WeatherSummary,
    WeatherTile
  },
  setup() {
    const i18n = useI18n();
    const isSearchPlacesOpen = ref(false);

    const { getFromId } = useMetaWeatherApi();

    const BERLIN = 638242;
    const { data, error } = getFromId(BERLIN);
    // const { searchfromCurrentPosition } = useMetaWeatherApi();
    // const { data, error } = searchfromCurrentPosition();

    const weatherSummary = computed(() => ({
      icon: data.value.weather.icon,
      temperature: data.value.weather.temperature,
      state: data.value.weather.state,
      title: data.value.title
    }));

    return {
      data,
      error,
      i18n,
      isSearchPlacesOpen,
      weatherSummary
    };
  }
});
</script>

<style scoped>
.weather-timeline {
  @apply justify-center text-center p-12;
  display: grid;
  grid-template-columns: repeat(auto-fill, 120px);
  grid-gap: 15px;
}
</style>
