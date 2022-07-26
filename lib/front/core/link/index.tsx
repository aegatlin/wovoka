import { default as NextLink } from 'next/link'
import { ReactNode } from 'react'

export const Link = {
  Main,
  Inherit,
}

interface LinkProps {
  children: ReactNode
  to: string
}

function Main({ to, children }: LinkProps) {
  return (
    <span className="text-blue-500">
      <NextLink href={to}>{children}</NextLink>
    </span>
  )
}

function Inherit({ to, children }: LinkProps) {
  return (
    <span>
      <NextLink href={to}>{children}</NextLink>
    </span>
  )
}
