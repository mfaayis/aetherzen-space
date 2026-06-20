"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 1000 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const light = useRef<THREE.PointLight>(null);
  const { mouse } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Generate random positions
  const particles = useMemo(() => {
    // eslint-disable-next-line react-hooks/purity
    const temp = [];
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      const t = Math.random() * 100;
      // eslint-disable-next-line react-hooks/purity
      const factor = 20 + Math.random() * 100;
      // eslint-disable-next-line react-hooks/purity
      const speed = 0.01 + Math.random() / 200;
      // eslint-disable-next-line react-hooks/purity
      const xFactor = -50 + Math.random() * 100;
      // eslint-disable-next-line react-hooks/purity
      const yFactor = -50 + Math.random() * 100;
      // eslint-disable-next-line react-hooks/purity
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    // Make particles slowly rotate and move
    particles.forEach((particle, i) => {
      let { t } = particle;
      const { factor, speed, xFactor, yFactor, zFactor } = particle;
      
      // Update time
      t = particle.t += speed / 2;
      
      // Calculate position
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      // Add subtle mouse interaction
      particle.mx += (mouse.x * 10 - particle.mx) * 0.01;
      particle.my += (mouse.y * 10 - particle.my) * 0.01;
      
      // Update dummy object
      dummy.position.set(
        (particle.mx / 10) + a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) + b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) + b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
    
    // Make light follow mouse smoothly
    if (light.current) {
      light.current.position.x += (mouse.x * 20 - light.current.position.x) * 0.05;
      light.current.position.y += (mouse.y * 20 - light.current.position.y) * 0.05;
    }
  });

  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="#ffffff" />
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.1} metalness={0.8} />
      </instancedMesh>
    </>
  );
}

export function Background3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check immediately on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null; // Save battery and memory on mobile

  return (
    <div className="fixed inset-0 z-[-1] bg-background pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <Particles count={200} />
      </Canvas>
    </div>
  );
}
