import { motion } from 'framer-motion'
import { snapshot } from '../data/content'
import { stagger, staggerItem } from './Reveal'

/**
 * The ten-second scan. Sits immediately under the hero because it is the
 * block a recruiter actually reads before deciding whether to keep going.
 * Facts only, no prose.
 */
export default function Snapshot() {
  return (
    <section aria-label="At a glance" className="relative border-b border-white/[0.07]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <motion.dl
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8%' }}
          className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4"
        >
          {snapshot.map((s) => (
            <motion.div key={s.label} variants={staggerItem} className="border-l border-white/10 pl-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan/60">
                {s.label}
              </dt>
              <dd className="mt-2 text-[14.5px] font-medium leading-snug text-white/85">
                {s.value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
