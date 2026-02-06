import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  innerRef?: React.Ref<HTMLButtonElement>
}

const YesButton = ({ innerRef, children, ...rest }: Props) => {
  return (
    <button
      ref={innerRef as any}
      {...rest}
      className="
        px-12 py-4
        rounded-full
        bg-gradient-to-r from-pink-500 to-rose-600
        text-white font-bold text-base md:text-lg
        shadow-lg hover:shadow-xl
        hover:scale-105
        active:scale-95
        transition-all duration-200
        flex items-center justify-center
      "
    >
      Yes 💖
    </button>
  )
}

export default YesButton
