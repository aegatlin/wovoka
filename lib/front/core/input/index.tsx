import { mcn } from 'mcn'
import { ChangeEvent } from 'react'

export const Input = {
  Text,
}

interface InputProps {
  name: string
}

interface TextProps extends InputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  valid?: boolean
}

function Text({ value, name, placeholder, label, onChange, valid }: TextProps) {
  return (
    <div className="">
      {label && (
        <label className={classes.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        className={classes.input({ valid })}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const classes = {
  label: 'block font-bold mb-2',
  input: mcn({
    base: 'rounded-xl border p-4',
    valid: {
      false: 'border-red-500',
    },
  }),
}
