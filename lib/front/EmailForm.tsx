import {
  Button,
  Card,
  Form,
  Input,
  useChangeField,
  useForm,
  validation,
} from './core'

interface EmailFormProps {
  name: string
  onSubmit: (email: string) => void
}

export function EmailForm({ name, onSubmit }: EmailFormProps) {
  const _onSubmit = (state) => {
    onSubmit(state.email.value)
  }

  return (
    <Form onSubmit={_onSubmit}>
      <Card.Main>
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl">{name}</h1>
          <Email />
          <Submit value={name} />
        </div>
      </Card.Main>
    </Form>
  )
}

function Email() {
  const { name, value, valid, errors, onChange } = useChangeField({
    name: 'email',
    validate: validation.requiredEmail,
  })

  return (
    <div className="">
      <Input.Text
        name={name}
        label="Email"
        value={value || ''}
        valid={valid}
        placeholder="email"
        onChange={onChange}
      />
      {valid === false && errors && (
        <div className="mt-2 text-red-500">{errors[0]}</div>
      )}
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
