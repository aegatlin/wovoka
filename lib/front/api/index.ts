import { group } from './group'
import { item } from './item'

export const api = {
  group,
  item,
  auth: {
    async signIn(email: string) {
      const data = { email }
      await post('/api/auth/sign-in', data)
    },
    async signUp(email: string) {
      const data = { email }
      await post('/api/auth/sign-up', data)
    },
  },
}

async function post(url, data): Promise<void> {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    return await res.json()
  })
}
