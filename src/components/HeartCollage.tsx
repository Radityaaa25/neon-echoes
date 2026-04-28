import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import p1 from "@/assets/photo-1.jpg";
import p2 from "@/assets/photo-2.jpg";
import p3 from "@/assets/photo-3.jpg";
import p4 from "@/assets/photo-4.jpg";
import p5 from "@/assets/photo-5.jpg";
import p6 from "@/assets/photo-6.jpg";
import p7 from "@/assets/photo-7.jpg";
import p8 from "@/assets/photo-8.jpg";

const photos = [p1, p2, p3, p4, p5, p6, p7, p8];

/**
 * Heart pixel mask: 1 = photo cell, 0 = empty.
 * Grid is 21 cols × 19 rows — gives ~200 cells, plenty for a dense heart
 * but small enough to animate smoothly via CSS Grid (no absolute positioning).
 */
const HEART_MASK = [
  "000011100001110000000",
  "000111110011111100000",
  "001111111111111111000",
  "011111111111111111100",
  "111111111111111111110",
  "111111111111111111110",
  "111111111111111111110",
  "111111111111111111110",
  "011111111111111111100",
  "011111111111111111100",
  "001111111111111111000",
  "001111111111111111000",
  "000111111111111111000",
  "000011111111111110000",
  "000001111111111100000",
  "000000111111111000000",
  "000000011111110000000",
  "000000001111100000000",
  "000000000111000000000",
];

type Cell = { row: number; col: number; idx: number };

function buildHeartCells(): Cell[] {
  const cells: Cell[] = [];
  let idx = 0;
  HEART_MASK.forEach((line, row) => {
    for (let col = 0; col < line.length; col++) {
      if (line[col] === "1") cells.push({ row: row + 1, col: col + 1, idx: idx++ });
    }
  });
  return cells;
}

const COLS = HEART_MASK[0].length;
const ROWS = HEART_MASK.length;

export function HeartCollage() {
  const cells = useMemo(buildHeartCells, []);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-40 px-6 bg-black overflow-hidden">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs tracking-[0.4em] text-neon uppercase mb-4"
      >
        — Forever
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-serif italic text-4xl md:text-6xl text-white mb-16"
      >
        Made of a thousand moments.
      </motion.h2>

      <motion.div
        className="relative mx-auto grid"
        style={{
          width: "min(92vw, 640px)",
          aspectRatio: `${COLS}/${ROWS}`,
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          gap: "2px",
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.012, delayChildren: 0.1 } },
        }}
      >
        {cells.map((c) => (
          <motion.button
            key={c.idx}
            onClick={() => setActive(c.idx)}
            variants={{
              hidden: { opacity: 0, scale: 0.4 },
              show: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{
              gridColumnStart: c.col,
              gridRowStart: c.row,
              willChange: "transform, opacity",
              transform: "translate3d(0,0,0)",
              backfaceVisibility: "hidden",
            }}
            className="relative overflow-hidden rounded-[2px] focus:outline-none focus:ring-1 focus:ring-[var(--neon-pink)]"
          >
            <img
              src={photos[c.idx % photos.length]}
              alt=""
              loading="lazy"
              decoding="async"
              width={32}
              height={32}
              className="w-full h-full object-cover"
              style={{ imageRendering: "auto" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-pink)]/10 to-transparent mix-blend-overlay" />
          </motion.button>
        ))}
      </motion.div>

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "min(92vw, 640px)",
          aspectRatio: `${COLS}/${ROWS}`,
          background:
            "radial-gradient(ellipse at center, rgba(255,40,120,0.25), transparent 65%)",
        }}
      />

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white"
              aria-label="Close"
            >
              <X />
            </button>
            <motion.img
              src={photos[active % photos.length]}
              alt=""
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="max-w-[90vw] max-h-[80vh] object-contain shadow-neon"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-black text-white/70 py-20 px-6 text-center border-t border-white/10">
      <p className="font-script text-5xl md:text-6xl text-neon mb-6">Always &amp; Forever</p>
      <p className="text-xs tracking-[0.3em] uppercase">Made with love · MMXXVI</p>
    </footer>
  );
}
