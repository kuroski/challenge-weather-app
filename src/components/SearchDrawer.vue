<template>
  <div
    class="bg-blue-200 fixed top-0 left-0 w-full h-full z-10 flex flex-col p-3"
  >
    <v-button icon @click="$emit('close')" class="self-end">
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
          <span class="text-base font-medium">{{ title }}</span>
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
import { defineComponent } from "@vue/composition-api";
import { useI18n } from "@/hooks/useI18n";

export default defineComponent({
  name: "SearchDrawer",
  props: {
    title: {
      type: String,
      required: true
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
