import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Scroll reveal. Animates transform + opacity only — an animated
 * `filter: blur()` looks nice for 700ms and costs a full-element
 * re-rasterisation on every frame of every reveal on the page.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  x = 0,
  duration = 0.7,
  once = true,
  className = '',
  as = 'div',
}) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </M>
  )
}

/** Stagger container + item pair for lists of cards. */
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}
