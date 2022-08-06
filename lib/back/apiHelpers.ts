import { User } from '@prisma/client'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { Tokens } from './accounts/tokens'

export function setCookie(res: NextApiResponse, v: [string, string][]): void {
  const c = v.map(([name, value]) =>
    cookie.serialize(name, value, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      path: '/',
    })
  )

  res.setHeader('Set-Cookie', c)
}

export async function getUserFromSession(
  req: NextApiRequest
): Promise<User | null> {
  const { session } = req.cookies
  if (!session) return null

  const sessionToken = await Tokens.getTokenByHex(session)
  const user = sessionToken?.user

  if (!user) return null
  return user
}
