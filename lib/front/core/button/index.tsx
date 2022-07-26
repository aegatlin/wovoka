import { ReactNode } from 'react'

interface ButtonProps {
  onClick: () => void
  children: ReactNode
  disabled?: boolean
}

export const Button = {
  Main,
}

function Main({ onClick, disabled = false, children }: ButtonProps) {
  return (
    <button
      className="rounded-xl border p-4 shadow hover:shadow-lg active:shadow-md"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
