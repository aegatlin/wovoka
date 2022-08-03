import { Token, TokenType, User } from '@prisma/client'
import crypto from 'node:crypto'
import { db } from '../../../db'

export const Tokens = {
  build(): [string, string] {
    const tokenBytes = crypto.randomBytes(32)
    const hash = crypto.createHash('sha256').update(tokenBytes).digest('hex')
    const token = tokenBytes.toString('hex')
    return [token, hash]
  },
  async create(user: User, type: TokenType, hash: string): Promise<Token> {
    return await db.prisma.token.create({
      data: { hash, userId: user.id, type },
    })
  },
  async getTokenByHex(hex: string): Promise<(Token & { user: User }) | null> {
    const hash = computeHash(hex)
    return await db.prisma.token.findFirst({
      where: { hash },
      include: { user: true },
    })
  },
  async getUser(token: Token): Promise<User | null> {
    return await db.prisma.user.findUnique({ where: { id: token.userId } })
  },
}

function computeHash(hex: string): string {
  return crypto.createHash('sha256').update(hex, 'hex').digest('hex')
}
