// 定义图标分类，方便页面筛选和文案统一
// 新增分类：在 src/data/categories.ts 中添加即可
import type { IconCategory } from '@/data/categories'
export type { IconCategory }

// 定义图标风格，线性和面型共用一套切换状态
export type IconStyleMode = 'linear' | 'filled'

// 定义预览背景模式，方便图标在浅色和深色底上查看效果
export type PreviewBackground = 'light' | 'dark'

// 定义图标列表展示范围，支持全部图标与收藏夹切换
export type IconLibraryView = 'all' | 'favorites'

// 定义单个图标的数据结构
export type IconItem = {
  id: string
  name: string
  category: IconCategory
  keywords: string[]
  linearSvg: string
  filledSvg: string
}
