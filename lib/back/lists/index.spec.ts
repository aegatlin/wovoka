import test, { expect } from '@playwright/test'
import { Lists } from '.'
import { factory } from '../../../tests/factory'
import { resetdb } from '../../../tests/support'

let user, wrongUser, group, list

test.beforeEach(async () => {
  await resetdb()

  user = await factory.user.create()
  wrongUser = await factory.user.create()
  group = await factory.group.create(user)
  list = await factory.list.create(group)
})

test.describe('Lists.oneWithMember', () => {
  test('returns list when user is member of group', async () => {
    const l = await Lists.oneWithMember(list.id, user)
    expect(l).toBeTruthy()
  })

  test('returns null when user is non-member of group', async () => {
    const l = await Lists.oneWithMember(list.id, wrongUser)
    expect(l).toBeNull()
  })
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
