import { useState } from 'react'
import { createFlatStore } from 'react-flat-store'
import { AuthData } from '../types'
import { Button, Card, Input } from './core'
import { validate } from './validations'

interface EmailFormProps {
  name: string
  onSubmit: (authData: AuthData) => void
}

const {
  Store: Form,
  useStore: useForm,
  useKey,
} = createFlatStore({
  email: '',
  rememberMe: false,
})

const useEmail = () => {
  const { key, value, update } = useKey('email')
  return { key, email: value, update }
}

const useRememberMe = () => {
  const { key, value, update } = useKey('rememberMe')
  return { key, rememberMe: value, update }
}

export function EmailForm({ name, onSubmit }: EmailFormProps) {
  return (
    <Form>
      <Card.Main>
        <div className="flex max-w-lg flex-col items-center space-y-4">
          <h1 className="text-3xl">{name}</h1>
          <Email />
          <RememberMe />
          <Submit value={name} onSubmit={onSubmit} />
        </div>
      </Card.Main>
    </Form>
  )
}

function Email() {
  const { key, email, update } = useEmail()
  const { valid, errors } = validate.email(email)
  const [show, setShow] = useState(false)

  return (
    <div className="" onBlur={() => setShow(true)}>
      <Input.Text
        name={key}
        label="Email"
        value={email}
        valid={!show ? undefined : valid}
        placeholder="email"
        onChange={(e) => update(e.target.value)}
      />
      <div className="mt-2 h-8 text-red-500">{show && !valid && errors[0]}</div>
    </div>
  )
}

function RememberMe() {
  const { key, rememberMe, update } = useRememberMe()

  return (
    <div>
      <Input.Checkbox
        name={key}
        label="Remember this computer"
        checked={rememberMe}
        value={rememberMe}
        onChange={() => update(!rememberMe)}
      />
    </div>
  )
}

function Submit({ value, onSubmit }) {
  const { email, rememberMe } = useForm()
  const valid = validate.email(email).valid

  const submit = () => {
    const data = { email, rememberMe }
    onSubmit(data)
  }

  return (
    <div className="">
      <Button.Main disabled={!valid} onClick={submit}>
        {value}
      </Button.Main>
    </div>
  )
}
