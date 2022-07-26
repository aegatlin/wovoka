import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
  Transporter,
} from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import process from 'process'

interface Email {
  from: string
  to: string
  subject: string
  html: string
}

export interface SentEmail extends SMTPTransport.SentMessageInfo {
  email: Email
  testUrl: string | boolean
}

export async function sendEmail(email: Email): Promise<SentEmail> {
  const transporter = await getTransporter()
  const info = await transporter.sendMail(email)
  return { ...info, testUrl: getTestMessageUrl(info), email }
}

async function getTransporter(): Promise<
  Transporter<SMTPTransport.SentMessageInfo>
> {
  let transporter: Transporter<SMTPTransport.SentMessageInfo>

  const smtpServerUrl = process.env.SMTP_SERVER_URL

  if (smtpServerUrl) {
    transporter = createTransport(smtpServerUrl)
  } else {
    const account = await createTestAccount()

    transporter = createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    })
  }

  return transporter
}

// export default async function email(req, res) {
//   const testEmail: Email = {
//     from: 'bob@example.com',
//     to: 'alice@example.com',
//     subject: 'a test',
//     text: 'wow',
//     html: 'neat',
//   }

//   const x = await sendEmail(testEmail)
//   console.log(x)
// }
