import test, { expect } from '@playwright/test'
import { Items } from '.'
import { factory } from '../../../tests/factory'
import { resetdb } from '../../../tests/support'

let user, group, list, item

test.beforeEach(async () => {
  resetdb()
  user = await factory.user.create()
  group = await factory.group.create(user)
  list = await factory.list.create(group)
  item = await factory.item.create(list)
})

test('Items.all', async () => {
  const otherItem = await factory.item.create(list)

  const items = await Items.all(list)
  expect(items.length).toBe(2)
  expect(items[0].content).toBe(item.content)
  expect(items[1].content).toBe(otherItem.content)
})

test('Items.one', async () => {
  const i = await Items.one(item.id)
  expect(i?.content).toBe(item.content)
})
