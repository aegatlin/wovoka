import test, { expect } from '@playwright/test'
import { TokenType } from '@prisma/client'
import { db } from '../../../../lib/db'
import { factory } from '../../../factory'
import { resetdb } from '../../../support'

test.beforeEach(async () => {
  resetdb()
})

test('sign-out', async ({ request }) => {
  await factory.user.createSignedInUser(request)
  const tokenT1 = await db.prisma.token.findFirst({
    where: { type: TokenType.Session },
  })
  expect(tokenT1).toBeTruthy()
  const res = await request.delete('/api/auth/sign-out')
  expect(res).toBeOK()
  const tokenT2 = await db.prisma.token.findFirst({
    where: { type: TokenType.Session },
  })
  expect(tokenT2).toBeNull()
})
