import { test, expect } from '@playwright/test'

test('greets user', async ({ page }) => {
  await page.goto('http://localhost:3000')
  const main = page.locator('body')
  await expect(main).toHaveText(/App/)
})
