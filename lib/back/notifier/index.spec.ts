import { expect, test } from '@playwright/test'
import { Notifier } from '.'
import { resetdb } from '../../../tests/support'
import { db } from '../../db'

test.beforeEach(async () => {
  await resetdb()
})

test('sends sign up email', async () => {
  const user = await db.prisma.user.create({
    data: { email: 'bob@test.com' },
  })
  const token = await db.prisma.token.create({
    data: { userId: user.id, reason: 'sign-up' },
  })
  const sentEmail = await Notifier.sendSignUpEmail(user, token)
  expect(sentEmail.email.subject).toMatch(/Sign Up/)
})

test('sends sign in email', async () => {
  const user = await db.prisma.user.create({
    data: { email: 'bob@test.com', confirmedAt: new Date() },
  })
  const token = await db.prisma.token.create({
    data: { userId: user.id, reason: 'sign-in' },
  })
  const sentEmail = await Notifier.sendSignInEmail(user, token)
  expect(sentEmail.email.subject).toMatch(/Sign In/)
})
