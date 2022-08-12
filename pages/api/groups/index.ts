import { Group } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getUserFromSession } from '../../../lib/back/apiHelpers'
import { Groups } from '../../../lib/back/groups'
import { JsonApi } from '../../../lib/types'

export default async function groups(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'GET') {
    const user = await getUserFromSession(req)
    if (user) {
      const groups = await Groups.all(user)
      const json: JsonApi<{ groups: Group[] }> = { data: { groups } }
      res.json(json)
    } else {
      res.json({ error: 'problem' })
    }
  } else {
    res.json({ error: 'method not supported' })
  }
}
