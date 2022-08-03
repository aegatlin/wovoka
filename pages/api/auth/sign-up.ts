import { NextApiRequest, NextApiResponse } from 'next'
import { Accounts } from '../../../lib/back/accounts'
import { AuthData, JsonApi } from '../../../lib/types'

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data }: JsonApi<AuthData> = req.body
  await Accounts.signUp(data)
  res.status(200).send('OK')
}
