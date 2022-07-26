import { useContext } from 'react'
import { FormContext } from '.'

export function useForm(): {
  onSubmit: () => void
  isFormValid: boolean
} {
  const { onSubmit, isFormValid } = useContext(FormContext)

  return {
    onSubmit,
    isFormValid,
  }
}
