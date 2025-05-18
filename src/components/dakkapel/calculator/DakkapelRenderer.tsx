import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
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
    camera.position.z = Math.max(2.5, breedte / 300);
    camera.position.y = 0; // Reset camera vertical position
  }, [breedte, camera]);
  
  // Normalize dimensions for the 3D model
  const width = breedte / 300; // Scale down to fit in scene
  const height = hoogte / 300;
  
  // Set material color based on selection
  const dakkapelColor = getMaterialColor(materiaal);
  const kozijnenColor = getColorHex(kleurKozijnen);
  const zijkantenColor = getColorHex(kleurZijkanten);
  const draaikiepramenColor = getColorHex(kleurDraaikiepramen || 'wit');
  
  // Enhanced animation cycle for more realistic behavior
  useFrame(({ clock }) => {
    if (dakkapelRef.current) {
      // Smoother, more subtle animation
      dakkapelRef.current.rotation.y += Math.sin(clock.getElapsedTime() * 0.5) * 0.0005;
    }

    // More realistic rolluik animation if shown
    if (showRolluik && rolluikRef.current) {
      // Update the animation state with smoother transitions
      setRolluikAnimation(prev => {
        const newValue = prev + 0.008 * rolluikDirection;
        
        // Change direction with slight bounce effect
        if (newValue >= 1) {
          setRolluikDirection(-1);
          return 1;
        } else if (newValue <= 0) {
          setRolluikDirection(1);
          return 0;
        }
        
        return newValue;
      });

      // Apply the animation with easing
      rolluikRef.current.scale.y = 0.1 + (1 - Math.cos(rolluikAnimation * Math.PI)) * 0.45;
      rolluikRef.current.position.y = -height/2 + height * rolluikAnimation * 0.7;
    }
  });
  
  // Calculate window dimensions and positions based on number of windows and type
  const windowHeight = getKozijnHeight(kozijnHoogte).kozijn / 300; // Convert to model scale
  const windowPositions: [number, number, number][] = [];
  const windowWidth = width * 0.8 / Math.max(aantalRamen, 1);
  
  // Dynamic window positioning based on number of windows
  for (let i = 0; i < aantalRamen; i++) {
    const totalWidth = windowWidth * aantalRamen;
    const startX = -totalWidth / 2 + windowWidth / 2;
    const xPos = startX + i * windowWidth;
    const yPos = -height / 20; // Slightly lower than center
    windowPositions.push([xPos, yPos, 0.26]);
  }

  // Apply roof angle in radians
  const dakHellingRadians = (dakHelling * Math.PI) / 180;
  
  // House rotation based on selected side
  let houseRotation = 0;
  if (woningZijde === 'voor') {
    houseRotation = Math.PI; // 180 degrees - facing front
  } else if (woningZijde === 'zijkant') {
    houseRotation = Math.PI / 2; // 90 degrees - facing side
  }

  // Adjust model shape based on type
  let dakkapelDepth = 0.5;
  let roofStyle = 'flat';
  if (type === 'typeD' || type === 'typeE') {
    dakkapelDepth = 0.6; // Slightly deeper for larger models
  }

  // Material-specific adjustments
  let materialShininess = 30;
  let materialRoughness = 0.5;
  
  if (materiaal === 'hout') {
    materialShininess = 10;
    materialRoughness = 0.8;
  } else if (materiaal === 'aluminium') {
    materialShininess = 90;
    materialRoughness = 0.2;
  }

  return (
    <group ref={dakkapelRef} rotation={[0, houseRotation, 0]}>
      {/* Dakkapel base with improved materials */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, height, dakkapelDepth]} />
        <meshStandardMaterial 
          color={zijkantenColor} 
          roughness={materialRoughness}
        />
      </mesh>
      
      {/* Enhanced visualization for solar panel reinforcement */}
      {showDakVersteviging && (
        <group position={[0, height/2 + 0.05, 0]}>
          <mesh>
            <boxGeometry args={[width, 0.05, dakkapelDepth]} />
            <meshStandardMaterial color="#777777" metalness={0.5} roughness={0.7} />
          </mesh>
          {/* More detailed reinforcement beams */}
          {Array.from({ length: Math.max(3, Math.floor(width * 2)) }).map((_, i) => (
            <mesh key={`beam-${i}`} position={[-width/2 + 0.1 + i * (width/(Math.max(3, Math.floor(width * 2))-1)), -0.1, 0]}>
              <boxGeometry args={[0.05, 0.2, dakkapelDepth]} />
              <meshStandardMaterial color="#555555" metalness={0.6} />
            </mesh>
          ))}
        </group>
      )}
      
      {/* More realistic Mini Rooftop if selected */}
      {showMinirooftop && (
        <group position={[0, height/2 + 0.1, 0]}>
          <mesh>
            <boxGeometry args={[width * 0.3, 0.15, 0.3]} />
            <meshStandardMaterial color="#666666" metalness={0.4} roughness={0.6} />
          </mesh>
          {/* Ventilation grills with more detail */}
          <mesh position={[0, 0, 0.16]}>
            <boxGeometry args={[width * 0.28, 0.12, 0.01]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
          {/* Small AC logo */}
          <mesh position={[0, 0.08, 0.16]} rotation={[Math.PI/2, 0, 0]}>
            <planeGeometry args={[0.15, 0.15]} />
            <meshBasicMaterial>
              <canvasTexture attach="map" args={[(() => {
                const canvas = document.createElement('canvas');
                canvas.width = 64;
                canvas.height = 64;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  ctx.fillStyle = '#ffffff';
                  ctx.fillRect(0, 0, 64, 64);
                  ctx.font = 'bold 24px Arial';
                  ctx.fillStyle = '#0066cc';
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.fillText('AC', 32, 32);
                }
                return canvas;
              })()]} />
            </meshBasicMaterial>
          </mesh>
          
          {/* AC cooling fins */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={`fin-${i}`} position={[-width * 0.12 + i * width * 0.035, 0.05, 0.2]}>
              <boxGeometry args={[0.01, 0.08, 0.2]} />
              <meshStandardMaterial color="#888888" metalness={0.7} />
            </mesh>
          ))}
        </group>
      )}
      
      {/* Front panel with material-specific texture */}
      <mesh position={[0, 0, 0.25]}>
        <boxGeometry args={[width, height, 0.02]} />
        <meshStandardMaterial 
          color={dakkapelColor} 
          roughness={materialRoughness}
        />
      </mesh>

      {/* Enhanced ventilation system visualization */}
      {showVentilatie && (
        <group position={[0, height/2 - 0.1, 0.26]}>
          <mesh>
            <boxGeometry args={[width * 0.8, 0.05, 0.02]} />
            <meshStandardMaterial color="#aaaaaa" metalness={0.3} />
          </mesh>
          {/* Realistic ventilation grills */}
          {Array.from({ length: Math.floor(width * 10) }).map((_, i) => (
            <mesh key={`vent-${i}`} position={[-width * 0.35 + i * width * 0.08, 0, 0.02]}>
              <cylinderGeometry args={[0.01, 0.01, 0.05, 8]} />
              <meshStandardMaterial color="#555555" />
            </mesh>
          ))}
        </group>
      )}
      
      {/* Enhanced ventilation roosters */}
      {showVentilatieroosters && (
        <group position={[0, height/4 + 0.05, 0.265]}>
          <mesh>
            <boxGeometry args={[width * 0.9, 0.04, 0.01]} />
            <meshStandardMaterial color="#cccccc" />
          </mesh>
          {/* Detailed small vents */}
          {Array.from({ length: Math.floor(width * 20) }).map((_, i) => (
            <mesh key={`vent-small-${i}`} position={[-width * 0.45 + i * 0.05, 0, 0.01]}>
              <boxGeometry args={[0.02, 0.035, 0.005]} />
              <meshStandardMaterial color="#999999" />
            </mesh>
          ))}
        </group>
      )}

      {/* Enhanced gutter finishing */}
      {showGootafwerking && (
        <group position={[0, height/2 + 0.05, 0.2]}>
          <mesh>
            <boxGeometry args={[width + 0.1, 0.08, 0.1]} />
            <meshStandardMaterial color="#999999" metalness={0.2} />
          </mesh>
          {/* Detailed gutter pipe */}
          <mesh position={[width/2 - 0.1, -height/4, 0.05]}>
            <cylinderGeometry args={[0.03, 0.03, height/2, 8]} />
            <meshStandardMaterial color="#888888" />
          </mesh>
          
          {/* Gutter brackets */}
          {Array.from({ length: 4 }).map((_, i) => (
            <mesh key={`bracket-${i}`} position={[-width/2 + 0.2 + i * (width/3), height/2, 0.05]}>
              <boxGeometry args={[0.1, 0.02, 0.15]} />
              <meshStandardMaterial color="#777777" />
            </mesh>
          ))}
        </group>
      )}

      {/* Dynamic windows based on aantal ramen and kozijnHoogte */}
      {windowPositions.map((pos, index) => (
        <group key={`window-${index}`} position={pos}>
          {/* Window frame */}
          <mesh>
            <boxGeometry args={[windowWidth * 0.95, windowHeight, 0.03]} />
            <meshStandardMaterial color={kozijnenColor} />
          </mesh>
          
          {/* Window glass with realistic reflection */}
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[windowWidth * 0.85, windowHeight * 0.9, 0.01]} />
            <meshStandardMaterial 
              color="#a5d8ff" 
              transparent 
              opacity={0.7} 
              metalness={0.9}
              roughness={0}
              envMapIntensity={1}
            />
          </mesh>
          
          {/* Window handles with better detail */}
          <mesh position={[windowWidth * 0.3, 0, 0.035]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.01, 0.01, 0.08, 8]} />
            <meshStandardMaterial color={kleurDraaikiepramen} metalness={0.5} />
          </mesh>
          
          {/* Handle base */}
          <mesh position={[windowWidth * 0.3, 0, 0.025]}>
            <boxGeometry args={[0.03, 0.03, 0.01]} />
            <meshStandardMaterial color={kleurDraaikiepramen} metalness={0.7} />
          </mesh>

          {/* Horren with more realistic mesh appearance if selected */}
          {showHorren && (
            <mesh position={[0, 0, 0.035]}>
              <boxGeometry args={[windowWidth * 0.83, windowHeight * 0.88, 0.002]} />
              <meshStandardMaterial 
                color="#dddddd" 
                wireframe={true} 
                transparent={true} 
                opacity={0.6}
                wireframeLinewidth={0.5}
              />
            </mesh>
          )}
        </group>
      ))}
      
      {/* Enhanced zonwering if selected */}
      {showZonwering && (
        <group position={[0, height/2 + 0.15, 0.3]}>
          <mesh>
            <boxGeometry args={[width, 0.1, 0.6]} />
            <meshStandardMaterial color="#666666" metalness={0.4} />
          </mesh>
          
          {/* Zonwering fabric */}
          <mesh position={[0, -height/4, 0.3]}>
            <planeGeometry args={[width - 0.1, height/2]} />
            <meshStandardMaterial 
              color="#dddddd" 
              side={THREE.DoubleSide}
              transparent={true}
              opacity={0.9}
            />
            
            {/* Fabric stripes */}
            {Array.from({ length: 10 }).map((_, i) => (
              <mesh key={`stripe-${i}`} position={[0, -i * height/20, 0.01]}>
                <planeGeometry args={[width - 0.1, 0.02]} />
                <meshStandardMaterial color="#bbbbbb" side={THREE.DoubleSide} />
              </mesh>
            ))}
          </mesh>
          
          {/* Side arms */}
          <mesh position={[width/2 - 0.1, -height/4, 0]}>
            <boxGeometry args={[0.03, height/2, 0.03]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          
          <mesh position={[-width/2 + 0.1, -height/4, 0]}>
            <boxGeometry args={[0.03, height/2, 0.03]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
        </group>
      )}
      
      {/* Enhanced electric rolluik if selected */}
      {showRolluik && (
        <group>
          {/* Rolluik housing */}
          <mesh position={[0, height/2 + 0.05, 0.3]}>
            <boxGeometry args={[width, 0.08, 0.1]} />
            <meshStandardMaterial color="#555555" metalness={0.3} />
          </mesh>
          
          {/* Rolluik curtain - animated */}
          <mesh 
            ref={rolluikRef} 
            position={[0, 0, 0.26]} 
            scale={[1, 0.5, 1]}
          >
            <boxGeometry args={[width - 0.05, height, 0.01]} />
            <meshStandardMaterial color="#cccccc" metalness={0.1} />
            
            {/* More realistic horizontal slats for the rolluik */}
            {Array.from({ length: 15 }).map((_, i) => (
              <mesh key={`slat-${i}`} position={[0, height/2 - i * (height/14) - 0.05, 0.005]}>
                <boxGeometry args={[width - 0.05, 0.02, 0.005]} />
                <meshStandardMaterial color="#999999" metalness={0.4} />
              </mesh>
            ))}
          </mesh>
          
          {/* Side guides */}
          <mesh position={[width/2 - 0.02, 0, 0.26]}>
            <boxGeometry args={[0.02, height, 0.02]} />
            <meshStandardMaterial color="#777777" />
          </mesh>
          
          <mesh position={[-width/2 + 0.02, 0, 0.26]}>
            <boxGeometry args={[0.02, height, 0.02]} />
            <meshStandardMaterial color="#777777" />
          </mesh>
        </group>
      )}

      {/* Enhanced kader dakkapel if selected */}
      {showKaderDakkapel && (
        <group>
          {/* Top frame with better details */}
          <mesh position={[0, height/2 + 0.01, 0.25]}>
            <boxGeometry args={[width + 0.08, 0.05, 0.055]} />
            <meshStandardMaterial color="#444444" metalness={0.2} />
          </mesh>
          
          {/* Bottom frame */}
          <mesh position={[0, -height/2 - 0.01, 0.25]}>
            <boxGeometry args={[width + 0.08, 0.05, 0.055]} />
            <meshStandardMaterial color="#444444" metalness={0.2} />
          </mesh>
          
          {/* Left frame */}
          <mesh position={[-width/2 - 0.04, 0, 0.25]}>
            <boxGeometry args={[0.05, height, 0.055]} />
            <meshStandardMaterial color="#444444" metalness={0.2} />
          </mesh>
          
          {/* Right frame */}
          <mesh position={[width/2 + 0.04, 0, 0.25]}>
            <boxGeometry args={[0.05, height, 0.055]} />
            <meshStandardMaterial color="#444444" metalness={0.2} />
          </mesh>
          
          {/* Corner accents */}
          {[
            [width/2 + 0.04, height/2 + 0.01], 
            [width/2 + 0.04, -height/2 - 0.01], 
            [-width/2 - 0.04, height/2 + 0.01], 
            [-width/2 - 0.04, -height/2 - 0.01]
          ].map((pos, i) => (
            <mesh key={`corner-${i}`} position={[pos[0], pos[1], 0.25]}>
              <boxGeometry args={[0.07, 0.07, 0.06]} />
              <meshStandardMaterial color="#333333" metalness={0.3} />
            </mesh>
          ))}
        </group>
      )}
      
      {/* Extra isolation visualization if selected */}
      {showExtraIsolatie && (
        <mesh position={[0, 0, 0]} scale={[1.02, 1.02, 1.02]}>
          <boxGeometry args={[width, height, dakkapelDepth]} />
          <meshStandardMaterial 
            color="#f5f5f5" 
            transparent={true} 
            opacity={0.3} 
            wireframe={true}
          />
        </mesh>
      )}

      {/* Sporenkap visualization if selected */}
      {showSporenkap && (
        <group position={[0, -height/2 - 0.1, 0]}>
          <mesh>
            <boxGeometry args={[width + 0.2, 0.1, dakkapelDepth + 0.1]} />
            <meshStandardMaterial color="#6d4c41" />
          </mesh>
          
          {/* Wooden beams */}
          {Array.from({ length: 5 }).map((_, i) => (
            <mesh key={`beam-${i}`} position={[-width/2 + 0.2 + i * width/4, -0.1, 0]}>
              <boxGeometry args={[0.08, 0.2, dakkapelDepth + 0.1]} />
              <meshStandardMaterial color="#5d4037" />
            </mesh>
          ))}
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
