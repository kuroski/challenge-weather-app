import {
  reactive,
  toRefs,
  onMounted,
  onUnmounted,
  getCurrentInstance
} from "@vue/composition-api";

export default (url, options) => {
  let abortController;

  const state = reactive({
    data: null,
    error: null,
    cancelled: undefined
  });

  const cancel = (message = "") => {
    if (!abortController) {
      throw new Error("Cannot cancel because no request has been made");
    }

    abortController.abort();
    if (state?.cancelled?.value) {
      state.cancelled.value = message;
    }
  };

  const exec = async () => {
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
  };

  if (getCurrentInstance()) {
    onMounted(exec);
    onUnmounted(() => {
      if (abortController) cancel("Component unmounted");
    });
  }

  return {
    ...toRefs(state),
    cancel,
    exec
  };
};
