import { Card, Link, Loader, Page } from '../lib/front/core'
import { useGroups } from '../lib/front/hooks'
import { useUser } from '../lib/front/useUser'

export default function Index() {
  const { user } = useUser()

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
        <Link.Main to="/sign-up" text="Sign up" />
        <span>or</span>
        <Link.Main to="/sign-in" text="sign in" />
        <span>to get started</span>
      </div>
    </Card.Main>
  )
}

function View() {
  const { groups, error } = useGroups()

  if (!groups && !error) return <Loader.Main />
  return (
    <Card.Main>
      {groups &&
        groups.map((g) => (
          <div key={g.id} className="">
            <Link.Main to={`/groups/${g.id}`} text={g.name} />
          </div>
        ))}
    </Card.Main>
  )
}

function Groups() {
  // const { groups } = useGroupsContext()

  // if (!groups) return <Loader.Main />

  return (
    <div className="">
      {/* {groups.map((g) => (
        <GroupComponent key={g.id} group={g} />
      ))} */}
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
