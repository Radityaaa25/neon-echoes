import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { MatrixPreloader } from "@/components/MatrixPreloader";
import { Hero3D } from "@/components/Hero3D";
import { Chapters } from "@/components/Chapters";
import { Achievements } from "@/components/Achievements";
import { MessageOfLove } from "@/components/MessageOfLove";
import { MomentsGallery } from "@/components/MomentsGallery";
import { HeartCollage, Footer } from "@/components/HeartCollage";
import { Memory3DExperience, Enter3DButton } from "@/components/Memory3DExperience";
import backsound from "@/assets/sound/Backsound.mp3";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Happy Birthday, Zalaaa — Buat Kamu" },
      {
        name: "description",
        content:
          "Halaman ulang tahun spesial buat kamu: futuristik, hangat, dan penuh momen manis. Scroll pelan-pelan dan nikmati tiap bagiannya.",
      },
    ],
  }),
});

function Index() {
  const [ready, setReady] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [needsUserGesture, setNeedsUserGesture] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { scrollYProgress } = useScroll();
  // Smoother, longer transition window for the dark→light handoff
  const heroY = useTransform(scrollYProgress, [0, 0.18], ["0%", "-15%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  // Mist-like fade effect for smoother disappearance
  const mistOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    if (!ready || !audioRef.current) return;

    const audio = audioRef.current;
    audio.volume = 0.5;

    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setNeedsUserGesture(false);
      } catch {
        setNeedsUserGesture(true);
        setIsPlaying(false);
      }
    };

    void tryPlay();
  }, [ready]);

  useEffect(() => {
    if (!needsUserGesture || !audioRef.current) return;

    const audio = audioRef.current;
    const resumeOnFirstGesture = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setNeedsUserGesture(false);
      } catch {
        // Keep waiting for the next user gesture.
        setIsPlaying(false);
      }
    };

    window.addEventListener("pointerdown", resumeOnFirstGesture, { once: true });
    return () => window.removeEventListener("pointerdown", resumeOnFirstGesture);
  }, [needsUserGesture]);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
        setNeedsUserGesture(false);
      } catch {
        setNeedsUserGesture(true);
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  return (
    <>
      <MatrixPreloader onDone={() => setReady(true)} />
      <audio ref={audioRef} src={backsound} loop preload="auto" />

      {ready && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
          style={{ willChange: "opacity" }}
        >
          <motion.div
            style={{
              y: heroY,
              scale: heroScale,
              opacity: heroOpacity,
              willChange: "transform, opacity",
            }}
            className="relative z-10"
          >
            <Hero3D />
            {/* Mist overlay that fades away smoothly */}
            <motion.div
              style={{ opacity: mistOpacity }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40 pointer-events-none z-20"
            />
          </motion.div>

          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 bg-background -mt-24 rounded-t-[3rem] md:rounded-t-[4rem] shadow-2xl"
            style={{ willChange: "transform" }}
          >
            <Chapters />
            <Achievements />
            <MessageOfLove />
            <MomentsGallery />
            <Enter3DButton onClick={() => setShow3D(true)} />
            <HeartCollage />
            <Footer />
          </motion.div>

          <button
            onClick={toggleAudio}
            className="fixed bottom-5 right-5 z-[120] flex items-center gap-2 px-3 py-2 bg-black/70 text-white border border-white/30 backdrop-blur-md hover:bg-black/85 transition-colors"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-[11px] tracking-[0.2em] uppercase">{isPlaying ? "Music On" : "Music Off"}</span>
          </button>
        </motion.div>
      )}

      <Memory3DExperience open={show3D} onClose={() => setShow3D(false)} />
    </>
  );
}
