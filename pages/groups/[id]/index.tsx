import { useRouter } from 'next/router'
import { Card, Link, Loader, Page } from '../../../lib/front/core'
import { useGroup, useGroupLists } from '../../../lib/front/hooks'

export default function GroupIdPage() {
  const router = useRouter()
  const id = router.query.id
  const isReady = typeof id == 'string'

  return (
    <Page.Main>{isReady ? <Lists groupId={id} /> : <Loader.Main />}</Page.Main>
  )
}

function Lists({ groupId }: { groupId: string }) {
  const { group } = useGroup(groupId)
  const { lists } = useGroupLists(groupId)

  if (!group || !lists) return <Loader.Main />

  return (
    <Card.Main>
      <div className="">{group.name}</div>
      {lists.map((l) => (
        <div key={l.id} className="">
          <Link.Main to={`/groups/${groupId}/lists/${l.id}`} text={l.name} />
        </div>
      ))}
    </Card.Main>
  )
}
