import { expect, test } from '@playwright/test'
import { db } from '../../../../lib/db'
import { resetdb } from '../../../support'

test.beforeEach(async () => {
  await resetdb()
})

test('/api/auth/sign-up', async ({ request }) => {
  const email = 'test@example.com'
  const signUp = await request.post('/api/auth/sign-up', {
    data: { email },
  })

  expect(signUp).toBeOK()
  const user = await db.prisma.user.findUnique({ where: { email } })
  expect(user).toBeTruthy()
  const token = await db.prisma.token.findFirst({
    where: { userId: user?.id, reason: 'sign-up' },
  })
  expect(token).toBeTruthy()
})
