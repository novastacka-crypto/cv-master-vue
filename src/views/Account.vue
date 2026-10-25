<template>
  <section class="account-page">
    <div class="account-card">
      <span class="section-kicker">{{ t("cloudAccount") }}</span>
      <h1>{{ t("accountTitle") }}</h1>
      <p class="account-intro">{{ t("accountIntro") }}</p>

      <p v-if="!isSupabaseConfigured" class="account-notice" role="status">
        <i class="bi bi-cloud-slash" aria-hidden="true"></i>
        {{ t("cloudConfigMissing") }}
      </p>

      <p v-else-if="initializing" class="account-status" role="status">
        {{ t("loading") }}
      </p>

      <form
        v-else-if="!auth.user"
        class="account-form"
        @submit.prevent="submitCredentials"
      >
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

        <p v-if="errorMessage" class="account-error" role="alert">
          {{ errorMessage }}
        </p>
        <p v-if="statusMessage" class="account-status" role="status">
          {{ statusMessage }}
        </p>

        <button class="account-primary-button" type="submit" :disabled="busy">
          {{ busy ? t("loading") : isSignUp ? t("signUp") : t("signIn") }}
        </button>
        <button
          class="account-mode-button"
          type="button"
          :disabled="busy"
          @click="toggleMode"
        >
          {{ isSignUp ? t("switchToSignIn") : t("switchToSignUp") }}
        </button>
      </form>

      <div v-else class="account-dashboard">
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

      <router-link class="account-back-link" to="/builder">
        <i class="bi bi-arrow-left" aria-hidden="true"></i>
        {{ t("backToBuilder") }}
      </router-link>
    </div>
  </section>
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
const email = ref("");
const password = ref("");
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

function toggleMode() {
  clearMessages();
  isSignUp.value = !isSignUp.value;
}

async function submitCredentials() {
  clearMessages();
  busy.value = true;

  try {
    if (isSignUp.value) {
      const { session } = await auth.signUp(email.value, password.value);
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
.account-page {
  width: min(100% - 32px, 720px);
  margin: 56px auto 88px;
}

.account-card {
  padding: clamp(24px, 5vw, 48px);
  border: 1px solid rgba(99, 102, 241, 0.16);
  border-radius: 28px;
  background: var(--surface, #fff);
  box-shadow: 0 24px 70px rgba(38, 46, 82, 0.1);
}

.account-card h1 {
  margin: 12px 0;
  color: var(--text, #172033);
  font-size: clamp(2rem, 5vw, 3rem);
}

.account-intro,
.account-privacy-note {
  color: var(--muted, #667085);
  line-height: 1.7;
}

.account-form,
.account-actions {
  display: grid;
  gap: 14px;
  margin-top: 28px;
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
  background: linear-gradient(135deg, #5746d8, #7c3aed);
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
  color: #5746d8;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
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

:global(body.dark) .account-card {
  border-color: rgba(165, 180, 252, 0.25);
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

:global(body.dark) .account-notice,
:global(body.dark) .account-status {
  background: #282847;
  color: #dbeafe;
}

@media (max-width: 600px) {
  .account-page {
    margin-top: 32px;
  }

  .account-card {
    border-radius: 20px;
  }
}
</style>
