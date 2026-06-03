import { Code2, Paintbrush, Copy, Download, FileCode, Package } from 'lucide-react'

export default function GuidePage() {
  const workflows = [
    {
      role: 'Designer',
      icon: Paintbrush,
      title: '设计师工作流',
      steps: [
        '在图标库中搜索或浏览分类，找到需要的图标',
        '点击图标打开详情面板，在线切换线性和面型风格',
        '点击「复制 SVG」粘贴到 Figma / Sketch，或下载 SVG 文件',
      ],
      tip: '所有图标使用 currentColor，在 Figma 中可直接修改颜色和描边粗细。',
    },
    {
      role: 'Developer',
      icon: Code2,
      title: '开发者工作流',
      steps: [
        '在弹窗中复制 SVG 代码或下载 .svg 文件',
        '作为 React 组件内联使用，或通过 img 标签引用',
        '将 SVG 源文件放入 src/icons/svg/ 目录，运行 npm run build-icons 自动构建',
      ],
      tip: '不需要安装任何 npm 包。SVG 是 Web 原生格式，0 依赖。',
    },
  ]

  return (
    <div className="pb-32">
      {/* Hero */}
      <section className="border-b border-[var(--is-border)] pb-20 pt-14">
        <div className="mx-auto max-w-[960px]">
          <p className="text-[14px] font-medium leading-[22px] text-[var(--is-ink-faint)]">01 / 使用指南</p>
          <div className="mt-6 max-w-[720px]">
            <h1 className="text-[44px] font-bold leading-[52px] tracking-[-0.02em] text-[var(--is-ink)]">
              从浏览到落地，三步就够了
            </h1>
            <p className="mt-6 text-[17px] leading-[28px] text-[var(--is-ink-soft)]">
              IconStore 的使用路径非常直接。无论你习惯在 Figma 里画界面，还是在 VS Code 里写代码，图标都能顺畅地进入你的工作流。
            </p>
          </div>
        </div>
      </section>

      {/* Workflows */}
      <section className="border-b border-[var(--is-border)] py-20">
        <div className="mx-auto max-w-[960px]">
          <div className="grid gap-16 md:grid-cols-2">
            {workflows.map((wf) => (
              <div key={wf.role}>
                <div className="flex items-center gap-3 border-b border-[var(--is-border)] pb-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[var(--is-surface)]">
                    <wf.icon size={18} className="text-[var(--is-ink)]" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium leading-4 text-[var(--is-ink-faint)]">{wf.role}</p>
                    <h2 className="text-[18px] font-bold leading-6 text-[var(--is-ink)]">{wf.title}</h2>
                  </div>
                </div>
                <div className="mt-7 space-y-6">
                  {wf.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--is-surface)] text-[12px] font-bold leading-5 text-[var(--is-ink)]">
                        {i + 1}
                      </span>
                      <p className="pt-0.5 text-[14px] leading-[24px] text-[var(--is-ink-soft)]">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-[8px] bg-[var(--is-surface)] px-4 py-3">
                  <p className="text-[13px] leading-[20px] text-[var(--is-ink-soft)]">
                    <span className="font-medium text-[var(--is-ink)]">Tip: </span>{wf.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-20">
        <div className="mx-auto max-w-[960px]">
          <p className="text-[14px] font-medium leading-[22px] text-[var(--is-ink-faint)]">02 / 集成方式</p>
          <div className="mt-12 flex items-start gap-10">
            <span className="text-[14px] font-medium leading-6 text-[var(--is-ink-faint)]">React</span>
            <div className="flex-1">
              <p className="text-[15px] leading-[26px] text-[var(--is-ink-soft)]">
                复制 SVG 后直接内联使用，无需任何包装。
              </p>
              <pre className="mt-5 rounded-[10px] border border-[var(--is-border)] bg-[var(--is-code-bg)] p-5 text-[13px] leading-6">
                <code className="text-[var(--is-ink-soft)]">{`function UserIcon() {
  return (
    <span dangerouslySetInnerHTML={{
      __html: '<svg viewBox="0 0 24 24" fill="none"...>'
    }} />
  )
}`}</code>
              </pre>
            </div>
          </div>

          <div className="mt-12 flex items-start gap-10">
            <span className="text-[14px] font-medium leading-6 text-[var(--is-ink-faint)]">Vue</span>
            <div className="flex-1">
              <p className="text-[15px] leading-[26px] text-[var(--is-ink-soft)]">
                使用 v-html 指令渲染 SVG 内容。
              </p>
              <pre className="mt-5 rounded-[10px] border border-[var(--is-border)] bg-[var(--is-code-bg)] p-5 text-[13px] leading-6">
                <code className="text-[var(--is-ink-soft)]">{`<template>
  <span v-html="userSvg" />
</template>`}</code>
              </pre>
            </div>
          </div>

          <div className="mt-12 flex items-start gap-10">
            <span className="text-[14px] font-medium leading-6 text-[var(--is-ink-faint)]">HTML</span>
            <div className="flex-1">
              <p className="text-[15px] leading-[26px] text-[var(--is-ink-soft)]">
                直接粘贴 SVG 标签到 HTML 中，或使用 img 标签引用。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
