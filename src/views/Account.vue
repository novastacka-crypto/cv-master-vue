<template>
  <div class="account-shell">
    <aside class="account-visual" aria-hidden="true">
      <div class="account-visual-inner">
        <span class="account-visual-mark"><i class="bi bi-file-earmark-person"></i></span>
        <h2>CV Master</h2>
        <p>{{ t("accountIntro") }}</p>
        <ul class="account-visual-list">
          <li><i class="bi bi-cloud-check"></i> {{ t("saveCloudResume") }}</li>
          <li><i class="bi bi-shield-lock"></i> {{ t("cloudPrivacyNote") }}</li>
          <li><i class="bi bi-arrow-repeat"></i> {{ t("restoreCloudResume") }}</li>
        </ul>
      </div>
    </aside>

    <main class="account-main">
      <section class="account-card" aria-labelledby="account-title">
        <span class="section-kicker">{{ t("cloudAccount") }}</span>
        <h1 id="account-title">{{ t("accountTitle") }}</h1>
        <p class="account-intro">{{ t("accountIntro") }}</p>

        <p v-if="!isSupabaseConfigured" class="account-notice" role="status">
          <i class="bi bi-cloud-slash" aria-hidden="true"></i>
          {{ t("cloudConfigMissing") }}
        </p>

        <p v-else-if="initializing" class="account-status" role="status">
          {{ t("loading") }}
        </p>

        <div v-else class="account-content">
          <div class="account-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              :aria-selected="!isSignUp"
              :class="{ active: !isSignUp }"
              @click="setMode(false)"
            >
              {{ t("signIn") }}
            </button>
            <button
              type="button"
              role="tab"
              :aria-selected="isSignUp"
              :class="{ active: isSignUp }"
              @click="setMode(true)"
            >
              {{ t("signUp") }}
            </button>
          </div>

          <form id="account-form" class="account-form" @submit.prevent="submitCredentials">
            <template v-if="isSignUp">
              <label for="account-name">{{ t("accountFullName") }}</label>
              <input
                id="account-name"
                v-model.trim="fullName"
                type="text"
                autocomplete="name"
                pattern="[A-Za-z\u0600-\u06FF\s]+"
                minlength="6"
                required
                :placeholder="t('accountFullNamePlaceholder')"
              />
            </template>

            <label for="account-email">{{ t("accountEmail") }}</label>
            <input
              id="account-email"
              v-model.trim="email"
              type="email"
              autocomplete="email"
              required
            />

            <label for="account-password">{{ t("accountPassword") }}</label>
            <input
              id="account-password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              minlength="6"
              required
            />

            <template v-if="isSignUp">
              <label for="account-confirm">{{ t("accountConfirmPassword") }}</label>
              <input
                id="account-confirm"
                v-model="confirmPassword"
                type="password"
                autocomplete="new-password"
                minlength="6"
                required
              />
            </template>

            <p v-if="errorMessage" class="account-error" role="alert">
              {{ errorMessage }}
            </p>
            <p v-if="statusMessage" class="account-status" role="status">
              {{ statusMessage }}
            </p>

            <button class="account-primary-button" type="submit" :disabled="busy">
              {{ busy ? t("loading") : isSignUp ? t("signUp") : t("signIn") }}
            </button>
          </form>

          <p class="account-switch">
            {{ isSignUp ? t("switchToSignIn") : t("switchToSignUp") }}
            <button type="button" class="account-mode-button" :disabled="busy" @click="toggleMode">
              {{ isSignUp ? t("signIn") : t("signUp") }}
            </button>
          </p>

          <div v-if="auth.user" class="account-dashboard">
            <p class="account-status" role="status">
              {{ t("signedInAs", { email: auth.user.email }) }}
            </p>
            <p v-if="statusMessage" class="account-status" role="status">
              {{ statusMessage }}
            </p>
            <p v-if="errorMessage" class="account-error" role="alert">
              {{ errorMessage }}
            </p>
            <div class="account-actions">
              <button
                class="account-primary-button"
                type="button"
                :disabled="busy"
                @click="saveResume"
              >
                <i class="bi bi-cloud-arrow-up" aria-hidden="true"></i>
                {{ t("saveCloudResume") }}
              </button>
              <button
                class="account-secondary-button"
                type="button"
                :disabled="busy"
                @click="restoreResume"
              >
                <i class="bi bi-cloud-download" aria-hidden="true"></i>
                {{ t("restoreCloudResume") }}
              </button>
              <p class="account-privacy-note">{{ t("cloudPrivacyNote") }}</p>
              <button
                class="account-mode-button"
                type="button"
                :disabled="busy"
                @click="signOut"
              >
                {{ t("signOut") }}
              </button>
            </div>
          </div>
        </div>

        <router-link class="account-back-link" to="/builder">
          <i class="bi bi-arrow-left" aria-hidden="true"></i>
          {{ t("backToBuilder") }}
        </router-link>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "../stores/auth";
import { useResumeStore } from "../stores/resume";
import { isSupabaseConfigured } from "../lib/supabase";
import { loadCloudResume, saveCloudResume } from "../services/resumeCloud";

const { t } = useI18n();
const auth = useAuthStore();
const resume = useResumeStore();
const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isSignUp = ref(false);
const initializing = ref(true);
const busy = ref(false);
const errorMessage = ref("");
const statusMessage = ref("");

onMounted(async () => {
  try {
    if (isSupabaseConfigured) await auth.initialize();
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    initializing.value = false;
  }
});

function clearMessages() {
  errorMessage.value = "";
  statusMessage.value = "";
}

function setMode(value) {
  clearMessages();
  isSignUp.value = value;
}

function toggleMode() {
  clearMessages();
  isSignUp.value = !isSignUp.value;
  // Scroll to form (second section feel)
  const el = document.getElementById("account-form");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function submitCredentials() {
  clearMessages();

  if (isSignUp.value) {
    if (!fullName.value.trim()) {
      errorMessage.value = t("accountFullNameRequired");
      return;
    }
    if (fullName.value.trim().split(/\s+/).length < 3) {
      errorMessage.value = t("accountFullNameRequired");
      return;
    }
    if (password.value !== confirmPassword.value) {
      errorMessage.value = t("accountPasswordMismatch");
      return;
    }
  }

  busy.value = true;

  try {
    if (isSignUp.value) {
      const { session } = await auth.signUp(
        email.value,
        password.value,
        fullName.value.trim(),
      );
      statusMessage.value = t(
        session ? "cloudAccountReady" : "cloudSignupCheckEmail",
      );
    } else {
      await auth.signIn(email.value, password.value);
      statusMessage.value = t("cloudAccountReady");
    }
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    busy.value = false;
  }
}

async function saveResume() {
  clearMessages();
  busy.value = true;

  try {
    await saveCloudResume(auth.user.id, resume.getSnapshot());
    statusMessage.value = t("cloudSaveSuccess");
  } catch (error) {
    errorMessage.value = t("cloudActionError", { message: error.message });
  } finally {
    busy.value = false;
  }
}

async function restoreResume() {
  clearMessages();
  if (!window.confirm(t("cloudConfirmRestore"))) return;

  busy.value = true;
  try {
    const snapshot = await loadCloudResume(auth.user.id);
    if (!snapshot) {
      statusMessage.value = t("cloudResumeMissing");
      return;
    }

    resume.applySnapshot(snapshot);
    statusMessage.value = t("cloudRestoreSuccess");
  } catch (error) {
    errorMessage.value = t("cloudActionError", { message: error.message });
  } finally {
    busy.value = false;
  }
}

async function signOut() {
  clearMessages();
  busy.value = true;
  try {
    await auth.signOut();
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    busy.value = false;
  }
}
</script>

<style scoped>
.account-shell {
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(320px, 1.1fr);
  min-height: calc(100vh - 140px);
  width: min(100% - 24px, 1180px);
  margin: 24px auto 56px;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 30px 90px rgba(20, 30, 60, 0.16);
}

.account-visual {
  background: linear-gradient(145deg, #6366f1 0%, #ec4899 55%, #ec4899 100%);
  color: #fff;
  padding: clamp(28px, 5vw, 56px);
  display: flex;
  align-items: center;
}

.account-visual-inner {
  width: 100%;
  max-width: 420px;
}

.account-visual-mark {
  display: inline-grid;
  width: 56px;
  height: 56px;
  place-items: center;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.18);
  font-size: 1.6rem;
  margin-bottom: 20px;
}

.account-visual h2 {
  margin: 0 0 12px;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
}

.account-visual p {
  opacity: 0.9;
  line-height: 1.7;
  margin-bottom: 24px;
}

.account-visual-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

.account-visual-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.account-main {
  background: var(--surface, #fff);
  padding: clamp(24px, 5vw, 48px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.account-card {
  width: 100%;
  max-width: 420px;
}

.account-card h1 {
  margin: 12px 0;
  color: var(--text, #172033);
  font-size: clamp(1.8rem, 4vw, 2.4rem);
}

.account-intro {
  color: var(--muted, #667085);
  line-height: 1.7;
}

.account-tabs {
  display: inline-flex;
  gap: 8px;
  padding: 6px;
  border-radius: 999px;
  background: #f1f5f9;
  margin: 20px 0 16px;
}

.account-tabs button {
  border: 0;
  background: transparent;
  padding: 8px 16px;
  border-radius: 999px;
  font: inherit;
  font-weight: 700;
  color: #475569;
  cursor: pointer;
}

.account-tabs button.active {
  background: #fff;
  color: #6366f1;
  box-shadow: 0 6px 16px rgba(87, 70, 216, 0.12);
}

.account-form {
  display: grid;
  gap: 12px;
  margin-top: 12px;
}

.account-form label {
  color: var(--text, #172033);
  font-weight: 700;
}

.account-form input {
  width: 100%;
  min-height: 48px;
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #172033);
  font: inherit;
}

.account-form input:focus-visible,
.account-page button:focus-visible,
.account-back-link:focus-visible {
  outline: 3px solid rgba(99, 102, 241, 0.45);
  outline-offset: 3px;
}

.account-primary-button,
.account-secondary-button {
  min-height: 48px;
  padding: 11px 16px;
  border: 0;
  border-radius: 12px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.account-primary-button {
  background: linear-gradient(135deg, #6366f1, #ec4899);
  color: #fff;
}

.account-secondary-button {
  border: 1px solid #d8dcef;
  background: transparent;
  color: var(--text, #172033);
}

.account-page button:disabled {
  cursor: wait;
  opacity: 0.65;
}

.account-mode-button {
  justify-self: start;
  padding: 8px 0;
  border: 0;
  background: none;
  color: #6366f1;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.account-switch {
  margin-top: 16px;
  color: var(--muted, #667085);
}

.account-notice,
.account-status,
.account-error {
  margin: 18px 0;
  padding: 14px 16px;
  border-radius: 12px;
  line-height: 1.6;
}

.account-notice,
.account-status {
  background: #eef2ff;
  color: #3730a3;
}

.account-error {
  background: #fef2f2;
  color: #991b1b;
  overflow-wrap: anywhere;
}

.account-back-link {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  margin-top: 28px;
  color: var(--text, #172033);
  font-weight: 700;
  text-decoration: none;
}

:global(body.dark) .account-shell {
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.4);
}

:global(body.dark) .account-visual {
  background: linear-gradient(145deg, #312e81 0%, #4338ca 55%, #be185d 100%);
}

:global(body.dark) .account-main {
  background: #171923;
}

:global(body.dark) .account-card h1,
:global(body.dark) .account-form label,
:global(body.dark) .account-secondary-button,
:global(body.dark) .account-back-link {
  color: #eef2ff;
}

:global(body.dark) .account-form input {
  border-color: #44465a;
  background: #202230;
  color: #eef2ff;
}

:global(body.dark) .account-tabs {
  background: #202230;
}

:global(body.dark) .account-tabs button {
  color: #cbd5e1;
}

:global(body.dark) .account-tabs button.active {
  background: #171923;
  color: #c4b5fd;
}

:global(body.dark) .account-notice,
:global(body.dark) .account-status {
  background: #282847;
  color: #dbeafe;
}

@media (max-width: 860px) {
  .account-shell {
    grid-template-columns: 1fr;
    border-radius: 24px;
  }

  .account-visual {
    padding: 28px 24px;
  }
}

@media (max-width: 600px) {
  .account-shell {
    margin-top: 16px;
    border-radius: 20px;
  }
}
</style>