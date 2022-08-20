import { expect, test } from '@playwright/test'
import { TokenType } from '@prisma/client'
import { db } from '../../../lib/db'
import { AuthData, JsonApi } from '../../../lib/types'
import { factory } from '../../factory'
import { resetdb } from '../../support'

test.beforeEach(async () => {
  await resetdb()
})

test('/api/auth/sign-up', async ({ request }) => {
  const email = factory.email()
  const data: JsonApi<AuthData> = { data: { email: email, rememberMe: false } }
  const signUp = await request.post('/api/auth/sign-up', { data })

  expect(signUp).toBeOK()
  const user = await db.prisma.user.findUnique({ where: { email } })
  expect(user).toBeTruthy()

  const signUpToken = await db.prisma.token.findFirst({
    where: { userId: user?.id, type: TokenType.SignUp },
  })
  expect(signUpToken).toBeTruthy()
})
