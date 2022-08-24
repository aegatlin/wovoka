import test, { expect } from '@playwright/test'
import { factory } from '../factory'
import { resetdb } from '../support'

test.beforeEach(async () => {
  await resetdb()
})

test('user can manipulate their first list', async ({ page }) => {
  const user = await factory.user.createSignedInUser(page)
  const group = await factory.group.create(user)
  const list = await factory.list.create(group)
  const item = await factory.item.create(list)

  await page.goto('/')

  await expect(page.locator('main')).toContainText(group.name)
  await expect(page.locator('main')).toContainText(list.name)
  await expect(page.locator('main')).toContainText(item.title)

  let title = factory.item.title()
  page.locator('text="New Item"').fill(title)
  await page.locator('"Add"').click()
  await expect(page.locator('text="New Item"')).not.toHaveText(title)
  await expect(page.locator('main')).toContainText(title)

  await page
    .locator(`span:has-text("${title}") ~ button:has-text("Delete")`)
    .click()
  await expect(page.locator('main')).not.toContainText(title)
})
