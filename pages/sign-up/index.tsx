import { useRouter } from 'next/router'
import { Page } from '../../lib/front/core'
import { EmailForm } from '../../lib/front/EmailForm'
import { useAuth } from '../../lib/front/useAuth'

export default function SignUp() {
  return (
    <Page.Main>
      <main>
        <SignUpForm />
      </main>
    </Page.Main>
  )
}

function SignUpForm() {
  const router = useRouter()
  const { signUp } = useAuth()
  const onSubmit = (email: string) => {
    signUp(email)
    router.push('/check-email')
  }

  return <EmailForm onSubmit={onSubmit} name="Sign Up" />
}
