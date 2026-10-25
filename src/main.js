import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import en from "./i18n/locales/en.json";
import ar from "./i18n/locales/ar.json";
import "./assets/styles.css";

// Report Web Vitals (console in dev; replace with analytics endpoint in prod)
function reportWebVital(metric) {
  console.log("[Web Vital]", metric.name, Math.round(metric.value), metric);
}

if (import.meta.env.DEV) {
  import("web-vitals").then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
    onCLS(reportWebVital);
    onINP(reportWebVital);
    onLCP(reportWebVital);
    onFCP(reportWebVital);
    onTTFB(reportWebVital);
  });
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("lang") || "en",
  fallbackLocale: "en",
  messages: { en, ar },
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount("#app");
