import { Canvas } from '@react-three/fiber';
import { Environment, Float, Sparkles, PerspectiveCamera } from '@react-three/drei';
import BlackCat from './BlackCat';

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#0f1115']} />
      <fog attach="fog" args={['#0f1115', 5, 15]} />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      {/* Neon Rim Lights */}
      <spotLight position={[-5, 5, -5]} intensity={50} color="#a855f7" distance={20} angle={0.5} penumbra={1} />
      <spotLight position={[5, -5, -5]} intensity={50} color="#2dd4bf" distance={20} angle={0.5} penumbra={1} />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Floating Particles in background */}
      <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.2} color="#a855f7" />

      {/* The main 3D object */}
      <Float
        speed={1} 
        rotationIntensity={0.2} 
        floatIntensity={0.5} 
        floatingRange={[-0.1, 0.1]}
      >
        <group position={[1.5, 0, 0]}>
          <BlackCat scale={0.8} />
        </group>
      </Float>
    </Canvas>
  );
}
