
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import * as THREE from 'three';
import { DakkapelConfiguration, DakkapelType } from './DakkapelCalculator';

interface DakkapelRendererProps {
  configuration?: DakkapelConfiguration;
  breedte?: number;  // in cm
  hoogte?: number;   // in cm
  type?: DakkapelType;
  materiaal?: 'kunststof' | 'hout' | 'aluminium';
  aantalRamen?: number;
  kleurKozijnen?: string;
  kleurZijkanten?: string;
  showZonwering?: boolean;
  showRolluik?: boolean;
  dakHelling?: number; // Added dakHelling prop
}

function getColorHex(colorName: string = 'wit'): string {
  const colorMap: Record<string, string> = {
    'wit': '#ffffff',
    'crème': '#f5f5dc',
    'grijs': '#808080',
    'antraciet': '#383838',
    'zwart': '#000000',
  };
  return colorMap[colorName] || '#ffffff';
}

function DakkapelModel({ 
  breedte = 300, 
  hoogte = 175, 
  materiaal = 'kunststof',
  aantalRamen = 2,
  type = 'typeC',
  kleurKozijnen = 'wit',
  kleurZijkanten = 'wit',
  showZonwering = false,
  showRolluik = false,
  dakHelling = 45 // Default value
}: DakkapelRendererProps) {
  const dakkapelRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Set camera position based on dakkapel size
  useEffect(() => {
    camera.position.z = Math.max(2.5, breedte / 300);
  }, [breedte, camera]);
  
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

  const kozijnenColor = getColorHex(kleurKozijnen);
  const zijkantenColor = getColorHex(kleurZijkanten);
  
  // Basic animation
  useFrame(() => {
    if (dakkapelRef.current) {
      dakkapelRef.current.rotation.y += 0.001;
    }
  });
  
  // Calculate window dimensions and positions based on number of windows and type
  const windowPositions: [number, number, number][] = [];
  const windowWidth = width * 0.8 / Math.max(aantalRamen, 1);
  
  // Determine window positions based on number of windows
  for (let i = 0; i < aantalRamen; i++) {
    const xPos = -width/2 + windowWidth/2 + i * windowWidth;
    windowPositions.push([xPos, 0, 0.26]);
  }

  // Convert dakHelling to radians for the 3D rendering
  const dakHellingRadians = (dakHelling * Math.PI) / 180;
  
  // Calculate the roof angle to visualize the dakHelling
  const roofAngle = Math.PI / 2 - dakHellingRadians;

  return (
    <group ref={dakkapelRef}>
      {/* Roof base with dynamic dakHelling */}
      <mesh position={[0, -0.5, 0]} rotation={[roofAngle, 0, 0]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Dakkapel base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, height, 0.5]} />
        <meshStandardMaterial color={zijkantenColor} />
      </mesh>
      
      {/* Front panel */}
      <mesh position={[0, 0, 0.25]}>
        <boxGeometry args={[width, height, 0.02]} />
        <meshStandardMaterial color={dakkapelColor} />
      </mesh>

      {/* Windows based on aantal ramen */}
      {windowPositions.map((pos, index) => (
        <group key={`window-${index}`} position={[pos[0], pos[1], pos[2]]}>
          {/* Window frame */}
          <mesh>
            <boxGeometry args={[windowWidth * 0.95, height * 0.7, 0.03]} />
            <meshStandardMaterial color={kozijnenColor} />
          </mesh>
          
          {/* Window glass */}
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[windowWidth * 0.85, height * 0.6, 0.01]} />
            <meshStandardMaterial color="#a5d8ff" transparent opacity={0.7} />
          </mesh>
        </group>
      ))}
      
      {/* Zonwering if selected */}
      {showZonwering && (
        <mesh position={[0, height/2 + 0.1, 0.3]}>
          <boxGeometry args={[width, 0.1, 0.6]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
      )}
      
      {/* Electric rolluik if selected */}
      {showRolluik && (
        <group>
          <mesh position={[0, height/2 + 0.05, 0.3]}>
            <boxGeometry args={[width, 0.08, 0.1]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          {/* Partially rolled down shutter */}
          <mesh position={[0, height/4, 0.26]}>
            <boxGeometry args={[width, height/2, 0.01]} />
            <meshStandardMaterial color="#dddddd" />
          </mesh>
        </group>
      )}
    </group>
  );
}

export function DakkapelRenderer({ 
  configuration, 
  breedte, 
  hoogte, 
  type, 
  materiaal,
  aantalRamen,
  kleurKozijnen,
  kleurZijkanten,
  showZonwering,
  showRolluik,
  dakHelling
}: DakkapelRendererProps) {
  // If configuration is provided, use its values; otherwise use individual props
  const effectiveBreedte = configuration?.breedte || breedte || 300;
  const effectiveHoogte = configuration?.hoogte || hoogte || 175;
  const effectiveType = configuration?.type || type || 'typeC';
  const effectiveMateriaal = configuration?.materiaal || materiaal || 'kunststof';
  const effectiveAantalRamen = configuration?.aantalRamen || aantalRamen || 2;
  const effectiveKleurKozijnen = configuration?.kleurKozijnen || kleurKozijnen || 'wit';
  const effectiveKleurZijkanten = configuration?.kleurZijkanten || kleurZijkanten || 'wit';
  const effectiveShowZonwering = configuration?.opties?.zonwering || showZonwering || false;
  const effectiveShowRolluik = configuration?.opties?.elektrisch_rolluik || showRolluik || false;
  const effectiveDakHelling = configuration?.dakHelling || dakHelling || 45;

  return (
    <div className="w-full h-full min-h-[300px] bg-gray-50 rounded-md overflow-hidden">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, 5, -5]} intensity={0.4} />
        <Center>
          <DakkapelModel 
            breedte={effectiveBreedte} 
            hoogte={effectiveHoogte}
            type={effectiveType} 
            materiaal={effectiveMateriaal}
            aantalRamen={effectiveAantalRamen}
            kleurKozijnen={effectiveKleurKozijnen}
            kleurZijkanten={effectiveKleurZijkanten}
            showZonwering={effectiveShowZonwering}
            showRolluik={effectiveShowRolluik}
            dakHelling={effectiveDakHelling}
          />
        </Center>
        <OrbitControls 
          enableZoom={true}
          maxZoom={5}
          minZoom={1.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 8}
        />
      </Canvas>
    </div>
  );
}
