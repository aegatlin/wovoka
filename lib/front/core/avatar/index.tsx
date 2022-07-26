import Image from 'next/image'

export const Avatar = {
  Main,
}

interface AvatarProps {
  imgSrc: string
}

function Main({ imgSrc }: AvatarProps) {
  return (
    <div className="rounded-full">
      <Image src={imgSrc} width={24} height={24} alt="Avatar Image" />
    </div>
  )
}
