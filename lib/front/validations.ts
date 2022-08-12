interface Validity {
  valid: boolean
  errors: string[]
}

const validity = {
  valid: { valid: true, errors: [] },
  required: { valid: false, errors: ['required'] },
  invalid: (message: string) => ({ valid: false, errors: [message] }),
}

export const validate = {
  email: (email: string): Validity => {
    if (!email) return validity.required
    if (!email.includes('@')) return validity.invalid('include @-sign')
    return validity.valid
  },
}
