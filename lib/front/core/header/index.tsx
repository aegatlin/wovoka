import { useRouter } from 'next/router'
import { Button, Link } from '..'
import { api } from '../../api'
import { useUser } from '../../useUser'

export const Header = {
  Main,
}

function Main() {
  const router = useRouter()
  const { user, mutate } = useUser()

  const signOut = async () => {
    await api.auth.signOut()
    await mutate()
    router.push('/sign-out')
  }

  return (
    <header className="flex items-center justify-between border-b py-8 px-16">
      <div className="text-4xl">
        <Link.Inherit to="/" text="App" />
      </div>
      {!user && (
        <div className="space-x-1">
          <Link.Main to="/sign-in" text="Sign In" />
          <span>/</span>
          <Link.Main to="/sign-up" text="Sign Up" />
        </div>
      )}
      {user && (
        <div className="flex items-center space-x-2">
          <Link.Main to="/groups" text="Groups" />

          <span>{user.email}</span>
          <Button.Main onClick={signOut}>Sign Out</Button.Main>
        </div>
      )}
    </header>
  )
}
