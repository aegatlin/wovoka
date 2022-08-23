import test, { expect } from '@playwright/test'
import { TokenType } from '@prisma/client'
import { db } from '../../lib/db'
import { factory } from '../factory'
import { resetdb } from '../support'

test.beforeEach(async () => {
  await resetdb()
})

test('sign-out flow', async ({ page }) => {
  await factory.user.createSignedInUser(page)
  await page.goto('/')
  await page.locator('header button:has-text("Sign Out")').click()
  await expect(page).toHaveURL('/sign-out')
  await expect(page.locator('body')).toHaveText(
    /You have successfully signed out./
  )
  await expect(page.locator('header')).toContainText('Sign In')
  await page.locator('header a:has-text("App")').click()
  await expect(page).toHaveURL('/')

  // delete session tokens
  const sessionToken = await db.prisma.token.findFirst({
    where: { type: TokenType.Session },
  })
  expect(sessionToken).toBeNull()

  // do NOT delete sign-in (and other) tokens
  const signInToken = await db.prisma.token.findFirst({
    where: { type: TokenType.SignIn },
  })
  expect(signInToken).toBeTruthy()
})
