import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function BlackCat(props) {
  const catRef = useRef();
  const headRef = useRef();
  const { viewport, mouse } = useThree();
  
  // Custom material for the cat (shiny black)
  const catMaterial = new THREE.MeshStandardMaterial({
    color: '#0a0a0a',
    roughness: 0.2,
    metalness: 0.8,
  });

  // Emissive material for the eyes
  const eyeMaterial = new THREE.MeshStandardMaterial({
    color: '#a855f7', // accent purple
    emissive: '#a855f7',
    emissiveIntensity: 2,
    toneMapped: false
  });

  useFrame((state, delta) => {
    // Scroll-based Parallax & Rotation
    // Scroll ranges from 0 to 1 based on page scroll
    const scrollY = window.scrollY;
    
    // Float animation
    const t = state.clock.getElapsedTime();
    catRef.current.position.y = Math.sin(t * 2) * 0.1;
    
    // Smoothly rotate the whole cat based on scroll
    const targetRotationY = (scrollY * 0.002);
    catRef.current.rotation.y = THREE.MathUtils.lerp(catRef.current.rotation.y, targetRotationY, 0.05);

    // Head tracking the mouse cursor
    // Calculate target lookAt position based on mouse
    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;
    
    // Smoothly rotate head towards mouse
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, mouse.x * 0.5, 0.1);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -mouse.y * 0.5, 0.1);
  });

  return (
    <group ref={catRef} {...props} dispose={null}>
      {/* Body */}
      <mesh material={catMaterial} position={[0, -1, 0]}>
        <capsuleGeometry args={[0.6, 1.2, 4, 16]} />
      </mesh>

      {/* Head Group */}
      <group ref={headRef} position={[0, 0.5, 0.2]}>
        {/* Head Base */}
        <mesh material={catMaterial}>
          <sphereGeometry args={[0.7, 32, 32]} />
        </mesh>
        
        {/* Left Ear */}
        <mesh material={catMaterial} position={[-0.4, 0.5, 0]} rotation={[0, 0, 0.3]}>
          <coneGeometry args={[0.2, 0.6, 16]} />
        </mesh>
        
        {/* Right Ear */}
        <mesh material={catMaterial} position={[0.4, 0.5, 0]} rotation={[0, 0, -0.3]}>
          <coneGeometry args={[0.2, 0.6, 16]} />
        </mesh>

        {/* Left Eye */}
        <mesh material={eyeMaterial} position={[-0.3, 0.1, 0.65]} rotation={[0, -0.2, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
        </mesh>
        
        {/* Right Eye */}
        <mesh material={eyeMaterial} position={[0.3, 0.1, 0.65]} rotation={[0, 0.2, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
        </mesh>

        {/* Nose */}
        <mesh position={[0, -0.1, 0.7]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>

      {/* Floating platform/cube the cat sits on */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.2, 0.2, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      
      {/* Platform glow ring */}
      <mesh position={[0, -1.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.6, 1.65, 64]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
