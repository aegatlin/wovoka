import { Group, Prisma } from '@prisma/client'
import { Card, Icon, Link, Loader, Page } from '../lib/front/core'
import { useGroupsContext } from '../lib/front/useGroupsContext'
import { useItem } from '../lib/front/useItem'
import { useUserContext } from '../lib/front/useUserContext'
import { Item } from '../lib/types'

export default function Index() {
  const { user } = useUserContext()

  return (
    <Page.Main>
      <main>
        {!user && <SignUpOrSignInCard />}
        {user && <View />}
      </main>
    </Page.Main>
  )
}

function SignUpOrSignInCard() {
  return (
    <Card.Main>
      <div className="space-x-1">
        <Link.Main to="/sign-up">Sign up</Link.Main>
        <span>or</span>
        <Link.Main to="/sign-in">sign in</Link.Main>
        <span>to get started</span>
      </div>
    </Card.Main>
  )
}

function View() {
  return (
    <Card.Main>
      <Groups />
    </Card.Main>
  )
}

function Groups() {
  const { groups } = useGroupsContext()

  if (!groups) return <Loader.Main />

  return (
    <div className="">
      {groups.map((g) => (
        <GroupComponent key={g.id} group={g} />
      ))}
    </div>
  )
}

function GroupComponent({ group }) {
  return (
    <div>
      <div>{group.name}</div>
      {group.lists.map((l) => (
        <List key={l.id} list={l} />
      ))}
    </div>
  )
}

function List({ list }) {
  // const onFormSubmit = ({ title }) => create({ title, listId: list?.id })

  return (
    <div className="mt-4 space-y-4">
      <div>{list.name}</div>
      {list.items.map((i) => (
        <ListItem key={i.id} item={i} />
      ))}
      {/* <div className="">
        <NewItemForm createItem={(item: Pre<Item>) => create(item)} />
      </div> */}
    </div>
  )
}

function ListItem({ item }) {
  // const { destroy } = useItem({ itemId: item.id })

  return (
    <div className="flex rounded-xl border p-4">
      <span className="grow">{item.content}</span>
      {/* <button>
        <Icon.Edit />
      </button> */}
      {/* <button onClick={() => destroy(item)}>
        <Icon.X />
      </button> */}
    </div>
  )
}
