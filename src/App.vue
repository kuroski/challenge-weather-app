<template>
  <div v-if="error">
    <pre class="text-gray-100">{{ error }}</pre>
  </div>
  <div v-else-if="!data" class="loading">
    <img src="./assets/Shower.png" :alt="i18n.t('loading')" />
  </div>
  <transition v-else name="fade">
    <div>
      <search-drawer
        v-if="isSearchPlacesOpen"
        @close="isSearchPlacesOpen = false"
      />

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

        <highlight-tile
          :title="i18n.t('highlight.wind')"
          :value="data.weather.windSpeed"
          postfix="mph"
          class="mb-8"
        >
          <wind-direction
            :direction="data.weather.windDirection"
            :compass="data.weather.windDirectionCompass"
          />
        </highlight-tile>

        <highlight-tile
          :title="i18n.t('highlight.humidity')"
          :value="data.weather.humidity"
          postfix="%"
          class="mb-8"
        >
          <progress-bar :progress="data.weather.humidity" />
        </highlight-tile>

        <highlight-tile
          :title="i18n.t('highlight.visibility')"
          :value="data.weather.visibility"
          postfix="miles"
          class="mb-8"
        />

        <highlight-tile
          :title="i18n.t('highlight.airPressure')"
          :value="data.weather.airPressure"
          postfix="mb"
        />
      </div>

      <div class="mt-12 mb-8 text-gray-500 text-sm text-center">
        Kuroski @ DevChallenges.io
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, ref, computed } from "@vue/composition-api";
import { useI18n } from "@/hooks/useI18n";
import useMetaWeatherApi from "@/hooks/useMetaWeatherApi";
import WeatherSummary from "@/components/WeatherSummary";
import WeatherTile from "@/components/WeatherTile";
import SearchDrawer from "@/components/SearchDrawer";
import HighlightTile from "@/components/HighlightTile";
import WindDirection from "@/components/WindDirection";
import ProgressBar from "@/components/ProgressBar";

export default defineComponent({
  name: "App",
  components: {
    WeatherSummary,
    WeatherTile,
    SearchDrawer,
    HighlightTile,
    WindDirection,
    ProgressBar
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

.loading {
  @apply fixed inset-0 bg-blue-200 flex items-center justify-center;
  animation: fade 300ms ease-in-out;
}

.loading > img {
  animation: pulse 800ms ease-in-out infinite alternate;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-500 ease-in-out;
}

.fade-enter,
.fade-leave-to {
  @apply opacity-0;
}

@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes pulse {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.1);
  }
}
</style>
