import { X } from 'lucide-react'
import { useState } from 'react'

type DonateMethod = {
  name: string
  account: string
  color: string
}

type Props = {
  method: DonateMethod
  onClose: () => void
}

const AMOUNTS = [
  { value: 5, label: '柠檬水', desc: '请我喝杯柠檬水' },
  { value: 9.9, label: '生椰拿铁', desc: '请我喝杯生椰拿铁' },
  { value: 15, label: '隆江猪脚饭', desc: '请我吃份猪脚饭' },
  { value: 50, label: '疯狂星期四', desc: '疯狂星期四，V我50' },
]

export function DonateModal({ method, onClose }: Props) {
  const [amount, setAmount] = useState(9.9)

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(method.account)}`

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(0,0,0,0.4)] px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-[400px] rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)] p-6 shadow-[0_12px_48px_rgba(0,0,0,0.12)]">
        {/* 关闭按钮 */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-[var(--is-ink-muted)] transition hover:bg-[var(--is-surface)] hover:text-[var(--is-ink)]"
        >
          <X size={16} />
        </button>

        {/* 标题 */}
        <h2 className="pr-8 text-[18px] font-bold leading-7 text-[var(--is-ink)]">
          {method.name}
        </h2>
        <p className="mt-1 text-[14px] leading-[22px] text-[var(--is-ink-soft)]">
          扫码支付，支持自定义金额
        </p>

        {/* 金额选择 */}
        <div className="mt-5 grid grid-cols-4 gap-2">
          {AMOUNTS.map((a) => (
            <button
              key={a.value}
              type="button"
              onClick={() => setAmount(a.value)}
              className={`rounded-[8px] py-2 text-center transition ${
                amount === a.value
                  ? 'bg-[var(--is-ink)] text-[var(--is-white)]'
                  : 'border border-[var(--is-border)] bg-[var(--is-white)] text-[var(--is-ink)] hover:bg-[var(--is-surface)]'
              }`}
            >
              <span className="block text-[14px] font-medium leading-[22px]">{a.label}</span>
              <span className={`block text-[12px] leading-5 ${amount === a.value ? 'text-[var(--is-white)/70]' : 'text-[var(--is-ink-faint)]'}`}>¥{a.value}</span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-center text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">
          {AMOUNTS.find((a) => a.value === amount)?.desc}
        </p>

        {/* 二维码 */}
        <div className="mt-5 flex justify-center">
          <div className="rounded-[10px] border border-[var(--is-border)] p-2">
            <img
              src={qrUrl}
              alt={`${method.name} 收款二维码`}
              className="h-[180px] w-[180px]"
            />
          </div>
        </div>

        {/* 感谢语 */}
        <p className="mt-5 text-center text-[13px] leading-5 text-[var(--is-ink-faint)]">
          您的支持是该项目持续更新的最大动力 ❤️
        </p>
      </div>
    </div>
  )
}
