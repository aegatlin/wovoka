import { expect, test } from '@playwright/test'
import { TokenType } from '@prisma/client'
import { Notifier } from '.'
import { factory } from '../../../tests/factory'
import { resetdb } from '../../../tests/support'

test.beforeEach(async () => {
  await resetdb()
})

test('sends sign up email', async () => {
  const user = await factory.user.create()
  const [token, hex] = await factory.token.create(user, TokenType.SignUp)
  const sentEmail = await Notifier.sendSignUpEmail(user, hex)
  expect(sentEmail.email.subject).toMatch(/Sign Up/)
})

test('sends sign in email', async () => {
  const user = await factory.user.create({ confirmed: true })
  const [token, hex] = await factory.token.create(user, TokenType.SignIn)
  const sentEmail = await Notifier.sendSignInEmail(user, hex)
  expect(sentEmail.email.subject).toMatch(/Sign In/)
})
