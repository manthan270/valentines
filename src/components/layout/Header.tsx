
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const Header = () => (
  <motion.header
    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-2">
      <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
      <span className="font-semibold text-gray-700">Special Moments</span>
    </div>
    <div>
      <Heart className="w-6 h-6 text-pink-400" />
    </div>
  </motion.header>
)

export default Header
