// 分类定义 - 新增分类只需在此文件加一行
// 其他文件自动适配，不需要额外修改

export type IconCategory =
  | 'basic'
  | 'arrow'
  | 'edit'
  | 'media'
  | 'system'
  | 'brand'

// 分类元数据（id、中文标签、显示顺序）
export const categories: { id: IconCategory; label: string; order: number }[] = [
  { id: 'basic',  label: '基础', order: 0 },
  { id: 'arrow',  label: '箭头', order: 1 },
  { id: 'edit',   label: '编辑', order: 2 },
  { id: 'media',  label: '媒体', order: 3 },
  { id: 'system', label: '系统', order: 4 },
  { id: 'brand',  label: '品牌', order: 5 },
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
