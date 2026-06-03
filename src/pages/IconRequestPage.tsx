import { useState } from 'react'
import { Send, Sparkles, Lightbulb, ArrowRight } from 'lucide-react'
import { BackToTop } from '@/components/layout/BackToTop'

export default function IconRequestPage() {
  const [form, setForm] = useState({
    name: '',
    style: 'both',
    scenario: '',
    reference: '',
    email: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <div className="pb-32 pt-14">
          <div className="mx-auto max-w-[960px]">
            <p className="text-[14px] font-medium leading-[22px] text-[var(--is-ink-faint)]">/ 已提交</p>
            <div className="mt-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[var(--is-surface)]">
                <Sparkles size={22} className="text-[var(--is-ink)]" />
              </div>
              <h1 className="mt-6 text-[28px] font-bold leading-8 tracking-[-0.01em] text-[var(--is-ink)]">申请已收到</h1>
              <p className="mt-3 max-w-[460px] text-[15px] leading-[26px] text-[var(--is-ink-soft)]">
                感谢你的建议！我们会认真评估每一个需求。如果该图标被采纳，我们会通过你留下的邮箱通知你。
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  setForm({ name: '', style: 'both', scenario: '', reference: '', email: '' })
                }}
                className="is-button-primary mt-8 inline-flex items-center gap-2"
              >
                再提交一个
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
        <BackToTop />
      </>
    )
  }

  return (
    <>
      <div className="pb-32">
        {/* Hero */}
      <section className="border-b border-[var(--is-border)] pb-20 pt-14">
        <div className="mx-auto max-w-[960px]">
          <p className="text-[14px] font-medium leading-[22px] text-[var(--is-ink-faint)]">01 / 图标申请</p>
          <div className="mt-6 max-w-[720px]">
            <h1 className="text-[44px] font-bold leading-[52px] tracking-[-0.02em] text-[var(--is-ink)]">
              少了什么？告诉我们
            </h1>
            <p className="mt-6 text-[17px] leading-[28px] text-[var(--is-ink-soft)]">
              IconStore 还在持续成长中。如果你在工作中发现缺少某个图标，或者某个分类不够完整，直接告诉我们。
              每一个需求都在帮助我们理解社区真正需要什么。
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20">
        <div className="mx-auto max-w-[960px]">
          <p className="text-[14px] font-medium leading-[22px] text-[var(--is-ink-faint)]">02 / 填写表单</p>
          <div className="mt-12 max-w-[560px]">
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* 图标名称 */}
              <div>
                <label className="block text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">
                  图标名称 <span className="text-[var(--is-ink-faint)]">*</span>
                </label>
                <p className="mt-0.5 text-[13px] leading-5 text-[var(--is-ink-faint)]">英文连字符格式，例如 cloud-upload、user-profile</p>
                <input
                  type="text"
                  required
                  placeholder="例如: shopping-cart、bell-alert"
                  className="is-input mt-2 w-full"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              {/* 风格偏好 */}
              <div>
                <label className="block text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">你倾向哪种风格</label>
                <div className="mt-3 flex gap-6">
                  {[
                    { value: 'linear', label: '线性' },
                    { value: 'filled', label: '面型' },
                    { value: 'both', label: '最好都有' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="style"
                        value={opt.value}
                        checked={form.style === opt.value}
                        onChange={(e) => setForm({ ...form, style: e.target.value })}
                        className="h-4 w-4 accent-[var(--is-ink)]"
                      />
                      <span className="text-[14px] leading-[22px] text-[var(--is-ink-soft)]">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 使用场景 */}
              <div>
                <label className="block text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">使用场景</label>
                <p className="mt-0.5 text-[13px] leading-5 text-[var(--is-ink-faint)]">这个图标将用在什么地方？描述越具体，设计越精准</p>
                <textarea
                  rows={3}
                  placeholder="例如：后台管理系统的侧边导航栏，和现有的 dashboard、settings 图标放在一起..."
                  className="is-textarea mt-2 w-full"
                  value={form.scenario}
                  onChange={(e) => setForm({ ...form, scenario: e.target.value })}
                />
              </div>

              {/* 参考链接 */}
              <div>
                <label className="block text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">参考（选填）</label>
                <p className="mt-0.5 text-[13px] leading-5 text-[var(--is-ink-faint)]">如果有同类设计可以参考，附上链接</p>
                <input
                  type="text"
                  placeholder="https://"
                  className="is-input mt-2 w-full"
                  value={form.reference}
                  onChange={(e) => setForm({ ...form, reference: e.target.value })}
                />
              </div>

              {/* 联系方式 */}
              <div>
                <label className="block text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">
                  你的邮箱 <span className="text-[var(--is-ink-faint)]">*</span>
                </label>
                <p className="mt-0.5 text-[13px] leading-5 text-[var(--is-ink-faint)]">用于接收申请结果和后续沟通</p>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="is-input mt-2 w-full"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* 提交 */}
              <div className="pt-4">
                <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-[var(--is-ink)] px-6 text-[15px] font-medium leading-6 text-[var(--is-white)] transition hover:bg-[var(--is-ink-soft)]">
                  <Send size={15} />
                  提交申请
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      </div>
      <BackToTop />
    </>
  )
}
