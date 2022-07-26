interface PlaceholderProps {
  placeholder: string
}

export function Placeholder({ placeholder }: PlaceholderProps) {
  return <span className="text-grey-400">{placeholder}</span>
}
