import test, { expect } from '@playwright/test'
import { routes } from '../../lib/routes'
import { JsonApi } from '../../lib/types'
import { factory } from '../factory'
import { resetdb } from '../support'

let user, group, list, item
let otherGroup, otherList, otherItem
let wrongUser
let path

test.beforeEach(async () => {
  await resetdb()

  user = await factory.user.create()
  group = await factory.group.create(user)
  list = await factory.list.create(group)
  item = await factory.item.create(list)

  otherGroup = await factory.group.create(user)
  otherList = await factory.list.create(otherGroup)
  otherItem = await factory.item.create(otherList)

  wrongUser = await factory.user.create()
})

test.describe('/api/items', () => {
  test.describe('POST', () => {
    test('responds with 403 when user not signed in', async ({ page }) => {
      const json: JsonApi<{ content: string; listId: string }> = {
        data: { content: 'New Item', listId: list.id },
      }

      const res = await page.request.post(routes.api.items.index(), {
        data: json,
      })

      expect(res.status()).toBe(403)
    })

    test('responds with new item when user is signed in and payload is appropriate', async ({
      page,
    }) => {
      await factory.user.signIn(user, page)

      const payload: JsonApi<{ content: string; listId: string }> = {
        data: { content: 'New Item', listId: list.id },
      }
      
      const res = await page.request.post(routes.api.items.index(), {
        data: payload,
      })

      expect(res.status()).toBe(200)
      const json = await res.json()
      expect(json.data.item.id).toBeTruthy()
      expect(json.data.item.listId).toBe(list.id)
    })
  })
})
