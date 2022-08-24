import test, { expect } from '@playwright/test'
import { routes } from '../../lib/routes'
import { JsonApi, NewItem } from '../../lib/types'
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
  test.describe('DELETE', () => {
    let queryParams

    test.beforeEach(async () => {
      queryParams = `itemId=${item.id}`
    })

    test('responds with 403 when user not signed in', async ({ page }) => {
      const res = await page.request.delete(routes.api.items.index(queryParams))
      expect(res.status()).toBe(403)
    })

    test('responds with 403 when user is non-member', async ({ page }) => {
      await factory.user.signIn(wrongUser, page)

      const res = await page.request.delete(routes.api.items.index(queryParams))
      expect(res.status()).toBe(403)
    })

    test('responds with 200 when delete is successful', async ({ page }) => {
      await factory.user.signIn(user, page)

      const res = await page.request.delete(routes.api.items.index(queryParams))
      expect(res.status()).toBe(200)
    })
  })

  test.describe('POST', () => {
    let json: JsonApi<NewItem>

    test.beforeEach(async () => {
      json = { data: { title: 'New Item', listId: list.id } }
    })

    test('responds with 403 when user not signed in', async ({ page }) => {
      const res = await page.request.post(routes.api.items.index(), {
        data: json,
      })

      expect(res.status()).toBe(403)
    })

    test('responds with 403 when user is non-member', async ({ page }) => {
      await factory.user.signIn(wrongUser, page)

      const res = await page.request.post(routes.api.items.index(), {
        data: json,
      })

      expect(res.status()).toBe(403)
    })

    test('responds with new item when user is signed in and payload is appropriate', async ({
      page,
    }) => {
      await factory.user.signIn(user, page)

      const res = await page.request.post(routes.api.items.index(), {
        data: json,
      })

      expect(res.status()).toBe(200)
      const resJson = await res.json()
      expect(resJson.data.item.id).toBeTruthy()
      expect(resJson.data.item.listId).toBe(list.id)
    })
  })
})
