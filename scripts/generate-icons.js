/**
 * 图标生成脚本
 * 用法: node scripts/generate-icons.js
 *
 * 从 src/icons/svg/ 目录读取 SVG 文件，自动生成 src/data/icons.ts
 *
 * 目录结构:
 *   src/icons/svg/linear/{分类名}/*.svg
 *   src/icons/svg/filled/{分类名}/*.svg
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SVG_DIR = path.join(ROOT, 'src', 'icons', 'svg')
const OUTPUT = path.join(ROOT, 'src', 'data', 'icons.ts')
const STROKE_ATTRS = 'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"'

function extractSvgContent(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8').trim()
  if (!raw.startsWith('<svg')) return raw
  const match = raw.match(/<svg[^>]*>([\s\S]*)<\/svg>/)
  return match ? match[1].trim() : raw
}

function formatLinearSvg(content) {
  if (content.includes('stroke="')) return `<svg viewBox="0 0 24 24" ${STROKE_ATTRS}>${content}</svg>`
  return `<svg viewBox="0 0 24 24" ${STROKE_ATTRS}>${content}</svg>`
}

function formatFilledSvg(content) {
  if (content.startsWith('<svg')) return content
  return `<svg viewBox="0 0 24 24" fill="currentColor">${content}</svg>`
}

function generateKeywords(name, categoryLabel) {
  const parts = name.split('-')
  return [...new Set([name, ...parts, categoryLabel])]
}

function scanIcons() {
  const linearDir = path.join(SVG_DIR, 'linear')
  const filledDir = path.join(SVG_DIR, 'filled')

  if (!fs.existsSync(linearDir)) {
    console.error('❌ 未找到 SVG 目录:', linearDir)
    console.log('请先创建 src/icons/svg/linear/{分类名}/ 目录并放入 SVG 文件')
    process.exit(1)
  }

  const categories = fs.readdirSync(linearDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort()

  if (categories.length === 0) {
    console.error('❌ SVG 目录中没有分类子目录')
    process.exit(1)
  }

  console.log(`📁 发现 ${categories.length} 个分类:`, categories.join(', '))

  const icons = []

  for (const category of categories) {
    const catLinearDir = path.join(linearDir, category)
    const catFilledDir = path.join(filledDir, category)

    if (!fs.existsSync(catFilledDir)) {
      console.warn(`⚠️  分类 "${category}" 缺少面型目录，已跳过`)
      continue
    }

    const svgFiles = fs.readdirSync(catLinearDir)
      .filter(f => f.endsWith('.svg'))
      .sort()

    if (svgFiles.length === 0) {
      console.warn(`⚠️  分类 "${category}" 中没有 SVG 文件`)
      continue
    }

    for (const file of svgFiles) {
      const name = file.replace(/\.svg$/, '')
      const linearPath = path.join(catLinearDir, file)
      const filledPath = path.join(catFilledDir, file)

      if (!fs.existsSync(filledPath)) {
        console.warn(`⚠️  ${name}: 缺少面型版本，已跳过`)
        continue
      }

      icons.push({
        name,
        category,
        linearSvg: formatLinearSvg(extractSvgContent(linearPath)),
        filledSvg: formatFilledSvg(extractSvgContent(filledPath)),
        categoryLabel: category,
      })
    }
  }

  return icons
}

function generate(icons) {
  const lines = []
  lines.push('// ⚠️ 此文件由 scripts/generate-icons.js 自动生成')
  lines.push('// 不要手动编辑，修改请操作 SVG 文件后运行: node scripts/generate-icons.js')
  lines.push('')
  lines.push("import type { IconItem } from '@/types/icon'")
  lines.push("import { categoryLabels } from '@/data/categories'")
  lines.push('export { categoryLabels }')
  lines.push('')

  const output = `${lines.filter(l => l.trim()).join('\n')}
const iconsData: IconItem[] = [
${icons.map(icon => {
  const kw = JSON.stringify(generateKeywords(icon.name, icon.categoryLabel))
  return `  {
    id: '${icon.name}',
    name: '${icon.name}',
    category: '${icon.category}',
    keywords: ${kw},
    linearSvg: \`${icon.linearSvg}\`,
    filledSvg: \`${icon.filledSvg}\`,
  }`
}).join(',\n')}
]

export const icons: IconItem[] = iconsData
`

  fs.writeFileSync(OUTPUT, output, 'utf-8')
  console.log(`✅ 已生成 ${OUTPUT}`)
  console.log(`📊 共 ${icons.length} 个图标`)

  // 报告缺失
  let missing = 0
  const linearDir = path.join(SVG_DIR, 'linear')
  const filledDir = path.join(SVG_DIR, 'filled')
  const cats = fs.readdirSync(linearDir, { withFileTypes: true }).filter(d => d.isDirectory())
  for (const cat of cats) {
    const lDir = path.join(linearDir, cat.name)
    const fDir = path.join(filledDir, cat.name)
    if (!fs.existsSync(fDir)) continue
    const lFiles = fs.readdirSync(lDir).filter(f => f.endsWith('.svg'))
    const fSet = new Set(fs.readdirSync(fDir).filter(f => f.endsWith('.svg')))
    for (const file of lFiles) {
      if (!fSet.has(file)) { console.warn(`⚠️  缺少面型文件: ${cat.name}/${file}`); missing++ }
    }
  }
  if (missing) console.warn(`⚠️  共缺失 ${missing} 个面型文件`)
}

const icons = scanIcons()
generate(icons)
