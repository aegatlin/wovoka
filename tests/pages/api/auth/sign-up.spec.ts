import { expect, test } from '@playwright/test'
import { TokenType } from '@prisma/client'
import { db } from '../../../../lib/db'
import { factory } from '../../../factory'
import { resetdb } from '../../../support'

test.beforeEach(async () => {
  await resetdb()
})

test('/api/auth/sign-up', async ({ request }) => {
  const email = factory.email()
  const signUp = await request.post('/api/auth/sign-up', {
    data: { email },
  })

  expect(signUp).toBeOK()
  const user = await db.prisma.user.findUnique({ where: { email } })
  expect(user).toBeTruthy()

  const signUpToken = await db.prisma.token.findFirst({
    where: { userId: user?.id, type: TokenType.SignUp },
  })
  expect(signUpToken).toBeTruthy()

  const sessionToken = await db.prisma.token.findFirst({
    where: { userId: user?.id, type: TokenType.Session },
  })
  expect(sessionToken).toBeTruthy()
})
