import { randBird, randCity, randEmail, randFood } from '@ngneat/falso'
import { Page } from '@playwright/test'
import { Group, Item, List, Token, TokenType, User } from '@prisma/client'
import { Tokens } from '../lib/back/accounts/tokens'
import { db } from '../lib/db'

export const factory = {
  email: () => randEmail(),
  group: {
    name(): string {
      return randBird()
    },
    async create(user: User) {
      return await db.prisma.group.create({
        data: {
          name: factory.group.name(),
          members: { connect: [{ id: user.id }] },
        },
      })
    },
  },
  list: {
    name(): string {
      return randCity()
    },
    async create(group: Group): Promise<List> {
      return await db.prisma.list.create({
        data: { name: factory.list.name(), groupId: group.id },
      })
    },
  },
  item: {
    title(): string {
      return randFood()
    },
    async create(list: List): Promise<Item> {
      return await db.prisma.item.create({
        data: { title: factory.item.title(), listId: list.id },
      })
    },
  },
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
    async signIn(user: User, page: Page): Promise<void> {
      const [token, hex] = await factory.token.create(user, TokenType.SignIn)
      await page.goto(`/api/auth/confirm?token=${hex}`)
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
