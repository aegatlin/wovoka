import { useState } from 'react'
import { SelectOption } from '.'

export function useSelect<O>(init?: O) {
  const [selection, setSelection] = useState<O | null>(init || null)

  return {
    selection,
    setSelection: (s: O) => {
      setSelection(s)
    },
  }
}

export function useSingleSelect<O extends SelectOption>(init?: O) {
  const { selection, setSelection } = useSelect<O>(init)

  return {
    selection,
    select: (o: O) => {
      setSelection(o)
    },
  }
}

// export function useMultiSelect<O extends SelectOption>(init?: O[]) {
//   const { selection, setSelection } = useSelect<O[]>(init)

//   return {
//     selection,
//     select: (o: O) => {
//       if (!selection) {
//         setSelection([o])
//         return
//       }
//       if (selection.some(s => s.id == o.id)) return
//       setSelection([...selection, o])
//     },
//     remove: (o: O) => {
//       const newSelection = [...selection.filter(s => s.id != o.id)]
//       setSelection(newSelection)
//     },
//   }
// }
