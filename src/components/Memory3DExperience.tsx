import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Sparkles } from "lucide-react";
import * as THREE from "three";
import p1 from "@/assets/photo-1.jpg";
import p2 from "@/assets/photo-2.jpg";
import p3 from "@/assets/photo-3.jpg";
import p4 from "@/assets/photo-4.jpg";
import p5 from "@/assets/photo-5.jpg";
import p6 from "@/assets/photo-6.jpg";
import p7 from "@/assets/photo-7.jpg";
import p8 from "@/assets/photo-8.jpg";

const PHOTOS = [
  { src: p1, caption: "Golden hour" },
  { src: p2, caption: "Make a wish" },
  { src: p3, caption: "Stargazing" },
  { src: p4, caption: "Sunset drive" },
  { src: p5, caption: "Summer days" },
  { src: p6, caption: "Confetti rain" },
  { src: p7, caption: "Coffee talks" },
  { src: p8, caption: "Quiet moments" },
];

// Fibonacci sphere placement for even distribution around the orb
function spherePoints(n: number, radius: number) {
  const pts: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return pts;
}

function GlowingCore() {
  const inner = useRef<THREE.Points>(null);
  const count = 2500;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.0 + Math.random() * 0.25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, dt) => {
    if (inner.current) {
      inner.current.rotation.y += dt * 0.1;
      inner.current.rotation.x += dt * 0.04;
    }
  });

  return (
    <group>
      {/* Bright glowing core sphere — picked up by Bloom */}
      <mesh>
        <sphereGeometry args={[0.55, 48, 48]} />
        <meshBasicMaterial color={new THREE.Color(8, 0.6, 1.6)} toneMapped={false} />
      </mesh>
      {/* Outer pink particle shell */}
      <points ref={inner}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color={new THREE.Color(4, 0.4, 1.2)}
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
}

type FloatingPhotoProps = {
  position: [number, number, number];
  src: string;
  caption: string;
  index: number;
  onSelect: (i: number, pos: THREE.Vector3) => void;
};

function FloatingPhoto({ position, src, caption, index, onSelect }: FloatingPhotoProps) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const t = loader.load(src);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [src]);

  useFrame(({ camera, clock }) => {
    if (!ref.current) return;
    // Always face the camera (billboard)
    ref.current.lookAt(camera.position);
    // Subtle floating motion
    const t = clock.elapsedTime + index;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.04;
    const scale = hovered ? 1.18 : 1;
    ref.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.12);
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(index, ref.current!.position.clone());
      }}
    >
      <planeGeometry args={[0.55, 0.55]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
      {hovered && (
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div className="font-script text-white text-lg whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,40,120,0.9)]">
            {caption}
          </div>
        </Html>
      )}
    </mesh>
  );
}

const HOME_POS = new THREE.Vector3(0, 0, 5.5);
const HOME_TARGET = new THREE.Vector3(0, 0, 0);

function CameraRig({
  focus,
  onArrived,
}: {
  focus: { pos: THREE.Vector3; target: THREE.Vector3 } | null;
  onArrived: () => void;
}) {
  const { camera } = useThree();
  const controls = useRef<any>(null);
  const arrived = useRef(false);

  useFrame(() => {
    const targetPos = focus ? focus.pos : HOME_POS;
    const lookTarget = focus ? focus.target : HOME_TARGET;
    camera.position.lerp(targetPos, 0.06);
    if (controls.current) {
      controls.current.target.lerp(lookTarget, 0.08);
      controls.current.update();
    }
    const dist = camera.position.distanceTo(targetPos);
    if (focus && dist < 0.05 && !arrived.current) {
      arrived.current = true;
      onArrived();
    }
    if (!focus) arrived.current = false;
  });

  return (
    <OrbitControls
      ref={controls}
      enablePan
      enableZoom
      enableRotate
      enabled={!focus}
      minDistance={2}
      maxDistance={14}
      dampingFactor={0.08}
    />
  );
}

export function Memory3DExperience({ open, onClose }: { open: boolean; onClose: () => void }) {
  const positions = useMemo(() => spherePoints(PHOTOS.length, 2.6), []);
  const [focus, setFocus] = useState<{ pos: THREE.Vector3; target: THREE.Vector3; index: number } | null>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleSelect = (i: number, photoPos: THREE.Vector3) => {
    // Place camera 1.4 units away from the photo, looking at it
    const dir = photoPos.clone().normalize();
    const camPos = photoPos.clone().add(dir.multiplyScalar(1.4));
    setFocus({ pos: camPos, target: photoPos.clone(), index: i });
  };

  const reset = () => setFocus(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 55 }}
            dpr={[1, 1.75]}
            gl={{ antialias: true, alpha: false }}
          >
            <color attach="background" args={["#04020a"]} />
            <fog attach="fog" args={["#04020a", 8, 20]} />
            <ambientLight intensity={0.25} />
            <pointLight position={[5, 5, 5]} color="#ff2a6d" intensity={2.4} />

            <Suspense fallback={null}>
              <Stars radius={60} depth={60} count={6000} factor={5} fade speed={0.4} />
              <GlowingCore />
              {PHOTOS.map((p, i) => (
                <FloatingPhoto
                  key={i}
                  index={i}
                  position={positions[i]}
                  src={p.src}
                  caption={p.caption}
                  onSelect={handleSelect}
                />
              ))}
            </Suspense>

            <CameraRig focus={focus} onArrived={() => {}} />

            <EffectComposer>
              <Bloom
                intensity={1.1}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
            </EffectComposer>
          </Canvas>

          {/* HUD */}
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col">
            <div className="flex items-center justify-between p-6 md:p-10">
              <div className="pointer-events-auto text-white/80 text-xs tracking-[0.4em] uppercase">
                <span className="text-neon">●</span> Memory Space
              </div>
              <div className="flex gap-3 pointer-events-auto">
                {focus && (
                  <button
                    onClick={reset}
                    className="flex items-center gap-2 px-4 py-2 border border-white/30 text-white text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-colors backdrop-blur-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset View
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-2 border border-white/30 text-white text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                  <X className="w-3.5 h-3.5" /> Exit
                </button>
              </div>
            </div>

            <div className="mt-auto p-6 md:p-10 text-white/60 text-xs tracking-[0.3em] uppercase text-center">
              {focus
                ? `“${PHOTOS[focus.index].caption}” — click reset to drift back`
                : "Drag to rotate · Scroll to zoom · Click a photo to focus"}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Enter3DButton({ onClick }: { onClick: () => void }) {
  return (
    <section className="relative bg-black py-24 md:py-32 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,40,120,0.2),transparent_60%)]" />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative text-xs tracking-[0.4em] text-neon uppercase mb-4"
      >
        — Interactive
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative font-serif italic text-4xl md:text-6xl text-white mb-10"
      >
        Step inside the memory space.
      </motion.h2>
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-red)] text-white text-sm tracking-[0.3em] uppercase shadow-neon"
        style={{ willChange: "transform" }}
      >
        <Sparkles className="w-4 h-4" /> Enter 3D Experience
      </motion.button>
    </section>
  );
}
