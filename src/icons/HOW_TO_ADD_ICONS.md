# IconStore 图标添加指南

## 🚀 快速工作流

### 你只需要做

```
画图 → 导出 SVG → 放到目录 → npm run build-icons → git commit
```

### 目录结构

```
src/
  icons/
    svg/
      linear/     ← 线性风格 SVG 文件
        basic/      ← 分类名作为子目录
        arrow/
        edit/
        media/
        system/
        brand/
      filled/     ← 面型风格 SVG 文件
        basic/
        arrow/
        edit/
        media/
        system/
        brand/
  data/
    icons.ts     ← ⚠️ 自动生成，不要手动编辑
  utils/
    iconLabel.ts ← 多语言自动翻译（新增图标无需修改）
```

## 添加一个新图标的步骤

### 第一步：准备 SVG 文件

在 Figma 中绘制完成后，导出两个版本的 SVG：

| 风格 | viewBox | 关键属性 |
|------|---------|---------|
| **线性 (linear)** | `0 0 24 24` | `fill="none"` `stroke="currentColor"` `stroke-width="1.5"` |
| **面型 (filled)** | `0 0 24 24` | `fill="currentColor"` |

### 第二步：放入对应目录

```
src/icons/svg/linear/你的分类名/图标名称.svg
src/icons/svg/filled/你的分类名/图标名称.svg
```

命名使用**连字符小写**格式：

```
arrow-left-up.svg       ✓
media-radio.svg         ✓
user-avatar-setting.svg ✓
```

> 命名直接影响多语言翻译！`iconLabel.ts` 会自动按 `-` 拆词翻译。
> 例如 `media-radio` → 中文"媒体广播"、日文"ラジオメディア"、韩文"라디오 미디어"

### 第三步：运行生成命令

```bash
npm run build-icons
```

脚本会自动扫描 `src/icons/svg/` 目录，生成 `src/data/icons.ts`。

### 第四步：提交 Git

```bash
git add -A
git commit -m "feat: 新增 xxx 图标"
git push
```

## SVG 规范

| 属性 | 要求 |
|------|------|
| viewBox | `0 0 24 24` |
| 网格 | 24 × 24 |
| 线性描边 | `stroke-width="1.5"` |
| 颜色 | 使用 `currentColor`（跟随文本颜色） |

## 新增分类

打开 `src/data/categories.ts`，在 `categories` 数组和 `IconCategory` 类型中各加一行：

```ts
// categories 数组
{ id: 'map', label: '地图', order: 6 },

// IconCategory 类型
export type IconCategory = | 'basic' | 'arrow' | ... | 'map'
```

然后在 `src/icons/svg/` 下创建对应的分类目录即可。
