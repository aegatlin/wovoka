import { expect, test } from '@playwright/test'
import { Token, TokenType } from '@prisma/client'
import { db } from '../../lib/db'
import { factory } from '../factory'
import { computeHash, eventually, resetdb } from '../support'

test.beforeEach(async () => {
  await resetdb()
})

test('sign-in flow', async ({ context, page }) => {
  const user = await factory.user.create({ confirmed: true })

  await page.goto('/')
  await expect(page.locator('main')).toContainText('sign in')
  await page.locator('header a:has-text("Sign In")').click()

  await expect(page).toHaveURL('/sign-in')
  const emailInput = page.locator('"Email"')
  await emailInput.fill(user.email)
  const submitButton = page.locator('button:has-text("Sign In")')
  await submitButton.click()

  await expect(page).toHaveURL('/check-email')

  const signInToken = await eventually(async () => {
    return await db.prisma.token.findFirst({
      where: { userId: user.id, type: TokenType.SignIn },
    })
  })
  expect(signInToken).toBeTruthy()

  // can't figure out how to spy on the unhashed token being emailed
  // so instead, create _another_ token here and continue sign-in flow
  // with that token instead
  const [signInToken2, token] = await factory.token.create(
    user,
    TokenType.SignIn
  )

  await page.goto(`/api/auth/confirm?token=${token}`)
  await expect(page).toHaveURL('/')

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

test('sign-in flow when the user does not exist', async ({ page }) => {
  await page.goto('/')
  const signInButton = page.locator('"Sign In"')
  await signInButton.click()

  await expect(page).toHaveURL('/sign-in')
  const emailInput = page.locator('"Email"')
  await emailInput.fill(factory.email())
  const submitButton = page.locator('button:has-text("Sign In")')
  await submitButton.click()

  await expect(page).toHaveURL('/check-email')
})
