import { default as NextLink } from 'next/link'

export const Link = {
  Main,
  Inherit,
}

interface LinkProps {
  to: string
  text: string
  onClick?: () => void
}

function Main({ to, text, onClick }: LinkProps) {
  return (
    <span className="text-blue-500" onClick={onClick}>
      <NextLink href={to}>{text}</NextLink>
    </span>
  )
}

function Inherit({ to, text, onClick }: LinkProps) {
  return (
    <span onClick={onClick}>
      <NextLink href={to}>{text}</NextLink>
    </span>
  )
}
