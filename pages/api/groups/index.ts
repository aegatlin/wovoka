import { NextApiRequest, NextApiResponse } from 'next'
import { getUserFromSession } from '../../../lib/back/apiHelpers'
import { Groups } from '../../../lib/back/groups'

export default async function groups(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'GET') {
    const user = await getUserFromSession(req)
    if (user) {
      const groups = await Groups.all(user)
      res.json({ groups })
    } else {
      res.json({ error: 'problem' })
    }
  } else {
    res.json({ error: 'method not supported' })
  }
}
