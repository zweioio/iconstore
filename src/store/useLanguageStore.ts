import { create } from 'zustand'

export type Language = 'zh' | 'zh-TW' | 'en' | 'ja' | 'ko'

type LanguageStore = {
  language: Language
  setLanguage: (lang: Language) => void
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'zh',
  setLanguage: (lang) => set({ language: lang }),
}))
