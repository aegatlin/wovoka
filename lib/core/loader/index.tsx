import { Loader as L } from 'lucide-react'

export const Loader = {
  Main,
}

function Main() {
  return (
    <div className="animate-spin">
      <L size={48} />
    </div>
  )
}
