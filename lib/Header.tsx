import { Button } from './core'
import { useUser } from './useUser'

export default function HeaderComponent() {
  const { user, signIn, signOut } = useUser()

  return (
    <div className="flex items-center justify-between border-b py-8 px-16">
      <div className="text-4xl">App</div>
      <div>
        {!user && (
          <Button.Main onClick={() => signIn()} disabled={false}>
            Sign In
          </Button.Main>
        )}
        {user && (
          <>
            <span>{user.email}</span>
            <Button.Main onClick={() => signOut()} disabled={false}>
              Sign Out
            </Button.Main>
          </>
        )}
      </div>
    </div>
  )
}
