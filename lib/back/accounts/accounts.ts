import { Token, User } from '@prisma/client'
import { db } from '../../db'
import { E } from '../errors'
import { Notifier, SentEmail } from '../notifier'

export async function confirm(urlToken: string): Promise<Token> {
  const token = await getTokenByUrlToken(urlToken)
  if (!token) throw E.NoToken()

  const user = await getUserByToken(token)
  if (!user) throw E.NoUser()

  if (token.reason == 'sign-up') {
    await db.prisma.user.update({
      where: { id: user.id },
      data: { confirmedAt: new Date() },
    })
  }

  return await createToken(user, 'session')
}

export async function signIn(email: string): Promise<SentEmail> {
  const user = await getUserByEmail(email)
  if (!user) throw E.NoUser(email)

  const token = await createToken(user, 'sign-in')
  return await Notifier.sendSignInEmail(user, token)
}

export async function signUp(email: string): Promise<SentEmail> {
  const user = await db.prisma.user.create({ data: { email } })
  const token = await createToken(user, 'sign-up')
  return await Notifier.sendSignUpEmail(user, token)
}

export async function getUserBySessionToken(
  sessionToken: string
): Promise<User | null> {
  const token = await db.prisma.token.findUnique({
    where: { id: sessionToken },
    include: { user: true },
  })
  if (token) return token.user
  return null
}

export async function signOut(user: User) {
  await expireAllSessionTokens(user)
}

async function expireAllSessionTokens(user: User) {
  await db.prisma.token.deleteMany({
    where: { userId: user.id, reason: 'session' },
  })
}

async function getTokenByUrlToken(urlToken: string): Promise<Token | null> {
  return await db.prisma.token.findUnique({ where: { id: urlToken } })
}

async function getUserByToken(token: Token): Promise<User | null> {
  return db.prisma.user.findUnique({
    where: { id: token.userId },
    include: { tokens: { where: { reason: 'session' } } },
  })
}

async function getUserByEmail(email: string): Promise<User | null> {
  return await db.prisma.user.findUnique({ where: { email } })
}

async function createToken(user: User, reason: string): Promise<Token> {
  if (reason == 'session') await expireAllSessionTokens(user)
  return await db.prisma.token.create({ data: { userId: user.id, reason } })
}
