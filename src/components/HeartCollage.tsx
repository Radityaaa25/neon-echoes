import { useMemo } from "react";
import { motion } from "framer-motion";
import p1 from "@/assets/photo-1.jpg";
import p2 from "@/assets/photo-2.jpg";
import p3 from "@/assets/photo-3.jpg";
import p4 from "@/assets/photo-4.jpg";
import p5 from "@/assets/photo-5.jpg";
import p6 from "@/assets/photo-6.jpg";
import p7 from "@/assets/photo-7.jpg";
import p8 from "@/assets/photo-8.jpg";

const photos = [p1, p2, p3, p4, p5, p6, p7, p8];

// Sample points on a heart curve
function heartPoints(n: number) {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    pts.push({ x, y });
  }
  // Fill interior
  const fill: { x: number; y: number }[] = [];
  for (let r = 0.15; r < 1; r += 0.12) {
    for (let i = 0; i < n; i++) {
      const t = (i / n) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3) * r;
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * r;
      fill.push({ x, y });
    }
  }
  return [...pts, ...fill];
}

export function HeartCollage() {
  const pts = useMemo(() => heartPoints(60), []);

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

      <div className="relative mx-auto" style={{ width: "min(90vw, 600px)", aspectRatio: "1/1" }}>
        {pts.map((p, i) => {
          const left = 50 + (p.x / 18) * 45;
          const top = 50 + (p.y / 18) * 45;
          return (
            <motion.img
              key={i}
              src={photos[i % photos.length]}
              alt=""
              loading="lazy"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 30) * 0.015, duration: 0.4 }}
              className="absolute w-4 h-4 md:w-6 md:h-6 object-cover -translate-x-1/2 -translate-y-1/2 rounded-sm"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                boxShadow: "0 0 8px rgba(255,40,120,0.4)",
              }}
            />
          );
        })}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,40,120,0.15),transparent_60%)] pointer-events-none" />
      </div>
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
