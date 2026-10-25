<template>
  <section class="cv-add-section builder-page">
    <div class="builder-intro">
      <span class="section-kicker">{{ t("builderKicker") }}</span>
      <h1 class="cv-main-title">{{ t("buildTitle") }}</h1>
      <p>{{ t("builderIntro") }}</p>
    </div>
    <div class="cv-quickstart">
      <div class="quickstart-actions">
        <button class="cv-import-btn" @click="downloadPDF">
          <i class="bi bi-download"></i> {{ t("downloadPdf") }}
        </button>
        <button
          ref="previewTrigger"
          class="preview-button"
          @click="openPreview"
        >
          <i class="bi bi-eye"></i> {{ t("livePreview") }}
        </button>
        <button
          class="color-picker-toggle-btn"
          :class="{ active: showColors }"
          :aria-expanded="showColors"
          aria-controls="accentColors"
          @click="showColors = !showColors"
        >
          <i class="bi bi-palette"></i> {{ t("colors") }}
        </button>
        <button class="cv-import-btn" @click="store.exportJSON()">
          <i class="bi bi-file-earmark-arrow-down"></i> Export JSON
        </button>
        <button class="cv-import-btn" @click="triggerImportJson()">
          <i class="bi bi-file-earmark-arrow-up"></i> Import JSON
        </button>
        <button class="cv-import-btn" style="background:linear-gradient(135deg,#ef4444,#dc2626);" @click="store.resetAll()">
          <i class="bi bi-trash"></i> Reset
        </button>
      </div>
      <input ref="importJsonInput" type="file" accept=".json" style="display:none" @change="handleImportJson" />
      <input
        id="importFile"
        type="file"
        accept=".json,.txt"
        style="display: none"
      />
    </div>

    <div class="color-palette-wrapper">
      <div
        v-if="showColors"
        id="accentColors"
        class="color-palette show"
        role="radiogroup"
        :aria-label="t('accentColor')"
      >
        <button
          v-for="(color, index) in colors"
          :key="color"
          type="button"
          role="radio"
          class="color-option"
          :class="{ selected: store.accentColor === color }"
          :style="{ backgroundColor: color }"
          :aria-label="t('selectAccentColor', { color })"
          :aria-checked="store.accentColor === color"
          :tabindex="
            store.accentColor === color ||
            (!colors.includes(store.accentColor) && index === 0)
              ? 0
              : -1
          "
          @click="store.setAccentColor(color)"
          @keydown="handleColorKeydown($event, index)"
        ></button>
      </div>
    </div>

    <div class="user-info-section">
      <h2 class="user-info-header">
        <i class="bi bi-person-circle"></i> {{ t("personalInfo") }}
      </h2>
      <p class="user-info-description">{{ t("personalInfoHint") }}</p>
      <div class="user-info-grid">
        <div class="user-info-field">
          <label for="resumeFullName">{{ t("fullName") }}</label>
          <input
            id="resumeFullName"
            v-model="store.fullName"
            autocomplete="name"
          />
        </div>
        <div class="user-info-field">
          <label for="resumeEmail">{{ t("email") }}</label>
          <input
            id="resumeEmail"
            v-model="store.email"
            type="email"
            autocomplete="email"
          />
        </div>
        <div class="user-info-field">
          <label for="resumePhone">{{ t("phone") }}</label>
          <input
            id="resumePhone"
            v-model="store.phone"
            type="tel"
            autocomplete="tel"
          />
        </div>
        <div class="user-info-field">
          <label for="resumePortfolio">{{ t("portfolio") }}</label>
          <input
            id="resumePortfolio"
            v-model="store.portfolio"
            type="url"
            autocomplete="url"
          />
        </div>
        <div class="user-info-field">
          <label for="resumeGithub">{{ t("github") }}</label>
          <input
            id="resumeGithub"
            v-model="store.github"
            type="url"
            autocomplete="url"
          />
        </div>
        <div class="user-info-field user-profile-photo">
          <div v-if="!store.photo" class="photo-upload-control">
            <input
              id="profilePhotoInput"
              ref="photoInput"
              class="visually-hidden"
              type="file"
              accept="image/*"
              @change="handlePhoto"
            />
            <label
              for="profilePhotoInput"
              class="photo-upload-box"
              :style="dragOver ? { background: 'rgba(99,102,241,0.15)' } : {}"
              @dragover.prevent="dragOver = true"
              @dragleave="dragOver = false"
              @drop.prevent="handleDrop"
            >
              <i class="bi bi-cloud-arrow-up" aria-hidden="true"></i>
              <span>{{ t("choosePhoto") }}</span>
              <small>{{ t("orDragDrop") }}</small>
            </label>
          </div>
          <div v-if="store.photo" class="photo-preview-container">
            <img
              :src="store.photo"
              class="user-photo-preview"
              :alt="t('profilePhoto')"
            />
            <button type="button" class="remove-photo-btn" @click="removePhoto">
              <i class="bi bi-trash" aria-hidden="true"></i> {{ t("remove") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="cv-grid" role="group" :aria-label="t('resumeSections')">
      <button
        v-for="sec in sections"
        :key="sec.key"
        type="button"
        class="cv-card"
        @click="openModal(sec)"
      >
        <span class="icon-main" aria-hidden="true"
          ><i :class="sec.icon"></i
        ></span>
        <span class="card-title">{{ t(sec.titleKey) }}</span>
        <span class="card-desc">{{ t(sec.descKey) }}</span>
      </button>
    </div>

    <div class="cv-preview-wrap">
      <h2 class="cv-preview-main-label">
        <i class="bi bi-eye" aria-hidden="true"></i> {{ t("resumePreview") }}
      </h2>
      <div class="cv-preview-area">
        <div v-if="!hasData" role="status" style="color: #94a3b8">
          {{ t("noInfoYet") }}
        </div>
        <template v-for="sec in sections" :key="sec.key">
          <div v-if="items(sec.key).length" class="cv-preview-section">
            <div class="cv-preview-title" :style="{ color: store.accentColor }">
              {{ t(sec.titleKey) }}
            </div>
            <div
              v-for="(item, idx) in items(sec.key)"
              :key="idx"
              class="cv-preview-item"
            >
              <div>
                <template v-for="f in sec.fields" :key="f.name">
                  <span v-if="item[f.name]" class="cv-preview-badge">
                    <template v-if="Array.isArray(item[f.name])">{{
                      item[f.name].join(", ")
                    }}</template>
                    <template v-else-if="needsLabel(f.name)"
                      >{{ t(f.labelKey) }}: {{ item[f.name] }}</template
                    >
                    <template v-else>{{ item[f.name] }}</template>
                  </span>
                </template>
              </div>
              <div class="cv-preview-actions">
                <button
                  class="edit-btn"
                  :aria-label="t('editItem', { item: t(sec.titleKey) })"
                  @click="openModal(sec, idx)"
                >
                  <i class="bi bi-pencil" aria-hidden="true"></i>
                </button>
                <button
                  class="delete-btn"
                  :aria-label="t('deleteItem', { item: t(sec.titleKey) })"
                  @click="deleteItem(sec.key, idx)"
                >
                  <i class="bi bi-trash" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>

  <!-- Preview Modal -->
  <div
    v-if="showPreview"
    class="preview-modal-bg"
    aria-hidden="true"
    @click.self="closePreview"
  ></div>
  <div
    v-if="showPreview"
    ref="previewDialog"
    class="preview-modal"
    style="display: block"
    role="dialog"
    aria-modal="true"
    aria-labelledby="resumePreviewTitle"
    tabindex="-1"
    @keydown="handlePreviewKeydown"
  >
    <div class="preview-modal-header">
      <h2 id="resumePreviewTitle" class="preview-modal-title">
        {{ t("resumePreview") }}
      </h2>
      <button
        type="button"
        class="preview-modal-close"
        :aria-label="t('close')"
        @click="closePreview"
      >
        <i class="bi bi-x-lg" aria-hidden="true"></i>
      </button>
    </div>
    <div class="preview-modal-content">
      <div class="user-preview-card">
        <img
          v-if="store.photo"
          :src="store.photo"
          class="user-preview-photo"
          :alt="t('profilePhoto')"
        />
        <div class="user-preview-name" :style="{ color: store.accentColor }">
          {{ store.fullName || "Your Name" }}
        </div>
        <div class="user-preview-contact">
          <div v-if="store.email" class="user-preview-contact-item">
            <i class="bi bi-envelope"></i> {{ store.email }}
          </div>
          <div v-if="store.phone" class="user-preview-contact-item">
            <i class="bi bi-telephone"></i> {{ store.phone }}
          </div>
        </div>
      </div>
      <div class="cv-preview-area">
        <div v-if="!hasData" style="color: #94a3b8">{{ t("noInfoYet") }}</div>
        <template v-for="sec in sections" :key="sec.key">
          <div v-if="items(sec.key).length" class="cv-preview-section">
            <div class="cv-preview-title" :style="{ color: store.accentColor }">
              {{ t(sec.titleKey) }}
            </div>
            <div
              v-for="(item, idx) in items(sec.key)"
              :key="idx"
              class="cv-preview-item"
            >
              <div>
                <template v-for="f in sec.fields" :key="f.name">
                  <span v-if="item[f.name]" class="cv-preview-badge">
                    <template v-if="Array.isArray(item[f.name])">{{
                      item[f.name].join(", ")
                    }}</template>
                    <template v-else-if="needsLabel(f.name)"
                      >{{ t(f.labelKey) }}: {{ item[f.name] }}</template
                    >
                    <template v-else>{{ item[f.name] }}</template>
                  </span>
                </template>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>

  <SectionModal
    v-if="activeSection"
    :show="modalShow"
    :section="activeSection"
    :edit-index="editIndex"
    @close="modalShow = false"
    @save="onSave"
  />
</template>

<script setup>
import { ref, computed, nextTick, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useResumeStore } from "../stores/resume";
import { cvSections as sections } from "../data/sections";
import SectionModal from "../components/builder/SectionModal.vue";

const { t } = useI18n();
const store = useResumeStore();

const colors = [
  "#ef4444",
  "#f87171",
  "#fca5a5",
  "#fecaca",
  "#fee2e2",
  "#dc2626",
  "#b91c1c",
  "#991b1b",
  "#7f1d1d",
  "#450a0a",
  "#f97316",
  "#fb923c",
  "#fdba74",
  "#fed7aa",
  "#ffedd5",
  "#ea580c",
  "#c2410c",
  "#9a3412",
  "#7c2d12",
  "#431407",
  "#eab308",
  "#facc15",
  "#fde047",
  "#fef08a",
  "#fef3c7",
  "#ca8a04",
  "#a16207",
  "#854d0e",
  "#713f12",
  "#422006",
  "#22c55e",
  "#4ade80",
  "#86efac",
  "#bbf7d0",
  "#dcfce7",
  "#16a34a",
  "#15803d",
  "#166534",
  "#14532d",
  "#052e16",
  "#14b8a6",
  "#2dd4bf",
  "#67e8d9",
  "#99f6e4",
  "#ccfbf1",
  "#0d9488",
  "#0f766e",
  "#134e4a",
  "#0f3f3f",
  "#0b2a27",
  "#06b6d4",
  "#22d3ee",
  "#67e8f9",
  "#a5f3fc",
  "#cffafe",
  "#0891b2",
  "#0e7490",
  "#155e75",
  "#164e63",
  "#082f49",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#bfdbfe",
  "#dbeafe",
  "#2563eb",
  "#1d4ed8",
  "#1e40af",
  "#1e3a8a",
  "#0c2340",
  "#6366f1",
  "#818cf8",
  "#a5b4fc",
  "#c7d2fe",
  "#e0e7ff",
  "#4f46e5",
  "#4338ca",
  "#3730a3",
  "#312e81",
  "#1e1b4b",
  "#a855f7",
  "#c084fc",
  "#d8b4fe",
  "#e9d5ff",
  "#f3e8ff",
  "#9333ea",
  "#7e22ce",
  "#6b21a8",
  "#581c87",
  "#3f0f5c",
  "#ec4899",
  "#f472b6",
  "#f9a8d4",
  "#fbcfe8",
  "#fce7f3",
  "#db2777",
  "#be185d",
  "#9d174d",
  "#831843",
  "#500724",
  "#6b7280",
  "#9ca3af",
  "#d1d5db",
  "#e5e7eb",
  "#f3f4f6",
  "#374151",
  "#1f2937",
  "#111827",
  "#0f172a",
  "#ffffff",
];

const modalShow = ref(false);
const activeSection = ref(null);
const editIndex = ref(null);
const showColors = ref(false);
const showPreview = ref(false);
const dragOver = ref(false);
const photoInput = ref(null);
const importJsonInput = ref(null);
const previewTrigger = ref(null);
const previewDialog = ref(null);
const previousPreviewFocus = ref(null);

watch(
  showPreview,
  async (isOpen) => {
    if (isOpen) {
      previousPreviewFocus.value = document.activeElement;
      await nextTick();
      previewDialog.value?.focus();
    } else {
      previousPreviewFocus.value?.focus?.();
    }
  },
  { flush: "post" },
);

function items(key) {
  return store.resumeData[key] || [];
}
function needsLabel(name) {
  return [
    "level",
    "degree",
    "field",
    "school",
    "company",
    "title",
    "role",
  ].includes(name);
}
const hasData = computed(() =>
  Object.values(store.resumeData).some((a) => a && a.length),
);

function openModal(sec, idx = null) {
  activeSection.value = sec;
  editIndex.value = idx;
  modalShow.value = true;
}
function openPreview(event) {
  previewTrigger.value = event.currentTarget;
  showPreview.value = true;
}
function closePreview() {
  showPreview.value = false;
}
function handlePreviewKeydown(event) {
  if (event.key === "Escape") {
    event.preventDefault();
    closePreview();
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = [
    ...previewDialog.value.querySelectorAll(
      'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
    ),
  ].filter((element) => element.getClientRects().length);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
}
function handleColorKeydown(event, index) {
  const palette = event.currentTarget.parentElement;
  const columns =
    getComputedStyle(palette).gridTemplateColumns.split(" ").length;
  const direction = document.documentElement.dir === "rtl" ? -1 : 1;
  const steps = {
    ArrowRight: direction,
    ArrowLeft: -direction,
    ArrowDown: columns,
    ArrowUp: -columns,
  };
  const step = steps[event.key];
  if (!step) return;
  event.preventDefault();
  const nextIndex = (index + step + colors.length) % colors.length;
  store.setAccentColor(colors[nextIndex]);
  nextTick(() =>
    palette.querySelectorAll('[role="radio"]')[nextIndex]?.focus(),
  );
}
function onSave(data) {
  if (!store.resumeData[activeSection.value.key])
    store.resumeData[activeSection.value.key] = [];
  if (editIndex.value !== null) {
    store.resumeData[activeSection.value.key][editIndex.value] = data;
  } else {
    store.resumeData[activeSection.value.key].unshift(data);
  }
  editIndex.value = null;
}
function deleteItem(key, idx) {
  if (store.resumeData[key]) store.resumeData[key].splice(idx, 1);
}
function handlePhoto(e) {
  const file = e.target.files[0];
  if (file) readPhoto(file);
}
function handleDrop(e) {
  dragOver.value = false;
  const file = e.dataTransfer.files[0];
  if (file) readPhoto(file);
}
function readPhoto(file) {
  if (!file.type.startsWith("image/")) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    store.photo = ev.target.result;
  };
  reader.readAsDataURL(file);
}
function removePhoto() {
  store.photo = "";
  if (photoInput.value) photoInput.value.value = "";
}
function triggerImportJson() {
  importJsonInput.value?.click();
}
async function handleImportJson(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    await store.importJSON(file);
  } catch (err) {
    console.error(err);
  }
  if (importJsonInput.value) importJsonInput.value.value = "";
}

async function loadHtml2Pdf() {
  if (window.html2pdf) return window.html2pdf;
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    s.onload = () => resolve(window.html2pdf);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}
async function downloadPDF() {
  const html2pdf = await loadHtml2Pdf();
  const fullName = store.fullName || "Your Name";
  let html = `<div style="font-family:Calibri,Arial,sans-serif;padding:20px;max-width:800px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:16px;border-bottom:3px solid ${store.accentColor};padding-bottom:10px;">
      <div style="font-size:18px;font-weight:bold;color:${store.accentColor};">${fullName}</div>
      <div style="font-size:10px;">${store.email ? "📧 " + store.email + " | " : ""}${store.phone ? "📞 " + store.phone : ""}</div>
    </div>`;
  sections.forEach((sec) => {
    const items = store.resumeData[sec.key];
    if (!items || !items.length) return;
    html += `<div style="margin-bottom:12px;"><div style="font-size:11px;font-weight:bold;color:#fff;background:${store.accentColor};padding:4px 8px;margin-bottom:6px;text-transform:uppercase;">${t(sec.titleKey)}</div>`;
    items.forEach((item) => {
      html += `<div style="margin-bottom:8px;font-size:9px;">`;
      sec.fields.forEach((f) => {
        if (f.type === "file") return;
        if (item[f.name]) {
          if (Array.isArray(item[f.name]))
            html += item[f.name].join(", ") + " ";
          else
            html +=
              (needsLabel(f.name) ? t(f.labelKey) + ": " : "") +
              item[f.name] +
              " ";
        }
      });
      html += `</div>`;
    });
    html += `</div>`;
  });
  html += `</div>`;
  const el = document.createElement("div");
  el.innerHTML = html;
  const opt = {
    margin: 0.4,
    filename: `${fullName.replace(/\\s+/g, "_")}_CV.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, backgroundColor: "#ffffff" },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf().set(opt).from(el).save();
}
</script>

<style scoped>
.user-info-section {
  margin: 0 0 42px;
  padding: clamp(22px, 4vw, 38px);
  border: 1px solid rgba(99, 102, 241, 0.13);
  border-radius: 22px;
  background:
    radial-gradient(
      circle at top right,
      rgba(99, 102, 241, 0.08),
      transparent 34%
    ),
    rgba(255, 255, 255, 0.82);
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
}

.user-info-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0 0 8px;
  color: #172554;
  font-size: clamp(1.2rem, 2.4vw, 1.55rem);
  font-weight: 800;
  letter-spacing: -0.025em;
}

.user-info-header i {
  display: grid;
  width: 46px;
  height: 46px;
  flex: 0 0 46px;
  place-items: center;
  border: 1px solid rgba(99, 102, 241, 0.14);
  border-radius: 14px;
  background: linear-gradient(
    145deg,
    rgba(99, 102, 241, 0.14),
    rgba(236, 72, 153, 0.1)
  );
  color: #4f46e5;
  font-size: 1.35rem;
}

.user-info-description {
  margin: 0 0 26px 60px;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
}

.user-info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px 24px;
}

.user-info-field {
  min-width: 0;
}

.user-info-field > label {
  display: block;
  margin: 0 0 8px;
  color: #334155;
  font-size: 0.9rem;
  font-weight: 700;
}

.user-info-field > input:not([type="file"]) {
  display: block;
  width: 100%;
  min-height: 50px;
  padding: 12px 15px;
  border: 1px solid #dbe3ef;
  border-radius: 12px;
  outline: none;
  background: rgba(255, 255, 255, 0.92);
  color: #0f172a;
  font: inherit;
  font-size: 0.96rem;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    background-color 160ms ease;
}

.user-info-field > input:not([type="file"]):hover {
  border-color: #a5b4fc;
}

.user-info-field > input:not([type="file"]):focus {
  border-color: #6366f1;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.13);
}

.user-info-field > input::placeholder {
  color: #94a3b8;
}

.user-profile-photo {
  grid-column: 1 / -1;
}

.photo-upload-control {
  position: relative;
}

.photo-upload-control input.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
}

.photo-upload-control input.visually-hidden:focus-visible + .photo-upload-box {
  outline: 3px solid rgba(99, 102, 241, 0.35);
  outline-offset: 3px;
}

.photo-upload-box {
  display: flex;
  min-height: 118px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 18px;
  border: 1.5px dashed #c7d2fe;
  border-radius: 14px;
  background: rgba(238, 242, 255, 0.48);
  color: #4338ca;
  cursor: pointer;
  text-align: center;
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    transform 160ms ease;
}

.photo-upload-box:hover {
  transform: translateY(-1px);
  border-color: #818cf8;
  background: rgba(224, 231, 255, 0.65);
}

.photo-upload-box i {
  font-size: 1.5rem;
}

.photo-upload-box span {
  font-weight: 700;
}

.photo-upload-box small {
  color: #64748b;
}

.photo-preview-container {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: rgba(248, 250, 252, 0.8);
}

.user-photo-preview {
  width: 76px;
  height: 76px;
  border-radius: 14px;
  object-fit: cover;
}

.remove-photo-btn {
  padding: 9px 13px;
  border: 1px solid #fecaca;
  border-radius: 10px;
  background: #fff;
  color: #b91c1c;
  font: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
}

.remove-photo-btn:hover {
  background: #fef2f2;
}

body.dark .user-info-section {
  border-color: rgba(129, 140, 248, 0.2);
  background:
    radial-gradient(
      circle at top right,
      rgba(99, 102, 241, 0.12),
      transparent 36%
    ),
    rgba(15, 23, 42, 0.72);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.16);
}

body.dark .user-info-header,
body.dark .user-info-field > label {
  color: #e2e8f0;
}

body.dark .user-info-header i {
  border-color: rgba(129, 140, 248, 0.22);
  color: #a5b4fc;
}

body.dark .user-info-description,
body.dark .photo-upload-box small {
  color: #a8b4c8;
}

body.dark .user-info-field > input:not([type="file"]) {
  border-color: #334155;
  background: rgba(15, 23, 42, 0.78);
  color: #f1f5f9;
}

body.dark .user-info-field > input:not([type="file"]):focus {
  border-color: #818cf8;
  background: #111c33;
  box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.16);
}

body.dark .photo-upload-box {
  border-color: #4f46e5;
  background: rgba(49, 46, 129, 0.18);
  color: #c7d2fe;
}

body.dark .photo-upload-box:hover {
  background: rgba(49, 46, 129, 0.3);
}

body.dark .photo-preview-container {
  border-color: #334155;
  background: rgba(15, 23, 42, 0.56);
}

body.dark .remove-photo-btn {
  border-color: rgba(248, 113, 113, 0.35);
  background: rgba(127, 29, 29, 0.2);
  color: #fca5a5;
}

@media (max-width: 640px) {
  .user-info-section {
    margin-bottom: 30px;
    padding: 20px 16px;
    border-radius: 18px;
  }

  .user-info-header {
    gap: 11px;
  }

  .user-info-header i {
    width: 40px;
    height: 40px;
    flex-basis: 40px;
    border-radius: 12px;
  }

  .user-info-description {
    margin: 0 0 22px;
    font-size: 0.9rem;
  }

  .user-info-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 17px;
  }

  .user-profile-photo {
    grid-column: auto;
  }
}
</style>
