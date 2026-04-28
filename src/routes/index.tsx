import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MatrixPreloader } from "@/components/MatrixPreloader";
import { Hero3D } from "@/components/Hero3D";
import { Chapters } from "@/components/Chapters";
import { Achievements } from "@/components/Achievements";
import { MessageOfLove } from "@/components/MessageOfLove";
import { MomentsGallery } from "@/components/MomentsGallery";
import { HeartCollage, Footer } from "@/components/HeartCollage";
import { Memory3DExperience, Enter3DButton } from "@/components/Memory3DExperience";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "18 Years of Wonders — A Digital Tribute" },
      {
        name: "description",
        content:
          "An immersive tribute experience: futuristic, sentimental, and unforgettable. Scroll through chapters, moments, and a message of love.",
      },
    ],
  }),
});

function Index() {
  const [ready, setReady] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const { scrollYProgress } = useScroll();
  // Smoother, longer transition window for the dark→light handoff
  const heroY = useTransform(scrollYProgress, [0, 0.18], ["0%", "-15%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0.08, 0.2], [1, 0]);

  return (
    <>
      <MatrixPreloader onDone={() => setReady(true)} />

      {ready && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
          style={{ willChange: "opacity" }}
        >
          <motion.div
            style={{ y: heroY, scale: heroScale, opacity: heroOpacity, willChange: "transform, opacity" }}
            className="sticky top-0 z-10"
          >
            <Hero3D />
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
        </motion.div>
      )}

      <Memory3DExperience open={show3D} onClose={() => setShow3D(false)} />
    </>
  );
}
