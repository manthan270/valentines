import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import FloatingHearts from '../components/background/FloatingHearts'
import ProposalCard from '../components/proposal/ProposalCard'
import { screenFade } from '../lib/animations'

export default function Proposal() {
    const navigate = useNavigate()

    return (
        <>
            {/* Header */}
            <Header />

            {/* Background color layer */}
            <div className="fixed inset-0 bg-pink-50 z-0" />

            {/* Floating hearts layer (VISIBLE) */}
            <div className="fixed inset-0 pointer-events-none z-10">
                <FloatingHearts />
            </div>

            {/* Main content */}
            <motion.div
                key="proposal"
                variants={screenFade}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="min-h-screen flex items-center justify-center relative z-20"
            >
                <ProposalCard onYes={() => navigate('/celebrate')} />
            </motion.div>
        </>
    )
}
