"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, type PointsProps, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense, useMemo } from "react";
import type { Points as PointsType } from "three";

/* 🔴 MOBILE DETECTION (SAFE & FINAL) */
const isMobile =
  typeof window !== "undefined" &&
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

/* ⭐ STAR FIELD (DESKTOP ONLY) */
function StarBackground(props: PointsProps) {
  const ref = useRef<PointsType | null>(null);

  const sphere = useMemo(
    () => random.inSphere(new Float32Array(5000), { radius: 1.2 }) as Float32Array,
    []
  );

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={sphere}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

/* 🌌 CANVAS WRAPPER */
export function StarsCanvas() {
  /* ❌ HARD STOP FOR MOBILE (NO GPU CRASH) */
  if (isMobile) return null;

  return (
   <div className="w-full h-auto fixed inset-0 -z-10 pointer-events-none">

      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]} // mobile-safe DPI
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
      </Canvas>
    </div>
  );
}
