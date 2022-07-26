import { Loader as LucideLoader } from 'lucide-react'

export const Loader = {
  Main,
}

function Main() {
  return (
    <div className="flex items-center justify-center">
      <div className="m-4 h-10 w-10 animate-spin">
        <LucideLoader size={40} />
      </div>
    </div>
  )
}
