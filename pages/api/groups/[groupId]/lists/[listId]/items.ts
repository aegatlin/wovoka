import { Item } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { Groups } from '../../../../../../lib/back/groups'
import { Items } from '../../../../../../lib/back/items'
import { Lists } from '../../../../../../lib/back/lists'
import { middleware } from '../../../../../../lib/back/middleware'
import { JsonApi } from '../../../../../../lib/types'

export default async function items(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await get(req, res)
      break
    default:
      res.status(405).end()
      break
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const user = await middleware.user(req)
  const params = middleware.extractParams(req, {
    groupId: '',
    listId: '',
  })

  if (!user || !params) {
    res.status(403).end()
    return
  }

  const { groupId, listId } = params
  const group = await Groups.oneWithMember(groupId, user)
  const list = await Lists.one(listId)

  if (!group || !list || list.groupId != group.id) {
    res.status(403).end()
    return
  }

  const items = await Items.all(list)
  const json: JsonApi<{ items: Item[] }> = { data: { items } }
  res.json(json)
}
