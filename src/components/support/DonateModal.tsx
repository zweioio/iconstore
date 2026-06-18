import { X, Check, Copy } from 'lucide-react'
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

const AMOUNTS = [5, 10, 20, 50]

export function DonateModal({ method, onClose }: Props) {
  const [copied, setCopied] = useState(false)
  const [amount, setAmount] = useState(10)

  function handleCopy() {
    navigator.clipboard.writeText(method.account)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
              key={a}
              type="button"
              onClick={() => setAmount(a)}
              className={`rounded-[8px] py-2 text-[14px] leading-[22px] transition ${
                amount === a
                  ? 'bg-[var(--is-ink)] text-[var(--is-white)]'
                  : 'border border-[var(--is-border)] bg-[var(--is-white)] text-[var(--is-ink)] hover:bg-[var(--is-surface)]'
              }`}
            >
              ¥{a}
            </button>
          ))}
        </div>
        <p className="mt-1 text-center text-[12px] leading-5 text-[var(--is-ink-faint)]">
          扫码支付 ¥{amount}
        </p>

        {/* 二维码 */}
        <div className="mt-4 flex justify-center">
          <div className="rounded-[10px] border border-[var(--is-border)] p-2">
            <img
              src={qrUrl}
              alt={`${method.name} 收款二维码`}
              className="h-[180px] w-[180px]"
            />
          </div>
        </div>

        {/* 收款账号 */}
        <div className="mt-4 flex items-center justify-between rounded-[8px] bg-[var(--is-surface)] px-3 py-2">
          <span className="text-[13px] leading-5 text-[var(--is-ink)]">{method.account}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] text-[var(--is-ink-muted)] transition hover:bg-[var(--is-white)] hover:text-[var(--is-ink)]"
          >
            {copied ? <Check size={14} className="text-[var(--is-green)]" /> : <Copy size={14} />}
          </button>
        </div>

        {/* 感谢语 */}
        <p className="mt-4 text-center text-[13px] leading-5 text-[var(--is-ink-faint)]">
          您的支持是该项目持续更新的最大动力 ❤️
        </p>
      </div>
    </div>
  )
}
