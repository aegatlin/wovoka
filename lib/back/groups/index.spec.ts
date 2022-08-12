import test, { expect } from '@playwright/test'
import { Groups } from '.'
import { factory } from '../../../tests/factory'
import { resetdb } from '../../../tests/support'
import { db } from '../../db'

test.beforeEach(async () => {
  resetdb()
})

test('Group.all', async () => {
  const user = await factory.user.create()
  const group1 = await factory.group.create(user)
  const group2 = await factory.group.create(user)
  const groups = await Groups.all(user)
  expect(groups[0].name).toBe(group1.name)
  expect(groups[1].name).toBe(group2.name)
})

test('Group.create', async () => {
  const user = await factory.user.create()
  const bird = factory.bird()
  const group = await Groups.create(user, bird)
  expect(group.name).toBe(bird)
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
