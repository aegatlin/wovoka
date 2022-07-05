import { ChangeEvent } from 'react'

export const Input = {
  Text,
}

interface TextProps {
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
}
function Text({ value, name, placeholder, label, onChange }: TextProps) {
  return (
    <div className="">
      {label && <div className="">{label}</div>}
      <input
        className="rounded-xl border p-4"
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
