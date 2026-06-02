export default function GuidePage() {
  const designSteps = [
    '优先根据场景选择线性或面型，让整页风格先统一',
    '需要更轻的视觉效果时选择线性，需要更强识别度时选择面型',
    '设计稿中尽量保持 24 x 24 的基础尺寸，避免风格被拉坏',
  ]

  const devSteps = [
    '优先直接复制 SVG，按需放进项目组件或静态资源目录',
    '线性图标可在产品内先预览描边粗细，再决定最终值',
    '如果页面同时使用线性和面型，建议按模块分区，不要混杂得过碎',
  ]

  return (
    <div className="space-y-10 pb-24 pt-10">
      {/* 页面标题 */}
      <div className="space-y-4">
        <p className="text-[14px] font-medium leading-[22px] text-[#60656b]">Guide</p>
        <h1 className="text-[36px] font-bold leading-10 text-[#202224]">
          使用说明
        </h1>
        <p className="max-w-2xl text-[16px] leading-6 text-[#60656b]">
          这个页面主要服务设计师和前端开发者，帮助他们快速知道怎么预览、复制、下载和接入图标
        </p>
      </div>

      {/* 设计师 & 前端 */}
      <section className="grid gap-8 lg:grid-cols-2">
        <article className="is-panel p-8">
          <h2 className="text-[24px] font-bold leading-8 text-[#202224]">给设计师</h2>
          <ul className="mt-8 space-y-3">
            {designSteps.map((item) => (
              <li key={item} className="rounded-[8px] bg-[#f8f8fc] px-4 py-3 text-[14px] leading-[22px] text-[#60656b]">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="is-panel p-8">
          <h2 className="text-[24px] font-bold leading-8 text-[#202224]">给前端</h2>
          <ul className="mt-8 space-y-3">
            {devSteps.map((item) => (
              <li key={item} className="rounded-[8px] bg-[#f8f8fc] px-4 py-3 text-[14px] leading-[22px] text-[#60656b]">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* SVG 接入示例 */}
      <section className="is-panel p-8">
        <h2 className="text-[24px] font-bold leading-8 text-[#202224]">SVG 接入示例</h2>
        <p className="mt-2 text-[14px] leading-[22px] text-[#60656b]">
          第一版先围绕 SVG 展开，既适合设计资源交付，也方便前端直接接入
        </p>

        <pre className="is-code mt-8">
          <code>{`// 将复制到的 SVG 直接放入组件或静态资源目录
export function ExampleIcon() {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"></svg>',
      }}
    />
  )
}`}</code>
        </pre>
      </section>
    </div>
  )
}
