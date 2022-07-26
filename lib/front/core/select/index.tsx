import { Single } from './single'

export interface SelectOption {
  id: string
  value: string
}

export interface SelectProps<O extends SelectOption> {
  options: O[]
  name: string
  label?: string
  disabled?: boolean
  placeholder: string
  error?: boolean
  select: (o: O) => void
}

export type SingleSelectProps<O extends SelectOption> = SelectProps<O> & {
  selection: O
}

// export type MultiSelectProps<O extends SelectOption> = SelectProps<O> & {
//   selection: O[]
//   remove: (o: O) => void
// }

export const Select = {
  Single,
}
