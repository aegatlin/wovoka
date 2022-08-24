import { Group, List } from '@prisma/client'
import { api } from '../lib/front/api'
import { Button, Card, Link, Loader, Page } from '../lib/front/core'
import {
  useGroup,
  useGroupList,
  useGroupListItems,
  useGroupLists,
  useGroups,
} from '../lib/front/hooks'
import { NewItemForm } from '../lib/front/NewItemForm'
import { useUser } from '../lib/front/useUser'

export default function Index() {
  const { user } = useUser()

  return (
    <Page.Main>
      <main>
        {user === undefined && <Loader.Main />}
        {user === null && <SignUpOrSignInCard />}
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
  const { groups } = useGroups()
  const { group } = useGroup(groups?.at(0)?.id ?? null)
  const { lists } = useGroupLists(group?.id ?? null)
  const { list } = useGroupList(group?.id ?? null, lists?.at(0)?.id ?? null)

  if (!group || !list) return <Loader.Main />

  return <ListCard group={group} list={list} />
}

function ListCard({ group, list }: { group: Group; list: List }) {
  const { items, mutate } = useGroupListItems(group.id, list.id)
  const submit = ({ title }) => {
    api.items.create({ title, listId: list.id }).then(() => mutate())
  }
  const del = (itemId: string) => {
    api.items.destroy(itemId).then(() => mutate())
  }

  return (
    <Card.Main>
      <div className="">{`${group.name} > ${list.name}`}</div>
      <div className="my-4 space-y-4">
        {items &&
          items.map((item) => {
            return (
              <div key={item.id} className="flex justify-between border p-2">
                <span>{item.title}</span>
                <Button.Main onClick={() => del(item.id)}>Delete</Button.Main>
              </div>
            )
          })}
      </div>
      <div className="">
        <NewItemForm submit={submit} />
      </div>
    </Card.Main>
  )
}
