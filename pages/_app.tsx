import { SWRConfig } from 'swr'
import '../lib/front/styles.css'
import { ProvideGroups } from '../lib/front/useGroupsContext'
import { ProvideUser } from '../lib/front/useUserContext'

function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url, ...args) =>
          fetch(url, ...args).then((res) => res.json()),
      }}
    >
      <ProvideUser>
        <ProvideGroups>
          <Component {...pageProps} />
        </ProvideGroups>
      </ProvideUser>
    </SWRConfig>
  )
}

export default App
