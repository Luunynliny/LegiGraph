import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Badge component.
 * variant: 'default' | 'primary' | 'accent' | 'outline'
 */
export function Badge({ children, variant = 'default', className, onClick, style }) {
  return (
    <span
      onClick={onClick}
      style={style}
      className={cn(
        'inline-flex items-center font-mono text-[11px] font-medium px-2 py-0.5 rounded-md border border-[0.5px] cursor-default select-none transition-colors',
        variant === 'primary' && 'bg-[var(--color-civil-tint,rgba(59,111,212,0.10))] text-[var(--color-primary)] border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)]',
        variant === 'accent'  && 'bg-[rgba(245,158,11,0.10)] text-[#B45309] border-[rgba(245,158,11,0.35)]',
        variant === 'outline' && 'bg-transparent text-[var(--text-secondary)] border-[var(--border)]',
        variant === 'default' && 'bg-[var(--bg-overlay)] text-[var(--text-secondary)] border-[var(--border)]',
        onClick && 'cursor-pointer hover:opacity-80',
        className,
      )}
    >
      {children}
    </span>
  )
}
