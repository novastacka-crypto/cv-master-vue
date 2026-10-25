<template>
  <a class="skip-link" href="#main-content">{{ t("skipToContent") }}</a>
  <cv-site-header base="./" :lang="store.lang" :theme="store.theme" />
  <main id="main-content" class="app-main" tabindex="-1">
    <router-view />
  </main>
  <cv-site-footer base="./" :lang="store.lang" />
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useResumeStore } from "./stores/resume";

const store = useResumeStore();
const { t, locale } = useI18n();
const route = useRoute();

window.cvSiteTranslate = t;
window.cvSiteSetLanguage = (lang) => {
  store.setLang(lang);
  locale.value = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
};
window.cvSiteSetTheme = (theme) => store.setTheme(theme);

function setMetaContent(selector, content) {
  const meta = document.querySelector(selector);
  if (meta) meta.setAttribute("content", content);
}

function updatePageMetadata() {
  const page =
    route.name === "Builder"
      ? "builder"
      : route.name === "Templates"
        ? "templates"
        : route.name === "TemplateDetail"
          ? "templateDetail"
          : route.name === "Account"
            ? "account"
            : "home";
  const title = t(`seo${page[0].toUpperCase()}${page.slice(1)}Title`);
  const description = t(`seo${page[0].toUpperCase()}${page.slice(1)}Description`);

  document.title = title;
  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent(
    'meta[property="og:locale"]',
    locale.value === "ar" ? "ar_AR" : "en_US",
  );
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
}

watch([() => route.name, locale], updatePageMetadata);

onMounted(() => {
  document.documentElement.lang = store.lang;
  document.documentElement.dir = store.lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("dark", store.theme === "dark");
  updatePageMetadata();
});
</script>

<style scoped>
.skip-link {
  position: fixed;
  z-index: 2000;
  top: 12px;
  left: 12px;
  padding: 11px 16px;
  transform: translateY(-160%);
  border-radius: 10px;
  background: #176b5b;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(23, 58, 53, 0.2);
}

.skip-link:focus {
  transform: translateY(0);
}
</style>
