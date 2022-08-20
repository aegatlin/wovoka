import { eor } from 'eor'
import { routes } from '../../routes'
import { AuthData, JsonApi } from '../../types'
import { group } from './group'
import { item } from './item'

export const api = {
  group,
  item,
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
    all(groupId: string) {
      return `/api/groups/${groupId}/lists`
    },
    one(groupId: string, listId: string) {
      return `/api/groups/${groupId}/lists/${listId}`
    },
  },
  items: {
    all(groupId: string, listId: string) {
      return `/api/groups/${groupId}/lists/${listId}/items`
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
