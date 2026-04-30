import { motion } from "framer-motion";
import { BookOpen, Heart, Sparkles, Coffee, Camera, Star, Smile, Music } from "lucide-react";

const items = [
  { icon: BookOpen, title: "Growth Mode On", desc: "Versi kamu tiap tahun makin keren." },
  { icon: Heart, title: "Heart Warmer", desc: "Kamu selalu bikin suasana jadi nyaman." },
  { icon: Sparkles, title: "Main Character", desc: "Masuk ruangan, langsung auto bright." },
  { icon: Coffee, title: "Cozy Partner", desc: "Ngobrol random aja udah bikin happy." },
  { icon: Camera, title: "Moment Keeper", desc: "Jago banget simpan momen kecil jadi berarti." },
  { icon: Star, title: "Natural Glow", desc: "Bersinar tanpa perlu capek jadi orang lain." },
  { icon: Smile, title: "Mood Booster", desc: "Senyummu selalu jadi recharge terbaik." },
  { icon: Music, title: "My Favorite Track", desc: "Ketawamu masih nomor satu di playlist hati." },
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
          — Birthday Traits
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif italic text-5xl md:text-7xl text-foreground mb-20"
        >
          Hal-hal keren dari kamu.
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
