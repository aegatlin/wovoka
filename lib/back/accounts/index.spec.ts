import { expect, test } from '@playwright/test'
import { TokenType } from '@prisma/client'
import { Accounts } from '.'
import { factory } from '../../../tests/factory'
import { resetdb } from '../../../tests/support'
import { db } from '../../db'

test.beforeEach(async () => {
  await resetdb()
})

test('Accounts.signUp', async () => {
  const email = 'test@example.com'
  const sentEmail = await Accounts.signUp({ email, rememberMe: false })
  const user = await db.prisma.user.findUnique({ where: { email } })
  expect(user).toBeTruthy()

  const token = await db.prisma.token.findFirst({
    where: { userId: user!.id, type: TokenType.SignUp },
  })
  expect(token).toBeTruthy()

  expect(sentEmail.email.to).toBe(user?.email)
})

test.describe('Accounts.confirm', async () => {
  test('sign up', async () => {
    const user = await factory.user.create()
    const [signUpToken, token] = await factory.token.create(
      user,
      TokenType.SignUp
    )

    expect(user.confirmedAt).toBe(null)

    await Accounts.confirm(token)

    const user2 = await db.prisma.user.findUnique({ where: { id: user.id } })
    expect(user2?.confirmedAt).toBeTruthy()

    const sessionToken = await db.prisma.token.findFirst({
      where: { userId: user.id },
    })
    expect(sessionToken).toBeTruthy
  })
})

test('Accounts.signIn', async () => {
  const user = await factory.user.create({ confirmed: true })
  const sentEmail = await Accounts.signIn({
    email: user.email,
    rememberMe: false,
  })
  const signInToken = await db.prisma.token.findFirst({
    where: { type: TokenType.SignIn },
  })
  expect(signInToken?.userId).toBe(user.id)
  expect(sentEmail.email.to).toBe(user.email)
})

test('Accounts.signOut', async () => {
  const user = await factory.user.create({ confirmed: true })
  await factory.token.create(user, TokenType.Session)
  await Accounts.signOut(user)

  const sessionToken = await db.prisma.token.findFirst({
    where: { type: TokenType.Session },
  })

  expect(sessionToken).toBeNull()
})
