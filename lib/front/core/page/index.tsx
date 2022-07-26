import { Header } from '..'

export const Page = {
  Main,
}

function Main({ children }) {
  return (
    <>
      <Header.Main />
      <Wrap>{children}</Wrap>
    </>
  )
}

function Wrap({ children }) {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-16 max-w-4xl">{children}</div>
    </div>
  )
}
