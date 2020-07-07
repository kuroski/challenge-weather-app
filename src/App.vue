<template>
  <div>
    <div class="weather">
      <div class="flex justify-between">
        <v-button shadow>
          {{ i18n.t("btn.search-places") }}
        </v-button>

        <v-button fab>
          <!-- <crosshairs-gps-icon /> -->
          =
        </v-button>
      </div>

      <div class="flex justify-center">
        <img src="./assets/Shower.png" />
      </div>
    </div>
  </div>
</template>

<script>
// import CrosshairsGpsIcon from "vue-material-design-icons/CrosshairsGps";
import { defineComponent } from "@vue/composition-api";
import { useI18n } from "@/hooks/i18n";

export default defineComponent({
  name: "App",
  components: {
    // CrosshairsGpsIcon
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
  @apply relative bg-blue-200 p-5;
}

.weather > * {
  @apply relative;
}

.weather::before {
  @apply absolute w-full h-full top-0 left-0 bg-contain bg-no-repeat bg-center opacity-25;
  content: "";
  background-image: url("./assets/Cloud-background.png");
}
</style>
