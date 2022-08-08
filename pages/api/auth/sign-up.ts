import { eor } from 'eor'
import { NextApiRequest, NextApiResponse } from 'next'
import { Accounts } from '../../../lib/back/accounts'
import { AuthData, JsonApi } from '../../../lib/types'

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data }: JsonApi<AuthData> = req.body
  const [e, sentEmail] = await eor(Accounts.signUp(data))
  if (e) console.warn(e)
  if (sentEmail) console.log(sentEmail)
  res.status(200).send('OK')
}
