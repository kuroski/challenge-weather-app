import { reactive, toRefs, ref } from "@vue/composition-api";

export default (url, options) => {
  let abortController;

  const state = reactive({
    result: null,
    error: null,
    isFetching: false
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

  const fetchData = async () => {
    abortController = new AbortController();
    state.isFetching = true;
    try {
      const response = await fetch(url, {
        signal: abortController.signal,
        ...options
      });
      const json = await response.json();
      state.result = json;
    } catch (error) {
      state.error = error;
    } finally {
      state.isFetching = false;
    }
  };

  return {
    ...toRefs(state),
    cancel,
    fetchData
  };
};
