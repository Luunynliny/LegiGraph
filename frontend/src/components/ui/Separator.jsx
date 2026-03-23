import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function Separator({ className, orientation = 'horizontal' }) {
  return (
    <div
      role="separator"
      className={cn(
        'bg-[var(--border)] shrink-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        className,
      )}
    />
  )
}
