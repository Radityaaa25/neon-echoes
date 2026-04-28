import { motion } from "framer-motion";
import { BookOpen, Heart, Sparkles, Coffee, Camera, Star, Smile, Music } from "lucide-react";

const items = [
  { icon: BookOpen, title: "Master Learner", desc: "Curiosity, every single day." },
  { icon: Heart, title: "Best Listener", desc: "Holds space like no one else." },
  { icon: Sparkles, title: "Light Bringer", desc: "A room is brighter with you." },
  { icon: Coffee, title: "Cozy Companion", desc: "Quiet mornings, perfect talks." },
  { icon: Camera, title: "Memory Maker", desc: "Always the first to capture joy." },
  { icon: Star, title: "Quiet Star", desc: "Shines without needing to." },
  { icon: Smile, title: "Joy Architect", desc: "Builds smiles for a living." },
  { icon: Music, title: "Soundtrack", desc: "Your laugh, on repeat." },
];

export function Achievements() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-16 bg-[oklch(0.97_0.005_80)]">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.4em] text-neutral-500 uppercase mb-4"
        >
          — The Achievement Grid
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif italic text-5xl md:text-7xl text-foreground mb-20"
        >
          Quiet superpowers.
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {items.map((Item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group bg-background p-8 md:p-10 flex flex-col items-start gap-4 cursor-default"
            >
              <motion.div
                whileHover={{ rotateY: 180, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                <Item.icon className="w-5 h-5" />
              </motion.div>
              <div>
                <h3 className="font-serif text-xl text-foreground">{Item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{Item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
