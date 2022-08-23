import test, { expect } from '@playwright/test'
import { Groups } from '.'
import { factory } from '../../../tests/factory'
import { resetdb } from '../../../tests/support'
import { db } from '../../db'

test.beforeEach(async () => {
  await resetdb()
})

test.describe('Group.oneWithMember', () => {
  let user, group

  test.beforeEach(async () => {
    user = await factory.user.create()
    group = await factory.group.create(user)
  })

  test('returns group when user is member', async () => {
    const actual = await Groups.oneWithMember(group.id, user)
    expect(actual?.id).toBe(group.id)
  })

  test('returns null when user is NOT a member of the group', async () => {
    const wrongUser = await factory.user.create()
    const actual = await Groups.oneWithMember(group.id, wrongUser)
    expect(actual).toBeNull()
  })
})

test('Group.all', async () => {
  const user = await factory.user.create()
  const group1 = await factory.group.create(user)
  const group2 = await factory.group.create(user)
  const groups = await Groups.all(user)
  expect(groups.length).toBe(2)
  expect(groups.find((g) => g.name == group1.name)).toBeTruthy()
  expect(groups.find((g) => g.name == group2.name)).toBeTruthy()
})

test('Group.create', async () => {
  const user = await factory.user.create()
  const groupName = factory.group.name()
  const group = await Groups.create(user, groupName)
  expect(group.name).toBe(groupName)
  const groupWithMembers = await db.prisma.group.findFirst({
    include: { members: true },
  })
  const members = groupWithMembers?.members
  expect(members?.length).toBe(1)
  expect(members?.at(0)?.email).toBe(user.email)
})

test('Group.destroy', async () => {
  const user = await factory.user.create()
  const group = await factory.group.create(user)
  await Groups.destroy(group.id)
  const groups = await db.prisma.group.findMany()
  expect(groups.length).toBe(0)
})
