import { Token, TokenType, User } from '@prisma/client'
import { db } from '../../db'
import { AuthData } from '../../types'
import { E } from '../errors'
import { Notifier, SentEmail } from '../notifier'
import { Tokens } from './tokens'

export const Accounts = {
  async signIn({ email, rememberMe }: AuthData): Promise<SentEmail> {
    const user = await getUserByEmail(email)
    if (!user) throw E.NoUser(email)
    const [token, hash] = Tokens.build()
    await Tokens.create(user, TokenType.SignIn, hash)
    return await Notifier.sendSignInEmail(user, token)
  },
  async signUp({ email, rememberMe }: AuthData): Promise<SentEmail> {
    const user = await db.prisma.user.create({ data: { email } })
    const [token, hash] = Tokens.build()
    await Tokens.create(user, TokenType.SignUp, hash)
    return await Notifier.sendSignUpEmail(user, token)
  },
  async signOut(user: User) {
    await db.prisma.token.deleteMany({
      where: { userId: user.id, type: TokenType.Session },
    })
    await db.prisma.token.deleteMany({
      where: { userId: user.id, type: TokenType.RememberMe },
    })
  },
  async confirm(
    hexToken: string,
    rememberMe: boolean = false
  ): Promise<[string, string | null] | null> {
    const token = await Tokens.getTokenByHex(hexToken)
    if (!token) return null
    if (token.type == TokenType.SignUp) {
      await db.prisma.user.update({
        where: { id: token.userId },
        data: { confirmedAt: new Date() },
      })
    }
    const [sessionToken, sessionHex] = await createToken(
      token.user,
      TokenType.Session
    )
    if (rememberMe) {
      const [rememberMeToken, rememberMeHex] = await createToken(
        token.user,
        TokenType.RememberMe
      )
      return [sessionHex, rememberMeHex]
    } else {
      return [sessionHex, null]
    }
  },
}

async function getUserByEmail(email: string): Promise<User | null> {
  return await db.prisma.user.findUnique({ where: { email } })
}

async function createToken(
  user: User,
  type: TokenType
): Promise<[Token, string]> {
  const [hex, hash] = Tokens.build()
  const token = await Tokens.create(user, type, hash)
  return [token, hex]
}
