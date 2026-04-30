import { motion } from "framer-motion";
import saat from "@/assets/momen/saat.jpeg";
import tawamu from "@/assets/momen/tawamu.jpeg";
import bahkan from "@/assets/momen/bahkan.mp4";

const chapters = [
  {
    quote: "Sejak kenal kamu, hari-hari biasa langsung terasa kayak hari spesial.",
    media: saat,
    type: "img" as const,
    label: "Bab I",
  },
  {
    quote: "Tawamu selalu jadi suara favorit yang bikin semuanya jadi lebih ringan.",
    media: tawamu,
    type: "img" as const,
    label: "Bab II",
  },
  {
    quote: "Bahkan momen paling sederhana bareng kamu rasanya tetap istimewa.",
    media: bahkan,
    type: "video" as const,
    label: "Bab III",
  },
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
        — Cerita Kita
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-serif italic text-5xl md:text-7xl text-foreground mb-24"
      >
        Tiga scene favorit di hari ulang tahunmu.
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
              {c.type === "img" ? (
                <img
                  src={c.media}
                  alt=""
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover shadow-editorial"
                />
              ) : (
                <video
                  src={c.media}
                  className="w-full aspect-[4/5] object-cover shadow-editorial"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
