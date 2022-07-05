import Header from './Header'
import { ProvideGroups } from './useGroups'
import { ProvideUser } from './useUser'

export function Layout({ children }) {
  return (
    <ProvideUser>
      <ProvideGroups>
        <Header />
        {children}
      </ProvideGroups>
    </ProvideUser>
  )
}
