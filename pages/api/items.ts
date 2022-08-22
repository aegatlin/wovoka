import { Item } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { Items } from '../../lib/back/items'
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
    default:
      res.status(405).end()
      break
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const user = await middleware.user(req)
  if (!user) {
    res.status(403).end()
    return
  }

  const newItemData = middleware.extractor({
    content: (body) => body.data.content,
    listId: (body) => body.data.listId,
  })(req.body)

  if (!newItemData) {
    res.status(400).end()
    return
  }

  const { content, listId } = newItemData
  const item = await Items.create({ content, listId })

  const json: JsonApi<{ item: Item }> = { data: { item } }
  res.json(json)
}
