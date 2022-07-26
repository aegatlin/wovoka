import { Item, Pre } from '../types'
import {
  Button,
  Form,
  FormSubmit,
  Input,
  useChangeField,
  useForm,
} from './core'

export function NewItemForm({
  createItem,
}: {
  createItem: (pre: Pre<Item>) => void
}) {
  const onSubmit: FormSubmit = (state) => {
    const title = state['new-item'].value || ''
    const preItem: Pre<Item> = {
      title,
    }
  }

  return (
    <Form onSubmit={() => undefined}>
      <div className="">
        <NewItem />
        <Submit />
      </div>
    </Form>
  )
}

function NewItem() {
  const { name, value, onChange } = useChangeField({ name: 'new-item' })
  return (
    <Input.Text
      name={name}
      label="New Item"
      placeholder="new item title..."
      value={value}
      onChange={onChange}
    />
  )
}

function Submit() {
  const { onSubmit } = useForm()
  return <Button.Main onClick={() => onSubmit()}>Submit</Button.Main>
}
