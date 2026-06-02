export default function LicensePage() {
  const licenseItems = [
    {
      title: '允许商用',
      description: '可用于商业项目、品牌官网、后台系统、产品界面和设计提案',
    },
    {
      title: '允许修改',
      description: '可根据项目需要调整尺寸、颜色和布局，也可基于风格做延展',
    },
    {
      title: '禁止单独转售',
      description: '不得把原始图标资源打包后作为独立素材库再次出售或冒充原创',
    },
  ]

  return (
    <div className="space-y-10 pb-24 pt-10">
      {/* 页面标题 */}
      <div className="space-y-4">
        <p className="text-[14px] font-medium leading-[22px] text-[#60656b]">License</p>
        <h1 className="text-[36px] font-bold leading-10 text-[#202224]">
          授权说明
        </h1>
        <p className="max-w-2xl text-[16px] leading-6 text-[#60656b]">
          第一版授权说明强调可用性和明确边界，避免用户理解模糊，也保护你的原创图标体系
        </p>
      </div>

      {/* 授权条款 */}
      <section className="grid gap-8 lg:grid-cols-3">
        {licenseItems.map((item) => (
          <article key={item.title} className="is-panel p-8">
            <h2 className="text-[20px] font-bold leading-7 text-[#202224]">{item.title}</h2>
            <p className="mt-4 text-[14px] leading-[22px] text-[#60656b]">{item.description}</p>
          </article>
        ))}
      </section>

      {/* 授权建议文案 */}
      <section className="is-panel p-8">
        <h2 className="text-[24px] font-bold leading-8 text-[#202224]">授权建议文案</h2>
        <div className="mt-8 space-y-3 text-[14px] leading-[22px] text-[#60656b]">
          <p>你可以免费下载和使用这些图标，并可将它们用于个人或商业项目</p>
          <p>你可以根据项目需求对图标做颜色、尺寸和细节上的调整</p>
          <p>你不能将原始图标资源重新打包后作为独立图标库、素材库或模板资源再次出售</p>
        </div>
      </section>
    </div>
  )
}
