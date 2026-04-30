import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

const momentImages = import.meta.glob("../assets/momen/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const photos = Object.entries(momentImages)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
  .map(([, src]) => src);

/**
 * Heart pixel mask: 1 = photo cell, 0 = empty.
 * Grid is 23 cols × 20 rows — smoother and more symmetric heart silhouette.
 * but small enough to animate smoothly via CSS Grid (no absolute positioning).
 */
const HEART_MASK = [
  "00000111100001111000000",
  "00011111111011111110000",
  "00111111111111111111000",
  "01111111111111111111100",
  "11111111111111111111110",
  "11111111111111111111110",
  "11111111111111111111110",
  "01111111111111111111100",
  "01111111111111111111100",
  "00111111111111111111000",
  "00111111111111111111000",
  "00011111111111111110000",
  "00001111111111111100000",
  "00000111111111111000000",
  "00000011111111110000000",
  "00000001111111100000000",
  "00000000111111000000000",
  "00000000011110000000000",
  "00000000001100000000000",
  "00000000000100000000000",
];

type Cell = { row: number; col: number; idx: number; distanceFromCenter: number };

function buildHeartCells(): Cell[] {
  const cells: Cell[] = [];
  let idx = 0;
  const centerRow = HEART_MASK.length / 2;
  const centerCol = HEART_MASK[0].length / 2;

  HEART_MASK.forEach((line, row) => {
    for (let col = 0; col < line.length; col++) {
      if (line[col] === "1") {
        const r = row + 1;
        const c = col + 1;
        const distance = Math.sqrt(Math.pow(r - centerRow, 2) + Math.pow(c - centerCol, 2));
        cells.push({ row: r, col: c, idx: idx++, distanceFromCenter: distance });
      }
    }
  });

  // Sort by distance to determine animation order
  return cells.sort((a, b) => a.distanceFromCenter - b.distanceFromCenter);
}

const COLS = HEART_MASK[0].length;
const ROWS = HEART_MASK.length;

export function HeartCollage() {
  const cells = useMemo(buildHeartCells, []);
  const [active, setActive] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative py-24 md:py-40 px-6 bg-black overflow-hidden">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs tracking-[0.4em] text-neon uppercase mb-4"
      >
        — Birthday Love
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-serif italic text-4xl md:text-6xl text-white mb-16"
      >
        Dibikin dari momen-momen favorit kita.
      </motion.h2>

      <motion.div
        className="relative mx-auto"
        style={{ width: "min(92vw, 640px)" }}
        animate={{ rotate: [0, 2.5, 0, -2.5, 0], y: [0, -6, 0, 6, 0] }}
        transition={{ duration: 16, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
      >
        <motion.div
          className="grid"
          style={{
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
            show: { transition: { staggerChildren: 0.008, delayChildren: 0.05 } },
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
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: c.distanceFromCenter * 0.008,
              }}
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
      </motion.div>

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "min(92vw, 640px)",
          aspectRatio: `${COLS}/${ROWS}`,
          background: "radial-gradient(ellipse at center, rgba(255,40,120,0.25), transparent 65%)",
        }}
      />

      {mounted &&
        createPortal(
          <AnimatePresence>
            {active !== null && (
              <motion.div
                className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) setActive(null);
                }}
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
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-black text-white/70 py-20 px-6 text-center border-t border-white/10">
      <p className="font-script text-5xl md:text-6xl text-neon mb-6">Happy Birthday, My Love</p>
      <p className="text-xs tracking-[0.3em] uppercase">Dibuat khusus buat kamu · GHINNA AZZAHRAH</p>
    </footer>
  );
}
