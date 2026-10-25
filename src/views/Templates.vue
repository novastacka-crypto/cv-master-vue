<template>
  <div class="templates-section templates-page">
    <div class="templates-heading">
      <span class="section-kicker">{{ t("templatesKicker") }}</span>
      <h1 class="templates-title">{{ t("chooseTemplate") }}</h1>
      <p class="templates-sub">{{ t("chooseTemplateSub") }}</p>
    </div>
    <div class="tgrid">
      <div v-for="tmpl in templates" :key="tmpl.id" class="tcard">
        <router-link
          class="tpvw"
          :class="`template-preview--${tmpl.id}`"
          :to="`/templates/${tmpl.id}`"
          :aria-label="t('viewTemplateDetails', { template: t(tmpl.nameKey) })"
        >
          <div class="mini-resume">
            <div class="mini-resume-sidebar">
              <span class="mini-avatar"></span>
              <span class="mini-block mini-block--light"></span>
              <span
                class="mini-block mini-block--short mini-block--light"
              ></span>
              <span class="mini-mini-title"></span>
              <span class="mini-block mini-block--light"></span>
              <span
                class="mini-block mini-block--short mini-block--light"
              ></span>
            </div>
            <div class="mini-resume-main">
              <span class="mini-name"></span>
              <span class="mini-role"></span>
              <span class="mini-section-title"></span>
              <span class="mini-block"></span>
              <span class="mini-block mini-block--short"></span>
              <span
                class="mini-section-title mini-section-title--second"
              ></span>
              <span class="mini-block"></span>
              <span class="mini-block mini-block--short"></span>
            </div>
          </div>
          <span class="template-preview-label">{{
            t("templatePreviewLabel")
          }}</span>
        </router-link>
        <div class="template-card-content">
          <span class="template-card-tag">{{ t(tmpl.tagKey) }}</span>
          <h2 class="ttitle">{{ t(tmpl.nameKey) }}</h2>
          <p class="text-muted">{{ t(tmpl.descKey) }}</p>
        </div>
        <a
          :href="`templates/template${tmpl.id}.html`"
          class="btn btn-success w-100"
        >
          {{ t("openTemplate") }} <i class="bi bi-arrow-up-left"></i>
        </a>
      </div>
    </div>
    <div class="templates-note">
      <i class="bi bi-lightbulb"></i>
      <span>{{ t("templatesNote") }}</span>
      <router-link to="/builder"
        >{{ t("startBuilding") }} <i class="bi bi-arrow-left"></i
      ></router-link>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const templates = [
  {
    id: "1",
    nameKey: "classicName",
    descKey: "classicDesc",
    tagKey: "classicTag",
  },
  {
    id: "2",
    nameKey: "modernName",
    descKey: "modernDesc",
    tagKey: "modernTag",
  },
  {
    id: "3",
    nameKey: "executiveName",
    descKey: "executiveDesc",
    tagKey: "executiveTag",
  },
];
</script>
