import { Card, Icon, Link, Loader, Page } from '../lib/front/core'
import { NewItemForm } from '../lib/front/NewItemForm'
import { useGroup } from '../lib/front/useGroup'
import { useGroupsContext } from '../lib/front/useGroupsContext'
import { useItem } from '../lib/front/useItem'
import { useList } from '../lib/front/useList'
import { useUserContext } from '../lib/front/useUserContext'
import { Item, Pre } from '../lib/types'

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
      <Group groupId={groups[0].id} />
    </div>
  )
}

function Group({ groupId }) {
  const { group } = useGroup({ groupId })

  if (!group) return <Loader.Main />

  return (
    <div>
      <div>{group.title}</div>
      <List listId={group.lists[0].id} />
    </div>
  )
}

function List({ listId }) {
  const { list, create } = useList({ listId })
  const onFormSubmit = ({ title }) => create({ title, listId: list?.id })

  if (!list) return <Loader.Main />

  return (
    <div className="mt-4 space-y-4">
      {list.items.map((i) => (
        <ListItem key={i.id} item={i} />
      ))}
      <div className="">
        <NewItemForm createItem={(item: Pre<Item>) => create(item)} />
      </div>
    </div>
  )
}

function ListItem({ item }: { item: Item }) {
  const { destroy } = useItem({ itemId: item.id })

  return (
    <div className="flex rounded-xl border p-4">
      <span className="grow">{item.title}</span>
      <button>
        <Icon.Edit />
      </button>
      <button onClick={() => destroy(item)}>
        <Icon.X />
      </button>
    </div>
  )
}
