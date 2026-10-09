
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import Hero3DScene from "./Hero3DScene";
import CameraRig from "./CameraRig";


export default function LandingScene() {
  return (
    <div className="absolute inset-0 -z-0">
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 8], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <CameraRig />
          <ambientLight intensity={0.35} />
          <directionalLight position={[5, 5, 2]} intensity={1} color="#e0f2fe" />
          <pointLight position={[-4, 2, 1]} intensity={0.8} color="#22d3ee" />
          <pointLight position={[3, -2, -1]} intensity={0.5} color="#a78bfa" />
          <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.35}>
            <Hero3DScene />
          </Float>
          <Environment preset="night" environmentIntensity={0.25} />
        </Canvas>
      </Suspense>
    </div>
  );
}