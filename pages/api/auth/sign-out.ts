import { NextApiRequest, NextApiResponse } from 'next'
import { Accounts } from '../../../lib/back/accounts'
import { middleware } from '../../../lib/back/middleware'

export default async function signOut(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await middleware.user(req)
  if (user) {
    await Accounts.signOut(user)
  }
  res.status(200).send('OK')
}
