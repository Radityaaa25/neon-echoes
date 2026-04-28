import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X } from "lucide-react";
import p1 from "@/assets/photo-1.jpg";
import p2 from "@/assets/photo-2.jpg";
import p3 from "@/assets/photo-3.jpg";
import p4 from "@/assets/photo-4.jpg";
import p5 from "@/assets/photo-5.jpg";
import p6 from "@/assets/photo-6.jpg";
import p7 from "@/assets/photo-7.jpg";
import p8 from "@/assets/photo-8.jpg";

type Item =
  | { type: "img"; src: string; h: string }
  | { type: "gift"; surprise: string; img: string; h: string };

const items: Item[] = [
  { type: "img", src: p1, h: "row-span-2" },
  { type: "img", src: p2, h: "" },
  { type: "gift", surprise: "You make every birthday feel like a movie scene.", img: p6, h: "" },
  { type: "img", src: p3, h: "row-span-2" },
  { type: "img", src: p7, h: "" },
  { type: "img", src: p4, h: "" },
  { type: "gift", surprise: "Our coffee talks are my favorite ritual.", img: p7, h: "row-span-2" },
  { type: "img", src: p5, h: "" },
  { type: "img", src: p6, h: "" },
  { type: "img", src: p8, h: "row-span-2" },
  { type: "gift", surprise: "Brighter than every firework, always.", img: p8, h: "" },
  { type: "img", src: p2, h: "" },
];

function Confetti() {
  // Pre-compute particle data once (avoid re-randomising per render).
  // Reduced count + GPU-friendly transforms for smoother frames.
  const pieces = useMemo(
    () =>
      Array.from({ length: 28 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.25,
        dur: 1.1 + Math.random() * 1,
        size: 14 + Math.random() * 12,
        xDrift: (Math.random() - 0.5) * 500,
        yEnd: 25 + Math.random() * 70,
        rot: Math.random() * 360,
      })),
    []
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map((p, i) => (
        <motion.div
          key={i}
          initial={{ y: "50vh", x: 0, opacity: 1, scale: 0, rotate: 0 }}
          animate={{
            y: ["50vh", `${p.yEnd}vh`],
            x: p.xDrift,
            opacity: [1, 1, 0],
            scale: [0, 1, 1],
            rotate: p.rot + 360,
          }}
          transition={{ duration: p.dur, delay: p.delay, ease: "easeOut" }}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size,
            willChange: "transform, opacity",
            transform: "translate3d(0,0,0)",
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-primary w-full h-full drop-shadow-[0_0_6px_rgba(255,40,120,0.8)]">
            <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function MomentsGallery() {
  const [opened, setOpened] = useState<number | null>(null);
  const [confetti, setConfetti] = useState(false);

  const openGift = (i: number) => {
    setConfetti(true);
    setTimeout(() => setOpened(i), 700);
    setTimeout(() => setConfetti(false), 2200);
  };

  return (
    <section id="moments" className="py-32 md:py-48 px-6 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.4em] text-neutral-500 uppercase mb-4"
        >
          — Moments
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif italic text-5xl md:text-7xl text-foreground mb-4"
        >
          Open the boxes.
        </motion.h2>
        <p className="text-muted-foreground mb-16 max-w-md">
          Click any gift box to unwrap a tiny surprise wrapped in confetti.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4">
          {items.map((it, i) => {
            if (it.type === "img") {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.05 }}
                  className={`overflow-hidden ${it.h}`}
                >
                  <img
                    src={it.src}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              );
            }
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.05 }}
                onClick={() => openGift(i)}
                className={`hover-shake group relative overflow-hidden bg-gradient-to-br from-primary to-[oklch(0.55_0.27_15)] flex flex-col items-center justify-center gap-3 text-primary-foreground ${it.h}`}
              >
                <Gift className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1.4} />
                <span className="text-xs tracking-[0.3em] uppercase font-sans">Open me</span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {confetti && <Confetti />}

      <AnimatePresence>
        {opened !== null && items[opened].type === "gift" && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpened(null)}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              className="bg-background max-w-lg w-full p-2 shadow-neon"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpened(null)}
                className="absolute top-6 right-6 text-white/80 hover:text-white"
              >
                <X />
              </button>
              <img
                src={(items[opened] as { img: string }).img}
                alt=""
                className="w-full aspect-video object-cover"
              />
              <p className="font-serif italic text-2xl md:text-3xl text-foreground p-8 text-center">
                "{(items[opened] as { surprise: string }).surprise}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
