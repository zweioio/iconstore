import { create } from 'zustand'

export type Language = 'zh' | 'en'

type LanguageStore = {
  language: Language
  setLanguage: (lang: Language) => void
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'zh',
  setLanguage: (lang) => set({ language: lang }),
}))
