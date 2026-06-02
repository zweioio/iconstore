import { useState } from 'react'

import { Send } from 'lucide-react'

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
      <div className="flex min-h-[400px] items-center justify-center pb-24 pt-10">
        <div className="is-panel max-w-[480px] p-8 text-center">
          <h1 className="text-[36px] font-bold leading-10 text-[#202224]">
            提交成功
          </h1>
          <p className="mt-4 text-[16px] leading-6 text-[#60656b]">
            感谢您的图标申请，我们会尽快评估并更新到图标库中。
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="is-button-primary mt-8 inline-flex"
          >
            继续申请
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10 pb-24 pt-10">
      {/* 页面标题 */}
      <div className="space-y-4">
        <p className="text-[14px] font-medium leading-[22px] text-[#60656b]">Icon Request</p>
        <h1 className="text-[36px] font-bold leading-10 text-[#202224]">
          图标申请
        </h1>
        <p className="max-w-2xl text-[16px] leading-6 text-[#60656b]">
          如果您需要某个特定的图标或图标类型，请提交申请。我们会评估后更新到图标库中。
        </p>
      </div>

      {/* 申请表单 */}
      <section className="is-panel max-w-[640px] p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 图标名称/类型 */}
          <div>
            <label className="block text-[14px] font-medium leading-[22px] text-[#202224]">
              图标名称 / 类型 <span className="text-[#b5b9bf]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="例如：用户头像、设置、通知铃铛等"
              className="is-input mt-2 w-full"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* 风格偏好 */}
          <div>
            <label className="block text-[14px] font-medium leading-[22px] text-[#202224]">
              风格偏好
            </label>
            <div className="mt-3 flex gap-6">
              {[
                { value: 'linear', label: '线性' },
                { value: 'filled', label: '面型' },
                { value: 'both', label: '都可以' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="style"
                    value={opt.value}
                    checked={form.style === opt.value}
                    onChange={(e) => setForm({ ...form, style: e.target.value })}
                    className="h-4 w-4 accent-[#202224]"
                  />
                  <span className="text-[14px] leading-[22px] text-[#60656b]">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 使用场景描述 */}
          <div>
            <label className="block text-[14px] font-medium leading-[22px] text-[#202224]">
              使用场景描述
            </label>
            <textarea
              rows={4}
              placeholder="请描述您希望这个图标用在什么场景，以及需要表达的含义..."
              className="is-textarea mt-2 w-full"
              value={form.scenario}
              onChange={(e) => setForm({ ...form, scenario: e.target.value })}
            />
          </div>

          {/* 参考链接 */}
          <div>
            <label className="block text-[14px] font-medium leading-[22px] text-[#202224]">
              参考链接或说明
            </label>
            <input
              type="text"
              placeholder="如有参考图或链接，请在此填写"
              className="is-input mt-2 w-full"
              value={form.reference}
              onChange={(e) => setForm({ ...form, reference: e.target.value })}
            />
          </div>

          {/* 联系方式 */}
          <div>
            <label className="block text-[14px] font-medium leading-[22px] text-[#202224]">
              联系方式（邮箱）
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="is-input mt-2 w-full"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            className="is-button-primary inline-flex items-center gap-2"
          >
            <Send size={14} />
            提交申请
          </button>
        </form>
      </section>
    </div>
  )
}
