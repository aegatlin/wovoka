import { NextApiRequest, NextApiResponse } from 'next'
import { Accounts } from '../../../lib/back/accounts'

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body

  if (email) {
    console.log(await Accounts.signIn(email))
  }
  res.status(200).send('OK')
}
