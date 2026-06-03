import type { IconItem, IconStyleMode } from '@/types/icon'

// 统一控制描边替换，保证线性图标的粗细调节只改一处
export function applyStrokeWidth(svg: string, strokeWidth: number) {
  return svg.replace(/stroke-width="[\d.]+"/g, `stroke-width="${strokeWidth}"`)
}

// 根据当前风格拿到应该显示的 SVG 内容
export function getIconSvg(icon: IconItem, styleMode: IconStyleMode, strokeWidth: number) {
  if (styleMode === 'filled') {
    return icon.filledSvg
  }

  return applyStrokeWidth(icon.linearSvg, strokeWidth)
}

// 拼音首字母映射表（用于中文拼音首字母模糊搜索）
const pinyinMap: Record<string, string> = {
  '全': 'q', '部': 'b', '基': 'j', '础': 'c', '箭': 'j', '头': 't',
  '编': 'b', '辑': 'j', '媒': 'm', '体': 't', '系': 'x', '统': 't',
  '品': 'p', '牌': 'p', '收': 's', '藏': 'c', '夹': 'j',
}

// 模糊匹配：支持拼音首字母、中英文混合、部分匹配
function fuzzyMatch(text: string, query: string): boolean {
  const q = query.toLowerCase()
  const t = text.toLowerCase()

  // 1. 精确包含匹配
  if (t.includes(q)) return true

  // 2. 拼音首字母匹配（中文关键词）
  const pinyinFirst = Array.from(text)
    .map((char) => pinyinMap[char] || char.toLowerCase())
    .join('')
  if (pinyinFirst.includes(q)) return true

  // 3. 分词模糊匹配：将查询词按空格/中文拆分，逐词匹配
  const words = q.split(/\s+/)
  if (words.every((word) => t.includes(word))) return true

  // 4. 逐字符模糊匹配（支持不连续匹配）
  if (fuzzyCharMatch(t, q)) return true

  return false
}

// 逐字符不连续匹配
function fuzzyCharMatch(text: string, query: string): boolean {
  let ti = 0
  let qi = 0
  while (qi < query.length && ti < text.length) {
    if (text[ti] === query[qi]) {
      qi++
    }
    ti++
  }
  return qi === query.length
}

// 统一完成关键词、分类和名称筛选，支持中英文搜索、关键词搜索、模糊搜索
export function filterIcons(
  icons: IconItem[],
  keyword: string,
  category: IconItem['category'] | 'all',
) {
  const normalizedKeyword = keyword.trim()

  return icons.filter((icon) => {
    const matchesCategory = category === 'all' || icon.category === category
    if (normalizedKeyword.length === 0) return matchesCategory

    // 名称模糊匹配
    const nameMatch = fuzzyMatch(icon.name, normalizedKeyword)

    // 关键词模糊匹配（支持关键词数组中的所有关键词）
    const keywordMatch = icon.keywords.some((item) =>
      fuzzyMatch(item, normalizedKeyword) || fuzzyMatch(normalizedKeyword, item)
    )

    // 中文名匹配（如果 icon 有中文名称字段可以扩展）
    const categoryMatch = fuzzyMatch(categoryLabels[icon.category] || '', normalizedKeyword)

    const matchesKeyword = nameMatch || keywordMatch || categoryMatch

    return matchesCategory && matchesKeyword
  })
}

import { categoryLabels } from '@/data/categories'

// 生成下载文件名，让用户下载时能区分风格版本
export function createDownloadName(icon: IconItem, styleMode: IconStyleMode) {
  return `${icon.name}-${styleMode === 'filled' ? 'filled' : 'linear'}.svg`
}
