
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Center, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { DakkapelConfiguration, DakkapelType, KozijnHoogte } from './DakkapelCalculator';
import { getKozijnHeight } from '@/utils/calculatorUtils';

interface DakkapelRendererProps {
  configuration?: DakkapelConfiguration;
  breedte?: number;  // in cm
  hoogte?: number;   // in cm
  type?: DakkapelType;
  materiaal?: 'kunststof' | 'hout' | 'aluminium' | 'standaard' | 'kunststof_rabat' | 'kunststof_rabat_boeideel' | 'polyester_glad' | 'polyester_rabat';
  aantalRamen?: number;
  kleurKozijnen?: string;
  kleurZijkanten?: string;
  kleurDraaikiepramen?: string;
  showZonwering?: boolean;
  showRolluik?: boolean;
  dakHelling?: number;
  showVentilatie?: boolean;
  showGootafwerking?: boolean;
  showExtraIsolatie?: boolean;
  showHorren?: boolean;
  showKaderDakkapel?: boolean;
  showMinirooftop?: boolean;
  showDakVersteviging?: boolean;
  showVentilatieroosters?: boolean;
  showSporenkap?: boolean;
  woningZijde?: string;
  kozijnHoogte?: KozijnHoogte;
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
    'kunststof': '#f5f2e3', // Cream color like in reference
    'hout': '#e6d2b5',
    'aluminium': '#d9d9d9',
    'standaard': '#f5f2e3',
    'kunststof_rabat': '#f2eee0',
    'kunststof_rabat_boeideel': '#f0ece0',
    'polyester_glad': '#f8f6f0',
    'polyester_rabat': '#f5f3eb',
  };
  return materialMap[materiaal] || '#f5f2e3';
}

// Roof component to display tiled roof like in the reference
function RoofModel({ dakHelling = 45 }) {
  // Convert dakHelling to radians
  const roofAngleRad = (dakHelling * Math.PI) / 180;
  const roofMesh = useRef<THREE.Mesh>(null);
  
  // Get texture for the roof tiles
  const texture = useTexture({
    map: '/placeholder.svg', // Replace with actual roof tile texture if available
  });
  
  return (
    <group position={[0, -0.5, -0.5]}>
      {/* Sloped roof */}
      <mesh ref={roofMesh} rotation={[-roofAngleRad, 0, 0]} position={[0, -0.5, -1.8]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial 
          color="#333333" 
          roughness={0.8} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Add roof tile details */}
      {Array.from({ length: 20 }).map((_, rowIndex) => (
        Array.from({ length: 10 }).map((_, colIndex) => (
          <mesh 
            key={`tile-${rowIndex}-${colIndex}`}
            position={[
              -2.5 + colIndex * 0.5,
              -0.5 - 0.1 * Math.sin(roofAngleRad) * rowIndex,
              -1.8 - 0.25 * Math.cos(roofAngleRad) * rowIndex
            ]}
            rotation={[-roofAngleRad, 0, 0]}
            scale={[0.48, 0.2, 0.01]}
          >
            <boxGeometry args={[1, 1, 0.1]} />
            <meshStandardMaterial color="#222222" roughness={0.9} />
          </mesh>
        ))
      ))}
    </group>
  );
}

function DakkapelModel({ 
  breedte = 300, 
  hoogte = 175, 
  materiaal = 'kunststof',
  aantalRamen = 2,
  type = 'typeC',
  kleurKozijnen = 'wit',
  kleurZijkanten = 'wit',
  kleurDraaikiepramen = 'wit',
  showZonwering = false,
  showRolluik = false,
  dakHelling = 45,
  showVentilatie = false,
  showGootafwerking = false,
  showExtraIsolatie = false,
  showHorren = false,
  showKaderDakkapel = false,
  showMinirooftop = false,
  showDakVersteviging = false,
  showVentilatieroosters = false,
  showSporenkap = false,
  woningZijde = 'achter',
  kozijnHoogte = 'standaard',
}: DakkapelRendererProps) {
  const dakkapelRef = useRef<THREE.Group>(null);
  const rolluikRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const [rolluikAnimation, setRolluikAnimation] = useState(0);
  const [rolluikDirection, setRolluikDirection] = useState(1);
  
  // Set camera position based on dakkapel size
  useEffect(() => {
    camera.position.z = 3;
    camera.position.y = 0.5; 
    camera.position.x = 2;
  }, [breedte, camera]);
  
  // Normalize dimensions for the 3D model
  const width = breedte / 300; // Scale down to fit in scene
  const height = hoogte / 300;
  
  // Set material color based on selection
  const dakkapelColor = getMaterialColor(materiaal);
  const kozijnenColor = getColorHex(kleurKozijnen);
  const zijkantenColor = getColorHex(kleurZijkanten);
  const draaikiepramenColor = getColorHex(kleurDraaikiepramen || 'wit');
  
  // Basic animation
  useFrame(({ clock }) => {
    if (dakkapelRef.current) {
      // Very slight "breathing" animation
      dakkapelRef.current.position.y += Math.sin(clock.getElapsedTime() * 0.5) * 0.0001;
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
  
  // Calculate window dimensions and positions based on number of windows
  const windowHeight = getKozijnHeight(kozijnHoogte).kozijn / 300; // Convert to model scale
  const windowPositions: [number, number, number][] = [];
  const windowWidth = width * 0.8 / Math.max(aantalRamen, 1);
  
  // Determine window positions based on number of windows
  for (let i = 0; i < aantalRamen; i++) {
    const xPos = -width/2 + windowWidth/2 + i * windowWidth;
    const yPos = -height/20; // Slightly lower than center
    windowPositions.push([xPos, yPos, 0.26]);
  }

  // Adjustments based on house side (woningZijde)
  let houseRotation = 0;
  if (woningZijde === 'voor') {
    houseRotation = Math.PI; // 180 degrees - facing front
  } else if (woningZijde === 'zijkant') {
    houseRotation = Math.PI / 2; // 90 degrees - facing side
  }
  // 'achter' is default (0 degrees)

  return (
    <>
      <RoofModel dakHelling={dakHelling} />
      
      <group ref={dakkapelRef} rotation={[0, houseRotation, 0]} position={[0, 0, 0]}>
        {/* Main dakkapel body with realistic shape */}
        <group>
          {/* Dakkapel frame/box */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[width, height, 0.5]} />
            <meshStandardMaterial color={dakkapelColor} />
          </mesh>
          
          {/* Top/roof part */}
          <mesh position={[0, height/2 + 0.05, 0]}>
            <boxGeometry args={[width + 0.1, 0.1, 0.6]} />
            <meshStandardMaterial color="#c0c0c0" /> {/* Roof cap color */}
          </mesh>
          
          {/* Front panel with nicer finish */}
          <mesh position={[0, 0, 0.25]}>
            <boxGeometry args={[width, height, 0.02]} />
            <meshStandardMaterial 
              color={dakkapelColor} 
              roughness={0.2}
              metalness={0}
            />
          </mesh>
          
          {/* Side panels with slight extension */}
          <mesh position={[-width/2 - 0.05, 0, 0]}>
            <boxGeometry args={[0.1, height, 0.5]} />
            <meshStandardMaterial color={zijkantenColor} />
          </mesh>
          
          <mesh position={[width/2 + 0.05, 0, 0]}>
            <boxGeometry args={[0.1, height, 0.5]} />
            <meshStandardMaterial color={zijkantenColor} />
          </mesh>

          {/* Drainage pipe like in the reference image */}
          {showGootafwerking && (
            <mesh position={[width/2 - 0.05, -height/2 + 0.2, 0.2]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.03, 0.03, height, 8]} />
              <meshStandardMaterial color="#c0c0c0" />
            </mesh>
          )}
          
          {/* Windows based on aantal ramen and kozijnHoogte */}
          {windowPositions.map((pos, index) => (
            <group key={`window-${index}`} position={pos}>
              {/* Window frame with more realistic appearance */}
              <mesh>
                <boxGeometry args={[windowWidth * 0.95, windowHeight, 0.03]} />
                <meshStandardMaterial 
                  color={kozijnenColor} 
                  roughness={0.3}
                  metalness={0}
                />
              </mesh>
              
              {/* Window glass with reflection */}
              <mesh position={[0, 0, 0.02]}>
                <boxGeometry args={[windowWidth * 0.85, windowHeight * 0.9, 0.01]} />
                <meshStandardMaterial 
                  color="#a5d8ff" 
                  transparent 
                  opacity={0.7} 
                  roughness={0.1}
                  metalness={0.3}
                  envMapIntensity={1.5}
                />
              </mesh>
              
              {/* Window handle with better appearance */}
              <mesh position={[windowWidth * 0.3, 0, 0.035]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.01, 0.01, 0.08, 8]} />
                <meshStandardMaterial 
                  color={draaikiepramenColor} 
                  metalness={0.6}
                  roughness={0.2}
                />
              </mesh>

              {/* Horren if selected */}
              {showHorren && (
                <mesh position={[0, 0, 0.035]}>
                  <boxGeometry args={[windowWidth * 0.83, windowHeight * 0.88, 0.002]} />
                  <meshStandardMaterial color="#dddddd" wireframe={true} transparent={true} opacity={0.5} />
                </mesh>
              )}
            </group>
          ))}
          
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
        </group>
      </group>
    </>
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
  kleurDraaikiepramen,
  showZonwering,
  showRolluik,
  dakHelling,
  showVentilatie,
  showGootafwerking,
  showExtraIsolatie,
  showHorren,
  showKaderDakkapel,
  showMinirooftop,
  showDakVersteviging,
  showVentilatieroosters,
  showSporenkap,
  woningZijde,
  kozijnHoogte
}: DakkapelRendererProps) {
  // If configuration is provided, use its values; otherwise use individual props
  const effectiveBreedte = configuration?.breedte || breedte || 300;
  const effectiveHoogte = configuration?.hoogte || hoogte || 175;
  const effectiveType = configuration?.type || type || 'typeC';
  const effectiveMateriaal = configuration?.materiaal || materiaal || 'kunststof';
  const effectiveAantalRamen = configuration?.aantalRamen || aantalRamen || 2;
  const effectiveKleurKozijnen = configuration?.kleurKozijnen || kleurKozijnen || 'wit';
  const effectiveKleurZijkanten = configuration?.kleurZijkanten || kleurZijkanten || 'wit';
  const effectiveKleurDraaikiepramen = configuration?.kleurDraaikiepramen || kleurDraaikiepramen || 'wit';
  const effectiveShowZonwering = configuration?.opties?.zonwering || showZonwering || false;
  const effectiveShowRolluik = configuration?.opties?.elektrisch_rolluik || showRolluik || false;
  const effectiveDakHelling = configuration?.dakHelling || dakHelling || 45;
  const effectiveShowVentilatie = configuration?.opties?.ventilatie || showVentilatie || false;
  const effectiveShowGootafwerking = configuration?.opties?.gootafwerking || showGootafwerking || false;
  const effectiveShowExtraIsolatie = configuration?.opties?.extra_isolatie || showExtraIsolatie || false;
  const effectiveShowHorren = configuration?.opties?.horren || showHorren || false;
  const effectiveShowKaderDakkapel = configuration?.opties?.kader_dakkapel || showKaderDakkapel || false;
  const effectiveShowMinirooftop = configuration?.opties?.minirooftop || showMinirooftop || false;
  const effectiveShowDakVersteviging = configuration?.opties?.dak_versteviging || showDakVersteviging || false;
  const effectiveShowVentilatieroosters = configuration?.opties?.ventilatieroosters || showVentilatieroosters || false;
  const effectiveShowSporenkap = configuration?.opties?.sporenkap || showSporenkap || false;
  const effectiveWoningZijde = configuration?.woningZijde || woningZijde || 'achter';
  const effectiveKozijnHoogte = configuration?.kozijnHoogte || kozijnHoogte || 'standaard';

  return (
    <div className="w-full h-full min-h-[400px] bg-gray-50 rounded-md overflow-hidden">
      <Canvas shadows camera={{ position: [2, 0.5, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
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
            kleurDraaikiepramen={effectiveKleurDraaikiepramen}
            showZonwering={effectiveShowZonwering}
            showRolluik={effectiveShowRolluik}
            dakHelling={effectiveDakHelling}
            showVentilatie={effectiveShowVentilatie}
            showGootafwerking={effectiveShowGootafwerking}
            showExtraIsolatie={effectiveShowExtraIsolatie}
            showHorren={effectiveShowHorren}
            showKaderDakkapel={effectiveShowKaderDakkapel}
            showMinirooftop={effectiveShowMinirooftop}
            showDakVersteviging={effectiveShowDakVersteviging}
            showVentilatieroosters={effectiveShowVentilatieroosters}
            showSporenkap={effectiveShowSporenkap}
            woningZijde={effectiveWoningZijde}
            kozijnHoogte={effectiveKozijnHoogte}
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
