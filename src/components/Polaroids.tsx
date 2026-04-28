import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import p1 from "@/assets/photo-1.jpg";
import p2 from "@/assets/photo-2.jpg";
import p3 from "@/assets/photo-3.jpg";
import p5 from "@/assets/photo-5.jpg";
import p6 from "@/assets/photo-6.jpg";
import p7 from "@/assets/photo-7.jpg";

const polaroids = [
  { src: p1, caption: "Golden hour", x: "8%", y: "18%", rot: -8 },
  { src: p2, caption: "Make a wish", x: "78%", y: "12%", rot: 6 },
  { src: p3, caption: "Stargazing", x: "5%", y: "62%", rot: 5 },
  { src: p5, caption: "Summer", x: "82%", y: "58%", rot: -6 },
  { src: p6, caption: "Confetti", x: "20%", y: "78%", rot: 9 },
  { src: p7, caption: "Coffee talks", x: "70%", y: "78%", rot: -4 },
];

export function Polaroids() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {polaroids.map((p, i) => (
          <motion.button
            key={i}
            className="absolute pointer-events-auto group"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 0, y: 20, rotate: p.rot }}
            animate={{ opacity: 1, y: 0, rotate: p.rot }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.8 }}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 20 }}
            onClick={() => setActive(i)}
          >
            <div className="bg-white p-2 pb-6 shadow-2xl w-32 lg:w-40">
              <img src={p.src} alt={p.caption} className="w-full aspect-square object-cover" loading="lazy" />
              <p className="mt-2 text-center text-xs font-script text-neutral-700">{p.caption}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              layoutId={`polaroid-${active}`}
              initial={{ scale: 0.5, rotate: 10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white p-4 pb-12 shadow-neon max-w-md w-full"
            >
              <img src={polaroids[active].src} alt="" className="w-full aspect-square object-cover" />
              <p className="mt-4 text-center text-2xl font-script text-neutral-800">
                {polaroids[active].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
