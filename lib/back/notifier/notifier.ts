import { sendEmail } from './email'

export async function sendUserSignUpEmail() {
  sendEmail({
    from: 'me@this.com',
    to: 'you@example.com',
    subject: 'do it',
    html: 'you wont',
  })
}
