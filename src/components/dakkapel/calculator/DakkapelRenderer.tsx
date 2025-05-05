
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
  configuration
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

  // Check if extra options are enabled
  const hasVentilatie = configuration?.opties?.ventilatie || false;
  const hasGootafwerking = configuration?.opties?.gootafwerking || false;
  const hasExtraIsolatie = configuration?.opties?.extra_isolatie || false;
  const hasHorren = configuration?.opties?.horren || false;

  return (
    <group ref={dakkapelRef}>
      {/* Roof base */}
      <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Dakkapel base - thicker if extra insulation is selected */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, height, hasExtraIsolatie ? 0.6 : 0.5]} />
        <meshStandardMaterial color={zijkantenColor} />
      </mesh>
      
      {/* Front panel */}
      <mesh position={[0, 0, 0.25]}>
        <boxGeometry args={[width, height, 0.02]} />
        <meshStandardMaterial color={dakkapelColor} />
      </mesh>

      {/* Extra insulation indicator */}
      {hasExtraIsolatie && (
        <mesh position={[0, 0, -0.25]} rotation={[0, Math.PI, 0]}>
          <boxGeometry args={[width * 0.9, height * 0.9, 0.01]} />
          <meshStandardMaterial color="#FFE0B2" />
        </mesh>
      )}

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

          {/* Horren (insect screens) */}
          {hasHorren && (
            <mesh position={[0, 0, 0.035]}>
              <boxGeometry args={[windowWidth * 0.85, height * 0.6, 0.001]} />
              <meshStandardMaterial color="#e0e0e0" transparent opacity={0.5} wireframe={true} />
            </mesh>
          )}
        </group>
      ))}
      
      {/* Ventilatie system */}
      {hasVentilatie && (
        <group>
          <mesh position={[width/2 - 0.1, height/2 - 0.1, 0.25]}>
            <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} rotation={[Math.PI/2, 0, 0]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          <mesh position={[-width/2 + 0.1, height/2 - 0.1, 0.25]}>
            <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} rotation={[Math.PI/2, 0, 0]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
        </group>
      )}
      
      {/* Gootafwerking (gutter finish) */}
      {hasGootafwerking && (
        <mesh position={[0, height/2 + 0.03, 0.3]}>
          <boxGeometry args={[width + 0.1, 0.05, 0.2]} />
          <meshStandardMaterial color="#777777" />
        </mesh>
      )}
      
      {/* Zonwering if selected */}
      {showZonwering && (
        <mesh position={[0, height/2 + 0.1, 0.3]}>
          <boxGeometry args={[width, 0.1, 0.6]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
      )}
      
      {/* Improved Electric rolluik */}
      {showRolluik && (
        <group>
          {/* Rolluik housing box */}
          <mesh position={[0, height/2 + 0.08, 0.3]}>
            <boxGeometry args={[width + 0.05, 0.15, 0.2]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          
          {/* Rolluik slats - partially rolled down */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh 
              key={`rolluik-slat-${i}`} 
              position={[0, height/2 - 0.15 - (i * 0.06), 0.26]}
            >
              <boxGeometry args={[width, 0.04, 0.02]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#d0d0d0" : "#c0c0c0"} />
            </mesh>
          ))}
          
          {/* Side rails for rolluik */}
          <mesh position={[-width/2 - 0.02, height/4, 0.26]}>
            <boxGeometry args={[0.04, height/2, 0.04]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          <mesh position={[width/2 + 0.02, height/4, 0.26]}>
            <boxGeometry args={[0.04, height/2, 0.04]} />
            <meshStandardMaterial color="#555555" />
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
  showRolluik
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
            configuration={configuration}
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
