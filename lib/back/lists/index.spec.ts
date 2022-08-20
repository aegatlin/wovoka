import test, { expect } from '@playwright/test'
import { Lists } from '.'
import { factory } from '../../../tests/factory'
import { resetdb } from '../../../tests/support'

let user, group, list

test.beforeEach(async () => {
  resetdb()

  user = await factory.user.create()
  group = await factory.group.create(user)
  list = await factory.list.create(group)
})

test('Lists.all', async () => {
  const otherList = await factory.list.create(group)

  const lists = await Lists.all(group)
  expect(lists.length).toBe(2)
  expect(lists.some((l) => l.id == list.id)).toBeTruthy()
  expect(lists.some((l) => l.id == otherList.id)).toBeTruthy()
})

test('Lists.one', async () => {
  const l = await Lists.one(list.id)
  expect(l?.name).toBe(list.name)
})
