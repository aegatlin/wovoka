import { Item } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { Items } from '../../lib/back/items'
import { Lists } from '../../lib/back/lists'
import { middleware } from '../../lib/back/middleware'
import { JsonApi } from '../../lib/types'

export default async function groups(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      await post(req, res)
      break
    case 'DELETE':
      await del(req, res)
      break
    default:
      res.status(405).end()
      break
  }
}

async function del(req: NextApiRequest, res: NextApiResponse) {
  const user = await middleware.user(req)
  const params = middleware.extractor({
    itemId: (req) => req.query.itemId as string,
  })(req)

  if (!user || !params) {
    res.status(403).end()
    return
  }

  const { itemId } = params
  const item = await Items.oneWithMember(itemId, user)
  if (!item) {
    res.status(403).end()
    return
  }

  const bool = await Items.destroy(item.id)
  res.status(bool ? 200 : 500).end()
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const user = await middleware.user(req)
  if (!user) {
    res.status(403).end()
    return
  }

  const newItemData = middleware.extractor({
    title: (body) => body.data.title,
    listId: (body) => body.data.listId,
  })(req.body)

  if (!newItemData) {
    res.status(400).end()
    return
  }

  const { title, listId } = newItemData
  const list = await Lists.oneWithMember(listId, user)
  if (!list) {
    res.status(403).end()
    return
  }
  const item = await Items.create({ title, listId: list.id })

  const json: JsonApi<{ item: Item }> = { data: { item } }
  res.json(json)
}
