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

const categoryLabels = {
  arrow: '箭头', basic: '基础', brand: '品牌', building: '建筑',
  business: '商业', communication: '通讯', contact: '联系人', crypto: '加密货币',
  design: '设计', development: '开发', device: '设备', document: '文档',
  edit: '编辑', editor: '编辑器', education: '教育', emoji: '表情',
  file: '文件', finance: '金融', food: '食物', game: '游戏', health: '健康',
  logo: '标志', map: '地图', media: '媒体', nature: '自然', other: '其他',
  part: '部件', shape: '形状', sport: '运动', system: '系统',
  transport: '交通', user: '用户', weather: '天气', zodiac: '星座',
}

// 所有语言的分类翻译，标签搜索支持多语言
const categoryI18n = {
  arrow: ['箭头', '箭頭', 'Arrow', '矢印', '화살표'],
  basic: ['基础', '基礎', 'Basic', '基本', '기본'],
  brand: ['品牌', '品牌', 'Brand', 'ブランド', '브랜드'],
  building: ['建筑', '建築', 'Building', '建築', '건축'],
  business: ['商业', '商業', 'Business', 'ビジネス', '비즈니스'],
  communication: ['通讯', '通訊', 'Communication', 'コミュニケーション', '커뮤니케이션'],
  contact: ['联系人', '聯絡人', 'Contact', '連絡先', '연락처'],
  crypto: ['加密货币', '加密貨幣', 'Crypto', '暗号通貨', '암호화폐'],
  design: ['设计', '設計', 'Design', 'デザイン', '디자인'],
  development: ['开发', '開發', 'Development', '開発', '개발'],
  device: ['设备', '設備', 'Device', 'デバイス', '디바이스'],
  document: ['文档', '文件', 'Document', '文書', '문서'],
  edit: ['编辑', '編輯', 'Edit', '編集', '편집'],
  editor: ['编辑器', '編輯器', 'Editor', 'エディター', '에디터'],
  education: ['教育', '教育', 'Education', '教育', '교육'],
  emoji: ['表情', '表情', 'Emoji', '絵文字', '이모지'],
  file: ['文件', '檔案', 'File', 'ファイル', '파일'],
  finance: ['金融', '金融', 'Finance', '金融', '금융'],
  food: ['食物', '食物', 'Food', '食べ物', '음식'],
  game: ['游戏', '遊戲', 'Game', 'ゲーム', '게임'],
  health: ['健康', '健康', 'Health', '健康', '건강'],
  logo: ['标志', '標誌', 'Logo', 'ロゴ', '로고'],
  map: ['地图', '地圖', 'Map', '地図', '지도'],
  media: ['媒体', '媒體', 'Media', 'メディア', '미디어'],
  nature: ['自然', '自然', 'Nature', '自然', '자연'],
  other: ['其他', '其他', 'Other', 'その他', '기타'],
  part: ['部件', '零件', 'Part', '部品', '부품'],
  shape: ['形状', '形狀', 'Shape', '形状', '모양'],
  sport: ['运动', '運動', 'Sport', 'スポーツ', '스포츠'],
  system: ['系统', '系統', 'System', 'システム', '시스템'],
  transport: ['交通', '交通', 'Transport', '交通', '운송'],
  user: ['用户', '用戶', 'User', 'ユーザー', '사용자'],
  weather: ['天气', '天氣', 'Weather', '天気', '날씨'],
  zodiac: ['星座', '星座', 'Zodiac', '星座', '별자리'],
}

function generateKeywords(name, category) {
  const parts = name.split('-')
  const labels = categoryI18n[category] || []
  return [...new Set([name, ...parts, ...labels])]
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
  const kw = JSON.stringify(generateKeywords(icon.name, icon.category))
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
