import { Group } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { Groups } from '../../lib/back/groups'
import { middleware } from '../../lib/back/middleware'
import { JsonApi } from '../../lib/types'

export default async function groups(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
  if (!user) {
    res.status(403).end()
    return
  }

  const groups = await Groups.all(user)
  const json: JsonApi<{ groups: Group[] }> = { data: { groups } }
  res.json(json)
}
