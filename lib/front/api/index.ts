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
  },
}

async function post(url: string, body: JsonApi<any>): Promise<void> {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(async (res) => {
    return await res.json()
  })
}
