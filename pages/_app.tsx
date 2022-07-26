import { SWRConfig } from 'swr'
import '../lib/front/styles.css'
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
        <Component {...pageProps} />
      </ProvideUser>
    </SWRConfig>
  )
}

export default App
