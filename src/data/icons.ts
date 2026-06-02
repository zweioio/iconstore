import type { IconItem, IconCategory } from '@/types/icon'

// 统一分类文案，避免页面里重复维护。
export const categoryLabels: Record<IconCategory, string> = {
  basic: '基础',
  arrow: '箭头',
  edit: '编辑',
  media: '媒体',
  system: '系统',
  brand: '品牌',
}

// 统一的描边属性，便于线性图标整体控制风格。
const strokeAttrs =
  'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"'

// 这组基础图标保留独立 SVG，作为首页展示和后续批量扩展的模板来源。
const baseIcons: IconItem[] = [
  {
    id: 'spark-grid',
    name: 'spark-grid',
    category: 'basic',
    keywords: ['spark', 'grid', 'overview', '基础'],
    linearSvg: `<svg viewBox="0 0 24 24" ${strokeAttrs}><path d="M6 5.5h5"/><path d="M13 5.5h5"/><path d="M5.5 10.5h13"/><path d="M7 15.5h10"/><path d="M9 19h6"/><path d="M12 3.5v17"/></svg>`,
    filledSvg:
      '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="14" height="2.2" rx="1.1"/><rect x="4.5" y="9.4" width="15" height="2.2" rx="1.1"/><rect x="6.5" y="14.8" width="11" height="2.2" rx="1.1"/><rect x="9" y="18.4" width="6" height="2.2" rx="1.1"/><rect x="10.9" y="3.2" width="2.2" height="17.6" rx="1.1"/></svg>',
  },
  {
    id: 'frame-stack',
    name: 'frame-stack',
    category: 'basic',
    keywords: ['frame', 'layout', 'stack', '基础'],
    linearSvg: `<svg viewBox="0 0 24 24" ${strokeAttrs}><rect x="5" y="5" width="10" height="10" rx="2"/><path d="M9 9h10v10a2 2 0 0 1-2 2H9z"/></svg>`,
    filledSvg:
      '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4.8" y="4.8" width="10.4" height="10.4" rx="2.2"/><path d="M9 8.8h8a2.2 2.2 0 0 1 2.2 2.2v5.8A2.2 2.2 0 0 1 17 19H9z"/></svg>',
  },
  {
    id: 'arrow-rise',
    name: 'arrow-rise',
    category: 'arrow',
    keywords: ['arrow', 'up', 'trend', '箭头'],
    linearSvg: `<svg viewBox="0 0 24 24" ${strokeAttrs}><path d="M6 16L18 8"/><path d="M10 8h8v8"/></svg>`,
    filledSvg:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.4 6.9h-7.1a1.1 1.1 0 1 0 0 2.2h4.45L5.4 15.95a1.1 1.1 0 1 0 1.2 1.85L16.9 11v4.3a1.1 1.1 0 1 0 2.2 0V8a1.1 1.1 0 0 0-1.1-1.1"/></svg>',
  },
  {
    id: 'arrow-loop',
    name: 'arrow-loop',
    category: 'arrow',
    keywords: ['arrow', 'loop', 'return', '箭头'],
    linearSvg: `<svg viewBox="0 0 24 24" ${strokeAttrs}><path d="M8 7H5v3"/><path d="M5.5 10A7.5 7.5 0 1 0 8 7"/></svg>`,
    filledSvg:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.7 5.9H4.9c-.6 0-1 .4-1 1V9.7a1 1 0 1 0 2 0V8.65a6.4 6.4 0 1 1-1.1 5.85 1 1 0 1 0-1.9.62A8.4 8.4 0 1 0 7.7 5.9"/></svg>',
  },
  {
    id: 'pen-edit',
    name: 'pen-edit',
    category: 'edit',
    keywords: ['edit', 'pen', 'write', '编辑'],
    linearSvg: `<svg viewBox="0 0 24 24" ${strokeAttrs}><path d="M6 16.5V19h2.5L18 9.5 14.5 6z"/><path d="M13.5 7l3.5 3.5"/><path d="M5 19h14"/></svg>`,
    filledSvg:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.45 5.15a1.6 1.6 0 0 1 2.26 0l2.14 2.14a1.6 1.6 0 0 1 0 2.26l-8.9 8.9a2.2 2.2 0 0 1-1.02.56l-3.23.8a.9.9 0 0 1-1.1-1.1l.8-3.23c.1-.4.3-.74.57-1.02zM5 18.1a1 1 0 0 0 0 2h14a1 1 0 1 0 0-2z"/></svg>',
  },
  {
    id: 'crop-area',
    name: 'crop-area',
    category: 'edit',
    keywords: ['crop', 'area', 'design', '编辑'],
    linearSvg: `<svg viewBox="0 0 24 24" ${strokeAttrs}><path d="M7 4v13a3 3 0 0 0 3 3h10"/><path d="M4 7h13a3 3 0 0 1 3 3v10"/></svg>`,
    filledSvg:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 3.9A1.1 1.1 0 0 1 7.1 5v11.8c0 1.05.85 1.9 1.9 1.9H20a1.1 1.1 0 1 1 0 2.2H9a4.1 4.1 0 0 1-4.1-4.1V5A1.1 1.1 0 0 1 6 3.9"/><path d="M3.9 7A1.1 1.1 0 0 1 5 5.9h11.8A4.1 4.1 0 0 1 20.9 10V20a1.1 1.1 0 1 1-2.2 0V10c0-1.05-.85-1.9-1.9-1.9H5A1.1 1.1 0 0 1 3.9 7"/></svg>',
  },
  {
    id: 'play-orbit',
    name: 'play-orbit',
    category: 'media',
    keywords: ['play', 'video', 'orbit', '媒体'],
    linearSvg: `<svg viewBox="0 0 24 24" ${strokeAttrs}><circle cx="12" cy="12" r="8"/><path d="M10 9l5 3-5 3z"/></svg>`,
    filledSvg:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.2A8.8 8.8 0 1 0 20.8 12 8.8 8.8 0 0 0 12 3.2m-2.4 5.9a1 1 0 0 1 1.51-.87l4.72 2.88a1 1 0 0 1 0 1.7L11.1 15.7A1 1 0 0 1 9.6 14.8z"/></svg>',
  },
  {
    id: 'wave-audio',
    name: 'wave-audio',
    category: 'media',
    keywords: ['audio', 'wave', 'sound', '媒体'],
    linearSvg: `<svg viewBox="0 0 24 24" ${strokeAttrs}><path d="M5 13v-2"/><path d="M9 16V8"/><path d="M13 18V6"/><path d="M17 15V9"/><path d="M21 13v-2"/></svg>`,
    filledSvg:
      '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="10" width="2" height="4" rx="1"/><rect x="8" y="7" width="2" height="10" rx="1"/><rect x="12" y="5" width="2" height="14" rx="1"/><rect x="16" y="8" width="2" height="8" rx="1"/><rect x="20" y="10" width="2" height="4" rx="1"/></svg>',
  },
  {
    id: 'shield-check',
    name: 'shield-check',
    category: 'system',
    keywords: ['shield', 'security', 'check', '系统'],
    linearSvg: `<svg viewBox="0 0 24 24" ${strokeAttrs}><path d="M12 4l6 2v5.5c0 4-2.6 6.9-6 8.5-3.4-1.6-6-4.5-6-8.5V6z"/><path d="M9.5 12.3l1.8 1.8 3.7-4"/></svg>`,
    filledSvg:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.66 3.12a1 1 0 0 1 .68 0l6.25 2.08a1.2 1.2 0 0 1 .81 1.14v5.18c0 4.68-3.12 8.08-6.88 9.8a1.2 1.2 0 0 1-1.04 0C7.72 19.6 4.6 16.2 4.6 11.52V6.34a1.2 1.2 0 0 1 .81-1.14zm4.11 6.57a1 1 0 0 0-1.42.15l-3.2 4.01-1.03-1.03a1 1 0 1 0-1.42 1.41l1.82 1.83a1 1 0 0 0 1.5-.08l3.9-4.88a1 1 0 0 0-.15-1.41"/></svg>',
  },
  {
    id: 'cloud-sync',
    name: 'cloud-sync',
    category: 'system',
    keywords: ['cloud', 'sync', 'system', '系统'],
    linearSvg: `<svg viewBox="0 0 24 24" ${strokeAttrs}><path d="M7.5 18.5A4.5 4.5 0 1 1 8 9.5a5.5 5.5 0 0 1 10.2 2.5A3.5 3.5 0 1 1 18 18.5z"/><path d="M10 12.5h4l-1.5-1.5"/><path d="M14 15.5h-4l1.5 1.5"/></svg>`,
    filledSvg:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.1 8.4a5.8 5.8 0 0 1 11 2.15 4 4 0 0 1-1.1 7.85H7.6a5 5 0 0 1 .5-9.95m2.8 3.1a1 1 0 0 0-.7 1.7l.1.09H12l-.5.5a1 1 0 0 0 1.42 1.41l2.2-2.2a1 1 0 0 0 0-1.41l-2.2-2.2a1 1 0 0 0-1.42 1.41l.5.5z"/></svg>',
  },
  {
    id: 'chat-badge',
    name: 'chat-badge',
    category: 'brand',
    keywords: ['chat', 'social', 'community', '品牌'],
    linearSvg: `<svg viewBox="0 0 24 24" ${strokeAttrs}><path d="M5 7.5A3.5 3.5 0 0 1 8.5 4h7A3.5 3.5 0 0 1 19 7.5v5A3.5 3.5 0 0 1 15.5 16H11l-4 3v-3.2A3.5 3.5 0 0 1 5 12.5z"/><path d="M9 9.5h6"/><path d="M9 12.5h4"/></svg>`,
    filledSvg:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 4.1h7A3.4 3.4 0 0 1 18.9 7.5v5A3.4 3.4 0 0 1 15.5 16H11l-3.7 2.8a.8.8 0 0 1-1.28-.64V16a3.4 3.4 0 0 1-2.4-3.25v-5A3.4 3.4 0 0 1 8.5 4.1M8.8 8.9a.9.9 0 0 0 0 1.8h6.4a.9.9 0 0 0 0-1.8zm0 3a.9.9 0 0 0 0 1.8h4.2a.9.9 0 0 0 0-1.8z"/></svg>',
  },
  {
    id: 'star-burst',
    name: 'star-burst',
    category: 'brand',
    keywords: ['star', 'brand', 'highlight', '品牌'],
    linearSvg: `<svg viewBox="0 0 24 24" ${strokeAttrs}><path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9-1.9 5.1-1.9-5.1-5.1-1.9 5.1-1.9z"/><path d="M17.5 16.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/></svg>`,
    filledSvg:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.06 3.55a1 1 0 0 1 1.88 0l1.56 4.2 4.2 1.56a1 1 0 0 1 0 1.88l-4.2 1.56-1.56 4.2a1 1 0 0 1-1.88 0l-1.56-4.2-4.2-1.56a1 1 0 0 1 0-1.88l4.2-1.56zm6.48 11.73a.8.8 0 0 1 1.5 0l.58 1.58 1.58.58a.8.8 0 0 1 0 1.5l-1.58.58-.58 1.58a.8.8 0 0 1-1.5 0l-.58-1.58-1.58-.58a.8.8 0 0 1 0-1.5l1.58-.58z"/></svg>',
  },
]

// 用基础图标做模板批量扩展，快速补齐到约 100 个以上图标，保证筛选和列表演示更接近真实站点。
const templateMap = new Map(baseIcons.map((icon) => [icon.id, icon]))

type GeneratedGroup = {
  category: IconCategory
  templateIds: [string, string]
  names: string[]
  keywords: string[]
}

function createGeneratedIcons(group: GeneratedGroup) {
  return group.names.map((name, index) => {
    const templateId = group.templateIds[index % group.templateIds.length]
    const template = templateMap.get(templateId)

    if (!template) {
      throw new Error(`Missing icon template: ${templateId}`)
    }

    return {
      id: name,
      name,
      category: group.category,
      keywords: [name, ...group.keywords, categoryLabels[group.category]],
      linearSvg: template.linearSvg,
      filledSvg: template.filledSvg,
    } satisfies IconItem
  })
}

// 每个分类扩展 16 个图标名称，合计新增 96 个，配合基础图标后总量达到 108 个。
const generatedGroups: GeneratedGroup[] = [
  {
    category: 'basic',
    templateIds: ['spark-grid', 'frame-stack'],
    names: [
      'panel-grid',
      'layout-board',
      'dashboard-stack',
      'module-grid',
      'window-tile',
      'layer-board',
      'scene-grid',
      'card-stack',
      'widget-grid',
      'surface-board',
      'block-stack',
      'panel-cluster',
      'canvas-grid',
      'section-board',
      'board-stack',
      'view-grid',
    ],
    keywords: ['basic', 'layout', 'grid', 'panel'],
  },
  {
    category: 'arrow',
    templateIds: ['arrow-rise', 'arrow-loop'],
    names: [
      'arrow-upward',
      'arrow-refresh',
      'arrow-return',
      'arrow-rotate',
      'arrow-bend',
      'arrow-share',
      'arrow-forward',
      'arrow-reload',
      'arrow-curve',
      'arrow-redirect',
      'arrow-trend',
      'arrow-cycle',
      'arrow-launch',
      'arrow-turn',
      'arrow-reply',
      'arrow-branch',
    ],
    keywords: ['arrow', 'direction', 'turn', 'trend'],
  },
  {
    category: 'edit',
    templateIds: ['pen-edit', 'crop-area'],
    names: [
      'edit-pencil',
      'edit-board',
      'edit-canvas',
      'edit-crop',
      'edit-adjust',
      'edit-trim',
      'edit-select',
      'edit-note',
      'edit-layer',
      'edit-shape',
      'edit-frame',
      'edit-scale',
      'edit-ratio',
      'edit-compose',
      'edit-outline',
      'edit-mark',
    ],
    keywords: ['edit', 'design', 'crop', 'pen'],
  },
  {
    category: 'media',
    templateIds: ['play-orbit', 'wave-audio'],
    names: [
      'media-play',
      'media-audio',
      'media-radio',
      'media-voice',
      'media-wave',
      'media-track',
      'media-stream',
      'media-podcast',
      'media-record',
      'media-sound',
      'media-music',
      'media-player',
      'media-video',
      'media-volume',
      'media-session',
      'media-live',
    ],
    keywords: ['media', 'audio', 'video', 'sound'],
  },
  {
    category: 'system',
    templateIds: ['shield-check', 'cloud-sync'],
    names: [
      'system-guard',
      'system-sync',
      'system-cloud',
      'system-safe',
      'system-backup',
      'system-verify',
      'system-update',
      'system-check',
      'system-secure',
      'system-service',
      'system-online',
      'system-status',
      'system-deploy',
      'system-recover',
      'system-control',
      'system-health',
    ],
    keywords: ['system', 'cloud', 'security', 'sync'],
  },
  {
    category: 'brand',
    templateIds: ['chat-badge', 'star-burst'],
    names: [
      'brand-chat',
      'brand-shine',
      'brand-message',
      'brand-spark',
      'brand-community',
      'brand-highlight',
      'brand-badge',
      'brand-social',
      'brand-featured',
      'brand-launch',
      'brand-notice',
      'brand-banner',
      'brand-circle',
      'brand-voice',
      'brand-lounge',
      'brand-focus',
    ],
    keywords: ['brand', 'social', 'badge', 'highlight'],
  },
]

// 导出完整图标数据，页面总量会从原先的十几个提升到 100+。
export const icons: IconItem[] = [
  ...baseIcons,
  ...generatedGroups.flatMap((group) => createGeneratedIcons(group)),
]
