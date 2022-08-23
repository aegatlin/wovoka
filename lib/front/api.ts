import { eor } from 'eor'
import { routes } from '../routes'
import { AuthData, JsonApi, NewItem } from '../types'

export const api = {
  auth: {
    async signIn(authData: AuthData) {
      await post(routes.api.auth.signIn(), { data: authData })
    },
    async signUp(authData: AuthData) {
      await post(routes.api.auth.signUp(), { data: authData })
    },
    async signOut() {
      await post(routes.api.auth.signOut())
    },
  },
  items: {
    async create(newItem: NewItem) {
      const body: JsonApi<NewItem> = { data: newItem }
      await post(routes.api.items.index(), body)
    },
    async destroy(itemId: string) {
      const queryParams = `itemId=${itemId}`
      await del(routes.api.items.index(queryParams))
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

async function del(url: string): Promise<void> {
  return await fetch(url, {
    method: 'DELETE',
  }).then(async (res) => {
    const [e, json] = await eor(res.json())
    if (e) return
    return json
  })
}
