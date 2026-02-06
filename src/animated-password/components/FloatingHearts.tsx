import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Heart {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

export default function FloatingHearts() {
    const heartsRef = useRef<Heart[]>([]);

    useEffect(() => {
        const hearts: Heart[] = [];
        for (let i = 0; i < 30; i++) {
            hearts.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 20 + 10,
                duration: Math.random() * 10 + 8,
                delay: Math.random() * 5,
                opacity: Math.random() * 0.5 + 0.2,
            });
        }
        heartsRef.current = hearts;
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {heartsRef.current.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="absolute"
                    style={{
                        left: `${heart.x}%`,
                        top: `${heart.y}%`,
                    }}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                        opacity: [0, heart.opacity, heart.opacity, 0],
                        y: [-50, -150, -250, -350],
                        x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30, Math.random() * 40 - 20],
                        rotate: [0, 15, -15, 0],
                    }}
                    transition={{
                        duration: heart.duration,
                        delay: heart.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <svg
                        width={heart.size}
                        height={heart.size}
                        viewBox="0 0 24 24"
                        fill="white"
                        className="drop-shadow-lg"
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </motion.div>
            ))}

            {/* Additional sparkle effects */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 3,
                        delay: Math.random() * 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <svg
                        width={Math.random() * 15 + 8}
                        height={Math.random() * 15 + 8}
                        viewBox="0 0 24 24"
                        fill="#FFD700"
                        className="drop-shadow-md"
                    >
                        <path d="M12 2L14.09 8.26L21 9.27L16.5 14.14L17.82 21.02L12 17.77L6.18 21.02L7.5 14.14L3 9.27L9.91 8.26L12 2Z" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}
