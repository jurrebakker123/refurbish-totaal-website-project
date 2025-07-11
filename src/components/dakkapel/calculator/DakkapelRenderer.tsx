
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Plane } from '@react-three/drei';
import { DakkapelConfiguration } from './DakkapelCalculator';
import * as THREE from 'three';

interface DakkapelRendererProps {
  configuration: DakkapelConfiguration;
}

function DakkapelModel({ configuration }: { configuration: DakkapelConfiguration }) {
  const groupRef = useRef<THREE.Group>(null);

  // Convert cm to meters for 3D scene (scale down for better visualization)
  const width = configuration.breedte / 200; // Scale down by factor of 200
  const height = configuration.hoogte / 200;
  const depth = configuration.diepte / 200;

  // Color mapping
  const getColor = (colorName: string) => {
    const colorMap: Record<string, string> = {
      wit: '#ffffff',
      crème: '#fff4e0',
      grijs: '#6b7280',
      antraciet: '#374151',
      zwart: '#000000',
      staalblauw: '#1e40af',
      dennengroen: '#065f46'
    };
    return colorMap[colorName] || '#ffffff';
  };

  const frameColor = getColor(configuration.kleurKozijnen);
  const sideColor = getColor(configuration.kleurZijkanten);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Roof */}
      <Box
        args={[width, 0.1, depth]}
        position={[0, height + 0.05, 0]}
      >
        <meshStandardMaterial color="#8b4513" />
      </Box>
      
      {/* Left wall */}
      <Box
        args={[0.1, height, depth]}
        position={[-width/2, height/2, 0]}
      >
        <meshStandardMaterial color={sideColor} />
      </Box>
      
      {/* Right wall */}
      <Box
        args={[0.1, height, depth]}
        position={[width/2, height/2, 0]}
      >
        <meshStandardMaterial color={sideColor} />
      </Box>
      
      {/* Front wall with window */}
      <Box
        args={[width, height, 0.1]}
        position={[0, height/2, depth/2]}
      >
        <meshStandardMaterial color={frameColor} />
      </Box>
      
      {/* Window (glass) */}
      <Box
        args={[width * 0.8, height * 0.8, 0.05]}
        position={[0, height/2, depth/2 + 0.05]}
      >
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} />
      </Box>
    </group>
  );
}

export function DakkapelRenderer({ configuration }: DakkapelRendererProps) {
  return (
    <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [3, 3, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <DakkapelModel configuration={configuration} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  );
}
