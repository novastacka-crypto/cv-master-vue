import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useResumeStore } from './resume'

describe('useResumeStore', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('initializes with defaults', () => {
    const store = useResumeStore()
    expect(store.fullName).toBe('')
    expect(store.accentColor).toBe('#6366f1')
    expect(store.theme).toBe('light')
    expect(store.lang).toBe('en')
  })

  it('uses an empty resume when stored resume data is not an object', () => {
    localStorage.setItem('cv_resumeData', 'null')
    const store = useResumeStore()
    expect(store.resumeData).toEqual({})
  })

  it('setAccentColor updates state and localStorage', () => {
    const store = useResumeStore()
    store.setAccentColor('#ec4899')
    expect(store.accentColor).toBe('#ec4899')
    expect(localStorage.getItem('cvAccentColor')).toBe('#ec4899')
  })

  it('setTheme toggles dark class', () => {
    const store = useResumeStore()
    store.setTheme('dark')
    expect(store.theme).toBe('dark')
    expect(document.body.classList.contains('dark')).toBe(true)
    store.setTheme('light')
    expect(document.body.classList.contains('dark')).toBe(false)
  })

  it('setLang persists', () => {
    const store = useResumeStore()
    store.setLang('ar')
    expect(store.lang).toBe('ar')
    expect(localStorage.getItem('lang')).toBe('ar')
  })

  it('resumeData can store items', () => {
    const store = useResumeStore()
    store.resumeData.profile = [{ summary: 'Hello' }]
    expect(store.resumeData.profile).toHaveLength(1)
    expect(store.resumeData.profile[0].summary).toBe('Hello')
  })
})