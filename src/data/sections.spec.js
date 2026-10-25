import { describe, it, expect } from 'vitest'
import { cvSections } from './sections'
import en from '../i18n/locales/en.json'
import ar from '../i18n/locales/ar.json'

describe('cvSections', () => {
  it('has sections', () => {
    expect(cvSections.length).toBeGreaterThan(0)
  })

  it('each section has required keys', () => {
    cvSections.forEach((sec) => {
      expect(sec.key).toBeTruthy()
      expect(sec.icon).toBeTruthy()
      expect(sec.titleKey).toBeTruthy()
      expect(sec.descKey).toBeTruthy()
      expect(Array.isArray(sec.fields)).toBe(true)
      sec.fields.forEach((f) => {
        expect(f.name).toBeTruthy()
        expect(f.labelKey).toBeTruthy()
      })
    })
  })

  it('all titleKey/descKey/labelKey exist in en and ar', () => {
    const keys = new Set()
    cvSections.forEach((sec) => {
      keys.add(sec.titleKey)
      keys.add(sec.descKey)
      sec.fields.forEach((f) => keys.add(f.labelKey))
      if (Array.isArray(sec.fields)) {
        sec.fields.forEach((f) => {
          if (Array.isArray(f.options)) f.options.forEach((o) => keys.add(o))
        })
      }
    })
    keys.forEach((k) => {
      expect(en, `missing en: ${k}`).toHaveProperty(k)
      expect(ar, `missing ar: ${k}`).toHaveProperty(k)
    })
  })

  it('option keys are translation keys (opt_*)', () => {
    cvSections.forEach((sec) => {
      sec.fields.forEach((f) => {
        if (Array.isArray(f.options)) {
          f.options.forEach((o) => expect(o).toMatch(/^opt_/))
        }
      })
    })
  })
})