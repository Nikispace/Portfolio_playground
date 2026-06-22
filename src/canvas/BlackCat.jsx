import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function BlackCat(props) {
  const catRef = useRef();
  const headRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const orbRef = useRef();

  // Materials
  // Shiny, smooth black material for the classic round cat body
  const catMaterial = new THREE.MeshStandardMaterial({
    color: '#08080a',
    roughness: 0.15,
    metalness: 0.8,
  });

  // Pink/magenta glowing material for the eyes
  const eyeMaterial = new THREE.MeshStandardMaterial({
    color: '#ff4df0', // Vibrant pink/magenta
    emissive: '#ff4df0',
    emissiveIntensity: 2.5,
    toneMapped: false,
  });

  // Low-shine dark material for the nose
  const noseMaterial = new THREE.MeshStandardMaterial({
    color: '#111111',
    roughness: 0.8,
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollY = window.scrollY;

    // 1. Idle Bobbing & Scroll Rotation
    if (catRef.current) {
      catRef.current.position.y = Math.sin(time * 2) * 0.08;
      
      // Smoothly rotate the whole cat based on page scroll
      const targetRotationY = scrollY * 0.002;
      catRef.current.rotation.y = THREE.MathUtils.lerp(catRef.current.rotation.y, targetRotationY, 0.05);
    }

    // 2. Cursor Tracking
    if (headRef.current) {
      // Smoothly rotate the head towards the cursor
      const targetRotY = state.mouse.x * 0.45;
      const targetRotX = -state.mouse.y * 0.35;
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.08);
    }

    // 3. Blinking Mechanic
    // Blink every ~4 seconds
    const blinkCycle = time % 4;
    // Scale eyes vertically to simulate blinking
    const targetScaleY = (blinkCycle > 3.8 && blinkCycle < 3.95) ? 0.1 : 1.0;
    
    if (leftEyeRef.current) {
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, targetScaleY, 0.3);
    }
    if (rightEyeRef.current) {
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, targetScaleY, 0.3);
    }

    // 4. Floating Orb Orbit
    if (orbRef.current) {
      orbRef.current.position.x = Math.sin(time * 1.2) * 1.4;
      orbRef.current.position.z = Math.cos(time * 1.2) * 1.4;
      orbRef.current.position.y = Math.sin(time * 2.0) * 0.15 + 0.3; // subtle vertical bobbing
    }
  });

  return (
    <group ref={catRef} {...props} dispose={null}>
      {/* Body Capsule */}
      <mesh material={catMaterial} position={[0, -0.9, 0]}>
        <capsuleGeometry args={[0.6, 1.2, 8, 32]} />
      </mesh>

      {/* Head Group */}
      <group ref={headRef} position={[0, 0.5, 0.1]}>
        {/* Head Base Sphere */}
        <mesh material={catMaterial}>
          <sphereGeometry args={[0.7, 32, 32]} />
        </mesh>
        
        {/* Left Ear Cone */}
        <mesh material={catMaterial} position={[-0.4, 0.5, 0]} rotation={[0, 0, 0.35]}>
          <coneGeometry args={[0.18, 0.55, 32]} />
        </mesh>
        
        {/* Right Ear Cone */}
        <mesh material={catMaterial} position={[0.4, 0.5, 0]} rotation={[0, 0, -0.35]}>
          <coneGeometry args={[0.18, 0.55, 32]} />
        </mesh>

        {/* Left Eye Sphere */}
        <mesh ref={leftEyeRef} material={eyeMaterial} position={[-0.28, 0.12, 0.58]} rotation={[0, -0.15, 0]}>
          <sphereGeometry args={[0.13, 32, 32]} />
        </mesh>
        
        {/* Right Eye Sphere */}
        <mesh ref={rightEyeRef} material={eyeMaterial} position={[0.28, 0.12, 0.58]} rotation={[0, 0.15, 0]}>
          <sphereGeometry args={[0.13, 32, 32]} />
        </mesh>

        {/* Small Nose Sphere */}
        <mesh material={noseMaterial} position={[0, -0.05, 0.65]}>
          <sphereGeometry args={[0.07, 16, 16]} />
        </mesh>
      </group>

      {/* Base Sitting Platform Cylinder */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.3, 0.2, 32]} />
        <meshStandardMaterial color="#111115" roughness={0.7} />
      </mesh>
      
      {/* Platform Teal Glow Ring */}
      <mesh position={[0, -1.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.58, 1.63, 64]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.6} />
      </mesh>

      {/* Tilted Ring around body (Waist) */}
      <mesh position={[0, -0.6, 0]} rotation={[1.1, 0.4, 0.2]}>
        <torusGeometry args={[0.9, 0.02, 16, 100]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.7} />
      </mesh>

      {/* Floating Orbiting White Moon/Orb */}
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
