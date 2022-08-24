import { createFlatStore } from 'react-flat-store'
import { Button, Input } from './core'

const { Store, useStore, useKey } = createFlatStore({ newItem: '' })

const useNewItem = () => {
  const { key, value, update } = useKey('newItem')
  return { key, newItem: value, update }
}

export interface NewItemFormProps {
  submit: (data: { title: string }) => void
}

export function NewItemForm({ submit }: NewItemFormProps) {
  return (
    <Store>
      <NewItem />
      <Submit submit={submit} />
    </Store>
  )
}

function NewItem() {
  const { key, newItem, update } = useNewItem()

  return (
    <Input.Text
      name={key}
      label="New Item"
      placeholder="new item..."
      value={newItem}
      onChange={(e) => update(e.target.value)}
    />
  )
}

function Submit({ submit }: { submit: NewItemFormProps['submit'] }) {
  const { newItem } = useStore()
  return (
    <Button.Main onClick={() => submit({ title: newItem })}>Add</Button.Main>
  )
}
