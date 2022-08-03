import { randEmail } from '@ngneat/falso'
import { Token, TokenType, User } from '@prisma/client'
import { Tokens } from '../lib/back/accounts/tokens'
import { db } from '../lib/db'

export const factory = {
  email: () => randEmail(),
  user: {
    async create(
      { confirmed }: { confirmed: boolean } = { confirmed: false }
    ): Promise<User> {
      const data = { email: factory.email() }
      if (confirmed) data['confirmedAt'] = new Date()

      return await db.prisma.user.create({ data })
    },
    async createSignedInUser(): Promise<User> {
      const data = { email: factory.email(), confirmedAt: new Date() }
      const user = await db.prisma.user.create({ data })
      await factory.token.create(user, TokenType.Session)
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
