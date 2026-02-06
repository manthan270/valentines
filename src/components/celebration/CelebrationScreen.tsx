import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, fadeIn, scaleIn } from '../../lib/animations'
import { Heart, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

const CelebrationScreen = ({ onReset }: { onReset: () => void }) => {
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return

    // Replace continuous RAF loop with a few short bursts for performance
    const bursts = [0, 300, 600]
    const timeouts: number[] = []

    bursts.forEach((delay) => {
      const id = window.setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0.1, y: 0.4 },
          colors: ['#ec4899', '#f472b6', '#fbcfe8', '#be185d'],
          shapes: ['heart'] as any
        })
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 0.9, y: 0.4 },
          colors: ['#ec4899', '#f472b6', '#fbcfe8', '#be185d'],
          shapes: ['heart'] as any
        })
      }, delay)
      timeouts.push(id)
    })

    return () => {
      timeouts.forEach((id) => clearTimeout(id))
    }
  }, [])

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-4"
      variants={fadeIn}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 100 }}
      >
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-pink-200">
          <img
            src="/couple-celebration.png"
            alt="Celebration"
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          className="absolute -top-4 -right-4 text-4xl"
          animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute -bottom-2 -left-4 text-3xl"
          animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
        >
          🌹
        </motion.div>
      </motion.div>

      <motion.h1
        className="text-5xl md:text-7xl font-bold mt-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600"
        variants={scaleIn}
        transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
      >
        You said yes! 💕
      </motion.h1>

      <motion.div
        className="flex items-center gap-3 mt-4"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.5 }}
      >
        <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse-heart" />
        <Heart className="w-10 h-10 text-rose-500 fill-rose-500 animate-pulse-heart" style={{ animationDelay: '0.2s' }} />
        <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse-heart" style={{ animationDelay: '0.4s' }} />
      </motion.div>

      <motion.p
        className="text-lg md:text-xl text-gray-700 mt-8 text-center max-w-md leading-relaxed"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.7 }}
      >
        I knew you'd say yes! I love you!
      </motion.p>

      <motion.button
        onClick={onReset}
        className="mt-10 px-6 py-3 bg-pink-100 text-pink-600 rounded-full font-medium hover:bg-pink-200 transition-colors flex items-center gap-2"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className="w-4 h-4" />
        Make it special again
      </motion.button>
    </motion.div>
  )
}

export default CelebrationScreen
