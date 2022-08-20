import { expect, test } from '@playwright/test'
import { routes } from '../../lib/routes'
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

test.describe('/api/groups', () => {
  test('responds with 403 when user not signed in', async ({ page }) => {
    const res = await page.request.get(routes.api.groups.index())
    expect(res.status()).toBe(403)
  })

  test('responds with groups when user is signed in', async ({ page }) => {
    const user = await factory.user.createSignedInUser(page)
    const group = await factory.group.create(user)

    const res = await page.request.get(routes.api.groups.index())
    const json = await res.json()
    expect(json.data.groups.length).toBe(1)
    expect(json.data.groups[0].name).toBe(group.name)
  })
})

test.describe('/api/groups/:groupId', () => {
  test.beforeEach(async () => {
    path = routes.api.groups.groupId(group.id)
  })

  test('responds with 403 when user not signed in', async ({ page }) => {
    const res = await page.request.get(path)
    expect(res.status()).toBe(403)
  })

  test('responds with 403 when a non-member user is signed', async ({
    page,
  }) => {
    await factory.user.signIn(wrongUser, page)
    const res = await page.request.get(path)
    expect(res.status()).toBe(403)
  })

  test('responds with group data', async ({ page }) => {
    await factory.user.signIn(user, page)
    const res = await page.request.get(path)
    expect(res).toBeOK()
    const json = await res.json()
    expect(json.data.group.name).toBe(group.name)
  })
})

test.describe('/api/groups/:groupId/lists', () => {
  test.beforeEach(async () => {
    path = routes.api.groups.groupIdLists(group.id)
  })

  test('responds with 403 when user not signed in', async ({ page }) => {
    const res = await page.request.get(path)
    expect(res.status()).toBe(403)
  })

  test('responds with 403 when a non-member user is signed', async ({
    page,
  }) => {
    await factory.user.signIn(wrongUser, page)
    const res = await page.request.get(path)
    expect(res.status()).toBe(403)
  })

  test('responds with group lists', async ({ page }) => {
    await factory.user.signIn(user, page)

    const res = await page.request.get(path)
    expect(res).toBeOK()
    const json = await res.json()
    expect(json.data.lists.length).toBe(1)
    expect(json.data.lists[0].name).toBe(list.name)
  })
})

test.describe('/api/groups/:groupId/lists/:listId', () => {
  test.beforeEach(async () => {
    path = routes.api.groups.groupIdListsListId(group.id, list.id)
  })

  test('responds with 403 when user not signed in', async ({ page }) => {
    const res = await page.request.get(path)
    expect(res.status()).toBe(403)
  })

  test('responds with 403 when a non-member user is signed', async ({
    page,
  }) => {
    await factory.user.signIn(wrongUser, page)
    const res = await page.request.get(path)
    expect(res.status()).toBe(403)
  })

  test('responds with group list data', async ({ page }) => {
    await factory.user.signIn(user, page)

    const res = await page.request.get(path)
    expect(res).toBeOK()
    const json = await res.json()
    expect(json.data.list.name).toBe(list.name)
  })
})

test.describe('/api/groups/:groupId/lists/:listId/items', () => {
  test.beforeEach(async () => {
    path = routes.api.groups.groupIdListsListIdItems(group.id, list.id)
  })

  test('responds with 403 when user not signed in', async ({ page }) => {
    const res = await page.request.get(path)
    expect(res.status()).toBe(403)
  })

  test('responds with 403 when a non-member user is signed', async ({
    page,
  }) => {
    await factory.user.signIn(wrongUser, page)
    const res = await page.request.get(path)
    expect(res.status()).toBe(403)
  })

  test('responds with group list items', async ({ page }) => {
    await factory.user.signIn(user, page)

    const res = await page.request.get(path)
    expect(res).toBeOK()
    const json = await res.json()
    expect(json.data.items.length).toBe(1)
    expect(json.data.items[0].name).toBe(item.name)
  })
})

test.describe('/api/groups/:groupId/lists/:listId/items/:itemId', () => {
  test.beforeEach(async () => {
    path = routes.api.groups.groupIdListsListIdItemsItemId(
      group.id,
      list.id,
      item.id
    )
  })

  test('responds with 403 when user not signed in', async ({ page }) => {
    const res = await page.request.get(path)
    expect(res.status()).toBe(403)
  })

  test('responds with 403 when a non-member user is signed', async ({
    page,
  }) => {
    await factory.user.signIn(wrongUser, page)
    const res = await page.request.get(path)
    expect(res.status()).toBe(403)
  })

  test('responds with group list item', async ({ page }) => {
    await factory.user.signIn(user, page)

    const res = await page.request.get(path)
    expect(res).toBeOK()
    const json = await res.json()
    expect(json.data.item.name).toBe(item.name)
  })
})
