import { NextApiRequest, NextApiResponse } from 'next'
import { Accounts } from '../../../lib/back/accounts'
import { middleware } from '../../../lib/back/middleware'

export default async function confirm(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.query.token ? (req.query.token as string) : null
  const rememberMe = req.query.rememberMe == 'true'

  if (token) {
    const confirmation = await Accounts.confirm(token, rememberMe)
    if (confirmation) {
      const [sessionHex, rememberMeHex] = confirmation
      const cookies: [string, string][] = [['session', sessionHex]]
      if (rememberMeHex) {
        cookies.push(['rememberMe', rememberMeHex])
      }
      middleware.setCookie(res, cookies)
    }
  }
  res.redirect('/')
}
