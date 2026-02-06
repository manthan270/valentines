import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Heart, Sparkles, X } from 'lucide-react';

interface PasswordProtectionProps {
  onUnlock: () => void;
}

export default function PasswordProtection({ onUnlock }: PasswordProtectionProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const CORRECT_PASSWORD = 'LOVE';

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (attempts >= 2) {
      setShowHint(true);
    }
  }, [attempts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.toUpperCase() === CORRECT_PASSWORD) {
      setError(false);
      // Gentle unlock transition
      setTimeout(() => {
        onUnlock();
      }, 1000);
    } else {
      setError(true);
      setIsShaking(true);
      setAttempts(prev => prev + 1);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      className="relative z-10 flex items-center justify-center min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <motion.div
        className="relative w-full max-w-md"
        animate={isShaking ? { x: [-8, 8, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Soft glow behind card */}
        <div className="absolute inset-0 gradient-rose-gold rounded-3xl blur-3xl opacity-40 animate-delicate-glow" />

        {/* Main card with elegant glass effect */}
        <motion.div
          className="relative glass-romantic rounded-3xl p-10 shadow-romantic-xl overflow-hidden"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 229, 236, 0.3) 100%)',
          }}
        >
          {/* Decorative corner elements - very subtle */}
          <div className="absolute top-6 left-6 opacity-15">
            <Heart className="w-10 h-10 text-rose-400 fill-rose-400" />
          </div>
          <div className="absolute top-10 right-10 opacity-10">
            <Heart className="w-7 h-7 text-rose-300 fill-rose-300" />
          </div>
          <div className="absolute bottom-16 left-10 opacity-12">
            <Heart className="w-12 h-12 text-rose-400 fill-rose-400" />
          </div>
          <div className="absolute bottom-6 right-6 opacity-10">
            <Heart className="w-6 h-6 text-rose-300 fill-rose-300" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Lock icon with gentle glow */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full glow-soft"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(212, 175, 122, 0.2) 100%)',
                }}
              >
                {password.toUpperCase() === CORRECT_PASSWORD ? (
                  <motion.div
                    initial={{ rotate: 0, scale: 1 }}
                    animate={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    <Unlock className="w-12 h-12 text-rose-700" />
                  </motion.div>
                ) : (
                  <Lock className="w-12 h-12 text-rose-700" />
                )}
              </div>
            </motion.div>

            {/* Title with romantic typography */}
            <motion.h2
              className="text-4xl font-serif-romantic text-rose-900 mb-3 text-shadow-romantic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Enter the Key
            </motion.h2>

            <motion.p
              className="text-rose-700/80 text-base font-body-soft mb-8 tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Unlock this book of love & memories
            </motion.p>

            {/* Password input with soft, elegant styling */}
            <motion.div
              className="relative mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <input
                ref={inputRef}
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type the password..."
                className={`w-full px-8 py-5 rounded-2xl text-center font-body-soft text-lg outline-none transition-all duration-500 ${error
                  ? 'bg-red-50/80 text-rose-800 placeholder-red-300 shadow-romantic'
                  : password.toUpperCase() === CORRECT_PASSWORD
                    ? 'bg-green-50/80 text-green-800 placeholder-green-300 shadow-romantic-lg'
                    : 'bg-white/60 text-rose-900 placeholder-rose-300/60 focus:bg-white/80 focus:shadow-romantic-lg'
                  }`}
                style={{
                  backdropFilter: 'blur(10px)',
                  border: error
                    ? '2px solid rgba(239, 68, 68, 0.3)'
                    : password.toUpperCase() === CORRECT_PASSWORD
                      ? '2px solid rgba(34, 197, 94, 0.3)'
                      : '2px solid rgba(255, 255, 255, 0.5)',
                }}
                maxLength={10}
              />

              {/* Clear button - elegant styling */}
              {password && (
                <motion.button
                  onClick={() => {
                    setPassword('');
                    setError(false);
                    inputRef.current?.focus();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-400 hover:text-rose-600 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}
            </motion.div>

            {/* Error message with gentle appearance */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-red-600 text-sm font-body-soft flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Incorrect password. Please try again
                    <Sparkles className="w-4 h-4" />
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hint with romantic styling */}
            <AnimatePresence>
              {showHint && !error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-rose-600/70 text-sm font-serif-elegant italic">
                    Hint: What makes the world go round? ❤️
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Unlock button with romantic styling */}
            <motion.button
              onClick={handleSubmit}
              className={`w-full py-5 rounded-2xl font-body-soft font-semibold text-lg transition-all duration-500 flex items-center justify-center gap-3 shadow-romantic ${password.toUpperCase() === CORRECT_PASSWORD
                ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-romantic-lg'
                : 'bg-gradient-to-r from-rose-300 via-pink-300 to-orange-200 text-rose-900 hover:shadow-romantic-lg'
                }`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {password.toUpperCase() === CORRECT_PASSWORD ? (
                <>
                  <Sparkles className="w-5 h-5" />
                  Unlocking with love...
                  <Sparkles className="w-5 h-5" />
                </>
              ) : (
                <>
                  <Unlock className="w-5 h-5" />
                  Unlock the Book
                </>
              )}
            </motion.button>

            {/* Decorative dots - gentle pulse */}
            <motion.div
              className="mt-8 flex justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-rose-400/50"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
