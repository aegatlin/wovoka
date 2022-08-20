import test, { expect } from '@playwright/test'
import { factory } from '../factory'
import { resetdb } from '../support'

test.beforeEach(async () => {
  resetdb()
})

test('user can view their groups', async ({ page }) => {
  const user = await factory.user.createSignedInUser(page)
  const group = await factory.group.create(user)
  await page.goto('/')
  await page.locator(`"${group.name}"`).click()
  expect(page.url()).toMatch(`/groups/${group.id}`)
})
