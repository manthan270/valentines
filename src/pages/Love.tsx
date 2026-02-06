import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PasswordProtection from '../animated-password/components/PasswordProtection';
import FlipBook from '../animated-password/components/FlipBook';
import FloatingHearts from '../animated-password/components/FloatingHearts';

export default function Love() {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Gentle loading entrance
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleUnlock = () => {
        setIsUnlocked(true);
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Romantic gradient background */}
            <div className="fixed inset-0 gradient-romantic-blush" />

            {/* Subtle dreamy overlay pattern */}
            <div className="fixed inset-0 opacity-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              radial-gradient(circle at 15% 85%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.35) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(212, 175, 122, 0.15) 0%, transparent 60%)
            `,
                    }}
                />
            </div>

            {/* PRESERVE: Floating hearts background - DO NOT MODIFY */}
            <FloatingHearts />

            {/* Romantic loading screen */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center gradient-wine-rose"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                    >
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.div
                                className="text-7xl mb-6"
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }}
                            >
                                💝
                            </motion.div>
                            <p className="text-rose-600 font-semibold text-lg">
                                Preparing something special...
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content with gentle fade */}
            {!isLoading && (
                <AnimatePresence mode="wait">
                    {!isUnlocked ? (
                        <motion.div
                            key="password"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: 'easeInOut' }}
                        >
                            <PasswordProtection onUnlock={handleUnlock} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="flipbook"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: 'easeInOut' }}
                        >
                            <FlipBook />
                        </motion.div>
                    )}
                </AnimatePresence>
            )}

            {/* Corner decorations - gentle entrance */}
            <motion.div
                className="fixed top-6 left-6 z-20 text-5xl opacity-40"
                initial={{ opacity: 0, x: -30, y: -30 }}
                animate={{ opacity: 0.4, x: 0, y: 0 }}
                transition={{ delay: 2, duration: 1.2, ease: 'easeOut' }}
            >
                🌹
            </motion.div>

            <motion.div
                className="fixed top-6 right-6 z-20 text-5xl opacity-40"
                initial={{ opacity: 0, x: 30, y: -30 }}
                animate={{ opacity: 0.4, x: 0, y: 0 }}
                transition={{ delay: 2.2, duration: 1.2, ease: 'easeOut' }}
            >
                💌
            </motion.div>

            <motion.div
                className="fixed bottom-6 left-6 z-20 text-5xl opacity-40"
                initial={{ opacity: 0, x: -30, y: 30 }}
                animate={{ opacity: 0.4, x: 0, y: 0 }}
                transition={{ delay: 2.4, duration: 1.2, ease: 'easeOut' }}
            >
                ✨
            </motion.div>

            <motion.div
                className="fixed bottom-6 right-6 z-20 text-5xl opacity-40"
                initial={{ opacity: 0, x: 30, y: 30 }}
                animate={{ opacity: 0.4, x: 0, y: 0 }}
                transition={{ delay: 2.6, duration: 1.2, ease: 'easeOut' }}
            >
                💕
            </motion.div>
        </div>
    );
}
