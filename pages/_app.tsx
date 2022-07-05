import { Layout } from '../lib/Layout'
import '../lib/styles.css'

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
