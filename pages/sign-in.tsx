import { useRouter } from 'next/router'
import { Page } from '../lib/front/core'
import { EmailForm } from '../lib/front/EmailForm'
import { useAuth } from '../lib/front/useAuth'
import { AuthData } from '../lib/types'

export default function SignIn() {
  const router = useRouter()
  const { signIn } = useAuth()
  const onSubmit = (authData: AuthData) => {
    signIn(authData)
    router.push('/check-email')
  }

  return (
    <Page.Main>
      <main>
        <EmailForm onSubmit={onSubmit} name="Sign In" />
      </main>
    </Page.Main>
  )
}
