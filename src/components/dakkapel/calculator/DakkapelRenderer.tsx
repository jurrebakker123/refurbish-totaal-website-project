
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import * as THREE from 'three';
import { DakkapelConfiguration, DakkapelType } from './DakkapelCalculator';

interface DakkapelRendererProps {
  configuration?: DakkapelConfiguration;
  breedte?: number;  // in cm
  hoogte?: number;   // in cm
  type?: DakkapelType;
  materiaal?: 'kunststof' | 'hout' | 'aluminium' | 'standaard' | 'kunststof_rabat' | 'kunststof_rabat_boeideel' | 'polyester_glad' | 'polyester_rabat';
  aantalRamen?: number;
  kleurKozijnen?: string;
  kleurZijkanten?: string;
  showZonwering?: boolean;
  showRolluik?: boolean;
  dakHelling?: number;
  showVentilatie?: boolean;
  showGootafwerking?: boolean;
  showExtraIsolatie?: boolean;
  showHorren?: boolean;
  showKaderDakkapel?: boolean;
}

function getColorHex(colorName: string = 'wit'): string {
  const colorMap: Record<string, string> = {
    'wit': '#ffffff',
    'crème': '#f5f5dc',
    'grijs': '#808080',
    'antraciet': '#383838',
    'zwart': '#000000',
    'staalblauw': '#0A2463',
    'dennengroen': '#0A3200',
  };
  return colorMap[colorName] || '#ffffff';
}

function getMaterialColor(materiaal: string = 'kunststof'): string {
  const materialMap: Record<string, string> = {
    'kunststof': '#ffffff',
    'hout': '#b5651d',
    'aluminium': '#a8a8a8',
    'standaard': '#f5f5f5',
    'kunststof_rabat': '#efefef',
    'kunststof_rabat_boeideel': '#eeeeee',
    'polyester_glad': '#f8f8f8',
    'polyester_rabat': '#f0f0f0',
  };
  return materialMap[materiaal] || '#ffffff';
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
  dakHelling = 45,
  showVentilatie = false,
  showGootafwerking = false,
  showExtraIsolatie = false,
  showHorren = false,
  showKaderDakkapel = false,
}: DakkapelRendererProps) {
  const dakkapelRef = useRef<THREE.Group>(null);
  const rolluikRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const [rolluikAnimation, setRolluikAnimation] = useState(0);
  const [rolluikDirection, setRolluikDirection] = useState(1);
  
  // Set camera position based on dakkapel size
  useEffect(() => {
    camera.position.z = Math.max(2.5, breedte / 300);
  }, [breedte, camera]);
  
  // Normalize dimensions for the 3D model
  const width = breedte / 300; // Scale down to fit in scene
  const height = hoogte / 300;
  
  // Set material color based on selection
  const dakkapelColor = getMaterialColor(materiaal);
  const kozijnenColor = getColorHex(kleurKozijnen);
  const zijkantenColor = getColorHex(kleurZijkanten);
  
  // Basic animation
  useFrame(({ clock }) => {
    if (dakkapelRef.current) {
      dakkapelRef.current.rotation.y += 0.001;
    }

    // Animate the rolluik if shown
    if (showRolluik && rolluikRef.current) {
      // Update the animation state (0 to 1 for up and down)
      setRolluikAnimation(prev => {
        const newValue = prev + 0.01 * rolluikDirection;
        
        // Change direction when reaching limits
        if (newValue >= 1) {
          setRolluikDirection(-1);
          return 1;
        } else if (newValue <= 0) {
          setRolluikDirection(1);
          return 0;
        }
        
        return newValue;
      });

      // Apply the animation to the rolluik scale
      rolluikRef.current.scale.y = 0.1 + rolluikAnimation * 0.9;
      rolluikRef.current.position.y = -height/2 + height * rolluikAnimation * 0.7;
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

      {/* Ventilation system if selected */}
      {showVentilatie && (
        <group position={[0, height/2 - 0.1, 0.26]}>
          <mesh>
            <boxGeometry args={[width * 0.8, 0.05, 0.02]} />
            <meshStandardMaterial color="#aaaaaa" />
          </mesh>
          {/* Ventilation grills */}
          {Array.from({ length: 10 }).map((_, i) => (
            <mesh key={`vent-${i}`} position={[-width * 0.35 + i * width * 0.08, 0, 0.02]}>
              <cylinderGeometry args={[0.01, 0.01, 0.05, 8]} />
              <meshStandardMaterial color="#555555" />
            </mesh>
          ))}
        </group>
      )}

      {/* Gutter finishing if selected */}
      {showGootafwerking && (
        <group position={[0, height/2 + 0.05, 0.2]}>
          <mesh>
            <boxGeometry args={[width + 0.1, 0.08, 0.1]} />
            <meshStandardMaterial color="#999999" />
          </mesh>
        </group>
      )}

      {/* Extra insulation if selected */}
      {showExtraIsolatie && (
        <group>
          {/* Left side panel indicating extra insulation */}
          <mesh position={[-width/2 - 0.03, 0, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.05, height - 0.1, 0.48]} />
            <meshStandardMaterial color="#ffca99" />
          </mesh>
          {/* Right side panel indicating extra insulation */}
          <mesh position={[width/2 + 0.03, 0, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.05, height - 0.1, 0.48]} />
            <meshStandardMaterial color="#ffca99" />
          </mesh>
        </group>
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

          {/* Horren if selected */}
          {showHorren && (
            <mesh position={[0, 0, 0.035]}>
              <boxGeometry args={[windowWidth * 0.83, height * 0.58, 0.002]} />
              <meshStandardMaterial color="#dddddd" wireframe={true} transparent={true} opacity={0.5} />
            </mesh>
          )}
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
          {/* Rolluik housing */}
          <mesh position={[0, height/2 + 0.05, 0.3]}>
            <boxGeometry args={[width, 0.08, 0.1]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          
          {/* Rolluik curtain - animated */}
          <mesh 
            ref={rolluikRef} 
            position={[0, 0, 0.26]} 
            scale={[1, 0.5, 1]}
          >
            <boxGeometry args={[width - 0.05, height, 0.01]} />
            <meshStandardMaterial color="#cccccc" />
            
            {/* Horizontal slats for the rolluik */}
            {Array.from({ length: 12 }).map((_, i) => (
              <mesh key={`slat-${i}`} position={[0, height/2 - i * (height/10) - 0.05, 0.005]}>
                <boxGeometry args={[width - 0.05, 0.02, 0.005]} />
                <meshStandardMaterial color="#999999" />
              </mesh>
            ))}
          </mesh>
        </group>
      )}

      {/* Kader dakkapel if selected */}
      {showKaderDakkapel && (
        <group>
          {/* Top frame */}
          <mesh position={[0, height/2 + 0.02, 0.25]}>
            <boxGeometry args={[width + 0.1, 0.05, 0.055]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
          
          {/* Bottom frame */}
          <mesh position={[0, -height/2 - 0.02, 0.25]}>
            <boxGeometry args={[width + 0.1, 0.05, 0.055]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
          
          {/* Left frame */}
          <mesh position={[-width/2 - 0.05, 0, 0.25]}>
            <boxGeometry args={[0.05, height + 0.1, 0.055]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
          
          {/* Right frame */}
          <mesh position={[width/2 + 0.05, 0, 0.25]}>
            <boxGeometry args={[0.05, height + 0.1, 0.055]} />
            <meshStandardMaterial color="#444444" />
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
  dakHelling,
  showVentilatie,
  showGootafwerking,
  showExtraIsolatie,
  showHorren,
  showKaderDakkapel
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
  const effectiveShowVentilatie = configuration?.opties?.ventilatie || showVentilatie || false;
  const effectiveShowGootafwerking = configuration?.opties?.gootafwerking || showGootafwerking || false;
  const effectiveShowExtraIsolatie = configuration?.opties?.extra_isolatie || showExtraIsolatie || false;
  const effectiveShowHorren = configuration?.opties?.horren || showHorren || false;
  const effectiveShowKaderDakkapel = configuration?.opties?.kader_dakkapel || showKaderDakkapel || false;

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
            showVentilatie={effectiveShowVentilatie}
            showGootafwerking={effectiveShowGootafwerking}
            showExtraIsolatie={effectiveShowExtraIsolatie}
            showHorren={effectiveShowHorren}
            showKaderDakkapel={effectiveShowKaderDakkapel}
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
