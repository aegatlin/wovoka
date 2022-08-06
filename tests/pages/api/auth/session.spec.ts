import { expect, test } from '@playwright/test'
import { TokenType } from '@prisma/client'
import { factory } from '../../../factory'
import { resetdb } from '../../../support'

test.beforeEach(async () => {
  await resetdb()
})

test('/api/auth/session returns active session info', async ({ request }) => {
  // sign-in
  const user = await factory.user.create({ confirmed: true })
  const [sessionToken, hex] = await factory.token.create(
    user,
    TokenType.Session
  )
  await request.post(`/api/auth/confirm?token=${hex}`)
  const res = await request.get('/api/auth/session')
  expect(res).toBeOK()
  const json = await res.json()
  expect(json.data.user.email).toBe(user.email)
  expect(json.data.user.id).toBe(user.id)
})

test('/api/auth/session returns null when no session is present', async ({request}) => {
  const res = await request.get('/api/auth/session')
  expect(res).toBeOK()
  const json = await res.json()
  expect(json.data).toBeNull()
})
