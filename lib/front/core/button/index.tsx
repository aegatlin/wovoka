import { mcn } from 'mcn'
import { ReactNode } from 'react'

interface ButtonProps {
  onClick: () => void
  children: ReactNode
  disabled?: boolean
}

export const Button = {
  Main,
}

const buttonClasses = mcn({
  base: 'rounded-xl border p-4',
  disabled: {
    true: 'text-slate-400',
    false: 'shadow hover:shadow-lg active:shadow-md',
  },
})

function Main({ onClick, disabled = false, children }: ButtonProps) {
  return (
    <button
      className={buttonClasses({ disabled })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
