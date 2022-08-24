import { useRouter } from 'next/router'
import { Card, Loader, Page } from '../../../../lib/front/core'
import { useGroupList, useGroupListItems } from '../../../../lib/front/hooks'

export default function GroupIdListIdPage() {
  const router = useRouter()
  const { id: groupId, listId } = router.query
  const isReady = typeof groupId == 'string' && typeof listId == 'string'

  return (
    <Page.Main>
      {isReady ? <List groupId={groupId} listId={listId} /> : <Loader.Main />}
    </Page.Main>
  )
}

function List({ groupId, listId }: { groupId: string; listId: string }) {
  const { list } = useGroupList(groupId, listId)
  const { items } = useGroupListItems(groupId, listId)

  if (!list || !items) return <Loader.Main />
  return (
    <Card.Main>
      <div>{list.name}</div>
      <div>
        {items.map((i) => (
          <div key={i.id}>{i.title}</div>
        ))}
      </div>
    </Card.Main>
  )
}
