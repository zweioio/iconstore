import { en } from './en'
import { zh } from './zh'

export type { zh, en }

export const translations = { zh, en }

export type TranslationKey = keyof typeof zh
export type Translations = typeof zh
