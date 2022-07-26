import { NextApiRequest, NextApiResponse } from 'next'
import { getUserFromSession } from '../../../lib/back/apiHelpers'

export default async function session(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getUserFromSession(req)
  if (!user) {
    res.json({
      user: null,
    })
  } else {
    res.json({
      user: {
        id: user?.id,
        email: user?.email,
      },
    })
  }
}
