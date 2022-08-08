import { SWRConfig } from 'swr'
import '../lib/front/styles.css'

function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url, ...args) =>
          fetch(url, ...args).then((res) => res.json()),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default App
