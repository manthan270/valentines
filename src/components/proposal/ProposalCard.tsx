import { useState } from 'react'

const messages = [
  'NO',
  'Really?',
  'Think again!',
  'Are you sure?',
  'Last chance 😳',
]

export default function ProposalCard({ onYes }: { onYes: () => void }) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [yesScale, setYesScale] = useState(1)

  const handleNoClick = () => {
    if (messageIndex < messages.length - 1) {
      setMessageIndex(prev => prev + 1)
      setYesScale(prev => Math.min(prev + 0.12, 1.5))
    }
  }

  const noDisabled = messageIndex === messages.length - 1

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10 w-[420px] text-center mx-auto relative z-10">
      
      {/* Image */}
      <img
        src="/valentine-character.png"
        alt="Valentine"
        className="mx-auto mb-6 w-40"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">
        Will you be my{' '}
        <span className="text-pink-500">Valentine?</span>
      </h1>

      {/* Subtitle */}
      <p className="text-gray-500 mt-4">
        You make every moment special. I want to share forever with you.
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-6 w-[320px] mx-auto mt-10">
        
        {/* YES Button */}
        <button
          onClick={onYes}
          style={{
            transform: `scale(${yesScale})`,
            transformOrigin: 'center',
            willChange: 'transform',
          }}
          className="
            origin-center
            transition-transform duration-200 ease-out
            px-8 py-3 rounded-full
            bg-gradient-to-r from-pink-500 to-rose-600
            text-white font-semibold
            shadow-lg
          "
        >
          Yes 💖
        </button>

        {/* NO Button */}
        <button
          onClick={handleNoClick}
          disabled={noDisabled}
          className={`
            px-6 py-3 rounded-full text-sm transition
            ${
              noDisabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          {messages[messageIndex]}
        </button>
      </div>

      {/* Micro-copy */}
      <p className="mt-4 text-xs text-gray-400">
        You can say no… but I hope you don&apos;t 💕
      </p>
    </div>
  )
}
