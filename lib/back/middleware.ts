import { Group, Item, List, User } from '@prisma/client'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { Tokens } from './accounts/tokens'
import { Groups } from './groups'
import { Items } from './items'
import { Lists } from './lists'

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

export const middleware = {
  async user(req: NextApiRequest): Promise<User | null> {
    return await getUserFromSession(req)
  },
  getQueryParam(req: NextApiRequest, queryParam: string): string | null {
    const qp = req.query[queryParam]
    if (qp != 'string') return null
    return qp
  },
  extractParams<Params>(req: NextApiRequest, params: Params): Params | null {
    Object.keys(params).forEach((key) => {
      const p = req.query[key]
      if (typeof p == 'string') {
        params[key] = p
      } else return null
    })
    return params
  },
  setCookie(res: NextApiResponse, v: [string, string][]): void {
    const c = v.map(([name, value]) =>
      cookie.serialize(name, value, {
        httpOnly: true,
        secure: true,
        sameSite: true,
        path: '/',
      })
    )

    res.setHeader('Set-Cookie', c)
  },
}
