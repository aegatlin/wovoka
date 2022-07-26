import { User } from '@prisma/client'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { Accounts } from './accounts'

export function setSessionCookie(res: NextApiResponse, token: string): void {
  const c = cookie.serialize('session', token, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    path: '/',
  })

  res.setHeader('Set-Cookie', c)
}

export async function getUserFromSession(
  req: NextApiRequest
): Promise<User | null> {
  const { session } = req.cookies
  if (!session) return null
  const user = await Accounts.getUserBySessionToken(session)
  if (!user) return null
  return user
}
