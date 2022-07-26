import { NextApiRequest, NextApiResponse } from 'next'
import { Accounts } from '../../../../lib/back/accounts'

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body

  if (email) {
    await Accounts.signUp(email)
  }
  res.status(200).send('OK')
}
