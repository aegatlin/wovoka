import { expect, test } from '@playwright/test'
import { Accounts } from '.'
import { resetdb } from '../../../tests/support'
import { db } from '../../db'

test.beforeEach(async () => {
  await resetdb()
})

test('Accounts.signUp', async () => {
  const email = 'test@example.com'
  const sentEmail = await Accounts.signUp(email)
  const user = await db.prisma.user.findUnique({ where: { email } })
  expect(user).toBeTruthy()

  const token = await db.prisma.token.findFirst({
    where: { userId: user!.id, reason: 'sign-up' },
  })
  expect(token).toBeTruthy()

  expect(sentEmail.email.to).toBe(user?.email)
})

test.describe('Accounts.confirm', async () => {
  test('sign up', async () => {
    const user = await db.prisma.user.create({
      data: { email: 'test@example.com' },
    })

    const signUpToken = await db.prisma.token.create({
      data: { userId: user.id, reason: 'sign-up' },
    })

    expect(user.confirmedAt).toBe(null)

    const sessionToken = await Accounts.confirm(signUpToken.id)

    const user2 = await db.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    })

    expect(user2?.confirmedAt).toBeTruthy()
    expect(sessionToken.userId).toBe(user.id)
  })
})

test('Accounts.signIn', async () => {
  const email = 'test@example.com'
  const user = await db.prisma.user.create({
    data: {
      email,
      confirmedAt: new Date(),
    },
  })

  const sentEmail = await Accounts.signIn(email)
  const token = await db.prisma.token.findFirst({
    where: { reason: 'sign-in' },
  })
  expect(token?.userId).toBe(user.id)
  expect(sentEmail.email.to).toBe(user.email)
})

test('Accounts.signOut', async () => {
  const email = 'test@example.com'
  const user = await db.prisma.user.create({
    data: {
      email,
      confirmedAt: new Date(),
    },
  })
  const token = await db.prisma.token.create({
    data: {
      reason: 'session',
      userId: user.id,
    },
  })

  await Accounts.signOut(user)

  const sessionToken = await db.prisma.token.findFirst({
    where: { reason: 'session' },
  })

  expect(sessionToken).toBeNull()
})

test('Accounts.getUserBySessionToken', async () => {
  const email = 'test@example.com'
  const user = await db.prisma.user.create({
    data: {
      email,
      confirmedAt: new Date(),
    },
  })
  const token = await db.prisma.token.create({
    data: {
      reason: 'session',
      userId: user.id,
    },
  })

  const user2 = await Accounts.getUserBySessionToken(token.id)
  expect(user2?.id).toBe(user.id)
  expect(user2?.email).toBe(user.email)
})
