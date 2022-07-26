import { ReactNode, useState } from 'react'
import { SelectOption, SelectProps } from '.'

type CoreSelectProps<O extends SelectOption> = SelectProps<O> & {
  display: ReactNode
}

const classes = {
  select: 'relative w-80',
  label: 'mb-2',
  // display: scn({
  //   base: 'flex items-center border rounded-lg p-4 space-x-2',
  //   disabled: {
  //     true: '',
  //     false: 'bg-white text-black',
  //   },
  // }),
  // show: scn({
  //   base: 'rounded ml-4',
  //   disabled: {
  //     false: 'cursor-pointer',
  //     true: 'bg-grey-400',
  //   },
  // }),
  options:
    'flex flex-col absolute border border-black p-2 space-y-4 mt-4 bg-white rounded w-full z-10 shadow-lg',
}

export function CoreSelect<O extends SelectOption>({
  options,
  disabled = false,
  label,
  error,
  display,
  select,
}: CoreSelectProps<O>) {
  const [show, setShow] = useState(false)
  const choose = (option) => {
    select(option)
    setShow(false)
  }

  let cdisplaywrap = 'flex items-center border rounded-lg p-4 space-x-2'
  let cshowoptions = 'rounded ml-4'
  if (!disabled) {
    cdisplaywrap += ' bg-white text-black'
    cshowoptions += ' cursor-pointer'
  } else {
    cdisplaywrap += ' border-grey-800 bg-grey-200 text-grey-800'
    cshowoptions += ' bg-grey-400'
  }

  if (error) {
    cdisplaywrap += ' border-red-500'
  }

  return (
    <div className={classes.select}>
      <div className={classes.label}>{label}</div>
      <div className={cdisplaywrap}>
        <span className="flex grow items-center space-x-2">{display}</span>
        <span
          className={cshowoptions}
          onClick={() => !disabled && setShow(!show)}
        >
          v
        </span>
      </div>
      {show && (
        <div className={classes.options}>
          {options.map((option) => (
            <Option key={option.id} option={option} choose={choose} />
          ))}
        </div>
      )}
    </div>
  )
}

interface OptionProps {
  option: SelectOption
  choose: (o: SelectOption) => void
}

function Option({ option, choose }: OptionProps) {
  return (
    <div
      key={option.id}
      className="hover:bg-grey-200 cursor-pointer rounded p-2"
      onClick={() => choose(option)}
    >
      {option.value}
    </div>
  )
}
