// 分类定义 - 新增分类只需在此文件加一行
// 其他文件自动适配，不需要额外修改

export type IconCategory =
  | 'arrow'
  | 'basic'
  | 'brand'
  | 'building'
  | 'business'
  | 'communication'
  | 'contact'
  | 'crypto'
  | 'design'
  | 'development'
  | 'device'
  | 'document'
  | 'edit'
  | 'editor'
  | 'education'
  | 'emoji'
  | 'file'
  | 'finance'
  | 'food'
  | 'game'
  | 'health'
  | 'logo'
  | 'map'
  | 'media'
  | 'nature'
  | 'other'
  | 'part'
  | 'shape'
  | 'sport'
  | 'system'
  | 'transport'
  | 'user'
  | 'weather'
  | 'zodiac'

// 分类元数据（id、中文标签、显示顺序）
export const categories: { id: IconCategory; label: string; order: number }[] = [
  // 按 id 字母 A-Z 排序
  { id: 'arrow',        label: '箭头',     order: 0 },
  { id: 'basic',        label: '基础',     order: 1 },
  { id: 'brand',        label: '品牌',     order: 2 },
  { id: 'building',     label: '建筑',     order: 3 },
  { id: 'business',     label: '商业',     order: 4 },
  { id: 'communication',label: '通讯',     order: 5 },
  { id: 'contact',      label: '联系人',   order: 6 },
  { id: 'crypto',       label: '加密货币', order: 7 },
  { id: 'design',       label: '设计',     order: 8 },
  { id: 'development',  label: '开发',     order: 9 },
  { id: 'device',       label: '设备',     order: 10 },
  { id: 'document',     label: '文档',     order: 11 },
  { id: 'edit',         label: '编辑',     order: 12 },
  { id: 'editor',       label: '编辑器',   order: 13 },
  { id: 'education',    label: '教育',     order: 14 },
  { id: 'emoji',        label: '表情',     order: 15 },
  { id: 'file',         label: '文件',     order: 16 },
  { id: 'finance',      label: '金融',     order: 17 },
  { id: 'food',         label: '食物',     order: 18 },
  { id: 'game',         label: '游戏',     order: 19 },
  { id: 'health',       label: '健康',     order: 20 },
  { id: 'logo',         label: '标志',     order: 21 },
  { id: 'map',          label: '地图',     order: 22 },
  { id: 'media',        label: '媒体',     order: 23 },
  { id: 'nature',       label: '自然',     order: 24 },
  { id: 'other',        label: '其他',     order: 25 },
  { id: 'part',         label: '部件',     order: 26 },
  { id: 'shape',        label: '形状',     order: 27 },
  { id: 'sport',        label: '运动',     order: 28 },
  { id: 'system',       label: '系统',     order: 29 },
  { id: 'transport',    label: '交通',     order: 30 },
  { id: 'user',         label: '用户',     order: 31 },
  { id: 'weather',      label: '天气',     order: 32 },
  { id: 'zodiac',       label: '星座',     order: 33 },
]

// 自动生成的映射表
export const categoryLabels: Record<IconCategory, string> = Object.fromEntries(
  categories.map((c) => [c.id, c.label]),
) as Record<IconCategory, string>

// 自动生成的排序数组
export const categoryOrder: IconCategory[] = categories
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((c) => c.id)
