import { NextApiRequest, NextApiResponse } from 'next'
import { Accounts } from '../../../lib/back/accounts'
import { AuthData, JsonApi } from '../../../lib/types'

export default async function signIn(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data }: JsonApi<AuthData> = req.body
  await Accounts.signIn(data)
  res.status(200).send('OK')
}
