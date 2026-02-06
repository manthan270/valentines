import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { fadeIn } from '../lib/animations'
import confetti from 'canvas-confetti'

export default function Celebration() {
    const prefersReduced = useReducedMotion()
    const navigate = useNavigate()

    useEffect(() => {
        // Redirect after 3.5 seconds
        const timer = setTimeout(() => {
            navigate('/love')
        }, 3500)

        if (prefersReduced) return () => clearTimeout(timer)

        // Confetti logic
        const duration = 3000
        const end = Date.now() + duration

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.6 },
                colors: ['#ec4899', '#f472b6', '#fbcfe8', '#be185d'],
                shapes: ['heart' as any]
            })
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.6 },
                colors: ['#ec4899', '#f472b6', '#fbcfe8', '#be185d'],
                shapes: ['heart' as any]
            })

            if (Date.now() < end) {
                requestAnimationFrame(frame)
            }
        }

        frame()

        return () => clearTimeout(timer)
    }, [navigate, prefersReduced])

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen px-4 bg-pink-50"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
        >
            {/* Intentionally empty for visual celebration only - NO TEXT */}
        </motion.div>
    )
}
