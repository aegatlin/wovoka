import { expect, test } from '@playwright/test'
import { factory } from '../../factory'
import { resetdb } from '../../support'

test.beforeEach(async () => {
  await resetdb()
})

test('/api/auth/session when signed in', async ({ page }) => {
  const user = await factory.user.createSignedInUser(page)
  const res = await page.request.get('/api/auth/session')
  expect(res).toBeOK()
  const json = await res.json()
  expect(json.data.user.email).toBe(user.email)
  expect(json.data.user.id).toBe(user.id)
})

test('/api/auth/session when not signed in', async ({ request }) => {
  const res = await request.get('/api/auth/session')
  expect(res).toBeOK()
  const json = await res.json()
  expect(json.data).toBeNull()
})
