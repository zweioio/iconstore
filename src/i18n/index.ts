import { en } from './en'
import { zh } from './zh'
import { ja } from './ja'
import { ko } from './ko'

export const translations = { zh, en, ja, ko }

export type TranslationKey = keyof typeof zh
export type Translations = typeof zh
