import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Sparkles } from "lucide-react";

interface Page {
    id: number;
    title: string;
    subtitle?: string;
    content: string;
    image?: string;
    bgGradient: string;
}

const pages: Page[] = [
    {
        id: 0,
        title: "Happy Valentine's Day",
        subtitle: "Dear",
        content: "This little book is made just for you, love.\n\n" + "Turn the pages slowly,\n" + "each one holds a feeling.",
        bgGradient: "from-rose-300/90 via-pink-300/90 to-orange-200/90",
    },
    {
        id: 1,
        title: "Loving you was my best decision",
        subtitle: "Loving you was my best decision",
        content: "The best part of last year was finding you.\n" + "From the very first moment, I truly liked you.\n\n" + "I still see you clearly in my memory —\n" + "standing under a tree,\n" + "waiting, as the rain slowly gathered.",
        image: "bears-cuddling",
        bgGradient: "from-pink-300/90 via-rose-300/90 to-orange-200/90",
    },
    {
        id: 2,
        title: "Sorry for whenever I made you angry",
        subtitle: "I never meant to hurt you",
        content: "Get angry and I’ll be your fire brigade.\n" + "I would never let you stay angry for long.\n\n" + "Your smile is everything,\n" + "and it makes me who I am.",
        image: "bear-sorry",
        bgGradient: "from-orange-200/90 via-pink-300/90 to-rose-300/90",
    },
    {
        id: 3,
        title: "A Journey Together",
        subtitle: "One day, one trip, just us",
        content: "I told you before — one of my dreams is to take a trip with you.\n" + "Maybe not now, but someday, when life feels settled.\n\n" + "I’m not really a traveler,\n" + "but you are — and that’s what makes us beautifully different.\n\n" + "You are my positive,\n" + "I am your negative.\n" + "Together, we become something perfectly balanced.\n\n" + "U (+) and Me (−)\n" + "= a beautiful positive journey.",
        image: "one-trip",
        bgGradient: "from-rose-300/90 via-orange-200/90 to-pink-300/90",
    },
    {
        id: 4,
        title: "Forever",
        subtitle: "This is the last page, but not the end.\nA few words from my heart, just for you.",
        content: "I was lost from the very first moment —\n" + "that soft, ticklish feeling the world calls love at first sight.\n" + "It came quietly, without warning, and stayed.\n\n" + "I never imagined you would become the woman of my dreams,\n" + "yet now I find you in every dream I have.\n\n" + "You are not meant to be compared.\n" + "You don’t need to be judged.\n" + "You are special and beautifully unique —\n" + "and that is exactly why I like you.\n\n" + "I may be a little irritating at times,\n" + "but my love for you is deeper than you could ever imagine.\n\n" + "This Valentine’s Day, I created something new —\n" + "only for you, madam, only for you.",
        bgGradient: "from-pink-400/90 via-rose-300/90 to-orange-200/90",
    },
];

export default function FlipBook() {
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(1);
    const bookRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
    }, []);

    const goToNextPage = () => {
        if (currentPage < pages.length - 1) {
            setDirection(1);
            setCurrentPage(p => p + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 0) {
            setDirection(-1);
            setCurrentPage(p => p - 1);
        }
    };

    const currentPageData = pages[currentPage];
    const isLastPage = currentPage === pages.length - 1;

    return (
        <motion.div
            className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
            <div className="relative perspective-1000">
                <audio ref={audioRef} loop muted={muted}>
                    <source src="/music/Love.mp3" type="audio/mpeg" />
                </audio>
                <div className="absolute inset-0 bg-rose-900/10 rounded-3xl blur-2xl translate-y-10 scale-95" />

                <motion.div
                    ref={bookRef}
                    className={`relative w-[380px] h-[600px] md:w-[460px] md:h-[680px]
          rounded-3xl bg-gradient-to-br ${currentPageData.bgGradient}
          shadow-romantic-xl overflow-hidden`}
                    initial={{ rotateY: -20, opacity: 0, scale: 0.9 }}
                    animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.3)",
                    }}
                >
                    {/* Decorative layers */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div className="absolute top-8 left-8 opacity-15" animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity }}>
                            <Heart className="w-10 h-10 text-white fill-white" />
                        </motion.div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            className={`relative z-10 p-10 md:p-14 h-full flex flex-col ${currentPage === 0 ? "justify-center" : ""
                                }`}
                            initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                            <div className="text-center mb-6">
                                <h1 className="text-3xl md:text-4xl text-[var(--text-heading)] font-serif-romantic mb-2">
                                    {currentPageData.title}
                                </h1>
                                {currentPageData.subtitle && (
                                    <p className="text-[var(--text-soft)] text-sm">{currentPageData.subtitle}</p>
                                )}
                            </div>

                            {currentPageData.image && (
                                <div className="w-48 h-28 mx-auto mb-2 flex items-center justify-center">
                                    <img
                                        src={`/stickers/${currentPageData.image}.gif`}
                                        className="h-full w-auto object-contain drop-shadow-sm"
                                        alt=""
                                    />
                                </div>
                            )}

                            <div className={`w-full flex justify-center ${isLastPage ? "flex-1" : "max-h-[260px] overflow-y-auto scrollbar-hide"
                                }`}>
                                <p className="text-[var(--text-body)] text-center text-base md:text-lg leading-[1.7] whitespace-pre-line font-body-soft tracking-wide text-shadow-soft pb-6">
                                    {currentPageData.content}
                                </p>
                            </div>

                            <div className={`flex justify-center gap-2 ${isLastPage ? "mt-2" : "mt-4"}`}>
                                {pages.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`rounded-full ${i === currentPage
                                            ? "bg-white w-8 h-2"
                                            : "bg-white/50 w-2 h-2"
                                            }`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="absolute bottom-6 left-0 right-0 flex justify-between items-center px-6 z-50 pointer-events-auto">
                        <button onClick={goToPrevPage} disabled={currentPage === 0}>
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <button onClick={goToNextPage} disabled={currentPage === pages.length - 1}>
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </motion.div>
            </div>

            <motion.p className="mt-10 text-rose-800/70 text-center">
                Crafted with <Heart className="inline w-5 h-5 text-red-500 fill-red-500 mx-1" /> just for you
            </motion.p>

            <motion.div className="absolute top-24 left-12 pointer-events-none" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity }}>
                <Sparkles className="w-8 h-8 text-yellow-200" />
            </motion.div>

            <motion.button
                className="fixed bottom-24 right-6 z-50 bg-white/80 backdrop-blur-md shadow-lg border border-pink-300 p-3 rounded-full"
                onClick={() => {
                    if (!audioRef.current) return;

                    audioRef.current.muted = !muted;
                    setMuted(!muted);
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
            >
                <span className="text-xl">
                    {muted ? "🔇" : "🔊"}
                </span>
            </motion.button>
        </motion.div >
    );
}
