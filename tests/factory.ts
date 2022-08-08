import { randBird, randEmail } from '@ngneat/falso'
import { APIRequestContext, Page } from '@playwright/test'
import { Token, TokenType, User, Group } from '@prisma/client'
import { Tokens } from '../lib/back/accounts/tokens'
import { db } from '../lib/db'

export const factory = {
  group: {
    async create(user: User) {
      return await db.prisma.group.create({
        data: { name: randBird(), members: { connect: [{ id: user.id }] } },
      })
    },
  },
  email: () => randEmail(),
  user: {
    async create(
      { confirmed }: { confirmed: boolean } = { confirmed: false }
    ): Promise<User> {
      const data = { email: factory.email() }
      if (confirmed) data['confirmedAt'] = new Date()

      return await db.prisma.user.create({ data })
    },
    async createSignedInUser(page: Page): Promise<User> {
      const user = await factory.user.create({ confirmed: true })
      const [token, hex] = await factory.token.create(user, TokenType.SignIn)
      await page.goto(`/api/auth/confirm?token=${hex}`)
      return user
    },
  },
  token: {
    async create(
      user?: User,
      type: TokenType = TokenType.Session
    ): Promise<[Token, string]> {
      const u = user ? user : await factory.user.create()
      const [tokenHex, hash] = Tokens.build()
      const token = await db.prisma.token.create({
        data: { userId: u.id, hash, type },
      })
      return [token, tokenHex]
    },
  },
}
