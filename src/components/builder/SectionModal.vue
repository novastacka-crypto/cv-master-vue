<template>
  <div
    v-if="show"
    class="cv-modal-bg"
    style="display: block"
    aria-hidden="true"
    @click.self="close"
  ></div>
  <div
    v-if="show"
    ref="dialog"
    class="cv-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="sectionModalTitle"
    aria-describedby="sectionModalDescription"
    tabindex="-1"
    style="display: block"
    @keydown="handleKeydown"
  >
    <form class="cv-modal-form" @submit.prevent="save">
      <div class="modal-header">
        <span class="cv-modal-icon" aria-hidden="true"
          ><i :class="section.icon"></i
        ></span>
        <h2 id="sectionModalTitle" class="cv-modal-title">
          {{ t(section.titleKey) }}
        </h2>
        <button
          type="button"
          class="cv-modal-close"
          :aria-label="t('close')"
          @click="close"
        >
          <i class="bi bi-x-lg" aria-hidden="true"></i>
        </button>
      </div>
      <p id="sectionModalDescription" class="cv-modal-desc">
        {{ t(section.descKey) }}
      </p>
      <div id="cvModalFields">
        <div v-for="f in section.fields" :key="f.name" class="field">
          <label :for="fieldId(f.name)">
            {{ t(f.labelKey)
            }}<span v-if="f.required" style="color: #dc2626">*</span>
            <textarea
              v-if="f.type === 'textarea'"
              :id="fieldId(f.name)"
              v-model="form[f.name]"
              :required="f.required"
            ></textarea>
            <select
              v-else-if="f.type === 'select'"
              :id="fieldId(f.name)"
              v-model="form[f.name]"
              :required="f.required"
            >
              <option value="">
                {{ t("selectOption", { label: t(f.labelKey) }) }}
              </option>
              <option v-for="o in f.options" :key="o" :value="o">
                {{ t(o) }}
              </option>
            </select>
            <input
              v-else-if="f.type === 'checkbox'"
              :id="fieldId(f.name)"
              v-model="form[f.name]"
              type="checkbox"
            />
            <input
              v-else-if="f.type === 'date'"
              :id="fieldId(f.name)"
              v-model="form[f.name]"
              type="date"
              :required="f.required"
            />
            <input
              v-else
              :id="fieldId(f.name)"
              v-model="form[f.name]"
              type="text"
              :required="f.required"
            />
          </label>
        </div>
      </div>
      <div class="cv-modal-actions">
        <span class="cv-modal-msg" role="alert" aria-live="assertive">{{
          msg
        }}</span>
        <div style="display: flex; gap: 8px">
          <button type="button" class="btn-secondary" @click="addMore">
            {{ t("add") }}
          </button>
          <button type="submit" class="btn-save">{{ t("save") }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useResumeStore } from "../../stores/resume";

const props = defineProps({
  show: Boolean,
  section: { type: Object, default: null },
  editIndex: { type: Number, default: null },
});
const emit = defineEmits(["close", "save"]);

const { t } = useI18n();
const store = useResumeStore();
const form = ref({});
const msg = ref("");
const dialog = ref(null);
const previousFocus = ref(null);

async function focusDialog() {
  await nextTick();
  const firstControl = dialog.value?.querySelector(
    '#cvModalFields input:not([type="checkbox"]), #cvModalFields textarea, #cvModalFields select',
  );
  (firstControl || dialog.value)?.focus();
}

onMounted(() => {
  if (props.show) focusDialog();
});

watch(
  () => props.show,
  async (isOpen) => {
    if (isOpen) {
      previousFocus.value = document.activeElement;
      await focusDialog();
    } else {
      previousFocus.value?.focus?.();
    }
  },
  { flush: "post", immediate: true },
);

watch(
  [() => props.section, () => props.editIndex],
  ([s, idx]) => {
    if (!s) return;
    const o = {};
    s.fields.forEach((f) => {
      o[f.name] = f.type === "checkbox" ? false : "";
    });
    if (
      idx !== null &&
      idx !== undefined &&
      store.resumeData[s.key] &&
      store.resumeData[s.key][idx]
    ) {
      const item = store.resumeData[s.key][idx];
      s.fields.forEach((f) => {
        if (item[f.name] !== undefined && item[f.name] !== null) {
          o[f.name] = item[f.name];
        }
      });
    }
    form.value = o;
    msg.value = "";
  },
  { immediate: true },
);

function close() {
  emit("close");
}
function fieldId(name) {
  return `section-${props.section.key}-${name}`;
}
function handleKeydown(event) {
  if (event.key === "Escape") {
    event.preventDefault();
    close();
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = [
    ...dialog.value.querySelectorAll(
      'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
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
function addMore() {
  const o = {};
  props.section.fields.forEach((f) => {
    o[f.name] = f.type === "checkbox" ? false : "";
  });
  form.value = o;
  msg.value = "";
}
function save() {
  const sec = props.section;
  let valid = true;
  sec.fields.forEach((f) => {
    if (f.required && !form.value[f.name]) valid = false;
  });
  if (!valid) {
    msg.value = t("pleaseFillRequired");
    return;
  }
  emit("save", { ...form.value });
  close();
}
</script>
