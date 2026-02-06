import { Heart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const FloatingHeart = ({
  left,
  size,
  delay,
  duration,
}: {
  left: string;
  size: number;
  delay: number;
  duration: number;
}) => (
  <motion.div
    className="absolute text-pink-300 pointer-events-none"
    style={{ left, fontSize: size }}
    initial={{ y: "110vh", opacity: 0 }}
    animate={{
      y: "-10vh",
      opacity: [0, 0.5, 0.5, 0],
      rotate: [0, 15, -15, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <Heart fill="currentColor" />
  </motion.div>
);

export default function FloatingHearts() {
  const prefersReduced = useReducedMotion();

  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        delay: i * 0.6,
        duration: 12 + Math.random() * 8,
        size: 16 + Math.random() * 24,
        left: `${Math.random() * 100}%`,
      })),
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) =>
        prefersReduced ? (
          <div
            key={heart.id}
            className="absolute text-pink-300"
            style={{ left: heart.left, fontSize: heart.size, opacity: 0.5 }}
          >
            <Heart fill="currentColor" />
          </div>
        ) : (
          <FloatingHeart key={heart.id} {...heart} />
        )
      )}
    </div>
  );
}
