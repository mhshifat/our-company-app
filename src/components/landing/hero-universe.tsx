"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, useTexture } from "@react-three/drei";
import { Suspense, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";
import { SkillsHorizon } from "./skills-horizon";

const EARTH_MAP = "/textures/earth_daymap.jpg";

function EarthGlobe() {
  const spin = useRef<Group>(null);
  const { gl } = useThree();
  const map = useTexture(EARTH_MAP);
  map.colorSpace = THREE.SRGBColorSpace;
  useLayoutEffect(() => {
    map.anisotropy = Math.min(12, gl.capabilities.getMaxAnisotropy());
  }, [gl, map]);

  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={spin} position={[0, -0.52, 0]} scale={1.72}>
      <group rotation={[0.22, 0.12, 0]}>
        <mesh scale={1.04}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshBasicMaterial
            color="#5b8cff"
            transparent
            opacity={0.12}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            map={map}
            roughness={0.58}
            metalness={0.06}
          />
        </mesh>
      </group>
    </group>
  );
}

const BG = "#020208";

export function HeroUniverse() {
  return (
    <div className="relative h-[min(74vh,680px)] w-full min-h-[460px] overflow-hidden rounded-2xl md:min-h-[520px] md:rounded-[1.35rem]">
      <Canvas
        camera={{ position: [0, 0.35, 5.35], fov: 39 }}
        gl={{ alpha: false, antialias: true, powerPreference: "high-performance" }}
        className="absolute inset-0 size-full"
        dpr={[1, 2]}
      >
        <color attach="background" args={[BG]} />
        <ambientLight intensity={0.22} />
        <directionalLight position={[8, 5, 7]} intensity={1.45} color="#ffffff" />
        <directionalLight position={[-6, -1, -5]} intensity={0.4} color="#7dd3fc" />
        <pointLight position={[2, 3, 3]} intensity={0.45} color="#c4b5fd" />
        <Suspense fallback={null}>
          <Stars
            radius={260}
            depth={72}
            count={9000}
            factor={4.2}
            saturation={0}
            fade
            speed={0.22}
          />
          <EarthGlobe />
        </Suspense>
      </Canvas>

      <SkillsHorizon />

      <div
        className="pointer-events-none absolute inset-0 z-[4] rounded-[inherit] shadow-[inset_0_0_100px_rgba(0,0,0,0.35)]"
        aria-hidden
      />
      <p className="pointer-events-none absolute bottom-4 left-0 right-0 z-[5] text-center text-xs text-zinc-500">
        Spinning Earth · we ship worldwide
      </p>
    </div>
  );
}
