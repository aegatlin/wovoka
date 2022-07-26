import { Link } from '..'
import { useUserContext } from '../../useUserContext'

export const Header = {
  Main,
}

function Main() {
  const { user } = useUserContext()

  return (
    <header className="flex items-center justify-between border-b py-8 px-16">
      <div className="text-4xl">
        <Link.Inherit to="/">App</Link.Inherit>
      </div>
      {!user && (
        <div className="space-x-1">
          <Link.Main to="/sign-in">Sign In</Link.Main>
          <span>/</span>
          <Link.Main to="/sign-up">Sign Up</Link.Main>
        </div>
      )}
      {user && (
        <div className="flex space-x-2">
          <span>{user.email}</span>
          <Link.Main to="/sign-out">Sign Out</Link.Main>
        </div>
      )}
    </header>
  )
}
