import { expect, test } from '@playwright/test'
import { TokenType } from '@prisma/client'
import { db } from '../../../lib/db'
import { AuthData, JsonApi } from '../../../lib/types'
import { factory } from '../../factory'
import { resetdb } from '../../support'

test.beforeEach(async () => {
  await resetdb()
})

test('/api/auth/sign-in', async ({ request }) => {
  const user = await factory.user.create({ confirmed: true })
  const data: JsonApi<AuthData> = {
    data: { email: user.email, rememberMe: false },
  }
  const signInRes = await request.post('/api/auth/sign-in', { data })
  expect(signInRes).toBeOK()

  const signInToken = await db.prisma.token.findFirst({
    where: { userId: user?.id, type: TokenType.SignIn },
  })
  expect(signInToken).toBeTruthy()
})

test('/api/auth/sign-in when email is not registered', async ({ request }) => {
  const data: JsonApi<AuthData> = {
    data: { email: factory.email(), rememberMe: false },
  }
  const signInRes = await request.post('/api/auth/sign-in', { data })
  expect(signInRes).toBeOK()
})
