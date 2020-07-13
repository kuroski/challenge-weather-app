import {
  reactive,
  toRefs,
  ref,
  onMounted,
  onUnmounted
} from "@vue/composition-api";

export default (url, options) => {
  let abortController;

  const state = reactive({
    data: null,
    error: null
  });
  const isCancelled = ref(false);
  const cancelledMessage = ref(undefined);

  const cancel = (message = "") => {
    if (!abortController) {
      throw new Error("Cannot cancel because no request has been made");
    }

    abortController.abort();
    isCancelled.value = true;
    cancelledMessage.value = message;
  };

  onMounted(async () => {
    abortController = new AbortController();
    try {
      const response = await fetch(url, {
        signal: abortController.signal,
        ...options
      });
      const json = await response.json();
      state.data = options?.decoder(json) || json;
    } catch (error) {
      state.error = error;
    }
  });

  onUnmounted(() => {
    if (abortController) cancel("Component unmounted");
  });

  return {
    ...toRefs(state),
    cancel
  };
};
