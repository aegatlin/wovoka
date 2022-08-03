import { expect, test } from '@playwright/test'
import { TokenType } from '@prisma/client'
import { db } from '../../../../lib/db'
import { factory } from '../../../factory'
import { resetdb } from '../../../support'

test.beforeEach(async () => {
  await resetdb()
})

test('/api/auth/sign-in', async ({ request }) => {
  const user = await factory.user.create({ confirmed: true })
  const signIn = await request.post('/api/auth/sign-in', {
    data: { email: user.email, rememberMe: false },
  })

  expect(signIn).toBeOK()
  const signInToken = await db.prisma.token.findFirst({
    where: { userId: user?.id, type: TokenType.SignIn },
  })
  expect(signInToken).toBeTruthy()

  const sessionToken = await db.prisma.token.findFirst({
    where: { userId: user?.id, type: TokenType.Session },
  })
  expect(sessionToken).toBeTruthy()
})
