import { expect, test } from '@playwright/test'
import { TokenType } from '@prisma/client'
import { db } from '../../../lib/db'
import { factory } from '../../factory'
import { computeHash, resetdb } from '../../support'

test.beforeEach(async () => {
  await resetdb()
})

test('confirm sign-up', async ({ request }) => {
  const userT1 = await factory.user.create()
  const [signUpToken, hex] = await factory.token.create(
    userT1,
    TokenType.SignUp
  )

  const confirmRes = await request.post(`/api/auth/confirm?token=${hex}`)
  expect(confirmRes).toBeOK()

  const userT2 = await db.prisma.user.findUnique({ where: { id: userT1.id } })
  expect(userT1.confirmedAt).toBeNull()
  expect(userT2?.confirmedAt).toBeTruthy()

  const sessionToken = await db.prisma.token.findFirst({
    where: { type: TokenType.Session },
  })
  expect(sessionToken).toBeTruthy()
})

test('confirm sign-in', async ({ page, context }) => {
  await page.goto('/')
  expect((await context.cookies()).length).toBe(0)

  const userT1 = await factory.user.create({ confirmed: true })
  const [token, hex] = await factory.token.create(userT1, TokenType.SignIn)

  await page.goto(`/api/auth/confirm?token=${hex}`)
  await expect(page).toHaveURL('/')

  const sessionToken = await db.prisma.token.findFirst({
    where: { type: TokenType.Session },
  })
  expect(sessionToken).toBeTruthy()

  const [cookie] = await context.cookies()
  expect(cookie.path).toBe('/')
  expect(cookie.name).toBe('session')
  expect(computeHash(cookie.value)).toBe(sessionToken?.hash)
  expect(cookie.httpOnly).toBe(true)
  expect(cookie.secure).toBe(true)
  expect(cookie.sameSite).toBe('Strict')
})

test('confirm sign-in with remember-me token', async ({ page, context }) => {
  await page.goto('/')
  expect((await context.cookies()).length).toBe(0)

  const userT1 = await factory.user.create({ confirmed: true })
  const [token, hex] = await factory.token.create(userT1, TokenType.SignIn)

  await page.goto(`/api/auth/confirm?token=${hex}&rememberMe=true`)
  await expect(page).toHaveURL('/')

  const sessionToken = await db.prisma.token.findFirst({
    where: { type: TokenType.Session },
  })
  expect(sessionToken).toBeTruthy()

  const rememberMeToken = await db.prisma.token.findFirst({
    where: { type: TokenType.RememberMe },
  })
  expect(rememberMeToken).toBeTruthy()

  const cookies = await context.cookies()
  expect(cookies.length).toBe(2)
  const [sessionCookie, rememberMeCookie] = await context.cookies()

  expect(sessionCookie.path).toBe('/')
  expect(sessionCookie.name).toBe('session')
  expect(computeHash(sessionCookie.value)).toBe(sessionToken?.hash)
  expect(sessionCookie.httpOnly).toBe(true)
  expect(sessionCookie.secure).toBe(true)
  expect(sessionCookie.sameSite).toBe('Strict')

  expect(rememberMeCookie.path).toBe('/')
  expect(rememberMeCookie.name).toBe('rememberMe')
  expect(computeHash(rememberMeCookie.value)).toBe(rememberMeToken?.hash)
  expect(rememberMeCookie.httpOnly).toBe(true)
  expect(rememberMeCookie.secure).toBe(true)
  expect(rememberMeCookie.sameSite).toBe('Strict')
})
