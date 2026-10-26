import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    if (v === null) return fallback
    return JSON.parse(v)
  } catch {
    return fallback
  }
}

export const useResumeStore = defineStore('resume', () => {
  const fullName = ref(load('cv_fullName', ''))
  const email = ref(load('cv_email', ''))
  const phone = ref(load('cv_phone', ''))
  const portfolio = ref(load('cv_portfolio', ''))
  const github = ref(load('cv_github', ''))
  const photo = ref(load('cv_photo', ''))
  const accentColor = ref(localStorage.getItem('cvAccentColor') || '#176b5b')
  const theme = ref(localStorage.getItem('theme') || 'light')
  const lang = ref(localStorage.getItem('lang') || 'en')
  const storedResumeData = load('cv_resumeData', {})
  const resumeData = ref(
    storedResumeData && typeof storedResumeData === 'object' && !Array.isArray(storedResumeData)
      ? storedResumeData
      : {},
  )

  const sections = [
    'profile','education','professional-experience','skills','languages',
    'certificates','courses','awards','interests','projects','organisations',
    'publications','references','declaration','custom',
  ]

  function setAccentColor(c) {
    accentColor.value = c
    localStorage.setItem('cvAccentColor', c)
  }
  function setTheme(t) {
    theme.value = t
    localStorage.setItem('theme', t)
    document.body.classList.toggle('dark', t === 'dark')
  }
  function setLang(l) {
    lang.value = l
    localStorage.setItem('lang', l)
  }

  // Persist user info + resume data
  watch(fullName, (v) => localStorage.setItem('cv_fullName', JSON.stringify(v)))
  watch(email, (v) => localStorage.setItem('cv_email', JSON.stringify(v)))
  watch(phone, (v) => localStorage.setItem('cv_phone', JSON.stringify(v)))
  watch(portfolio, (v) => localStorage.setItem('cv_portfolio', JSON.stringify(v)))
  watch(github, (v) => localStorage.setItem('cv_github', JSON.stringify(v)))
  watch(photo, (v) => localStorage.setItem('cv_photo', JSON.stringify(v)))
  watch(resumeData, (v) => localStorage.setItem('cv_resumeData', JSON.stringify(v)), { deep: true })

  function getSnapshot() {
    return {
      fullName: fullName.value,
      email: email.value,
      phone: phone.value,
      portfolio: portfolio.value,
      github: github.value,
      photo: photo.value,
      accentColor: accentColor.value,
      theme: theme.value,
      lang: lang.value,
      resumeData: resumeData.value,
    }
  }

  function applySnapshot(payload) {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      throw new TypeError('Resume data must be a JSON object.')
    }

    fullName.value = payload.fullName || ''
    email.value = payload.email || ''
    phone.value = payload.phone || ''
    portfolio.value = payload.portfolio || ''
    github.value = payload.github || ''
    photo.value = payload.photo || ''
    if (payload.accentColor) setAccentColor(payload.accentColor)
    if (payload.theme) setTheme(payload.theme)
    if (payload.lang) setLang(payload.lang)
    resumeData.value =
      payload.resumeData &&
      typeof payload.resumeData === 'object' &&
      !Array.isArray(payload.resumeData)
        ? payload.resumeData
        : {}
  }

  function exportJSON() {
    const payload = getSnapshot()
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(fullName.value || 'CV').replace(/\s+/g, '_')}_data.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function importJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const d = JSON.parse(e.target.result)
          applySnapshot(d)
          resolve(true)
        } catch (err) {
          reject(err)
        }
      }
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  function resetAll() {
    fullName.value = ''
    email.value = ''
    phone.value = ''
    portfolio.value = ''
    github.value = ''
    photo.value = ''
    accentColor.value = '#176b5b'
    localStorage.setItem('cvAccentColor', '#176b5b')
    resumeData.value = {}
    localStorage.removeItem('cv_resumeData')
  }

  return {
    fullName, email, phone, portfolio, github, photo,
    accentColor, theme, lang, resumeData, sections,
    setAccentColor, setTheme, setLang, exportJSON, importJSON, resetAll,
    getSnapshot, applySnapshot,
  }
})