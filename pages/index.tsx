import Head from 'next/head'
import HelloWorldComponent from '../lib/HelloWorldComponent'

export default function Index() {
  return (
    <div>
      <Head>
        <title>App</title>
        <meta name="description" content="An app" />
      </Head>
      <main className="flex flex-col items-center">
        <h1 className="text-6xl">App</h1>
        <HelloWorldComponent />
      </main>
    </div>
  )
}
