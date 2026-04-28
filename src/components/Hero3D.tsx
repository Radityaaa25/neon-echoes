import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ParticleSphere } from "./ParticleSphere";
import { Polaroids } from "./Polaroids";

export function Hero3D() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative h-screen w-full bg-space overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute top-0 inset-x-0 z-30 px-6 md:px-12 py-6 flex items-center justify-between"
      >
        <div className="font-sans text-sm tracking-[0.3em] text-white/80 uppercase">
          <span className="text-neon">●</span> Tribute · 18
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70 uppercase tracking-widest">
          {["Intro", "Chapters", "Message", "Moments"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-neon transition-colors">
              {l}
            </a>
          ))}
        </nav>
      </motion.header>

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} color="#ff2a6d" intensity={2} />
          <Stars radius={50} depth={50} count={3000} factor={4} fade speed={0.5} />
          <ParticleSphere mouse={mouse} />
        </Canvas>
      </div>

      <Polaroids />

      {/* Title overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="font-sans text-xs md:text-sm tracking-[0.5em] text-neon uppercase mb-6"
        >
          A Constellation of Memories
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal italic max-w-4xl leading-[0.95]"
        >
          18 Years <br />
          <span className="text-neon">of Wonders</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-10 font-sans text-xs tracking-[0.3em] text-white/50 uppercase"
        >
          Scroll to begin ↓
        </motion.p>
      </div>

      {/* Bottom fade for transition */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[var(--cream)] pointer-events-none z-20" />
    </section>
  );
}
