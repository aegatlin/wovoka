import { useRouter } from 'next/router'
import { Page } from '../lib/front/core'
import { EmailForm } from '../lib/front/EmailForm'
import { useAuth } from '../lib/front/useAuth'
import { AuthData } from '../lib/types'

export default function SignUp() {
  const router = useRouter()
  const { signUp } = useAuth()
  const onSubmit = (authData: AuthData) => {
    signUp(authData)
    router.push('/check-email')
  }

  return (
    <Page.Main>
      <main>
        <EmailForm onSubmit={onSubmit} name="Sign Up" />
      </main>
    </Page.Main>
  )
}
