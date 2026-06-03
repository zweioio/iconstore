import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// 已知的12个基础图标数据
const baseIcons = [
  { id: 'spark-grid', cat: 'basic', linear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5.5h5"/><path d="M13 5.5h5"/><path d="M5.5 10.5h13"/><path d="M7 15.5h10"/><path d="M9 19h6"/><path d="M12 3.5v17"/></svg>', filled: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="14" height="2.2" rx="1.1"/><rect x="4.5" y="9.4" width="15" height="2.2" rx="1.1"/><rect x="6.5" y="14.8" width="11" height="2.2" rx="1.1"/><rect x="9" y="18.4" width="6" height="2.2" rx="1.1"/><rect x="10.9" y="3.2" width="2.2" height="17.6" rx="1.1"/></svg>' },
  { id: 'frame-stack', cat: 'basic', linear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="10" height="10" rx="2"/><path d="M9 9h10v10a2 2 0 0 1-2 2H9z"/></svg>', filled: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4.8" y="4.8" width="10.4" height="10.4" rx="2.2"/><path d="M9 8.8h8a2.2 2.2 0 0 1 2.2 2.2v5.8A2.2 2.2 0 0 1 17 19H9z"/></svg>' },
  { id: 'arrow-rise', cat: 'arrow', linear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16L18 8"/><path d="M10 8h8v8"/></svg>', filled: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.4 6.9h-7.1a1.1 1.1 0 1 0 0 2.2h4.45L5.4 15.95a1.1 1.1 0 1 0 1.2 1.85L16.9 11v4.3a1.1 1.1 0 1 0 2.2 0V8a1.1 1.1 0 0 0-1.1-1.1"/></svg>' },
  { id: 'arrow-loop', cat: 'arrow', linear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7H5v3"/><path d="M5.5 10A7.5 7.5 0 1 0 8 7"/></svg>', filled: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.7 5.9H4.9c-.6 0-1 .4-1 1V9.7a1 1 0 1 0 2 0V8.65a6.4 6.4 0 1 1-1.1 5.85 1 1 0 1 0-1.9.62A8.4 8.4 0 1 0 7.7 5.9"/></svg>' },
  { id: 'pen-edit', cat: 'edit', linear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16.5V19h2.5L18 9.5 14.5 6z"/><path d="M13.5 7l3.5 3.5"/><path d="M5 19h14"/></svg>', filled: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.45 5.15a1.6 1.6 0 0 1 2.26 0l2.14 2.14a1.6 1.6 0 0 1 0 2.26l-8.9 8.9a2.2 2.2 0 0 1-1.02.56l-3.23.8a.9.9 0 0 1-1.1-1.1l.8-3.23c.1-.4.3-.74.57-1.02zM5 18.1a1 1 0 0 0 0 2h14a1 1 0 1 0 0-2z"/></svg>' },
  { id: 'crop-area', cat: 'edit', linear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v13a3 3 0 0 0 3 3h10"/><path d="M4 7h13a3 3 0 0 1 3 3v10"/></svg>', filled: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 3.9A1.1 1.1 0 0 1 7.1 5v11.8c0 1.05.85 1.9 1.9 1.9H20a1.1 1.1 0 1 1 0 2.2H9a4.1 4.1 0 0 1-4.1-4.1V5A1.1 1.1 0 0 1 6 3.9"/><path d="M3.9 7A1.1 1.1 0 0 1 5 5.9h11.8A4.1 4.1 0 0 1 20.9 10V20a1.1 1.1 0 1 1-2.2 0V10c0-1.05-.85-1.9-1.9-1.9H5A1.1 1.1 0 0 1 3.9 7"/></svg>' },
  { id: 'play-orbit', cat: 'media', linear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M10 9l5 3-5 3z"/></svg>', filled: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.2A8.8 8.8 0 1 0 20.8 12 8.8 8.8 0 0 0 12 3.2m-2.4 5.9a1 1 0 0 1 1.51-.87l4.72 2.88a1 1 0 0 1 0 1.7L11.1 15.7A1 1 0 0 1 9.6 14.8z"/></svg>' },
  { id: 'wave-audio', cat: 'media', linear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13v-2"/><path d="M9 16V8"/><path d="M13 18V6"/><path d="M17 15V9"/><path d="M21 13v-2"/></svg>', filled: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="10" width="2" height="4" rx="1"/><rect x="8" y="7" width="2" height="10" rx="1"/><rect x="12" y="5" width="2" height="14" rx="1"/><rect x="16" y="8" width="2" height="8" rx="1"/><rect x="20" y="10" width="2" height="4" rx="1"/></svg>' },
  { id: 'shield-check', cat: 'system', linear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l6 2v5.5c0 4-2.6 6.9-6 8.5-3.4-1.6-6-4.5-6-8.5V6z"/><path d="M9.5 12.3l1.8 1.8 3.7-4"/></svg>', filled: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.66 3.12a1 1 0 0 1 .68 0l6.25 2.08a1.2 1.2 0 0 1 .81 1.14v5.18c0 4.68-3.12 8.08-6.88 9.8a1.2 1.2 0 0 1-1.04 0C7.72 19.6 4.6 16.2 4.6 11.52V6.34a1.2 1.2 0 0 1 .81-1.14zm4.11 6.57a1 1 0 0 0-1.42.15l-3.2 4.01-1.03-1.03a1 1 0 1 0-1.42 1.41l1.82 1.83a1 1 0 0 0 1.5-.08l3.9-4.88a1 1 0 0 0-.15-1.41"/></svg>' },
  { id: 'cloud-sync', cat: 'system', linear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 18.5A4.5 4.5 0 1 1 8 9.5a5.5 5.5 0 0 1 10.2 2.5A3.5 3.5 0 1 1 18 18.5z"/><path d="M10 12.5h4l-1.5-1.5"/><path d="M14 15.5h-4l1.5 1.5"/></svg>', filled: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.1 8.4a5.8 5.8 0 0 1 11 2.15 4 4 0 0 1-1.1 7.85H7.6a5 5 0 0 1 .5-9.95m2.8 3.1a1 1 0 0 0-.7 1.7l.1.09H12l-.5.5a1 1 0 0 0 1.42 1.41l2.2-2.2a1 1 0 0 0 0-1.41l-2.2-2.2a1 1 0 0 0-1.42 1.41l.5.5z"/></svg>' },
  { id: 'chat-badge', cat: 'brand', linear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7.5A3.5 3.5 0 0 1 8.5 4h7A3.5 3.5 0 0 1 19 7.5v5A3.5 3.5 0 0 1 15.5 16H11l-4 3v-3.2A3.5 3.5 0 0 1 5 12.5z"/><path d="M9 9.5h6"/><path d="M9 12.5h4"/></svg>', filled: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 4.1h7A3.4 3.4 0 0 1 18.9 7.5v5A3.4 3.4 0 0 1 15.5 16H11l-3.7 2.8a.8.8 0 0 1-1.28-.64V16a3.4 3.4 0 0 1-2.4-3.25v-5A3.4 3.4 0 0 1 8.5 4.1M8.8 8.9a.9.9 0 0 0 0 1.8h6.4a.9.9 0 0 0 0-1.8zm0 3a.9.9 0 0 0 0 1.8h4.2a.9.9 0 0 0 0-1.8z"/></svg>' },
  { id: 'star-burst', cat: 'brand', linear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9-1.9 5.1-1.9-5.1-5.1-1.9 5.1-1.9z"/><path d="M17.5 16.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/></svg>', filled: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.06 3.55a1 1 0 0 1 1.88 0l1.56 4.2 4.2 1.56a1 1 0 0 1 0 1.88l-4.2 1.56-1.56 4.2a1 1 0 0 1-1.88 0l-1.56-4.2-4.2-1.56a1 1 0 0 1 0-1.88l4.2-1.56zm6.48 11.73a.8.8 0 0 1 1.5 0l.58 1.58 1.58.58a.8.8 0 0 1 0 1.5l-1.58.58-.58 1.58a.8.8 0 0 1-1.5 0l-.58-1.58-1.58-.58a.8.8 0 0 1 0-1.5l1.58-.58z"/></svg>' },
]

// 生成图标的名称列表（从 generatedGroups 提取）
const generatedNames = {
  basic: ['panel-grid', 'layout-board', 'dashboard-stack', 'module-grid', 'window-tile', 'layer-board', 'scene-grid', 'card-stack', 'widget-grid', 'surface-board', 'block-stack', 'panel-cluster', 'canvas-grid', 'section-board', 'board-stack', 'view-grid'],
  arrow: ['arrow-upward', 'arrow-refresh', 'arrow-return', 'arrow-rotate', 'arrow-bend', 'arrow-share', 'arrow-forward', 'arrow-reload', 'arrow-curve', 'arrow-redirect', 'arrow-trend', 'arrow-cycle', 'arrow-launch', 'arrow-turn', 'arrow-reply', 'arrow-branch'],
  edit: ['edit-pencil', 'edit-board', 'edit-canvas', 'edit-crop', 'edit-adjust', 'edit-trim', 'edit-select', 'edit-note', 'edit-layer', 'edit-shape', 'edit-frame', 'edit-scale', 'edit-ratio', 'edit-compose', 'edit-outline', 'edit-mark'],
  media: ['media-play', 'media-audio', 'media-radio', 'media-voice', 'media-wave', 'media-track', 'media-stream', 'media-podcast', 'media-record', 'media-sound', 'media-music', 'media-player', 'media-video', 'media-volume', 'media-session', 'media-live'],
  system: ['system-guard', 'system-sync', 'system-cloud', 'system-safe', 'system-backup', 'system-verify', 'system-update', 'system-check', 'system-secure', 'system-service', 'system-online', 'system-status', 'system-deploy', 'system-recover', 'system-control', 'system-health'],
  brand: ['brand-chat', 'brand-shine', 'brand-message', 'brand-spark', 'brand-community', 'brand-highlight', 'brand-badge', 'brand-social', 'brand-featured', 'brand-launch', 'brand-notice', 'brand-banner', 'brand-circle', 'brand-voice', 'brand-lounge', 'brand-focus'],
}

// 每个分类对应的两个模板
const templates = {
  basic: ['spark-grid', 'frame-stack'],
  arrow: ['arrow-rise', 'arrow-loop'],
  edit: ['pen-edit', 'crop-area'],
  media: ['play-orbit', 'wave-audio'],
  system: ['shield-check', 'cloud-sync'],
  brand: ['chat-badge', 'star-burst'],
}

const baseMap = Object.fromEntries(baseIcons.map(i => [i.id, i]))
let count = 0

// 1. 写入基础图标
for (const icon of baseIcons) {
  const lDir = path.join(ROOT, 'src', 'icons', 'svg', 'linear', icon.cat)
  const fDir = path.join(ROOT, 'src', 'icons', 'svg', 'filled', icon.cat)
  fs.mkdirSync(lDir, { recursive: true })
  fs.mkdirSync(fDir, { recursive: true })
  fs.writeFileSync(path.join(lDir, `${icon.id}.svg`), icon.linear + '\n')
  fs.writeFileSync(path.join(fDir, `${icon.id}.svg`), icon.filled + '\n')
  count++
}

// 2. 写入模板生成图标
for (const [cat, names] of Object.entries(generatedNames)) {
  const tmplIds = templates[cat]
  const lDir = path.join(ROOT, 'src', 'icons', 'svg', 'linear', cat)
  const fDir = path.join(ROOT, 'src', 'icons', 'svg', 'filled', cat)
  fs.mkdirSync(lDir, { recursive: true })
  fs.mkdirSync(fDir, { recursive: true })

  for (let i = 0; i < names.length; i++) {
    const tid = tmplIds[i % tmplIds.length]
    const tmpl = baseMap[tid]
    if (!tmpl) continue
    const name = names[i]
    const dstL = path.join(lDir, `${name}.svg`)
    const dstF = path.join(fDir, `${name}.svg`)
    if (!fs.existsSync(dstL)) {
      fs.writeFileSync(dstL, tmpl.linear + '\n')
      fs.writeFileSync(dstF, tmpl.filled + '\n')
      count++
    }
  }
}

console.log(`✅ 已完成！共导出 ${count} 个图标到 src/icons/svg/`)
console.log('现在可以运行: npm run build-icons 重新生成 data/icons.ts')
