<template>
  <section class="template-detail-page">
    <div class="template-detail-copy">
      <router-link class="detail-back-link" to="/templates">
        <i class="bi bi-arrow-right"></i> {{ t('backToTemplates') }}
      </router-link>
      <span class="section-kicker">{{ t(template.tagKey) }}</span>
      <h1>{{ t(template.nameKey) }}</h1>
      <p class="template-detail-description">{{ t(template.descKey) }}</p>
      <ul class="template-detail-benefits">
        <li><i class="bi bi-check-circle-fill"></i> {{ t('templateBenefitOne') }}</li>
        <li><i class="bi bi-check-circle-fill"></i> {{ t('templateBenefitTwo') }}</li>
        <li><i class="bi bi-check-circle-fill"></i> {{ t('templateBenefitThree') }}</li>
      </ul>
      <div class="template-detail-actions">
        <router-link class="btn btn-success" to="/builder">
          {{ t('startBuilding') }} <i class="bi bi-arrow-up-left"></i>
        </router-link>
        <a class="btn btn-outline-primary" :href="`/templates/template${template.id}.html`">
          {{ t('openTemplate') }} <i class="bi bi-eye"></i>
        </a>
      </div>
    </div>
    <div class="template-detail-preview" :class="`template-preview--${template.id}`" aria-hidden="true">
      <div class="detail-paper">
        <div class="detail-sidebar">
          <div class="detail-avatar">AM</div>
          <span class="detail-line detail-line--light"></span>
          <span class="detail-line detail-line--short detail-line--light"></span>
          <span class="detail-small-heading"></span>
          <span class="detail-line detail-line--light"></span>
          <span class="detail-line detail-line--short detail-line--light"></span>
        </div>
        <div class="detail-paper-content">
          <span class="detail-name">{{ t('sampleName') }}</span>
          <span class="detail-role">{{ t('sampleRole') }}</span>
          <span class="detail-heading">{{ t('sampleExperience') }}</span>
          <span class="detail-line"></span>
          <span class="detail-line detail-line--short"></span>
          <span class="detail-heading">{{ t('sampleAbout') }}</span>
          <span class="detail-line"></span>
          <span class="detail-line detail-line--short"></span>
          <span class="detail-heading">{{ t('sampleSkillOne') }}</span>
          <span class="detail-skill-row"><i></i><i></i><i></i></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const templates = [
  { id: '1', nameKey: 'classicName', descKey: 'classicDesc', tagKey: 'classicTag' },
  { id: '2', nameKey: 'modernName', descKey: 'modernDesc', tagKey: 'modernTag' },
  { id: '3', nameKey: 'executiveName', descKey: 'executiveDesc', tagKey: 'executiveTag' },
]
const template = computed(() => templates.find((item) => item.id === route.params.id) || templates[0])
</script>
