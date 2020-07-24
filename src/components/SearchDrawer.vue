<template>
  <div
    class="bg-blue-200 fixed top-0 left-0 w-full h-full z-10 flex flex-col p-3"
  >
    <v-button icon @click="close" class="self-end">
      <unicon
        name="times"
        class="text-white fill-current"
        width="22"
        height="22"
      />
    </v-button>

    <form class="flex items-center mt-4" @submit.prevent="searchPlace">
      <div class="flex-1 relative">
        <unicon
          name="search"
          class="text-gray-500 fill-current absolute inset-y-0 items-center ml-4"
          width="22"
          height="22"
        />
        <input
          autofocus
          type="text"
          class="border border-gray-100 bg-transparent h-12 w-full pr-4 pl-12"
          :placeholder="i18n.t('placeholder.searchLocation')"
          v-model="searchTerm"
        />
      </div>
      <v-button
        :is-loading="!data && !error"
        type="primary"
        class="h-full ml-3"
      >
        {{ i18n.t("search") }}
      </v-button>
    </form>

    <ul class="flex flex-col mt-8">
      <li v-for="result in data" :key="result.id">
        <button
          class="border border-transparent hover:border hover:border-gray-500 text-gray-100 flex items-center justify-between py-6 px-4 w-full"
        >
          <span class="text-base font-medium">{{ result.title }}</span>
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
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from "@vue/composition-api";
import { useI18n } from "@/hooks/useI18n";
import useMetaWeatherApi from "@/hooks/useMetaWeatherApi";

export default defineComponent({
  name: "SearchDrawer",
  setup(_, { emit }) {
    const i18n = useI18n();
    const searchTerm = ref("");
    const places = reactive({
      error: null,
      data: [],
      cancel: null
    });
    const { searchFromQuery } = useMetaWeatherApi();

    function searchPlace() {
      if (places.cancel) places.cancel();

      places.data = null;
      places.error = null;
      places.cancel = null;

      const { data, error, cancel, exec } = searchFromQuery(searchTerm.value);
      exec();

      places.data = data;
      places.error = error;
      places.cancel = cancel;
    }

    return {
      i18n,
      searchTerm,
      searchPlace,
      ...toRefs(places),
      close: () => {
        if (places.cancel) places.cancel();
        emit("close");
      }
    };
  }
});
</script>
