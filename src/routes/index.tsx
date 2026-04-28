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
  const { scrollYProgress } = useScroll();
  // Hero recedes upward as user scrolls past first viewport
  const heroY = useTransform(scrollYProgress, [0, 0.12], ["0%", "-20%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0.05, 0.13], [1, 0]);

  return (
    <>
      <MatrixPreloader onDone={() => setReady(true)} />

      {ready && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Hero stays sticky through transition */}
          <motion.div
            style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
            className="sticky top-0 z-10"
          >
            <Hero3D />
          </motion.div>

          {/* Editorial rises */}
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-20 bg-background -mt-24 rounded-t-[3rem] md:rounded-t-[4rem] shadow-2xl"
          >
            <Chapters />
            <Achievements />
            <MessageOfLove />
            <MomentsGallery />
            <HeartCollage />
            <Footer />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
