import { Group } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { Groups } from '../../../lib/back/groups'
import { middleware } from '../../../lib/back/middleware'
import { JsonApi } from '../../../lib/types'

export default async function groupId(
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
  const params = middleware.extractParams(req, { groupId: '' })
  if (!user || !params) {
    res.status(403).end()
    return
  }

  const { groupId } = params
  const group = await Groups.oneWithMember(groupId, user)
  if (!group) {
    res.status(403).end()
    return
  }

  const json: JsonApi<{ group: Group }> = { data: { group } }
  res.json(json)
}
