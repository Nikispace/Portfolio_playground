import { Canvas } from '@react-three/fiber';
import { Environment, Float, Sparkles, ContactShadows } from '@react-three/drei';
import BlackCat from './BlackCat';

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 2]} // Support high-DPI displays for sharp rendering
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#0f1115']} />
      <fog attach="fog" args={['#0f1115', 5, 20]} />

      {/* Cinematic Lighting Setup */}
      {/* Very soft ambient light */}
      <ambientLight intensity={0.2} />
      
      {/* Key Light (White/Neutral) */}
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      
      {/* Strong Rim Light 1 (Neon Purple) */}
      <spotLight 
        position={[-5, 5, -5]} 
        intensity={80} 
        color="#a855f7" 
        distance={25} 
        angle={0.6} 
        penumbra={1} 
      />
      
      {/* Strong Rim Light 2 (Neon Teal) */}
      <spotLight 
        position={[5, -5, -5]} 
        intensity={60} 
        color="#2dd4bf" 
        distance={25} 
        angle={0.6} 
        penumbra={1} 
      />

      {/* High Quality Environment Reflections */}
      <Environment preset="city" />

      {/* Atmospheric Sparkles */}
      <Sparkles count={80} scale={10} size={2.5} speed={0.2} opacity={0.3} color="#a855f7" />
      <Sparkles count={40} scale={10} size={1.5} speed={0.4} opacity={0.4} color="#2dd4bf" />

      {/* The main 3D object */}
      <Float
        speed={1.5} 
        rotationIntensity={0.2} 
        floatIntensity={0.4} 
        floatingRange={[-0.1, 0.1]}
      >
        <group position={[1.5, 0, 0]}>
          <BlackCat scale={0.9} />
          {/* Ground shadow for grounding the floating scene */}
          <ContactShadows position={[0, -2.2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#000000" />
        </group>
      </Float>
    </Canvas>
  );
}
