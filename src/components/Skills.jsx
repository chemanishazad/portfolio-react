import { motion } from 'framer-motion'
import Section from './Section'
import { skillGroups } from '../data/content'
import { stagger, staggerItem } from './Reveal'

function Bar({ name, level, accent }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-4">
        <span className="text-[13.5px] text-white/70">{name}</span>
        <span className="font-mono text-[10px] text-white/30">{level}</span>
      </div>
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.07]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, ' + accent + '66, ' + accent + ')' }}
          initial={{ width: 0 }}
          whileInView={{ width: level + '%' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title="The stack I reach for."
      lead="Levels are self-assessed depth of hands-on use, not certifications — adjust them in src/data/content.js."
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {skillGroups.map((g) => (
          <motion.div
            key={g.title}
            variants={staggerItem}
            className="glass glass-hover rounded-2xl p-6"
          >
            <div className="mb-6 flex items-center gap-2.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: g.accent, boxShadow: '0 0 14px 2px ' + g.accent + '99' }}
              />
              <h3 className="font-display text-base font-semibold tracking-tight text-white">
                {g.title}
              </h3>
            </div>
            <div className="space-y-5">
              {g.skills.map((s) => (
                <Bar key={s.name} {...s} accent={g.accent} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
