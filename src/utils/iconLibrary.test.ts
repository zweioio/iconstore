import { describe, expect, it } from 'vitest'

import { icons } from '@/data/icons'
import { applyStrokeWidth, createDownloadName, filterIcons, getIconSvg } from '@/utils/iconLibrary'

describe('iconLibrary', () => {
  it('会替换线性图标的描边粗细', () => {
    const svg = applyStrokeWidth(icons[0].linearSvg, 2.2)

    expect(svg).toContain('stroke-width="2.2"')
  })

  it('会根据风格返回正确的 svg 内容', () => {
    const linearSvg = getIconSvg(icons[1], 'linear', 1.8)
    const filledSvg = getIconSvg(icons[1], 'filled', 1.8)

    expect(linearSvg).toContain('stroke-width="1.8"')
    expect(filledSvg).toBe(icons[1].filledSvg)
  })

  it('会按关键词和分类筛选图标', () => {
    const result = filterIcons(icons, 'shield', 'system')

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('shield-check')
  })

  it('会生成带风格后缀的下载文件名', () => {
    const name = createDownloadName(icons[0], 'filled')

    expect(name).toBe('spark-grid-filled.svg')
  })
})
