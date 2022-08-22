import { NextApiRequest, NextApiResponse } from 'next'
import { middleware } from '../../../lib/back/middleware'
import { JsonApi } from '../../../lib/types'

export default async function session(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await middleware.user(req)
  if (!user) {
    const body: JsonApi<null> = { data: null }
    res.json(body)
  } else {
    const body: JsonApi<{ user: { id: string; email: string } }> = {
      data: { user: { id: user?.id, email: user?.email } },
    }
    res.json(body)
  }
}
