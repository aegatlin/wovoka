import test, { expect } from '@playwright/test'
import { Items } from '.'
import { factory } from '../../../tests/factory'
import { resetdb } from '../../../tests/support'
import { db } from '../../db'

let user, wrongUser, group, list, item

test.beforeEach(async () => {
  await resetdb()

  user = await factory.user.create()
  wrongUser = await factory.user.create()
  group = await factory.group.create(user)
  list = await factory.list.create(group)
  item = await factory.item.create(list)
})

test.describe('Items.oneWithMember', () => {
  test('returns true when user is member of group of list of item', async () => {
    const i = await Items.oneWithMember(item.id, user)
    expect(i).toBeTruthy()
  })

  test('returns false when user is non-member of group of list of item', async () => {
    const i = await Items.oneWithMember(item.id, wrongUser)
    expect(i).toBeNull()
  })
})

test('Items.all', async () => {
  const otherItem = await factory.item.create(list)

  const items = await Items.all(list)
  expect(items.length).toBe(2)
  expect(items[0].title).toBe(item.title)
  expect(items[1].title).toBe(otherItem.title)
})

test('Items.one', async () => {
  const i = await Items.one(item.id)
  expect(i?.title).toBe(item.title)
})

test('Items.create', async () => {
  const title = factory.item.title()
  const i = await Items.create({ title, listId: list.id })
  expect(i?.title).toBe(title)
})

test('Items.destroy', async () => {
  const bool = await Items.destroy(item.id)
  expect(bool).toBeTruthy()
  const items = await db.prisma.item.findMany({ where: { listId: list.id } })
  expect(items.length).toBe(0)
})
