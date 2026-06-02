import { create } from 'zustand'

import type {
  IconCategory,
  IconLibraryView,
  IconStyleMode,
  PreviewBackground,
} from '@/types/icon'

export const DEFAULT_ICON_SIZE = 24
export const DEFAULT_STROKE_WIDTH = 1.5

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

type IconLibraryStore = {
  keyword: string
  category: IconCategory | 'all'
  viewMode: IconLibraryView
  styleMode: IconStyleMode
  iconSize: number
  strokeWidth: number
  background: PreviewBackground
  favoriteIds: string[]
  selectedIconId: string | null
  setKeyword: (value: string) => void
  setCategory: (value: IconCategory | 'all') => void
  setViewMode: (value: IconLibraryView) => void
  setStyleMode: (value: IconStyleMode) => void
  setIconSize: (value: number) => void
  setStrokeWidth: (value: number) => void
  setBackground: (value: PreviewBackground) => void
  toggleFavorite: (iconId: string) => void
  resetIconSettings: () => void
  setSelectedIconId: (value: string | null) => void
}

// 集中管理图标库页的交互状态，避免组件层层传参
export const useIconLibraryStore = create<IconLibraryStore>((set) => ({
  keyword: '',
  category: 'all',
  viewMode: 'all',
  styleMode: 'linear',
  iconSize: DEFAULT_ICON_SIZE,
  strokeWidth: DEFAULT_STROKE_WIDTH,
  background: 'light',
  favoriteIds: [],
  selectedIconId: null,
  setKeyword: (value) => set({ keyword: value }),
  setCategory: (value) => set({ category: value }),
  setViewMode: (value) => set({ viewMode: value }),
  setStyleMode: (value) => set({ styleMode: value }),
  setIconSize: (value) => set({ iconSize: clamp(value, 12, 64) }),
  setStrokeWidth: (value) => set({ strokeWidth: clamp(value, 0.5, 4) }),
  setBackground: (value) => set({ background: value }),
  toggleFavorite: (iconId) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(iconId)
        ? state.favoriteIds.filter((id) => id !== iconId)
        : [...state.favoriteIds, iconId],
    })),
  resetIconSettings: () =>
    set({
      iconSize: DEFAULT_ICON_SIZE,
      strokeWidth: DEFAULT_STROKE_WIDTH,
    }),
  setSelectedIconId: (value) => set({ selectedIconId: value }),
}))
