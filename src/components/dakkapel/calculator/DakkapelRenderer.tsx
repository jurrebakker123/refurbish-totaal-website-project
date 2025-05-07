
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Center, useTexture, Environment, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';
import { DakkapelConfiguration, DakkapelType, KozijnHoogte } from './DakkapelCalculator';
import { getKozijnHeight } from '@/utils/calculatorUtils';

// Enable soft shadows for more realistic lighting
// Use SoftShadows component instead of softShadows function
// Will use this in the Canvas component

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

// Improved material generator with texturing
function createMaterial(color: string, materialType = 'kunststof') {
  let roughness = 0.2;  // Default for kunststof/plastic
  let metalness = 0.0;
  
  switch (materialType) {
    case 'hout':
      roughness = 0.7;
      break;
    case 'aluminium':
      roughness = 0.3;
      metalness = 0.8;
      break;
    case 'kunststof_rabat':
    case 'kunststof_rabat_boeideel':
    case 'polyester_rabat':
      roughness = 0.4;
      break;
  }
  
  return new THREE.MeshStandardMaterial({ 
    color: color,
    roughness: roughness,
    metalness: metalness,
    flatShading: false
  });
}

// Create a roof tile texture
function RoofTexture() {
  const texture = useTexture({
    map: "https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@latest/prototype/dark.png"
  });
  
  // Adjust texture parameters
  if (texture.map) {
    texture.map.wrapS = texture.map.wrapT = THREE.RepeatWrapping;
    texture.map.repeat.set(5, 5);
  }
  
  return texture;
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
    camera.position.y = 0.5; // Slightly elevated view
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
      // Apply a very slight rotation for a "breathing" effect
      dakkapelRef.current.rotation.y += 0.0005;
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
  const windowHeight = getKozijnHeight(kozijnHoogte).kozijn / 300; // Convert to model scale
  const windowPositions: [number, number, number][] = [];
  
  // Handle different number of windows based on dakkapel type
  let effectiveRamen = aantalRamen;
  if (type === 'typeA' || type === 'typeB') {
    effectiveRamen = 1;
  } else if (type === 'typeE') {
    // TypeE has a panel
    effectiveRamen = 2;
  }
  
  const windowWidth = width * 0.8 / Math.max(effectiveRamen, 1);
  
  // Determine window positions based on number of windows
  for (let i = 0; i < effectiveRamen; i++) {
    const xPos = -width/2 + windowWidth/2 + i * windowWidth + (type === 'typeE' ? -0.1 : 0);
    const yPos = -height/20; // Slightly lower than center
    windowPositions.push([xPos, yPos, 0.26]);
  }

  // Convert dakHelling to radians for the 3D rendering
  const dakHellingRadians = (dakHelling * Math.PI) / 180;
  
  // Calculate the roof angle to visualize the dakHelling
  const roofAngle = Math.PI / 2 - dakHellingRadians;

  // Adjustments based on house side (woningZijde)
  let houseRotation = 0;
  if (woningZijde === 'voor') {
    houseRotation = Math.PI; // 180 degrees - facing front
  } else if (woningZijde === 'zijkant') {
    houseRotation = Math.PI / 2; // 90 degrees - facing side
  }
  // 'achter' is default (0 degrees)

  // Generate roof tiles texture once
  const roofTexture = RoofTexture();

  return (
    <group ref={dakkapelRef} rotation={[0, houseRotation, 0]} castShadow receiveShadow>
      {/* Main roof with improved texture and sloping */}
      <mesh 
        position={[0, -0.7, -0.5]} 
        rotation={[roofAngle, 0, 0]}
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[2.4, 0.05, 2.4]} />
        <meshStandardMaterial {...roofTexture} color="#594545" />
      </mesh>
      
      {/* Add roof tiles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh 
          key={`roof-tile-${i}`} 
          position={[0, -0.69, -0.5 - i * 0.2]} 
          rotation={[roofAngle, 0, 0]}
          castShadow
        >
          <boxGeometry args={[2.4, 0.01, 0.15]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#4D3939" : "#3D2C2C"} roughness={0.9} />
        </mesh>
      ))}
      
      {/* Sporenkap if selected */}
      {showSporenkap && (
        <group position={[0, -0.65, 0]} rotation={[roofAngle, 0, 0]}>
          {/* Wooden beams structure */}
          {Array.from({ length: 5 }).map((_, i) => (
            <mesh key={`sporenkap-${i}`} position={[-0.8 + i * 0.4, 0, 0]} castShadow>
              <boxGeometry args={[0.05, 0.12, 1.8]} />
              <meshStandardMaterial color="#5D4037" roughness={0.8} />
            </mesh>
          ))}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2, 0.01, 1.8]} />
            <meshStandardMaterial color="#8D6E63" opacity={0.7} transparent={true} />
          </mesh>
        </group>
      )}
      
      {/* Extra Isolatie if selected - INSIDE the walls */}
      {showExtraIsolatie && (
        <group>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[width - 0.03, height - 0.03, 0.45]} />
            <meshStandardMaterial color="#fff4e3" opacity={0.8} transparent={true} />
          </mesh>
        </group>
      )}
      
      {/* Dakkapel structural frame - hidden inside */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[width, height, 0.46]} />
        <meshStandardMaterial color="#444444" visible={false} />
      </mesh>
      
      {/* Side panels with improved material */}
      <mesh position={[-width/2 - 0.01, 0, 0]} rotation={[0, -Math.PI/2, 0]} castShadow>
        <planeGeometry args={[0.48, height]} />
        <meshStandardMaterial 
          color={zijkantenColor} 
          roughness={materiaal === 'aluminium' ? 0.3 : 0.5} 
          metalness={materiaal === 'aluminium' ? 0.6 : 0} 
        />
      </mesh>
      
      <mesh position={[width/2 + 0.01, 0, 0]} rotation={[0, Math.PI/2, 0]} castShadow>
        <planeGeometry args={[0.48, height]} />
        <meshStandardMaterial 
          color={zijkantenColor} 
          roughness={materiaal === 'aluminium' ? 0.3 : 0.5}
          metalness={materiaal === 'aluminium' ? 0.6 : 0}
        />
      </mesh>
      
      {/* Roof reinforcement for solar panels if selected */}
      {showDakVersteviging && (
        <group position={[0, height/2 + 0.03, 0]}>
          <mesh castShadow>
            <boxGeometry args={[width, 0.05, 0.5]} />
            <meshStandardMaterial color="#555555" metalness={0.5} roughness={0.7} />
          </mesh>
          {/* Reinforcement beams */}
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh key={`beam-${i}`} position={[-width/3 + i * (width/3), -0.05, 0]} castShadow>
              <boxGeometry args={[0.05, 0.15, 0.5]} />
              <meshStandardMaterial color="#444444" metalness={0.5} roughness={0.7} />
            </mesh>
          ))}
          {/* Metal mounting brackets */}
          <group>
            {Array.from({ length: 6 }).map((_, i) => (
              <mesh 
                key={`bracket-${i}`} 
                position={[-width/2 + 0.2 + i * (width/3), 0.03, 0.1]}
                castShadow
              >
                <boxGeometry args={[0.1, 0.01, 0.2]} />
                <meshStandardMaterial color="#777777" metalness={0.8} roughness={0.2} />
              </mesh>
            ))}
          </group>
        </group>
      )}
      
      {/* Mini Rooftop (invisible AC) if selected */}
      {showMinirooftop && (
        <group position={[0, height/2 + 0.13, 0]}>
          <mesh castShadow>
            <boxGeometry args={[width * 0.3, 0.15, 0.3]} />
            <meshStandardMaterial color="#555555" roughness={0.7} />
          </mesh>
          {/* Ventilation grills */}
          <mesh position={[0, 0, 0.16]} castShadow>
            <boxGeometry args={[width * 0.28, 0.12, 0.01]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
          
          {/* Detailed ventilation slats */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh 
              key={`ac-slat-${i}`} 
              position={[0, -0.03 + i * 0.02, 0.164]}
              castShadow
            >
              <boxGeometry args={[width * 0.26, 0.01, 0.015]} />
              <meshStandardMaterial color="#333333" metalness={0.6} />
            </mesh>
          ))}
          
          {/* AC control panel */}
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
          
          {/* Cooling pipes */}
          <mesh position={[-width * 0.15, 0, -0.05]}>
            <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
            <meshStandardMaterial color="#777777" metalness={0.8} />
          </mesh>
        </group>
      )}
      
      {/* Dakkapel main body - improved with better geometry */}
      <group>
        {/* Bottom frame */}
        <mesh position={[0, -height/2, 0.25]} castShadow>
          <boxGeometry args={[width, 0.05, 0.02]} />
          <meshStandardMaterial color={dakkapelColor} roughness={0.5} />
        </mesh>
        
        {/* Top frame */}
        <mesh position={[0, height/2, 0.25]} castShadow>
          <boxGeometry args={[width, 0.05, 0.02]} />
          <meshStandardMaterial color={dakkapelColor} roughness={0.5} />
        </mesh>
        
        {/* Left frame */}
        <mesh position={[-width/2 + 0.025, 0, 0.25]} castShadow>
          <boxGeometry args={[0.05, height, 0.02]} />
          <meshStandardMaterial color={dakkapelColor} roughness={0.5} />
        </mesh>
        
        {/* Right frame */}
        <mesh position={[width/2 - 0.025, 0, 0.25]} castShadow>
          <boxGeometry args={[0.05, height, 0.02]} />
          <meshStandardMaterial color={dakkapelColor} roughness={0.5} />
        </mesh>
        
        {/* Connect the frames with a backing panel */}
        <mesh position={[0, 0, 0.24]} castShadow>
          <boxGeometry args={[width - 0.05, height - 0.05, 0.01]} />
          <meshStandardMaterial color={dakkapelColor} roughness={0.5} />
        </mesh>
      </group>

      {/* Front panel with rabat pattern if applicable */}
      {materiaal.includes('rabat') && (
        <group>
          {Array.from({ length: Math.ceil(height * 15) }).map((_, i) => (
            <mesh 
              key={`rabat-${i}`} 
              position={[0, height/2 - 0.05 - i * 0.06, 0.255]} 
              castShadow
            >
              <boxGeometry args={[width - 0.1, 0.05, 0.01]} />
              <meshStandardMaterial color={dakkapelColor} roughness={0.6} />
            </mesh>
          ))}
        </group>
      )}

      {/* Ventilation system if selected */}
      {showVentilatie && (
        <group position={[0, height/2 - 0.1, 0.26]}>
          <mesh castShadow>
            <boxGeometry args={[width * 0.8, 0.08, 0.02]} />
            <meshStandardMaterial color="#aaaaaa" metalness={0.5} roughness={0.7} />
          </mesh>
          {/* Ventilation grills */}
          <group>
            <mesh position={[0, 0, 0.011]} castShadow>
              <planeGeometry args={[width * 0.75, 0.06]} />
              <meshStandardMaterial color="#666666" />
            </mesh>
            {Array.from({ length: 15 }).map((_, i) => (
              <mesh key={`vent-${i}`} position={[-width * 0.35 + i * width * 0.05, 0, 0.015]}>
                <boxGeometry args={[0.02, 0.06, 0.005]} />
                <meshStandardMaterial color="#444444" />
              </mesh>
            ))}
          </group>
        </group>
      )}
      
      {/* Ventilation grills if selected */}
      {showVentilatieroosters && (
        <group position={[0, height/4 + 0.05, 0.265]}>
          <mesh castShadow>
            <boxGeometry args={[width * 0.9, 0.04, 0.01]} />
            <meshStandardMaterial color="#cccccc" metalness={0.3} roughness={0.6} />
          </mesh>
          {/* Small vents across the width */}
          <group>
            <mesh position={[0, 0, 0.006]} castShadow>
              <planeGeometry args={[width * 0.88, 0.035]} />
              <meshStandardMaterial color="#aaaaaa" />
            </mesh>
            {Array.from({ length: Math.floor(width * 20) }).map((_, i) => (
              <mesh key={`vent-small-${i}`} position={[-width * 0.44 + i * 0.05, 0, 0.007]}>
                <boxGeometry args={[0.01, 0.03, 0.005]} />
                <meshStandardMaterial color="#777777" />
              </mesh>
            ))}
          </group>
        </group>
      )}

      {/* Gutter finishing if selected - improved with more detail */}
      {showGootafwerking && (
        <group>
          {/* Main gutter */}
          <mesh position={[0, height/2 + 0.05, 0.2]} castShadow>
            <boxGeometry args={[width + 0.1, 0.06, 0.1]} />
            <meshStandardMaterial color="#777777" metalness={0.5} roughness={0.5} />
          </mesh>
          
          {/* Gutter lip */}
          <mesh position={[0, height/2 + 0.02, 0.25]} castShadow>
            <boxGeometry args={[width + 0.12, 0.02, 0.03]} />
            <meshStandardMaterial color="#666666" metalness={0.5} roughness={0.5} />
          </mesh>
          
          {/* Detailed gutter pipe */}
          <mesh position={[width/2 - 0.1, -height/4, 0.3]}>
            <cylinderGeometry args={[0.025, 0.025, height/2, 8]} />
            <meshStandardMaterial color="#555555" metalness={0.4} roughness={0.6} />
          </mesh>
          
          {/* Pipe connector at top */}
          <mesh position={[width/2 - 0.1, height/4 - 0.02, 0.3]}>
            <cylinderGeometry args={[0.035, 0.025, 0.04, 8]} />
            <meshStandardMaterial color="#444444" metalness={0.4} roughness={0.6} />
          </mesh>
          
          {/* Pipe elbow at bottom */}
          <mesh position={[width/2 - 0.1, -height/2 + 0.05, 0.3]}>
            <sphereGeometry args={[0.03, 8, 8, 0, Math.PI * 2, 0, Math.PI/2]} />
            <meshStandardMaterial color="#444444" metalness={0.4} roughness={0.6} />
          </mesh>
          
          {/* Horizontal pipe section at bottom */}
          <mesh position={[width/2 - 0.05, -height/2 + 0.05, 0.3]}>
            <cylinderGeometry args={[0.025, 0.025, 0.1, 8]} />
            <meshStandardMaterial color="#555555" metalness={0.4} roughness={0.6} />
          </mesh>
        </group>
      )}

      {/* Windows with improved details */}
      {windowPositions.map((pos, index) => (
        <group key={`window-${index}`} position={[pos[0], pos[1], pos[2]]}>
          {/* Outer frame */}
          <mesh castShadow>
            <boxGeometry args={[windowWidth * 0.95, windowHeight, 0.04]} />
            <meshStandardMaterial 
              color={kozijnenColor} 
              metalness={materiaal === 'aluminium' ? 0.6 : 0.1} 
              roughness={0.3}
            />
          </mesh>
          
          {/* Inner frame */}
          <mesh position={[0, 0, 0.01]} castShadow>
            <boxGeometry args={[windowWidth * 0.9, windowHeight * 0.95, 0.02]} />
            <meshStandardMaterial 
              color={kozijnenColor} 
              metalness={materiaal === 'aluminium' ? 0.6 : 0.1} 
              roughness={0.3}
            />
          </mesh>
          
          {/* Window glass with realistic properties */}
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[windowWidth * 0.85, windowHeight * 0.9, 0.01]} />
            <meshPhysicalMaterial 
              color="#a5d8ff" 
              transparent 
              opacity={0.7}
              transmission={0.95}
              thickness={0.02}
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.1}
              ior={1.5}
            />
          </mesh>
          
          {/* Window divisions - horizontal */}
          <mesh position={[0, 0, 0.025]} castShadow>
            <boxGeometry args={[windowWidth * 0.85, 0.02, 0.01]} />
            <meshStandardMaterial color={kozijnenColor} />
          </mesh>
          
          {/* Window handle with realistic shape */}
          <group position={[windowWidth * 0.35, -windowHeight * 0.2, 0.035]}>
            {/* Handle base */}
            <mesh castShadow>
              <boxGeometry args={[0.06, 0.02, 0.02]} />
              <meshStandardMaterial color={draaikiepramenColor} metalness={0.7} roughness={0.3} />
            </mesh>
            
            {/* Handle lever */}
            <mesh position={[0, 0.06, 0]} castShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
              <meshStandardMaterial color={draaikiepramenColor} metalness={0.7} roughness={0.3} />
            </mesh>
          </group>

          {/* Horren if selected */}
          {showHorren && (
            <mesh position={[0, 0, 0.035]}>
              <boxGeometry args={[windowWidth * 0.83, windowHeight * 0.88, 0.002]} />
              <meshStandardMaterial color="#cccccc" wireframe={true} transparent={true} opacity={0.6} />
              
              {/* Add mesh grid pattern for the screen */}
              {Array.from({ length: 20 }).map((_, i) => (
                <mesh 
                  key={`hor-h-${i}`} 
                  position={[0, -windowHeight * 0.4 + i * windowHeight * 0.044, 0]}
                >
                  <boxGeometry args={[windowWidth * 0.83, 0.001, 0.001]} />
                  <meshBasicMaterial color="#aaaaaa" />
                </mesh>
              ))}
              
              {Array.from({ length: 20 }).map((_, i) => (
                <mesh 
                  key={`hor-v-${i}`} 
                  position={[-windowWidth * 0.4 + i * windowWidth * 0.044, 0, 0]}
                >
                  <boxGeometry args={[0.001, windowHeight * 0.88, 0.001]} />
                  <meshBasicMaterial color="#aaaaaa" />
                </mesh>
              ))}
            </mesh>
          )}
        </group>
      ))}
      
      {/* Type E specific panel - only show if type is E */}
      {type === 'typeE' && (
        <group position={[width/3, 0, 0.26]}>
          <mesh castShadow>
            <boxGeometry args={[windowWidth * 0.95, height * 0.9, 0.02]} />
            <meshStandardMaterial color={dakkapelColor} roughness={0.5} />
          </mesh>
        </group>
      )}
      
      {/* Zonwering if selected - more detailed with fabric texture */}
      {showZonwering && (
        <group>
          {/* Main housing */}
          <mesh position={[0, height/2 + 0.1, 0.3]} castShadow>
            <boxGeometry args={[width, 0.1, 0.15]} />
            <meshStandardMaterial color="#777777" roughness={0.7} />
          </mesh>
          
          {/* End caps */}
          <mesh position={[-width/2 - 0.01, height/2 + 0.1, 0.3]} castShadow>
            <boxGeometry args={[0.02, 0.1, 0.15]} />
            <meshStandardMaterial color="#666666" roughness={0.7} />
          </mesh>
          
          <mesh position={[width/2 + 0.01, height/2 + 0.1, 0.3]} castShadow>
            <boxGeometry args={[0.02, 0.1, 0.15]} />
            <meshStandardMaterial color="#666666" roughness={0.7} />
          </mesh>
          
          {/* Fabric rod at bottom */}
          <mesh position={[0, height/2 - 0.8, 0.4]}>
            <cylinderGeometry args={[0.03, 0.03, width - 0.05, 8]} />
            <meshStandardMaterial color="#888888" metalness={0.3} roughness={0.7} />
          </mesh>
          
          {/* Awning fabric with wrinkles */}
          <mesh position={[0, height/2 - 0.4, 0.5]} rotation={[-0.3, 0, 0]} castShadow>
            <planeGeometry args={[width - 0.1, 0.8]} />
            <meshStandardMaterial color="#d8c5a0" roughness={0.8} side={THREE.DoubleSide} />
          </mesh>
          
          {/* Support arms */}
          <mesh position={[-width/2 + 0.2, height/2 - 0.4, 0.3]} rotation={[0.5, 0, 0.1]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.9, 8]} />
            <meshStandardMaterial color="#555555" metalness={0.6} roughness={0.4} />
          </mesh>
          
          <mesh position={[width/2 - 0.2, height/2 - 0.4, 0.3]} rotation={[0.5, 0, -0.1]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.9, 8]} />
            <meshStandardMaterial color="#555555" metalness={0.6} roughness={0.4} />
          </mesh>
        </group>
      )}
      
      {/* Electric rolluik if selected - more realistic */}
      {showRolluik && (
        <group>
          {/* Rolluik housing */}
          <mesh position={[0, height/2 + 0.06, 0.3]} castShadow>
            <boxGeometry args={[width, 0.12, 0.15]} />
            <meshStandardMaterial color="#444444" roughness={0.7} />
          </mesh>
          
          {/* Housing details - side caps */}
          <mesh position={[-width/2 - 0.02, height/2 + 0.06, 0.3]} castShadow>
            <boxGeometry args={[0.04, 0.12, 0.15]} />
            <meshStandardMaterial color="#333333" roughness={0.7} />
          </mesh>
          
          <mesh position={[width/2 + 0.02, height/2 + 0.06, 0.3]} castShadow>
            <boxGeometry args={[0.04, 0.12, 0.15]} />
            <meshStandardMaterial color="#333333" roughness={0.7} />
          </mesh>
          
          {/* Rolluik guide rails */}
          <mesh position={[-width/2 + 0.02, 0, 0.31]} castShadow>
            <boxGeometry args={[0.03, height, 0.02]} />
            <meshStandardMaterial color="#555555" metalness={0.5} roughness={0.6} />
          </mesh>
          
          <mesh position={[width/2 - 0.02, 0, 0.31]} castShadow>
            <boxGeometry args={[0.03, height, 0.02]} />
            <meshStandardMaterial color="#555555" metalness={0.5} roughness={0.6} />
          </mesh>
          
          {/* Rolluik curtain - animated */}
          <mesh 
            ref={rolluikRef} 
            position={[0, 0, 0.28]} 
            scale={[1, 0.5, 1]}
            castShadow
          >
            <boxGeometry args={[width - 0.08, height, 0.01]} />
            <meshStandardMaterial color="#cccccc" roughness={0.5} metalness={0.2} />
            
            {/* Horizontal slats for the rolluik */}
            {Array.from({ length: 20 }).map((_, i) => (
              <mesh key={`slat-${i}`} position={[0, height/2 - i * (height/18) - 0.03, 0.006]} castShadow>
                <boxGeometry args={[width - 0.09, 0.025, 0.008]} />
                <meshStandardMaterial color="#aaaaaa" metalness={0.3} roughness={0.6} />
              </mesh>
            ))}
          </mesh>
        </group>
      )}

      {/* Kader dakkapel if selected - improved with tighter integration */}
      {showKaderDakkapel && (
        <group>
          {/* Top frame */}
          <mesh position={[0, height/2 + 0.01, 0.26]} castShadow>
            <boxGeometry args={[width + 0.06, 0.04, 0.03]} />
            <meshStandardMaterial color="#333333" roughness={0.7} />
          </mesh>
          
          {/* Bottom frame */}
          <mesh position={[0, -height/2 - 0.01, 0.26]} castShadow>
            <boxGeometry args={[width + 0.06, 0.04, 0.03]} />
            <meshStandardMaterial color="#333333" roughness={0.7} />
          </mesh>
          
          {/* Left frame */}
          <mesh position={[-width/2 - 0.03, 0, 0.26]} castShadow>
            <boxGeometry args={[0.04, height, 0.03]} />
            <meshStandardMaterial color="#333333" roughness={0.7} />
          </mesh>
          
          {/* Right frame */}
          <mesh position={[width/2 + 0.03, 0, 0.26]} castShadow>
            <boxGeometry args={[0.04, height, 0.03]} />
            <meshStandardMaterial color="#333333" roughness={0.7} />
          </mesh>
          
          {/* Corner trims */}
          {[
            [-width/2 - 0.03, height/2 + 0.01, 0.26],
            [width/2 + 0.03, height/2 + 0.01, 0.26],
            [-width/2 - 0.03, -height/2 - 0.01, 0.26],
            [width/2 + 0.03, -height/2 - 0.01, 0.26]
          ].map((pos, i) => (
            <mesh key={`corner-${i}`} position={pos} castShadow>
              <boxGeometry args={[0.05, 0.05, 0.035]} />
              <meshStandardMaterial color="#222222" roughness={0.7} />
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
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 2.5], fov: 50 }}
      >
        <color attach="background" args={['#f5f5f5']} />
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.8} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.4} />
        {/* Use SoftShadows component for better shadows */}
        <SoftShadows size={10} focus={0.5} samples={16} />
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
