import Vue from "vue";
import VueI18n from "vue-i18n";
import { ref, watch, provide, inject } from "@vue/composition-api";

function createI18n(options) {
  Vue.use(VueI18n);
  const i18n = new VueI18n(options);

  const vm = new Vue({
    i18n
  });

  const locale = ref(i18n.locale);

  watch(locale, () => {
    i18n.locale = locale.value;
  });

  return {
    locale,
    t: vm.$t.bind(vm),
    tc: vm.$tc.bind(vm),
    te: vm.$te.bind(vm),
    d: vm.$d.bind(vm),
    n: vm.$n.bind(vm)
  };
}

const i18nSymbol = Symbol();

export function provideI18n(options) {
  const i18n = createI18n(options);
  provide(i18nSymbol, i18n);
}

export function useI18n() {
  const i18n = inject(i18nSymbol);
  if (!i18n) throw new Error("You must provide a i18n instance!");
  return i18n;
}
