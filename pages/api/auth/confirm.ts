import { NextApiRequest, NextApiResponse } from 'next'
import { Accounts } from '../../../lib/back/accounts'
import { setSessionCookie } from '../../../lib/back/apiHelpers'

export default async function test(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query
  const confirmation = await Accounts.confirm(token as string)
  if (confirmation) {
    const [sessionToken, sessionTokenHex] = confirmation
    setSessionCookie(res, sessionTokenHex)
  }
  res.redirect('/')
}
