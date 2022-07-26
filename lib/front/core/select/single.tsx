import { SelectOption, SingleSelectProps } from '.'
import { Placeholder } from './placeholder'
import { CoreSelect } from './select'

export function Single<O extends SelectOption>(props: SingleSelectProps<O>) {
  const { selection, placeholder, select } = props
  const display = <Display {...{ selection, placeholder }} />
  return CoreSelect({ ...props, select, display })
}

interface DisplayProps {
  selection: SelectOption
  placeholder: string
}

function Display({ selection, placeholder }: DisplayProps) {
  if (!selection) return <Placeholder placeholder={placeholder} />
  return <span>{selection.value}</span>
}
