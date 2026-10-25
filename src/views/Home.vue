<template>
  <div class="home-page">
    <section class="hero-main">
      <div class="hero-content">
        <div class="hero-eyebrow">
          <span class="hero-eyebrow-dot"></span>
          {{ t('homeEyebrow') }}
        </div>
        <h1 class="hero-title">{{ t('heroTitle') }}</h1>
        <p class="hero-desc">{{ t('heroDesc') }}</p>
        <div class="main-btns">
          <router-link class="btn btn-success" to="/builder">
            {{ t('startBuilding') }} <i class="bi bi-arrow-up-left"></i>
          </router-link>
          <router-link class="btn btn-outline-primary" to="/templates">
            <i class="bi bi-grid"></i> {{ t('viewTemplates') }}
          </router-link>
        </div>
        <div class="hero-assurance">
          <span class="assurance-icon"><i class="bi bi-shield-check"></i></span>
          <span>{{ t('homeAssurance') }}</span>
        </div>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <div class="hero-visual-glow"></div>
        <div class="hero-resume">
          <div class="resume-topline"></div>
          <div class="resume-profile">
            <div class="resume-avatar">AM</div>
            <div>
              <div class="resume-name">{{ t('sampleName') }}</div>
              <div class="resume-role">{{ t('sampleRole') }}</div>
            </div>
          </div>
          <div class="resume-contact">
            <span><i class="bi bi-envelope"></i> hello@example.com</span>
            <span><i class="bi bi-geo-alt"></i> {{ t('sampleLocation') }}</span>
          </div>
          <div class="resume-section">
            <div class="resume-section-title">{{ t('sampleAbout') }}</div>
            <div class="resume-line resume-line-long"></div>
            <div class="resume-line"></div>
          </div>
          <div class="resume-section">
            <div class="resume-section-title">{{ t('sampleExperience') }}</div>
            <div class="resume-entry">
              <span class="resume-entry-dot"></span>
              <div class="resume-entry-lines">
                <div class="resume-line resume-line-long"></div>
                <div class="resume-line resume-line-short"></div>
              </div>
            </div>
            <div class="resume-entry">
              <span class="resume-entry-dot"></span>
              <div class="resume-entry-lines">
                <div class="resume-line resume-line-medium"></div>
                <div class="resume-line resume-line-short"></div>
              </div>
            </div>
          </div>
          <div class="resume-skills">
            <span>{{ t('sampleSkillOne') }}</span>
            <span>{{ t('sampleSkillTwo') }}</span>
            <span>{{ t('sampleSkillThree') }}</span>
          </div>
        </div>
        <div class="hero-floating-card hero-floating-card--top">
          <span class="floating-icon"><i class="bi bi-stars"></i></span>
          <span>{{ t('homeFloatingDesign') }}</span>
        </div>
        <div class="hero-floating-card hero-floating-card--bottom">
          <span class="floating-check"><i class="bi bi-check-lg"></i></span>
          <span>{{ t('homeFloatingReady') }}</span>
        </div>
      </div>
    </section>

    <section class="home-benefits">
      <div class="section-heading">
        <span class="section-kicker">{{ t('homeBenefitsKicker') }}</span>
        <h2>{{ t('homeBenefitsTitle') }}</h2>
        <p>{{ t('homeBenefitsDesc') }}</p>
      </div>
      <div class="benefit-grid home-sticker-grid">
        <article class="benefit-card home-sticker home-sticker--violet">
          <span class="benefit-icon benefit-icon--violet"><i class="bi bi-magic"></i></span>
          <h3>{{ t('homeFeatureOneTitle') }}</h3>
          <p>{{ t('homeFeatureOneDesc') }}</p>
        </article>
        <article class="benefit-card home-sticker home-sticker--teal">
          <span class="benefit-icon benefit-icon--teal"><i class="bi bi-layout-text-window-reverse"></i></span>
          <h3>{{ t('homeFeatureTwoTitle') }}</h3>
          <p>{{ t('homeFeatureTwoDesc') }}</p>
        </article>
        <article class="benefit-card home-sticker home-sticker--amber">
          <span class="benefit-icon benefit-icon--amber"><i class="bi bi-file-earmark-arrow-down"></i></span>
          <h3>{{ t('homeFeatureThreeTitle') }}</h3>
          <p>{{ t('homeFeatureThreeDesc') }}</p>
        </article>
      </div>
    </section>

    <section class="how-it-works">
      <div class="section-heading">
        <span class="section-kicker">{{ t('homeStepsKicker') }}</span>
        <h2>{{ t('homeStepsTitle') }}</h2>
      </div>
      <div class="hero-steps">
        <article class="hero-step active">
          <span class="hicon"><i class="bi bi-pencil-square"></i></span>
          <div class="hstepinfo">
            <div class="step-number">01</div>
            <div class="hsteptitle">{{ t('step1Title') }}</div>
            <div class="hstepsub">{{ t('step1Sub') }}</div>
          </div>
        </article>
        <article class="hero-step">
          <span class="hicon"><i class="bi bi-palette"></i></span>
          <div class="hstepinfo">
            <div class="step-number">02</div>
            <div class="hsteptitle">{{ t('step2Title') }}</div>
            <div class="hstepsub">{{ t('step2Sub') }}</div>
          </div>
        </article>
        <article class="hero-step">
          <span class="hicon"><i class="bi bi-download"></i></span>
          <div class="hstepinfo">
            <div class="step-number">03</div>
            <div class="hsteptitle">{{ t('step3Title') }}</div>
            <div class="hstepsub">{{ t('step3Sub') }}</div>
          </div>
        </article>
      </div>
    </section>

    <section class="home-contact" aria-labelledby="home-contact-title">
      <div class="home-contact-copy">
        <span class="section-kicker">{{ t('homeContactKicker') }}</span>
        <h2 id="home-contact-title">{{ t('homeContactTitle') }}</h2>
        <p>{{ t('homeContactDesc') }}</p>
        <a class="home-contact-email" href="mailto:rawanabusittah@gmail.com">
          <span class="home-contact-icon"><i class="bi bi-envelope"></i></span>
          <span>
            <small>{{ t('homeContactEmailLabel') }}</small>
            <strong>rawanabusittah@gmail.com</strong>
          </span>
          <i class="bi bi-arrow-up-left home-contact-arrow" aria-hidden="true"></i>
        </a>
      </div>

      <form
        class="home-contact-form"
        :aria-label="t('homeContactTitle')"
        @submit.prevent="sendContact"
      >
        <div class="home-contact-fields">
          <label>
            {{ t('contactName') }}
            <input
              v-model="contact.name"
              name="name"
              autocomplete="name"
              required
            />
          </label>
          <label>
            {{ t('contactEmail') }}
            <input
              v-model="contact.email"
              name="email"
              type="email"
              autocomplete="email"
              required
            />
          </label>
          <label class="home-contact-message">
            {{ t('contactMessage') }}
            <textarea
              v-model="contact.message"
              name="message"
              rows="4"
              required
            ></textarea>
          </label>
        </div>
        <button class="home-contact-submit" type="submit">
          {{ t('contactSend') }}
          <i class="bi bi-send" aria-hidden="true"></i>
        </button>
        <p class="home-contact-note">{{ t('homeContactNote') }}</p>
      </form>
    </section>

    <section class="home-cta">
      <div>
        <span class="section-kicker">{{ t('homeCtaKicker') }}</span>
        <h2>{{ t('homeCtaTitle') }}</h2>
        <p>{{ t('homeCtaDesc') }}</p>
      </div>
      <router-link class="btn btn-success" to="/builder">
        {{ t('startBuilding') }} <i class="bi bi-arrow-up-left"></i>
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const contact = reactive({ name: '', email: '', message: '' })

function sendContact() {
  const subject = encodeURIComponent(`CV Master: ${contact.name}`)
  const body = encodeURIComponent(
    `${contact.message}\n\n${t('contactEmail')}: ${contact.email}`,
  )
  window.location.href = `mailto:rawanabusittah@gmail.com?subject=${subject}&body=${body}`
}
</script>

<style scoped>
.home-page {
  --home-ink: #173a35;
  --home-muted: #65756f;
  --home-card: #fff;
  max-width: 1360px;
  margin: 0 auto;
  padding: clamp(16px, 3vw, 34px) clamp(16px, 4vw, 42px) 84px;
}

.home-page .hero-main {
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(320px, 0.98fr);
  align-items: center;
  min-height: 590px;
  padding: clamp(34px, 6vw, 82px);
  border: 1px solid #dcebe5;
  border-radius: 34px;
  background:
    radial-gradient(circle at 12% 92%, rgba(231, 165, 141, 0.13), transparent 28%),
    radial-gradient(circle at 92% 10%, rgba(43, 153, 128, 0.13), transparent 33%),
    linear-gradient(135deg, #fff 0%, #f6fbf8 58%, #f2f8f5 100%);
  box-shadow:
    0 30px 80px rgba(31, 74, 62, 0.09),
    0 1px 0 rgba(255, 255, 255, 0.9) inset;
}

.home-page .hero-content {
  max-width: 620px;
}

.home-page .hero-eyebrow {
  margin-bottom: 24px;
  border-color: #d5eae1;
  background: rgba(255, 255, 255, 0.82);
  color: #176b5b;
  box-shadow: 0 5px 18px rgba(23, 107, 91, 0.06);
}

.home-page .hero-title {
  max-width: 650px;
  margin-bottom: 22px;
  background-image: linear-gradient(115deg, #163b34 8%, #176b5b 65%, #d27465 100%);
  font-size: clamp(3rem, 5.7vw, 5rem);
  letter-spacing: -0.045em;
  line-height: 1.08;
}

.home-page .hero-desc {
  max-width: 540px;
  margin-bottom: 32px;
  color: #5e716a;
  font-size: clamp(1rem, 1.4vw, 1.12rem);
}

.home-page .main-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.home-page .main-btns .btn {
  min-height: 54px;
  padding-inline: 23px;
  border-radius: 14px;
}

.home-page .main-btns .btn-success {
  background: linear-gradient(135deg, #176b5b, #259782);
  box-shadow: 0 12px 24px rgba(23, 107, 91, 0.2);
}

.home-page .main-btns .btn-success:hover {
  background: linear-gradient(135deg, #105447, #176b5b);
  box-shadow: 0 16px 28px rgba(23, 107, 91, 0.24);
}

.home-page .main-btns .btn-outline-primary {
  border-color: #cfe2da;
  background: rgba(255, 255, 255, 0.72);
  color: #176b5b;
}

.home-page .hero-assurance {
  margin-top: 26px;
  color: #5c6a64;
}

.home-page .assurance-icon {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 50%;
  background: #e4f3ed;
  color: #176b5b;
}

.home-page .hero-visual {
  min-height: 440px;
  isolation: isolate;
}

.home-page .hero-visual::before,
.home-page .hero-visual::after {
  position: absolute;
  z-index: -1;
  display: block;
  border: 1px solid rgba(23, 107, 91, 0.1);
  border-radius: 50%;
  content: "";
}

.home-page .hero-visual::before {
  width: 390px;
  height: 390px;
}

.home-page .hero-visual::after {
  width: 470px;
  height: 470px;
  border-style: dashed;
  opacity: 0.7;
}

.home-page .hero-visual-glow {
  width: 300px;
  height: 300px;
  background: linear-gradient(
    145deg,
    rgba(36, 151, 124, 0.16),
    rgba(230, 151, 127, 0.16)
  );
}

.home-page .hero-resume {
  width: min(340px, 78%);
  min-height: 410px;
  padding: 30px;
  transform: rotate(3deg);
  border: 1px solid rgba(24, 66, 56, 0.1);
  border-radius: 12px;
  box-shadow: 0 34px 70px rgba(27, 67, 56, 0.22);
}

.home-page .resume-topline {
  height: 7px;
  background: linear-gradient(90deg, #176b5b, #50b69a);
}

.home-page .resume-avatar {
  background: #e6f3ed;
  color: #176b5b;
}

.home-page .resume-section-title {
  color: #176b5b;
}

.home-page .resume-entry-dot {
  background: #d98168;
}

.home-page .resume-skills span {
  border-radius: 999px;
  background: #e8f4ee;
  color: #176b5b;
}

.home-page .hero-floating-card {
  border-color: #e1ece6;
  border-radius: 15px;
  box-shadow: 0 15px 36px rgba(25, 67, 56, 0.14);
}

.home-page .hero-floating-card--top {
  top: 48px;
  right: -2px;
}

.home-page .hero-floating-card--bottom {
  bottom: 44px;
  left: -4px;
}

.home-page .floating-icon {
  background: #fff1e9;
  color: #bd7057;
}

body.dark .home-page .hero-main {
  border-color: rgba(141, 193, 172, 0.15);
  background:
    radial-gradient(circle at 12% 92%, rgba(184, 104, 79, 0.12), transparent 28%),
    radial-gradient(circle at 92% 10%, rgba(43, 153, 128, 0.17), transparent 33%),
    linear-gradient(135deg, #172722 0%, #1a2b25 58%, #1c3029 100%);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.22);
}

body.dark .home-page .hero-eyebrow {
  border-color: rgba(141, 193, 172, 0.2);
  background: rgba(21, 44, 37, 0.86);
  color: #a5dfc7;
}

body.dark .home-page .hero-title {
  background-image: linear-gradient(115deg, #f1f7f3 8%, #9ed9c0 65%, #efb39e 100%);
}

body.dark .home-page .hero-desc,
body.dark .home-page .hero-assurance {
  color: #b6c9c0;
}

body.dark .home-page .assurance-icon {
  background: rgba(54, 124, 99, 0.25);
  color: #a5dfc7;
}

body.dark .home-page .main-btns .btn-success {
  background: linear-gradient(135deg, #176b5b, #259782);
}

body.dark .home-page .main-btns .btn-outline-primary {
  border-color: rgba(141, 193, 172, 0.25);
  background: rgba(19, 44, 36, 0.7);
  color: #b3e2cd;
}

body.dark .home-page .hero-visual::before,
body.dark .home-page .hero-visual::after {
  border-color: rgba(141, 193, 172, 0.18);
}

.home-sticker-grid {
  align-items: center;
  gap: 24px;
  padding: 12px 12px 34px;
}

.home-sticker {
  position: relative;
  min-height: 242px;
  padding: 32px;
  border: 1px solid transparent;
  border-radius: 24px 18px 26px 17px;
  box-shadow:
    0 16px 26px rgba(35, 56, 50, 0.1),
    0 4px 0 rgba(255, 255, 255, 0.75) inset;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.home-sticker::after {
  position: absolute;
  top: 15px;
  right: 16px;
  width: 12px;
  height: 12px;
  border: 2px solid currentColor;
  border-radius: 50%;
  content: "";
  opacity: 0.32;
}

.home-sticker::before {
  position: absolute;
  right: 24px;
  bottom: 22px;
  width: 38px;
  height: 5px;
  border-radius: 999px;
  background: currentColor;
  content: "";
  opacity: 0.16;
  transform: rotate(-8deg);
}

.home-sticker:hover {
  z-index: 1;
  transform: translateY(-8px) rotate(0deg);
  box-shadow: 0 22px 34px rgba(35, 56, 50, 0.15);
}

.home-sticker--violet {
  transform: rotate(-2deg);
  border-color: #dcd9ff;
  background: #f0efff;
  color: #5145a8;
}

.home-sticker--teal {
  transform: translateY(-10px) rotate(1.6deg);
  border-color: #c8e9df;
  background: #e5f6ef;
  color: #176b5b;
}

.home-sticker--amber {
  transform: rotate(-1.3deg);
  border-color: #f4e0b9;
  background: #fff4dc;
  color: #8e6120;
}

.home-sticker .benefit-icon {
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  border-radius: 17px;
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 5px 14px rgba(23, 58, 53, 0.08);
  font-size: 1.35rem;
}

.home-sticker h3 {
  margin: 20px 0 8px;
  color: var(--home-ink);
  font-size: 1.22rem;
  font-weight: 800;
}

.home-sticker p {
  margin: 0;
  color: #596962;
  font-size: 0.94rem;
  line-height: 1.7;
}

.home-page .home-benefits,
.home-page .how-it-works {
  padding-top: clamp(70px, 9vw, 112px);
}

.home-page .section-heading {
  max-width: 700px;
  margin-bottom: 42px;
}

.home-page .section-heading h2 {
  color: #173a35;
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  letter-spacing: -0.04em;
}

.home-page .section-heading p {
  max-width: 580px;
  margin: 0 auto;
  color: #596b64;
  line-height: 1.8;
}

.home-page .how-it-works .hero-steps {
  gap: 20px;
}

.home-page .how-it-works .hero-step {
  position: relative;
  min-height: 190px;
  padding: 26px;
  border-color: #dcebe5;
  border-radius: 20px;
  background: linear-gradient(155deg, #fff, #f7fbf8);
}

.home-page .how-it-works .hero-step:hover,
.home-page .how-it-works .hero-step.active {
  border-color: #a8d5c3;
  box-shadow: 0 18px 34px rgba(31, 74, 62, 0.1);
  transform: translateY(-5px);
}

.home-page .how-it-works .hicon {
  width: 50px;
  height: 50px;
  border-radius: 16px;
  background: #e7f4ee;
  color: #176b5b;
}

.home-page .step-number {
  color: #116b61;
  font-size: 0.75rem;
}

.home-page .how-it-works .hsteptitle {
  color: #173a35;
  font-size: 1.02rem;
}

.home-page .how-it-works .hstepsub {
  color: #65766f;
  line-height: 1.7;
}

body.dark .home-page .section-heading h2,
body.dark .home-page .how-it-works .hsteptitle {
  color: #e6f1ec;
}

body.dark .home-page .section-heading p,
body.dark .home-page .how-it-works .hstepsub {
  color: #b2c2bb;
}

body.dark .home-page .how-it-works .hero-step {
  border-color: rgba(147, 183, 168, 0.18);
  background: linear-gradient(155deg, #1a2824, #17221f);
}

body.dark .home-page .how-it-works .hero-step:hover,
body.dark .home-page .how-it-works .hero-step.active {
  border-color: rgba(112, 188, 157, 0.42);
}

body.dark .home-page .how-it-works .hicon {
  background: rgba(54, 124, 99, 0.24);
  color: #a5dfc7;
}

body.dark .home-page .step-number {
  color: #8bd8b8;
}

.home-contact {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(28px, 6vw, 76px);
  align-items: center;
  margin: 36px 0;
  padding: clamp(26px, 5vw, 58px);
  overflow: hidden;
  border: 1px solid #dce9e4;
  border-radius: 28px;
  background:
    radial-gradient(circle at 8% 90%, rgba(22, 143, 131, 0.1), transparent 30%),
    linear-gradient(135deg, #fff 0%, #f4faf7 100%);
  box-shadow: 0 18px 48px rgba(24, 67, 58, 0.08);
}

.home-page .home-contact {
  margin-top: clamp(54px, 8vw, 90px);
  border-radius: 32px;
}

.home-contact-copy h2 {
  margin: 12px 0;
  color: var(--home-ink);
  font-size: clamp(1.8rem, 4vw, 2.7rem);
  font-weight: 850;
  line-height: 1.15;
  letter-spacing: -0.04em;
}

.home-contact-copy > p {
  max-width: 440px;
  margin: 0;
  color: #596b64;
  line-height: 1.8;
}

.home-contact-email {
  display: flex;
  align-items: center;
  gap: 13px;
  width: fit-content;
  max-width: 100%;
  margin-top: 26px;
  padding: 12px 16px 12px 12px;
  border: 1px solid #dce9e4;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.84);
  color: inherit;
  text-decoration: none;
  transition:
    border-color 160ms ease,
    transform 160ms ease;
}

.home-contact-email:hover {
  transform: translateY(-2px);
  border-color: #8fc8b5;
}

.home-contact-icon {
  display: grid;
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  place-items: center;
  border-radius: 13px;
  background: #e4f3ed;
  color: #176b5b;
  font-size: 1.1rem;
}

.home-contact-email small,
.home-contact-email strong {
  display: block;
}

.home-contact-email small {
  margin-bottom: 2px;
  color: #586761;
  font-size: 0.75rem;
}

.home-contact-email strong {
  overflow-wrap: anywhere;
  color: #1d4f45;
  font-size: 0.9rem;
}

.home-contact-arrow {
  margin-inline-start: 8px;
  color: #168f83;
}

.home-contact-form {
  padding: clamp(20px, 3vw, 30px);
  border: 1px solid rgba(220, 233, 228, 0.9);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 12px 30px rgba(24, 67, 58, 0.06);
}

.home-contact-fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.home-contact-fields label {
  display: grid;
  gap: 7px;
  color: #344b45;
  font-size: 0.86rem;
  font-weight: 700;
}

.home-contact-fields input,
.home-contact-fields textarea {
  width: 100%;
  min-width: 0;
  padding: 12px 14px;
  border: 1px solid #dce5e1;
  border-radius: 12px;
  outline: none;
  background: #fff;
  color: #20223a;
  font: inherit;
  font-size: 0.94rem;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.home-contact-fields input {
  min-height: 48px;
}

.home-contact-fields textarea {
  resize: vertical;
}

.home-contact-fields input:focus,
.home-contact-fields textarea:focus {
  border-color: #168f83;
  box-shadow: 0 0 0 4px rgba(22, 143, 131, 0.12);
}

.home-contact-message {
  grid-column: 1 / -1;
}

.home-contact-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  margin-top: 18px;
  padding: 12px 20px;
  border: 0;
  border-radius: 12px;
  background: #176b5b;
  color: #fff;
  font: inherit;
  font-weight: 750;
  cursor: pointer;
  transition:
    background 160ms ease,
    transform 160ms ease;
}

.home-contact-submit:hover {
  transform: translateY(-2px);
  background: #105447;
}

.home-contact-note {
  margin: 10px 0 0;
  color: #586761;
  font-size: 0.78rem;
}

.home-page .home-cta {
  position: relative;
  margin-top: clamp(48px, 7vw, 82px);
  padding: clamp(28px, 4vw, 46px);
  overflow: hidden;
  border: 1px solid #d2e7dc;
  border-radius: 24px;
  background:
    radial-gradient(circle at 94% 12%, rgba(255, 255, 255, 0.42), transparent 30%),
    linear-gradient(115deg, #e5f3eb, #f5f6e9 55%, #fff0e8);
}

.home-page .home-cta::after {
  position: absolute;
  top: -55px;
  right: 28%;
  width: 155px;
  height: 155px;
  border: 1px solid rgba(23, 107, 91, 0.12);
  border-radius: 50%;
  box-shadow:
    0 0 0 18px rgba(23, 107, 91, 0.035),
    0 0 0 36px rgba(23, 107, 91, 0.025);
  content: "";
  pointer-events: none;
}

.home-page .home-cta > div,
.home-page .home-cta > a {
  position: relative;
  z-index: 1;
}

.home-page .home-cta h2 {
  color: #173a35;
  font-size: clamp(1.6rem, 2.8vw, 2.1rem);
  letter-spacing: -0.035em;
}

.home-page .home-cta p {
  color: #65766f;
}

.home-page .home-cta .btn-success {
  background: linear-gradient(135deg, #176b5b, #259782);
}

body.dark .home-page .home-cta {
  border-color: rgba(147, 183, 168, 0.19);
  background:
    radial-gradient(circle at 94% 12%, rgba(112, 188, 157, 0.13), transparent 30%),
    linear-gradient(115deg, #203b32, #29382d 55%, #3e3029);
}

body.dark .home-page .home-cta h2 {
  color: #e6f1ec;
}

body.dark .home-page .home-cta p {
  color: #b2c2bb;
}

body.dark .home-sticker h3,
body.dark .home-contact-copy h2 {
  color: #e6f1ec;
}

body.dark .home-sticker p,
body.dark .home-contact-copy > p {
  color: #b2c2bb;
}

body.dark .home-contact {
  border-color: rgba(147, 183, 168, 0.18);
  background:
    radial-gradient(circle at 8% 90%, rgba(22, 143, 131, 0.14), transparent 30%),
    linear-gradient(135deg, #1a2824 0%, #17221f 100%);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.16);
}

body.dark .home-contact-email,
body.dark .home-contact-form {
  border-color: rgba(147, 183, 168, 0.2);
  background: rgba(16, 28, 24, 0.76);
}

body.dark .home-contact-email strong,
body.dark .home-contact-fields label {
  color: #dceae3;
}

body.dark .home-contact-email small,
body.dark .home-contact-note {
  color: #a8b8b0;
}

body.dark .home-contact-fields input,
body.dark .home-contact-fields textarea {
  border-color: #3a5148;
  background: #17241f;
  color: #eef5f1;
}

body.dark .home-sticker--violet {
  border-color: #494477;
  background: #2a2745;
  color: #c9c2ff;
}

body.dark .home-sticker--teal {
  border-color: #326558;
  background: #203d35;
  color: #a5e0ca;
}

body.dark .home-sticker--amber {
  border-color: #76603c;
  background: #413824;
  color: #f4d69b;
}

@media (max-width: 760px) {
  .home-page {
    padding: 18px 16px;
  }

  .home-sticker-grid {
    gap: 18px;
    padding-inline: 4px;
  }

  .home-sticker,
  .home-sticker--teal {
    min-height: auto;
    transform: none;
  }

  .home-contact {
    grid-template-columns: minmax(0, 1fr);
    border-radius: 22px;
  }

  .home-page .hero-main {
    grid-template-columns: minmax(0, 1fr);
    gap: 18px;
    min-height: 0;
    padding: 38px 26px 28px;
    border-radius: 26px;
  }

  .home-page .hero-title {
    font-size: clamp(2.65rem, 11vw, 4rem);
    letter-spacing: -0.035em;
  }

  .home-page .hero-visual {
    min-width: 0;
    min-height: 360px;
  }

  .home-page .hero-visual::before {
    width: 290px;
    height: 290px;
  }

  .home-page .hero-visual::after {
    width: 350px;
    height: 350px;
  }

  .home-page .hero-resume {
    min-height: 360px;
  }

  .home-page .hero-floating-card--top {
    top: 35px;
    right: -3px;
  }

  .home-page .hero-floating-card--bottom {
    bottom: 34px;
    left: -3px;
  }

  .home-page .home-cta {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 900px) {
  .home-page .benefit-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .home-page .home-sticker:last-child {
    grid-column: 1 / -1;
    min-height: 210px;
  }

  .home-page .how-it-works .hero-steps {
    grid-template-columns: minmax(0, 1fr);
  }

  .home-page .how-it-works .hero-step {
    min-height: 0;
  }

  .home-page .home-contact {
    gap: 32px;
  }
}

@media (max-width: 480px) {
  .home-page .benefit-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .home-page .home-sticker:last-child {
    grid-column: auto;
  }

  .home-page .home-sticker,
  .home-page .home-sticker--teal {
    min-height: 0;
    padding: 26px;
  }

  .home-contact-fields {
    grid-template-columns: minmax(0, 1fr);
  }

  .home-contact-message {
    grid-column: auto;
  }

  .home-page .hero-main {
    padding: 30px 20px 20px;
  }

  .home-page .main-btns {
    flex-direction: column;
  }

  .home-page .main-btns .btn {
    justify-content: center;
  }

  .home-page .hero-visual {
    min-height: 330px;
  }

  .home-page .hero-resume {
    width: min(300px, 78%);
    min-height: 340px;
    padding: 25px;
  }

  .home-page .home-contact {
    padding: 24px 18px;
  }

  .home-contact-form {
    padding: 18px;
  }
}

.home-page .hero-main {
  gap: clamp(28px, 5vw, 68px);
}

.home-page .hero-title {
  display: block;
  color: transparent;
  background-color: transparent;
  background-image: linear-gradient(
    115deg,
    #163b34 8%,
    #176b5b 65%,
    #d27465 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  overflow-wrap: anywhere;
}

body.dark .home-page .hero-title {
  background-image: linear-gradient(
    115deg,
    #f1f7f3 8%,
    #9ed9c0 65%,
    #efb39e 100%
  );
}

.home-page .home-benefits,
.home-page .how-it-works {
  padding-inline: clamp(0px, 2vw, 24px);
}

.home-page .section-heading {
  margin-bottom: clamp(28px, 4vw, 44px);
}

.home-page .benefit-grid,
.home-page .how-it-works .hero-steps {
  align-items: stretch;
}

.home-page .home-sticker-grid {
  gap: clamp(16px, 2.4vw, 28px);
  padding: 12px 8px 24px;
}

.home-page .home-sticker,
.home-page .home-sticker--violet,
.home-page .home-sticker--teal,
.home-page .home-sticker--amber {
  min-height: 248px;
  transform: none;
}

.home-page .home-sticker {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: clamp(22px, 2.6vw, 32px);
}

.home-page .home-sticker h3 {
  margin-top: 18px;
}

.home-page .home-sticker p {
  max-width: 34ch;
}

.home-page .home-sticker:hover {
  transform: translateY(-5px);
}

.home-page .home-sticker::after {
  right: 18px;
}

.home-page .home-contact {
  gap: clamp(24px, 5vw, 64px);
  padding: clamp(26px, 4vw, 50px);
}

.home-page .home-cta {
  gap: clamp(20px, 4vw, 40px);
}

.home-page > section + section {
  scroll-margin-top: 90px;
}

@media (max-width: 900px) {
  .home-page .hero-main {
    grid-template-columns: minmax(0, 1fr);
    gap: 22px;
    min-height: 0;
  }

  .home-page .hero-content {
    max-width: 720px;
  }

  .home-page .hero-title {
    max-width: 14ch;
    font-size: clamp(2.5rem, 7.2vw, 4rem);
  }

  .home-page .hero-desc {
    max-width: 62ch;
  }

  .home-page .hero-visual {
    min-height: 380px;
  }

  .home-page .hero-resume {
    width: min(320px, 70%);
    min-height: 370px;
  }

  .home-page .home-sticker:last-child {
    min-height: 248px;
  }
}

@media (max-width: 760px) {
  .home-page .hero-title {
    max-width: 100%;
    font-size: clamp(2.25rem, 8.5vw, 3.5rem);
    letter-spacing: -0.035em;
  }

  .home-page .hero-visual {
    min-height: 360px;
  }

  .home-page .hero-resume {
    width: min(320px, 78%);
    min-height: 360px;
  }

  .home-page .benefit-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .home-page .home-sticker:last-child {
    grid-column: 1 / -1;
    min-height: 0;
  }
}

@media (max-width: 480px) {
  .home-page .hero-title {
    font-size: clamp(2rem, 9.5vw, 2.7rem);
  }

  .home-page .benefit-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .home-page .home-sticker,
  .home-page .home-sticker:last-child {
    grid-column: auto;
    min-height: 0;
  }
}
</style>
