import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X } from "lucide-react";
import { createPortal } from "react-dom";
import s1 from "@/assets/single/1.jpeg";
import s2 from "@/assets/single/2.jpeg";
import s3 from "@/assets/single/3.jpeg";
import s4 from "@/assets/single/4.jpeg";
import s5 from "@/assets/single/5.jpeg";
import s6 from "@/assets/single/6.jpeg";
import s7 from "@/assets/single/7.jpeg";
import s8 from "@/assets/single/8.jpeg";
import s9 from "@/assets/single/9.jpeg";
import s10 from "@/assets/single/10.jpeg";

type Item =
  | { type: "img"; src: string; h: string }
  | { type: "gift"; surprise: string; img: string; h: string };

const items: Item[] = [
  { type: "img", src: s1, h: "row-span-2" },
  { type: "img", src: s2, h: "" },
  {
    type: "gift",
    surprise: "Setiap ulang tahun jadi lebih seru sejak ada kamu di hidupku.",
    img: s6,
    h: "",
  },
  { type: "img", src: s3, h: "row-span-2" },
  { type: "img", src: s7, h: "" },
  { type: "img", src: s4, h: "" },
  {
    type: "gift",
    surprise: "Ngobrol sama kamu selalu jadi part terbaik di hari-hariku.",
    img: s8,
    h: "row-span-2",
  },
  { type: "img", src: s5, h: "" },
  { type: "img", src: s9, h: "" },
  { type: "img", src: s10, h: "row-span-2" },
  { type: "gift", surprise: "Glow kamu masih ngalahin kembang api mana pun.", img: s4, h: "" },
  { type: "img", src: s6, h: "" },
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
    [],
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
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-primary w-full h-full drop-shadow-[0_0_6px_rgba(255,40,120,0.8)]"
          >
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openGift = (i: number) => {
    if (items[i].type !== "gift") return;
    setConfetti(true);
    setOpened(i);
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
          — Birthday Moments
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif italic text-5xl md:text-7xl text-foreground mb-4"
        >
          Buka kotaknya, ada pesan kecil.
        </motion.h2>
        <p className="text-muted-foreground mb-16 max-w-md">
          Klik gift box mana aja buat buka mini surprise spesial ulang tahun kamu.
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

      {mounted &&
        createPortal(
          <AnimatePresence>
            {opened !== null && items[opened].type === "gift" && (
              <motion.div
                className="fixed inset-0 z-[999] bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) setOpened(null);
                }}
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  className="relative bg-background max-w-lg w-full p-2 shadow-neon"
                >
                  <button
                    onClick={() => setOpened(null)}
                    className="absolute top-4 right-4 z-10 p-1 bg-black/35 text-white hover:bg-black/55 transition-colors"
                    aria-label="Close"
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
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
