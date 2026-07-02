import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function DriftingForm() {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.02;
    meshRef.current.rotation.y = t * 0.035;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshStandardMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.035}
        roughness={1}
      />
    </mesh>
  );
}

/**
 * Fixed, full-viewport, non-interactive canvas that sits behind everything.
 * Purely atmospheric: a faint wireframe form with soft directional light,
 * giving the matte-black background a hint of depth without ever
 * competing with the card in the foreground.
 */
export default function DepthField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[3, 2, 4]} intensity={0.25} />
        <DriftingForm />
      </Canvas>
    </div>
  );
}
