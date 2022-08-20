import test, { expect } from '@playwright/test'
import { factory } from '../../factory'
import { resetdb } from '../../support'

test.beforeEach(async () => {
  resetdb()
})

test('/groups/:id', async ({ page }) => {
  const user = await factory.user.createSignedInUser(page)
  const group = await factory.group.create(user)
  await page.goto(`/groups/${group.id}`)
  expect(await page.locator('body').textContent()).toMatch(group.name)
})
