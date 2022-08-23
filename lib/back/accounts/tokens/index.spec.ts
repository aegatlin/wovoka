import test, { expect } from '@playwright/test'
import { Tokens } from '.'
import { factory } from '../../../../tests/factory'
import { resetdb } from '../../../../tests/support'

test.beforeEach(async () => {
  await resetdb()
})

test('Tokens.getTokenByHex', async () => {
  const user = await factory.user.create()
  const [token1, tokenHex] = await factory.token.create(user)
  const token2 = await Tokens.getTokenByHex(tokenHex)
  expect(token1.id).toBe(token2?.id)
})

test('Tokens.getUser', async () => {
  const user = await factory.user.create()
  const [token, hex] = await factory.token.create(user)
  const user2 = await Tokens.getUser(token)
  expect(user.id).toBe(user2?.id)
})
