# IconStore

简洁而精致的开源图标库，为设计师和开发者打造的中性风格系统图标。

## 功能特性

- 108+ 个图标，支持线性/面型双风格切换
- 在线预览、SVG 复制与下载
- 中/英/日/韩/繁体中文 5 种语言
- 明暗主题切换
- 收藏夹持久化
- 图标大小/描边粗细自定义调节

## 快速开始

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:5173` 即可预览。

## 添加新图标

### 你只需要做 3 步

### ① 准备 SVG 文件

在 Figma 中绘制图标，导出两个版本：

| 风格 | 要求 |
|------|------|
| **线性 (linear)** | `viewBox="0 0 24 24"`，`fill="none"`，`stroke="currentColor"`，`stroke-width="1.5"` |
| **面型 (filled)** | `viewBox="0 0 24 24"`，`fill="currentColor"` |

### ② 放入对应目录

```
src/icons/svg/
├── linear/
│   ├── basic/          ← 分类名作为子目录
│   │   └── icon-name.svg
│   ├── arrow/
│   └── ...             ← 其他分类
└── filled/
    ├── basic/
    │   └── icon-name.svg
    ├── arrow/
    └── ...
```

> 文件名使用连字符小写格式，如 `media-radio.svg`、`arrow-left-up.svg`。
> 命名直接影响多语言自动翻译，`iconLabel.ts` 会自动按 `-` 拆词翻译。

### ③ 运行生成命令

```bash
npm run build-icons
```

脚本会自动扫描 SVG 目录，更新 `src/data/icons.ts`。之后提交 Git 即可。

### SVG 规范

| 属性 | 必须 | 说明 |
|------|------|------|
| viewBox | ✅ | `0 0 24 24` |
| 线性描边 | ✅ | `stroke-width="1.5"` |
| 颜色 | ✅ | 使用 `currentColor`（跟随文本颜色） |
| stroke-linecap | ✅ | 线性风格需 `round` |
| stroke-linejoin | ✅ | 线性风格需 `round` |

## 新增分类

编辑 `src/data/categories.ts`，两处修改：

**① 类型定义加一项：**

```ts
export type IconCategory =
  | 'basic'
  | 'arrow'
  | ...
  | 'your-new-category'
```

**② 数据数组加一行：**

```ts
{ id: 'your-new-category', label: '分类名', order: 6 },
```

然后在 `src/icons/svg/` 下创建对应的分类目录即可。

## 多语言翻译

图标名称的自动翻译在 `src/utils/iconLabel.ts` 中维护。
目前支持：简体中文、繁体中文、英文、日文、韩文。

## 项目结构

```
src/
├── components/
│   ├── common/         ← 通用组件
│   ├── icons/          ← 图标相关组件
│   └── layout/         ← 布局组件
├── data/
│   ├── categories.ts   ← 分类定义（唯一配置源）
│   └── icons.ts        ← ⚠️ 自动生成，不要手动编辑
├── hooks/
│   └── useTheme.ts     ← 主题切换
├── i18n/               ← 多语言翻译文件
├── icons/
│   ├── svg/            ← SVG 源文件（按线性/面型 + 分类组织）
│   └── HOW_TO_ADD_ICONS.md
├── pages/              ← 页面组件
├── store/              ← Zustand 状态管理
├── types/              ← TypeScript 类型定义
└── utils/
    ├── iconLabel.ts    ← 图标名称多语言自动翻译
    └── iconLibrary.ts  ← 图标工具函数（搜索、过滤等）
```

## 技术栈

- **框架**: React 18 + TypeScript
- **构建**: Vite
- **样式**: TailwindCSS
- **状态**: Zustand
- **路由**: React Router
- **图标**: Lucide React（UI 图标）
