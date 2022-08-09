import test, { expect } from '@playwright/test'
import { factory } from '../factory'
import { resetdb } from '../support'

test.beforeEach(async () => {
  resetdb()
})

test.skip('can create group, list, item, and view them all', async ({ page }) => {
  const user = await factory.user.createSignedInUser(page)
  const group = await factory.group.create(user)
  await page.goto('/')
  page.locator('"Create New Group"').click()
  expect(page.locator('body')).toHaveText(group.name)
})
