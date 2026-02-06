import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Proposal from './pages/Proposal'
import Celebration from './pages/Celebration'
import Love from './pages/Love'

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Proposal />} />
        <Route path="/celebrate" element={<Celebration />} />
        <Route path="/love" element={<Love />} />
      </Routes>
    </AnimatePresence>
  )
}
