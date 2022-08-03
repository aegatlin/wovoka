import { ChangeEvent, useContext, useEffect } from 'react'
import { Field, FieldConfig, FormContext } from '.'

export function useField({ name, value, validate }: FieldConfig): Field & {
  update: (value: any) => void
  updateAndValidate: (value: any) => void
} {
  const { state, setState } = useContext(FormContext)

  useEffect(() => {
    function setNewField() {
      const field = { name }
      if (validate) field['validate'] = validate
      if (value != undefined) field['value'] = value

      setState({
        ...state,
        [name]: field,
      })
    }

    if (!state[name]) setNewField()
  }, [name, state, setState, validate, value])

  const updateField = (newField: Field) => {
    setState({
      ...state,
      [name]: { ...newField },
    })
  }

  const update = (newValue) => updateField({ ...state[name], value: newValue })
  const updateAndValidate = (newValue) => {
    const field = state[name]
    const { validate } = field

    if (!validate) {
      update(newValue)
    } else {
      updateField({
        ...field,
        value: newValue,
        ...validate(newValue),
      })
    }
  }

  return { ...state[name], update, updateAndValidate }
}

export function useChangeField(fieldConfig: FieldConfig): Field & {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
} {
  const { update, updateAndValidate, ...field } = useField(fieldConfig)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { validate } = field
    const value = e.target.value
    if (validate === undefined) {
      update(value)
    } else {
      updateAndValidate(value)
    }
  }

  return {
    ...field,
    onChange,
  }
}
