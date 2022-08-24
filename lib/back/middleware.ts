import { User } from '@prisma/client'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { JsonApi, NewItem } from '../types'
import { Tokens } from './accounts/tokens'

export const middleware = {
  async user(req: NextApiRequest): Promise<User | null> {
    const { session } = req.cookies
    if (!session) return null

    const sessionToken = await Tokens.getTokenByHex(session)
    const user = sessionToken?.user

    if (!user) return null
    return user
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
  extractor,
  extract: {
    newItem: extractor<NewItem>({
      title: (body) => body.data.title,
      listId: (body) => body.data.listId,
    }),
  },
}

function extractor<Output, Payload = any>(extractor: {
  [Key in keyof Output]: (payload: Payload) => Output[Key]
}): (payload: Payload) => Output | null {
  return (payload) => {
    try {
      const output = {}

      Object.keys(extractor).forEach((key) => {
        const value = extractor[key](payload)
        output[key] = value
      })

      return output as Output
    } catch {
      return null
    }
  }
}

const params = extractor({
  groupId: (query) => query.groupId,
})
