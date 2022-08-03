import { User } from '@prisma/client'
import { sendEmail, SentEmail } from './email'

export type { SentEmail }

export const Notifier = {
  async sendSignUpEmail(user: User, token: string): Promise<SentEmail> {
    const url = `http://localhost:3000/api/auth/confirm?token=${token}`

    return await sendEmail({
      from: 'app@example.com',
      to: user.email,
      subject: 'App - Sign Up',
      html: `<h1>Hello ${user.email}!</h1>

      Sign up at: ${url}
      `,
    })
  },
  async sendSignInEmail(user: User, token: string): Promise<SentEmail> {
    const url = `http://localhost:3000/api/auth/confirm?token=${token}`

    return await sendEmail({
      from: 'app@example.com',
      to: user.email,
      subject: 'App - Sign In',
      html: `<h1>Hello ${user.email}!</h1>

      Sign in at: ${url}
      `,
    })
  },
}
