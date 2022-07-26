import { expect, test } from '@playwright/test'
import { User } from '@prisma/client'
import { db } from '../../../lib/db'
import { resetdb, sleep } from '../../support'

test.beforeEach(async () => {
  await resetdb()
})

test('signup flow', async ({ context, page }) => {
  const email = 'test@example.com'

  await page.goto('/')
  const signUpButton = page.locator('"Sign Up"')
  await signUpButton.click()

  await expect(page).toHaveURL('/sign-up')
  const emailInput = page.locator('"Email"')
  await emailInput.fill('test@example.com')
  const submitButton = page.locator('button:has-text("Sign Up")')
  await submitButton.click()

  await expect(page).toHaveURL('/check-email')

  let user: User | null
  while (true) {
    user = await db.prisma.user.findUnique({ where: { email } })
    if (user) break
    await sleep(1000)
  }

  expect(user).toBeTruthy()

  const signUpToken = await db.prisma.token.findFirst({
    where: { userId: user?.id, reason: 'sign-up' },
  })
  expect(signUpToken).toBeTruthy()

  await page.goto(`/api/auth/confirm?token=${signUpToken?.id}`)
  await expect(page).toHaveURL('/')

  const sessionToken = await db.prisma.token.findFirst({
    where: { userId: user.id, reason: 'session' },
  })
  const [cookie] = await context.cookies()
  expect(cookie.path).toBe('/')
  expect(cookie.name).toBe('session')
  expect(cookie.value).toBe(sessionToken?.id)
  expect(cookie.httpOnly).toBe(true)
  expect(cookie.secure).toBe(true)
  expect(cookie.sameSite).toBe('Strict')
})
