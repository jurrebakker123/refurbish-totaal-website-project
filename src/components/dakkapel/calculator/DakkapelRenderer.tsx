
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface DakkapelRendererProps {
  breedte: number;  // in cm
  hoogte: number;   // in cm
  type?: 'prefab' | 'maatwerk' | 'renovatie';
  materiaal?: 'kunststof' | 'hout' | 'aluminium';
}

function DakkapelModel({ breedte, hoogte, materiaal = 'kunststof' }: DakkapelRendererProps) {
  const dakkapelRef = useRef<THREE.Group>(null);
  
  // Normalize dimensions for the 3D model
  const width = breedte / 300; // Scale down to fit in scene
  const height = hoogte / 300;
  
  // Set material color based on selection
  let dakkapelColor;
  switch(materiaal) {
    case 'hout':
      dakkapelColor = '#b5651d';
      break;
    case 'aluminium':
      dakkapelColor = '#a8a8a8';
      break;
    case 'kunststof':
    default:
      dakkapelColor = '#ffffff';
  }
  
  // Basic animation
  useFrame(() => {
    if (dakkapelRef.current) {
      dakkapelRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={dakkapelRef}>
      {/* Roof base */}
      <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Dakkapel base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, height, 0.5]} />
        <meshStandardMaterial color={dakkapelColor} />
      </mesh>
      
      {/* Window */}
      <mesh position={[0, 0, 0.26]}>
        <boxGeometry args={[width * 0.8, height * 0.7, 0.05]} />
        <meshStandardMaterial color="#a5d8ff" transparent opacity={0.7} />
      </mesh>
      
      {/* Window frame */}
      <mesh position={[0, 0, 0.26]}>
        <boxGeometry args={[width * 0.85, height * 0.75, 0.01]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  );
}

export function DakkapelRenderer({ breedte, hoogte, type, materiaal }: DakkapelRendererProps) {
  return (
    <div className="w-full h-full min-h-[250px] bg-gray-50 rounded-md overflow-hidden">
      <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <DakkapelModel 
          breedte={breedte} 
          hoogte={hoogte}
          type={type} 
          materiaal={materiaal}
        />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
