import { useRouter } from 'next/router'
import { Page } from '../../lib/front/core'
import { EmailForm } from '../../lib/front/EmailForm'

export default function SignIn() {
  const router = useRouter()
  const onSubmit = (email: string) => {
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
