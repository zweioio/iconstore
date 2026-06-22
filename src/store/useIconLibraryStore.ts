import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type {
  IconCategory,
  IconLibraryView,
  IconStyleMode,
  PreviewBackground,
} from '@/types/icon'

export const DEFAULT_ICON_SIZE = 24
export const DEFAULT_STROKE_WIDTH = 1.8
export const DEFAULT_ICON_COLOR = '#000000'

// 根据当前主题返回默认图标颜色
export function getDefaultIconColor(isDark = false): string {
  return isDark ? '#FFFFFF' : '#000000'
}

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
  iconColor: string
  colorEnabled: boolean
  background: PreviewBackground
  favoriteIds: string[]
  selectedIconId: string | null
  setKeyword: (value: string) => void
  setCategory: (value: IconCategory | 'all') => void
  setViewMode: (value: IconLibraryView) => void
  setStyleMode: (value: IconStyleMode) => void
  setIconSize: (value: number) => void
  setStrokeWidth: (value: number) => void
  setIconColor: (value: string) => void
  setColorEnabled: (value: boolean) => void
  setBackground: (value: PreviewBackground) => void
  toggleFavorite: (iconId: string) => void
  resetIconSettings: () => void
  clearFavorites: () => void
  setSelectedIconId: (value: string | null) => void
}

// 集中管理图标库页的交互状态，并持久化收藏数据到 localStorage
export const useIconLibraryStore = create<IconLibraryStore>()(
  persist(
    (set) => ({
      keyword: '',
      category: 'all',
      viewMode: 'all',
      styleMode: 'linear',
      iconSize: DEFAULT_ICON_SIZE,
      strokeWidth: DEFAULT_STROKE_WIDTH,
      iconColor: DEFAULT_ICON_COLOR,
      colorEnabled: false,
      background: 'light',
      favoriteIds: [],
      selectedIconId: null,
      setKeyword: (value) => set({ keyword: value }),
      setCategory: (value) => set({ category: value }),
      setViewMode: (value) => set({ viewMode: value }),
      setStyleMode: (value) => set({ styleMode: value }),
      setIconSize: (value) => set({ iconSize: clamp(value, 12, 64) }),
      setStrokeWidth: (value) => set({ strokeWidth: clamp(value, 0.5, 4) }),
      setIconColor: (value) => set({ iconColor: value }),
      setColorEnabled: (value) => set({ colorEnabled: value }),
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
          iconColor: DEFAULT_ICON_COLOR,
        }),
      clearFavorites: () => set({ favoriteIds: [] }),
      setSelectedIconId: (value) => set({ selectedIconId: value }),
    }),
    {
      name: 'iconstore-settings',
      partialize: (state) => ({
        favoriteIds: state.favoriteIds,
        iconColor: state.iconColor,
        iconSize: state.iconSize,
        strokeWidth: state.strokeWidth,
        colorEnabled: state.colorEnabled,
      }),
    },
  ),
)
