import React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type Props = {
  animate: any
  transition: any
  onInteraction: (clientX: number, clientY: number) => void
  interactionCount: number
  maxInteractions: number
  messageIndex: number
  messages: string[]
  forwardRef?: React.Ref<HTMLButtonElement>
}

const NoButton = React.forwardRef<HTMLButtonElement, Omit<Props, 'forwardRef'>>((props, ref) => {
  const { animate, transition, onInteraction, interactionCount, maxInteractions, messageIndex, messages, ...rest } = props as any
  const prefersReduced = useReducedMotion()
  const effectiveTransition = prefersReduced ? { duration: 0 } : transition

  return (
    <motion.button
      ref={ref}
      className="
        px-7 py-3
        rounded-full
        bg-gray-100 hover:bg-gray-150
        text-gray-600 hover:text-gray-700
        text-sm font-medium
        shadow-sm hover:shadow
        transition-all duration-200
        flex items-center justify-center
      "
      animate={animate}
      transition={effectiveTransition}
      onClick={(e: any) => {
        // React click events from keyboard have `detail === 0`.
        // Disable dodge when activated by keyboard so keyboard users aren't blocked.
        const isKeyboardActivation = (e && typeof e.detail === 'number' && e.detail === 0)
        if (isKeyboardActivation) {
          // allow the click but do not trigger evasive movement
          return
        }
        e.preventDefault()
        onInteraction(e.clientX, e.clientY)
      }}
      onMouseEnter={(e: any) => onInteraction(e.clientX, e.clientY)}
      onTouchStart={(e: any) => {
        const touch = e.touches ? e.touches[0] : null
        if (touch) onInteraction(touch.clientX, touch.clientY)
      }}
      style={{ pointerEvents: interactionCount >= maxInteractions ? 'none' : 'auto' }}
      {...rest}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={messageIndex}
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
          animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
          transition={{ duration: prefersReduced ? 0 : 0.1 }}
          aria-live="polite"
        >
          NO
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
})

export default NoButton
