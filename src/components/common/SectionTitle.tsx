type SectionTitleProps = {
  eyebrow: string
  title: string
  description: string
}

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-[14px] font-medium leading-[22px] text-[#60656b]">{eyebrow}</p>
      <h2 className="text-[36px] font-bold leading-10 text-[#202224] md:text-[48px] md:leading-[52px]">
        {title}
      </h2>
      <p className="max-w-2xl text-[16px] leading-6 text-[#60656b]">{description}</p>
    </div>
  )
}
