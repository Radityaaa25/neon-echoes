import { motion } from "framer-motion";

export function MessageOfLove() {
  return (
    <section id="message" className="py-32 md:py-48 px-6 md:px-16 max-w-4xl mx-auto text-center">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs tracking-[0.4em] text-neutral-500 uppercase mb-6"
      >
        — A Message of Love
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="font-serif italic text-5xl md:text-7xl lg:text-8xl text-foreground leading-[1.05] mb-12"
      >
        To My Favorite Person
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
        className="font-serif text-lg md:text-xl text-foreground/85 leading-relaxed space-y-6 text-left md:text-center"
      >
        <p>
          Eighteen years feels like a single, perfect breath — and somehow,
          a thousand stories at once. You've grown into someone who turns
          ordinary days into ones worth remembering.
        </p>
        <p>
          Thank you for the laughter that doubles me over, for the silences
          that feel like home, and for the way you make even the smallest
          moments shimmer.
        </p>
        <p>
          Whatever the next chapters hold, know this: you'll never write
          them alone.
        </p>
        <p className="font-script text-3xl md:text-4xl text-primary pt-6">
          With every piece of my heart.
        </p>
      </motion.div>
    </section>
  );
}
