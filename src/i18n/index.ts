import { en } from './en'
import { zh } from './zh'
import { zhTW } from './zh-TW'
import { ja } from './ja'
import { ko } from './ko'

export const translations = { zh, 'zh-TW': zhTW, en, ja, ko }

export type TranslationKey = keyof typeof zh
export type Translations = typeof zh
