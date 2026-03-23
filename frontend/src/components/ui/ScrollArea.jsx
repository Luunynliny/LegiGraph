import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function ScrollArea({ children, className }) {
  return (
    <div
      className={cn(
        'overflow-y-auto overscroll-contain',
        className,
      )}
    >
      {children}
    </div>
  )
}
