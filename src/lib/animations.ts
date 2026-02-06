// Reusable animation variants for framer-motion
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

export const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1 }
}

export const screenFade = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } }
}

export type ScreenVariant = typeof screenFade

// Shared transition presets to avoid recreating objects
export const springTransition = { type: 'spring', damping: 15, stiffness: 200 }
export const gentleSpring = { type: 'spring', damping: 10, stiffness: 100 }

export default {
  fadeUp,
  fadeIn,
  containerStagger,
  scaleIn,
  screenFade,
  springTransition,
  gentleSpring
}
