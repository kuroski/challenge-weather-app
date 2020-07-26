import { ref, watchEffect } from "@vue/composition-api";

export default (key, initialValue) => {
  const storedValue = ref(initialValue);
  const value = watchEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        setValue(item);
        return storedValue;
      }

      return JSON.parse(item);
    } catch (error) {
      console.error(error);
      return storedValue;
    }
  });

  function setValue(newValue) {
    try {
      storedValue.value =
        newValue instanceof Function ? newValue(value) : newValue;
      window.localStorage.setItem(key, JSON.stringify(storedValue.value));
    } catch (error) {
      console.error(error);
    }
  }

  return [value, setValue];
};
