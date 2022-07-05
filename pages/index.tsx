import { Edit, XSquare } from 'lucide-react'
import { useState } from 'react'
import { Button, Card, Input, Loader } from '../lib/core'
import { useGroupList } from '../lib/useGroupList'
import { useGroupLists } from '../lib/useGroupLists'
import { useGroups } from '../lib/useGroups'

export default function Index() {
  const { groups } = useGroups()
  const { lists } = useGroupLists({ groupId: groups?.at(0)?.id })
  const { list, create, destroy } = useGroupList({
    groupId: groups?.at(0)?.id,
    listId: lists?.at(0)?.id,
  })
  const [title, setTitle] = useState('')

  if (!list || !lists || !groups)
    return (
      <div className="mt-16 flex items-center justify-center">
        <Loader.Main />
      </div>
    )

  return (
    <main className="mt-16 flex flex-col items-center">
      <h1 className="my-4 text-6xl">App</h1>
      {groups && lists && list && (
        <Card.Main>
          <div className="">
            <span>Group: </span>
            <span>{groups[0].title}</span>
          </div>
          <div className="">
            <span>List: </span>
            <span>{lists[0].title}</span>
          </div>
          <div className="flex flex-col space-y-4">
            {list.items.map(item => {
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border p-4"
                >
                  <span className="grow">{item.title}</span>
                  <button>
                    <Edit size={24} />
                  </button>
                  <button onClick={() => destroy(item)}>
                    <XSquare size={24} />
                  </button>
                </div>
              )
            })}
          </div>
          <div className="mt-8 flex items-center space-x-4">
            <Input.Text
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Button.Main
              onClick={() => create({ title: title, listId: list.id })}
            >
              Create
            </Button.Main>
          </div>
        </Card.Main>
      )}
    </main>
  )
}
