import { Button, Loader } from '../lib/core'

export default function Styles() {
  return (
    <main>
      <div className="mt-16 flex flex-col items-center justify-center space-y-8">
        <Button.Main onClick={() => undefined}>Button</Button.Main>
        <Loader.Main />
      </div>
    </main>
  )
}
