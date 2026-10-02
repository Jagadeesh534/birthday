import { motion } from 'framer-motion'
import { FiGift } from 'react-icons/fi'

export default function SurpriseButton({ onClick }) {
  return (
    <motion.button
      type="button"
      className="surprise-btn"
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
    >
      <FiGift aria-hidden="true" />
      <span>Open Surprise</span>
    </motion.button>
  )
}
