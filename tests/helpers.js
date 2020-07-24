import "@/plugins";
import { render } from "@testing-library/vue";
import { defineComponent, h } from "@vue/composition-api";
import { provideI18n } from "@/hooks/useI18n";
import messages from "@/i18n/messages";
import dateTimeFormats from "@/i18n/dateTimeFormats";

export const renderWithDependencies = (
  component,
  options = {},
  callback = a => a
) => {
  const mergedOptions = {
    ...options
  };

  const rootComponent = defineComponent({
    name: "Root",
    setup() {
      provideI18n({
        locale: "en-US",
        fallbackLocale: "en-US",
        messages,
        dateTimeFormats
      });
      return () => h(component);
    }
  });

  return render(rootComponent, mergedOptions, (vue, store, router) => {
    const result = callback(vue, store, router);
    return {
      vue,
      store,
      router,
      ...result
    };
  });
};

export const createEvent = name => {
  const evt = document.createEvent("Event");
  evt.initEvent(name, true, true);
  return evt;
};

export const flushPromises = () =>
  Promise.all([
    new Promise(setImmediate),
    new Promise(resolve => setTimeout(resolve, 5))
  ]);
