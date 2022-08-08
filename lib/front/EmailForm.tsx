import { AuthData } from '../types'
import {
  Button,
  Card,
  Form,
  Input,
  useChangeField,
  useField,
  useForm,
  validation,
} from './core'

interface EmailFormProps {
  name: string
  onSubmit: (authData: AuthData) => void
}

export function EmailForm({ name, onSubmit }: EmailFormProps) {
  const formSubmit = (state) => {
    onSubmit({ email: state.email.value, rememberMe: state.rememberMe.value })
  }

  return (
    <Form onSubmit={formSubmit}>
      <Card.Main>
        <div className="flex max-w-lg flex-col items-center space-y-4">
          <h1 className="text-3xl">{name}</h1>
          <Email />
          <RememberMe />
          <Submit value={name} />
        </div>
      </Card.Main>
    </Form>
  )
}

function Email() {
  const { name, value, valid, errors, onChange } = useChangeField({
    name: 'email',
    validate: validation.email,
  })

  return (
    <div className="">
      <Input.Text
        name={name}
        label="Email"
        value={value || ''}
        valid={valid == false}
        placeholder="email"
        onChange={onChange}
      />
      {valid === false && errors && (
        <div className="mt-2 text-red-500">{errors[0]}</div>
      )}
    </div>
  )
}

function RememberMe() {
  const { name, value, update } = useField({
    name: 'rememberMe',
    value: false,
  })

  return (
    <div>
      <Input.Checkbox
        name={name}
        label="Remember this computer"
        checked={value}
        value={value}
        onChange={() => update(!value)}
      />
    </div>
  )
}

function Submit({ value }) {
  const { onSubmit } = useForm()

  return (
    <div className="">
      <Button.Main onClick={() => onSubmit()}>{value}</Button.Main>
    </div>
  )
}
