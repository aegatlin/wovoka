import { ReactNode, useEffect, useState } from 'react'
import { FormContext, State } from '.'

interface FormProps {
  onSubmit: (state: State) => void
  children: ReactNode
}

export function Form({ onSubmit, children }: FormProps) {
  const [state, setState] = useState<State>({})
  const [isFormValid, setIsFormValid] = useState<boolean>(false)

  useEffect(() => {
    const isV = Object.values(state).every(({ validate, value }) => {
      if (validate) return validate(value).valid
      return true
    })

    setIsFormValid(isV)
  }, [state])

  const forceValidations = () => {
    const newState = { ...state }

    Object.entries(state).forEach(([name, field]) => {
      const { validate, value } = field
      if (validate) {
        newState[name] = {
          ...field,
          ...validate(value),
        }
      } else {
        newState[name] = {
          ...field,
          valid: true,
          errors: [],
        }
      }
    })

    setState(newState)
  }

  return (
    <FormContext.Provider
      value={{
        state,
        setState: (newState: State) => setState(newState),
        isFormValid,
        onSubmit: () => (isFormValid ? onSubmit(state) : forceValidations()),
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
