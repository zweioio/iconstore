# IconStore Design System

## 1. 色彩系统 / Colors

### 亮色模式 (`:root`)

| Token | 色值 | 用途 |
|-------|------|------|
| `--is-ink` | `#202224` | 主文字/标题 |
| `--is-ink-soft` | `#60656b` | 次要文字/分类名 |
| `--is-ink-muted` | `#919499` | 辅助文字/标签文字 |
| `--is-ink-faint` | `#b5b9bf` | 最淡文字/占位符 |
| `--is-border` | `#e9eaeb` | 边框/分割线 |
| `--is-surface` | `#f8f8fc` | 卡片/面板背景 |
| `--is-surface-hover` | `#f1f2f6` | 卡片悬浮态 |
| `--is-white` | `#ffffff` | 页面/弹窗背景 |
| `--is-yellow` | `#FADC19` | 收藏/高亮 |
| `--is-code-bg` | `#f4f6f7` | 代码块/标签底色 |
| `--is-slider-fill` | `#d6dce3` | 滑块轨道填充 |

### 暗色模式 (`.dark`)

| Token | 色值 | 用途 |
|-------|------|------|
| `--is-ink` | `#e8eaed` | 主文字/标题 |
| `--is-ink-soft` | `#9aa0a6` | 次要文字 |
| `--is-ink-muted` | `#6b6f76` | 辅助文字 |
| `--is-ink-faint` | `#5f6368` | 最淡文字 |
| `--is-border` | `#3c4043` | 边框/分割线 |
| `--is-surface` | `#303134` | 卡片背景 |
| `--is-surface-hover` | `#3c4043` | 卡片悬浮态 |
| `--is-white` | `#1e1f22` | 页面背景 |
| `--is-yellow` | `#FBBC04` | 收藏/高亮 |
| `--is-code-bg` | `#2d2d30` | 代码块/标签底色 |
| `--is-slider-fill` | `#5f6368` | 滑块轨道填充 |

---

## 2. 排版系统 / Typography

### 字号与行高

| 字号 | 行高 (Tailwind) | 行高 (px) | 字重 | 使用场景 |
|------|----------------|-----------|------|---------|
| 48px | `leading-[52px]` | 52px | `font-bold` | 页面主标题 h1 |
| 24px | `leading-8` | 32px | `font-bold` | 弹窗图标名称 |
| 20px | `leading-7` | 28px | `font-bold` / `font-normal` | 数据卡片数值、弹窗名称 |
| 16px | `leading-6` | 24px | `font-normal` / `font-medium` | 按钮文字、下拉选项、导航 |
| 14px | `leading-[22px]` | 22px | `font-normal` | 正文、分类说明、关键词标题 |
| 12px | `leading-5` / `leading-[22px]` | 20px / 22px | `font-normal` | 标签文字、图标名称、辅助文字 |

### 通用规则

```
line-height = font-size + 6~8px
```

- 14px → 22px（+8）
- 16px → 24px（+8）
- 20px → 28px（+8）
- 48px → 52px（+4，大标题更紧凑）

### 字体栈

```css
font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
```

---

## 3. 间距系统 / Spacing

### 常用间距 (Tailwind)

| Token | px | 使用场景 |
|-------|-----|---------|
| `gap-1` | 4px | 文字与图标间距 |
| `gap-2` | 8px | 按钮内间距、标签间距 |
| `gap-3` | 12px | 按钮间间距 |
| `gap-4` | 16px | 导航项间距 |
| `gap-5` | 20px | 区块间间距 |
| `gap-6` | 24px | 弹窗内边距、大区块间距 |
| `gap-8` | 32px | 页面顶部间距 |

### 内边距

| 元素 | 垂直 | 水平 | 圆角 |
|------|------|------|------|
| 按钮 (主/次) | `py-2.5` (10px) | `px-4` (16px) | 8px / 12px |
| 标签 Chip | `py-1` (4px) | `px-3` (12px) | 6px / 8px |
| 卡片面板 | `p-3` (12px) | `p-3` | 12px |
| 弹窗 | `p-6` (24px) | `p-6` | 16px / 24px |
| 下拉框项 | `py-3` (12px) | `px-3` (12px) | 8px |
| 搜索框 | `h-12` (48px) | `px-3` (12px) | 12px |

---

## 4. 圆角系统 / Border Radius

| Token | Tailwind | 值 | 使用场景 |
|-------|----------|-----|---------|
| `--is-radius-sm` | `rounded-[8px]` | 8px | 按钮、标签、输入框、图标按钮 |
| `--is-radius-md` | `rounded-[12px]` | 12px | 卡片面板、下拉框、搜索框、图标预览区 |
| `--is-radius-lg` | `rounded-[16px]` | 16px | 弹窗整体、大卡片 |
| — | `rounded-[24px]` | 24px | 弹窗（新版） |
| — | `rounded-full` | 9999px | 滑块开关、头像 |

---

## 5. 阴影系统 / Shadows

| Token | 值 | 使用场景 |
|-------|-----|---------|
| `--is-shadow` | `0 6px 32px rgba(0,0,0,0.05)` | 通用阴影 |
| `--is-shadow-modal` | `0 6px 32px rgba(0,0,0,0.08)` | 弹窗阴影 |
| `--is-shadow-card` | `0 6px 20px rgba(0,0,0,0.06)` | 卡片阴影 |

暗色模式透明度加深：`0.05→0.3` / `0.08→0.4` / `0.06→0.35`

---

## 6. 图标规范 / Icon Spec

| 属性 | 值 |
|------|-----|
| viewBox | `0 0 24 24` |
| 网格 | 24 × 24 |
| 线性描边 | `stroke-width="1.5"` |
| 线性属性 | `fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"` |
| 面型属性 | `fill="currentColor"` |
| 颜色 | 使用 `currentColor` |

### 图标网格展示

```
每行 10 列 (grid-cols-10)
卡片尺寸: 120×120
预览尺寸: 可调 (默认 24px)
排列方式: 先线性行 → 再面型行 → 交替
```

---

## 7. 组件规范 / Components

### 按钮

| 类型 | 背景 | 文字色 | 边框 | 悬浮态 |
|------|------|--------|------|--------|
| 主按钮 | `--is-ink` | `white` | 无 | `--is-ink-soft` |
| 次按钮 | `--is-white` | `--is-ink` | `--is-border` | `--is-surface` |
| 图标按钮 | 无 | `--is-ink-muted` | 无 | `--is-surface` |

### 下拉框

| 属性 | 值 |
|------|-----|
| 宽度 | 分类 200px / 语言 160px |
| 最大高度 | 480px |
| 圆角 | 12px |
| 内边距 | `p-1` (4px) |
| 选项 | `py-3` (12px), 8px 圆角 |
| 滚动条 | 2px 细条, custom-scrollbar |

### 弹窗 (IconDetailModal)

```
┌─────────────────────────────────────┐
│  ┌───────────┐  ┌──────────────────┐│
│  │  240×240  │  │ 图标名称    [图标]││
│  │   白色底   │  │ 分类文字         ││
│  │  12px圆角  │  │                  ││
│  │  1px描边   │  │ 标签 xxx xxx     ││
│  │           │  │                  ││
│  │           │  │ [复制 SVG][下载]  ││
│  └───────────┘  └──────────────────┘│
│                gap-6 (24px)         │
└─────────────── p-6 (24px) ──────────┘
       rounded-[24px]
```

---

## 8. 语言适配 / i18n

| 语言 | 代码 | 翻译文件 |
|------|------|---------|
| 简体中文 | `zh` | `i18n/zh.ts` |
| 繁体中文 | `zh-TW` | `i18n/zh-TW.ts` |
| 英语 | `en` | `i18n/en.ts` |
| 日语 | `ja` | `i18n/ja.ts` |
| 韩语 | `ko` | `i18n/ko.ts` |

图标名称多语言自动翻译：`iconLabel.ts` 按 `-` 拆词映射。

---

## 9. 图标添加流程 / Icon Workflow

```
画 SVG → 放入 src/icons/svg/{linear,filled}/{分类}/ → npm run build-icons → git push
```

无需手动编辑 `data/icons.ts`，脚本自动扫描目录生成。

---

## 10. 主题切换 / Theme Toggle

- 通过 `.dark` class 切换
- 使用 `transitioning` class 实现 0.3s 平滑过渡
- 状态存储于 `localStorage('theme')`
