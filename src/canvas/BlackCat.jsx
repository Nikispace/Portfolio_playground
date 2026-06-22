import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function BlackCat(props) {
  const headGroup = useRef();
  const leftEyeGroup = useRef();
  const rightEyeGroup = useRef();
  const leftLid = useRef();
  const rightLid = useRef();
  
  // Materials
  // Faceted, high-contrast dark material for the low-poly head
  const headMaterial = new THREE.MeshStandardMaterial({
    color: '#0a0a0a',
    roughness: 0.4,
    metalness: 0.5,
    flatShading: true, // Creates the faceted/geometric look
  });

  // Base eyeball (sclera/shadow)
  const eyeBaseMaterial = new THREE.MeshStandardMaterial({
    color: '#050505',
    roughness: 0.8,
    flatShading: true,
  });

  // Golden glowing iris
  const irisMaterial = new THREE.MeshStandardMaterial({
    color: '#fbbf24', // Amber/Gold
    emissive: '#d97706',
    emissiveIntensity: 2,
    toneMapped: false,
    flatShading: true,
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Idle Motion (Breathing)
    // Subtle vertical bob and pitch rotation
    headGroup.current.position.y = Math.sin(time * 1.5) * 0.03;
    headGroup.current.rotation.x = Math.sin(time * 1.2) * 0.02;

    // 2. Eye Tracking (Cursor)
    // Map normalized mouse (-1 to 1) to constrained rotation angles
    // Max horizontal: ~15 deg (0.26 rad), Max vertical: ~10 deg (0.17 rad)
    const targetRotX = THREE.MathUtils.clamp(-state.mouse.y * 0.3, -0.17, 0.17);
    const targetRotY = THREE.MathUtils.clamp(state.mouse.x * 0.4, -0.26, 0.26);

    // Smoothly interpolate eye rotation
    leftEyeGroup.current.rotation.x = THREE.MathUtils.lerp(leftEyeGroup.current.rotation.x, targetRotX, 0.1);
    leftEyeGroup.current.rotation.y = THREE.MathUtils.lerp(leftEyeGroup.current.rotation.y, targetRotY, 0.1);
    
    rightEyeGroup.current.rotation.x = THREE.MathUtils.lerp(rightEyeGroup.current.rotation.x, targetRotX, 0.1);
    rightEyeGroup.current.rotation.y = THREE.MathUtils.lerp(rightEyeGroup.current.rotation.y, targetRotY, 0.1);

    // 3. Blinking Mechanic
    // Blink every ~4 seconds
    const blinkCycle = time % 4;
    // When blinkCycle is between 3.8 and 3.9, close lids
    if (blinkCycle > 3.8 && blinkCycle < 3.95) {
      leftLid.current.scale.y = THREE.MathUtils.lerp(leftLid.current.scale.y, 0, 0.4);
      rightLid.current.scale.y = THREE.MathUtils.lerp(rightLid.current.scale.y, 0, 0.4);
    } else {
      leftLid.current.scale.y = THREE.MathUtils.lerp(leftLid.current.scale.y, 1, 0.2);
      rightLid.current.scale.y = THREE.MathUtils.lerp(rightLid.current.scale.y, 1, 0.2);
    }
  });

  return (
    <group {...props} dispose={null}>
      <group ref={headGroup} position={[0, -0.2, 0]}>
        
        {/* --- GEOMETRIC HEAD --- */}
        {/* Main upper skull (Icosahedron for low-poly facets) */}
        <mesh material={headMaterial} position={[0, 0, 0]}>
          <icosahedronGeometry args={[1, 1]} />
        </mesh>

        {/* Snout/Muzzle */}
        <mesh material={headMaterial} position={[0, -0.4, 0.8]} rotation={[-0.2, 0, 0]}>
          <coneGeometry args={[0.5, 0.8, 4]} />
        </mesh>
        
        {/* Lower Jaw */}
        <mesh material={headMaterial} position={[0, -0.7, 0.6]} rotation={[0.4, 0, 0]}>
          <coneGeometry args={[0.4, 0.5, 4]} />
        </mesh>

        {/* Cheeks */}
        <mesh material={headMaterial} position={[-0.6, -0.2, 0.4]} rotation={[0, 0.2, 0.4]}>
          <tetrahedronGeometry args={[0.6]} />
        </mesh>
        <mesh material={headMaterial} position={[0.6, -0.2, 0.4]} rotation={[0, -0.2, -0.4]}>
          <tetrahedronGeometry args={[0.6]} />
        </mesh>

        {/* Left Ear */}
        <mesh material={headMaterial} position={[-0.6, 0.8, -0.2]} rotation={[0.1, 0.2, 0.3]}>
          <coneGeometry args={[0.4, 1.2, 3]} />
        </mesh>

        {/* Right Ear */}
        <mesh material={headMaterial} position={[0.6, 0.8, -0.2]} rotation={[0.1, -0.2, -0.3]}>
          <coneGeometry args={[0.4, 1.2, 3]} />
        </mesh>

        {/* Tiny geometric nose tip */}
        <mesh position={[0, -0.4, 1.22]} rotation={[0.4, 0, 0]}>
          <tetrahedronGeometry args={[0.1]} />
          <meshStandardMaterial color="#222" flatShading />
        </mesh>


        {/* --- EYES --- */}
        {/* Left Eye Socket Context */}
        <group position={[-0.4, 0.1, 0.75]}>
          {/* Eye tracking group */}
          <group ref={leftEyeGroup}>
            {/* Dark Eyeball Base */}
            <mesh material={eyeBaseMaterial}>
              <sphereGeometry args={[0.22, 16, 16]} />
            </mesh>
            {/* Golden Iris (protrudes slightly forward) */}
            <mesh material={irisMaterial} position={[0, 0, 0.18]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.05, 16]} />
            </mesh>
            {/* Dark Vertical Pupil */}
            <mesh position={[0, 0, 0.21]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.05, 8]} />
              <meshBasicMaterial color="#000" />
            </mesh>
          </group>
          {/* Blinking Lid (scales Y to hide eye) */}
          <mesh ref={leftLid}>
            {/* A slightly larger black sphere with an open front, scaled to simulate lids */}
            <sphereGeometry args={[0.24, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#0a0a0a" flatShading side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Right Eye Socket Context */}
        <group position={[0.4, 0.1, 0.75]}>
          {/* Eye tracking group */}
          <group ref={rightEyeGroup}>
            <mesh material={eyeBaseMaterial}>
              <sphereGeometry args={[0.22, 16, 16]} />
            </mesh>
            <mesh material={irisMaterial} position={[0, 0, 0.18]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.05, 16]} />
            </mesh>
            <mesh position={[0, 0, 0.21]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.05, 8]} />
              <meshBasicMaterial color="#000" />
            </mesh>
          </group>
          {/* Blinking Lid */}
          <mesh ref={rightLid}>
            <sphereGeometry args={[0.24, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#0a0a0a" flatShading side={THREE.DoubleSide} />
          </mesh>
        </group>

      </group>
    </group>
  );
}
