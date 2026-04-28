import { motion } from "framer-motion";
import p1 from "@/assets/photo-1.jpg";
import p3 from "@/assets/photo-3.jpg";
import p7 from "@/assets/photo-7.jpg";

const chapters = [
  { quote: "When I met you, the world tilted just enough to make sense.", img: p1, label: "Chapter I" },
  { quote: "Our biggest laugh still echoes in rooms we've never been to.", img: p7, label: "Chapter II" },
  { quote: "Even quiet nights with you sound like a favorite song.", img: p3, label: "Chapter III" },
];

export function Chapters() {
  return (
    <section id="chapters" className="py-32 md:py-48 px-6 md:px-16 max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs tracking-[0.4em] text-neutral-500 uppercase mb-4"
      >
        — The Chapters
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-serif italic text-5xl md:text-7xl text-foreground mb-24"
      >
        Pages we wrote together.
      </motion.h2>

      <div className="space-y-32">
        {chapters.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`grid md:grid-cols-12 gap-8 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <div className="md:col-span-7">
              <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">{c.label}</p>
              <blockquote className="font-serif italic text-3xl md:text-5xl leading-tight text-foreground">
                "{c.quote}"
              </blockquote>
            </div>
            <div className="md:col-span-5">
              <img
                src={c.img}
                alt=""
                loading="lazy"
                className="w-full aspect-[4/5] object-cover shadow-editorial"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
