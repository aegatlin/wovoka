import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
}

export const Card = {
  Main,
}

function Main({ children }: CardProps) {
  return <div className="rounded-xl border p-8">{children}</div>
}
