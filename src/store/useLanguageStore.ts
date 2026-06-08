import { create } from 'zustand'

export type Language = 'zh' | 'zh-TW' | 'en' | 'ja' | 'ko'

type LanguageStore = {
  language: Language
  setLanguage: (lang: Language) => void
}

const STORAGE_KEY = 'iconstore_language'

function detectLanguage(): Language {
  // 优先使用用户手动保存的选择
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null
    if (saved && ['zh', 'zh-TW', 'en', 'ja', 'ko'].includes(saved)) return saved
  } catch {
    // localStorage 不可用
  }
  // 无保存记录时检测浏览器语言
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
  setLanguage: (lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // localStorage 不可用
    }
    set({ language: lang })
  },
}))
