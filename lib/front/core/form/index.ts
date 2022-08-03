import { createContext } from 'react'
import { Form } from './form'
import { useChangeField, useField } from './useField'
import { useForm } from './useForm'

interface FormContext {
  state: State
  setState: (newState: State) => void
  isFormValid: boolean
  onSubmit: () => void
}

export const FormContext = createContext<FormContext>({
  state: {},
  setState: () => undefined,
  isFormValid: false,
  onSubmit: () => undefined,
})

interface Validity {
  valid: boolean
  errors: string[]
}

export type Validate = (value: any) => Validity
export type FormSubmit = (state: State) => void
export type Field = FieldConfig & Partial<Validity>

export type FieldConfig = {
  name: string
  value?: any
  validate?: (value: string) => Validity
}

export interface State {
  [fieldName: string]: Field
}

export { Form, useForm, useField, useChangeField }

export const validation = {
  required: (value: string): Validity => {
    if (!value) return { valid: false, errors: [value] }
    return { valid: true, errors: [] }
  },
  email: (value: string): Validity => {
    if (!value) return { valid: false, errors: ['Email required'] }
    if (!value.includes('@')) return { valid: false, errors: ['Bad Email'] }
    return { valid: true, errors: [] }
  },
}
