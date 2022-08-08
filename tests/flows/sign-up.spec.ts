import { expect, test } from '@playwright/test'
import { TokenType } from '@prisma/client'
import { db } from '../../lib/db'
import { factory } from '../factory'
import { computeHash, eventually, resetdb } from '../support'

test.beforeEach(async () => {
  await resetdb()
})

test('sign-up flow', async ({ context, page }) => {
  const email = factory.email()

  await page.goto('/')
  const signUpButton = page.locator('"Sign Up"')
  await signUpButton.click()

  await expect(page).toHaveURL('/sign-up')
  const emailInput = page.locator('"Email"')
  await emailInput.fill(email)
  const submitButton = page.locator('button:has-text("Sign Up")')
  await submitButton.click()

  await expect(page).toHaveURL('/check-email')

  const user = await eventually(async () => {
    return await db.prisma.user.findUnique({ where: { email } })
  })
  expect(user).toBeTruthy()
  expect(user.confirmedAt).toBeNull()

  const signUpToken = await db.prisma.token.findFirst({
    where: { userId: user?.id, type: TokenType.SignUp },
  })
  expect(signUpToken).toBeTruthy()

  // can't figure out how to spy on the unhashed hex token being emailed
  // so instead, create _another_ token here and continue sign-in flow
  // with that token instead
  const [signUpToken2, token] = await factory.token.create(
    user,
    TokenType.SignUp
  )

  await page.goto(`/api/auth/confirm?token=${token}`)
  await expect(page).toHaveURL('/')

  const userConfirmed = await db.prisma.user.findUnique({ where: { email } })
  expect(userConfirmed?.confirmedAt).toBeTruthy()

  const sessionToken = await db.prisma.token.findFirst({
    where: { userId: user.id, type: TokenType.Session },
  })
  const [cookie] = await context.cookies()
  expect(cookie.path).toBe('/')
  expect(cookie.name).toBe('session')
  expect(computeHash(cookie.value)).toBe(sessionToken?.hash)
  expect(cookie.httpOnly).toBe(true)
  expect(cookie.secure).toBe(true)
  expect(cookie.sameSite).toBe('Strict')
})
