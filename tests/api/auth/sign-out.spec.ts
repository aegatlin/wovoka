import test, { expect } from '@playwright/test'
import { TokenType } from '@prisma/client'
import { db } from '../../../lib/db'
import { factory } from '../../factory'
import { resetdb } from '../../support'

test.beforeEach(async () => {
  await resetdb()
})

test('sign-out', async ({ page }) => {
  await factory.user.createSignedInUser(page)
  const tokenT1 = await db.prisma.token.findFirst({
    where: { type: TokenType.Session },
  })
  expect(tokenT1).toBeTruthy()
  await page.goto('/api/auth/sign-out')
  const tokenT2 = await db.prisma.token.findFirst({
    where: { type: TokenType.Session },
  })
  expect(tokenT2).toBeNull()
})
