import { eor } from 'eor'
import { AuthData, JsonApi } from '../../types'
import { group } from './group'
import { item } from './item'

export const api = {
  group,
  item,
  auth: {
    async signIn(authData: AuthData) {
      await post('/api/auth/sign-in', { data: authData })
    },
    async signUp(authData: AuthData) {
      await post('/api/auth/sign-up', { data: authData })
    },
    async signOut() {
      await post('/api/auth/sign-out')
    },
  },
}

export const url = {
  session(): string {
    return `/api/auth/session`
  },
  groups: {
    all(): string {
      return `/api/groups`
    },
    one(id: string): string {
      return `/api/groups/${id}`
    },
  },
  lists: {
    one(id: string) {
      return `/api/lists/${id}`
    },
  },
}

async function post(url: string, body?: JsonApi<any>): Promise<void> {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then(async (res) => {
    const [e, json] = await eor(res.json())
    if (e) return
    return json
  })
}
