import { create } from 'zustand'

export type Language = 'zh' | 'zh-TW' | 'en' | 'ja' | 'ko'

type LanguageStore = {
  language: Language
  setLanguage: (lang: Language) => void
}

function detectLanguage(): Language {
  try {
    const lang = navigator.language
    if (lang.startsWith('zh-TW') || lang.startsWith('zh-HK')) return 'zh-TW'
    if (lang.startsWith('zh')) return 'zh'
    if (lang.startsWith('ja')) return 'ja'
    if (lang.startsWith('ko')) return 'ko'
  } catch {
    // SSR 或非浏览器环境
  }
  return 'en'
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: detectLanguage(),
  setLanguage: (lang) => set({ language: lang }),
}))
