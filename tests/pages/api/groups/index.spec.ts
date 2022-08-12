import { expect, test } from '@playwright/test'
import { factory } from '../../../factory'
import { resetdb } from '../../../support'

test.beforeEach(async () => {
  await resetdb()
})

test('/api/groups', async ({ page }) => {
  const user = await factory.user.createSignedInUser(page)
  const group = await factory.group.create(user)
  const res = await page.request.get('/api/groups')
  expect(res).toBeOK()
  const json = await res.json()
  expect(json.data.groups.length).toBe(1)
  expect(json.data.groups[0].name).toBe(group.name)
})
