
import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Center, useTexture } from '@react-three/drei';
import {
  HOUSE_WIDTH, 
  HOUSE_DEPTH, 
  HOUSE_HEIGHT, 
  ROOF_THICKNESS, 
  FRAME_THICKNESS, 
  GLASS_THICKNESS,
  OVERHANG_DEPTH,
  FLOOR_DEPTH,
  BORDER_TRIM_WIDTH,
  WOOD_COLOR,
  DARK_WOOD_COLOR, 
  WALLS_COLOR, 
  GLASS_COLOR, 
  ROOF_COLOR, 
  GRASS_COLOR, 
  FLOOR_COLOR,
  DOOR_COLOR,
  DOOR_HANDLE_COLOR,
  WINDOW_FRAME_COLOR,
  LAMP_COLOR,
  TABLE_COLOR,
  CHAIR_COLOR,
  WOOD_TEXTURE_REPEAT,
  WALL_PLANKS_COUNT
} from './constants';

interface GardenHouseModelProps {
  autoRotate?: boolean;
}

export function GardenHouseModel({ autoRotate = false }: GardenHouseModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Optimal camera position for viewing
  React.useEffect(() => {
    camera.position.set(8, 4, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Rotation for visual interest if autoRotate is enabled
  useFrame((state) => {
    if (modelRef.current && autoRotate) {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  // Load textures
  const woodTexture = useTexture('/lovable-uploads/0f924302-ce62-4b4d-bd49-46be5ab319c5.png');
  const floorTexture = useTexture('/lovable-uploads/3095a7de-a421-46ee-97ff-ff3df4675b7a.png');
  
  // Configure texture repeats and wrapping
  useMemo(() => {
    woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(WOOD_TEXTURE_REPEAT, WOOD_TEXTURE_REPEAT);
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(3, 3);
    
    // Updated texture properties to be compatible with Three.js v0.176.0
    woodTexture.colorSpace = THREE.SRGBColorSpace;
    floorTexture.colorSpace = THREE.SRGBColorSpace;
  }, [woodTexture, floorTexture]);

  // Enhanced materials with better textures
  const woodMaterial = new THREE.MeshStandardMaterial({ 
    color: WOOD_COLOR,
    roughness: 0.8,
    metalness: 0.1,
    envMapIntensity: 1.5
  });
  
  const wallsMaterial = new THREE.MeshStandardMaterial({
    color: WALLS_COLOR,
    roughness: 0.9,
    metalness: 0.1,
    envMapIntensity: 0.8
  });
  
  const roofMaterial = new THREE.MeshStandardMaterial({
    color: ROOF_COLOR,
    roughness: 1.0,
    metalness: 0.05,
    envMapIntensity: 0.5
  });
  
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: GLASS_COLOR,
    transparent: true,
    opacity: 0.3,
    roughness: 0.05,
    transmission: 0.95,
    thickness: 0.02,
    envMapIntensity: 2.0,
    ior: 1.5
  });

  const floorMaterial = new THREE.MeshStandardMaterial({
    color: FLOOR_COLOR,
    roughness: 0.8,
    metalness: 0,
    envMapIntensity: 0.8
  });

  // Generate horizontal planks for walls
  const createPlankSegments = (width: number, height: number, depth: number, count: number) => {
    const planks = [];
    const plankHeight = height / count;
    
    for (let i = 0; i < count; i++) {
      planks.push(
        <mesh 
          key={`plank-${i}`} 
          position={[0, -height/2 + plankHeight/2 + i * plankHeight, 0]}
          castShadow 
          receiveShadow
        >
          <boxGeometry args={[width, plankHeight * 0.96, depth]} />
          <meshStandardMaterial color={WALLS_COLOR} roughness={0.9} />
        </mesh>
      );
    }
    
    return planks;
  };

  // Render the garden house
  return (
    <Center>
      <group ref={modelRef} rotation={[0, Math.PI / 6, 0]}>
        {/* Ground/Grass */}
        <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color={GRASS_COLOR} roughness={0.9} />
        </mesh>
        
        {/* Concrete Patio Floor */}
        <mesh position={[0, -0.03, HOUSE_DEPTH/2 - 0.1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[HOUSE_WIDTH + 1.5, OVERHANG_DEPTH + 0.8]} />
          <meshStandardMaterial {...floorMaterial} />
        </mesh>
        
        {/* Main Building Structure Base */}
        <group position={[0, HOUSE_HEIGHT/2 - 0.05, -OVERHANG_DEPTH/6]}>
          {/* Main House Structure - with horizontal planks */}
          {createPlankSegments(
            HOUSE_WIDTH, 
            HOUSE_HEIGHT, 
            HOUSE_DEPTH - OVERHANG_DEPTH, 
            WALL_PLANKS_COUNT
          )}
        </group>
        
        {/* Roof trim - Douglas wood along top edge */}
        <mesh position={[0, HOUSE_HEIGHT - BORDER_TRIM_WIDTH/2, 0]} castShadow receiveShadow>
          <boxGeometry args={[HOUSE_WIDTH + 0.15, BORDER_TRIM_WIDTH, HOUSE_DEPTH + OVERHANG_DEPTH]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
        
        {/* Roof */}
        <mesh position={[0, HOUSE_HEIGHT + ROOF_THICKNESS/2, 0]} receiveShadow>
          <boxGeometry args={[HOUSE_WIDTH + 0.3, ROOF_THICKNESS, HOUSE_DEPTH + OVERHANG_DEPTH]} />
          <meshStandardMaterial {...roofMaterial} />
        </mesh>
        
        {/* Corner posts - All four corners */}
        {[
          [-HOUSE_WIDTH/2, HOUSE_HEIGHT/2, -HOUSE_DEPTH/2 + OVERHANG_DEPTH/2],
          [HOUSE_WIDTH/2, HOUSE_HEIGHT/2, -HOUSE_DEPTH/2 + OVERHANG_DEPTH/2],
          [-HOUSE_WIDTH/2, HOUSE_HEIGHT/2, HOUSE_DEPTH/2],
          [HOUSE_WIDTH/2, HOUSE_HEIGHT/2, HOUSE_DEPTH/2]
        ].map((pos, idx) => (
          <mesh 
            key={`corner-post-${idx}`} 
            position={pos as [number, number, number]} 
            castShadow
          >
            <boxGeometry args={[FRAME_THICKNESS, HOUSE_HEIGHT, FRAME_THICKNESS]} />
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
        ))}
        
        {/* Overhang Support posts */}
        {[
          [-HOUSE_WIDTH/2 + FRAME_THICKNESS/2, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - OVERHANG_DEPTH/2],
          [HOUSE_WIDTH/2 - FRAME_THICKNESS/2, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - OVERHANG_DEPTH/2]
        ].map((pos, idx) => (
          <mesh 
            key={`support-post-${idx}`} 
            position={pos as [number, number, number]} 
            castShadow
          >
            <boxGeometry args={[FRAME_THICKNESS, HOUSE_HEIGHT, FRAME_THICKNESS]} />
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
        ))}
        
        {/* Diagonal Support Beams */}
        {[
          [-HOUSE_WIDTH/2 + FRAME_THICKNESS, HOUSE_HEIGHT * 0.75, HOUSE_DEPTH/2 - OVERHANG_DEPTH/4, -Math.PI/4],
          [HOUSE_WIDTH/2 - FRAME_THICKNESS, HOUSE_HEIGHT * 0.75, HOUSE_DEPTH/2 - OVERHANG_DEPTH/4, Math.PI/4]
        ].map((data, idx) => {
          const [x, y, z, rotation] = data as [number, number, number, number];
          return (
            <group key={`diagonal-beam-${idx}`} position={[x, y, z]}>
              <mesh rotation={[0, rotation, 0]} castShadow>
                <boxGeometry args={[FRAME_THICKNESS, FRAME_THICKNESS, HOUSE_HEIGHT * 0.5]} />
                <meshStandardMaterial {...woodMaterial} />
              </mesh>
            </group>
          );
        })}
        
        {/* Window - Front Wall */}
        <group position={[-HOUSE_WIDTH/2 + 1.3, HOUSE_HEIGHT * 0.6, -HOUSE_DEPTH/2 + OVERHANG_DEPTH/2 + 0.02]}>
          {/* Window frame - wood color to match photos */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.2, 1.2, FRAME_THICKNESS]} />
            <meshStandardMaterial color={WINDOW_FRAME_COLOR} />
          </mesh>
          
          {/* Window dividers (cross pattern) */}
          <mesh position={[0, 0, FRAME_THICKNESS/2]} castShadow>
            <boxGeometry args={[0.05, 1.2, FRAME_THICKNESS/2]} />
            <meshStandardMaterial color={WINDOW_FRAME_COLOR} />
          </mesh>
          
          <mesh position={[0, 0, FRAME_THICKNESS/2]} castShadow>
            <boxGeometry args={[1.2, 0.05, FRAME_THICKNESS/2]} />
            <meshStandardMaterial color={WINDOW_FRAME_COLOR} />
          </mesh>
          
          {/* Window glass */}
          <group position={[0, 0, 0.015]}>
            <mesh>
              <boxGeometry args={[0.55, 0.55, GLASS_THICKNESS]} />
              <meshPhysicalMaterial {...glassMaterial} />
            </mesh>
            <mesh position={[0.55, 0, 0]}>
              <boxGeometry args={[0.55, 0.55, GLASS_THICKNESS]} />
              <meshPhysicalMaterial {...glassMaterial} />
            </mesh>
            <mesh position={[0, 0.55, 0]}>
              <boxGeometry args={[0.55, 0.55, GLASS_THICKNESS]} />
              <meshPhysicalMaterial {...glassMaterial} />
            </mesh>
            <mesh position={[0.55, 0.55, 0]}>
              <boxGeometry args={[0.55, 0.55, GLASS_THICKNESS]} />
              <meshPhysicalMaterial {...glassMaterial} />
            </mesh>
          </group>
        </group>
        
        {/* Door - Full Glass Door */}
        <group position={[HOUSE_WIDTH/2 - 0.6, HOUSE_HEIGHT/2 - 0.3, HOUSE_DEPTH/2 - 0.02]}>
          {/* Door frame */}
          <mesh castShadow>
            <boxGeometry args={[1.2, HOUSE_HEIGHT * 0.85, FRAME_THICKNESS]} />
            <meshStandardMaterial color={DOOR_COLOR} />
          </mesh>
          
          {/* Door glass panel */}
          <mesh position={[0, 0, -0.01]}>
            <boxGeometry args={[1.0, HOUSE_HEIGHT * 0.75, GLASS_THICKNESS]} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
          
          {/* Door handle */}
          <mesh position={[-0.45, 0, -0.05]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
            <meshStandardMaterial color={DOOR_HANDLE_COLOR} metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
        
        {/* Wooden Table */}
        <mesh position={[0, 0.4, HOUSE_DEPTH/2 - 0.8]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.08, 0.9]} />
          <meshStandardMaterial color={TABLE_COLOR} roughness={0.6} />
        </mesh>
        
        {/* Table Legs */}
        {[
          [-0.65, 0.2, -0.4],
          [0.65, 0.2, -0.4],
          [-0.65, 0.2, 0.4],
          [0.65, 0.2, 0.4]
        ].map((pos, idx) => (
          <mesh 
            key={`table-leg-${idx}`} 
            position={[pos[0], pos[1], pos[2] + HOUSE_DEPTH/2 - 0.8]}
            castShadow
          >
            <boxGeometry args={[0.08, 0.8, 0.08]} />
            <meshStandardMaterial color={TABLE_COLOR} />
          </mesh>
        ))}
        
        {/* Chairs around table - matching black chairs from photos */}
        {[
          [-0.6, 0, -0.7],
          [0.6, 0, -0.7],
          [-0.6, 0, 0.7],
          [0.6, 0, 0.7]
        ].map((pos, idx) => (
          <group 
            key={`chair-${idx}`} 
            position={[pos[0], 0.4, pos[2] + HOUSE_DEPTH/2 - 0.8]}
          >
            {/* Chair seat */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.45, 0.05, 0.45]} />
              <meshStandardMaterial color={CHAIR_COLOR} />
            </mesh>
            
            {/* Chair back */}
            <mesh position={[0, 0.25, -0.22]} castShadow>
              <boxGeometry args={[0.45, 0.5, 0.05]} />
              <meshStandardMaterial color={CHAIR_COLOR} />
            </mesh>
            
            {/* Chair legs */}
            {[
              [-0.2, -0.2, -0.2],
              [0.2, -0.2, -0.2],
              [-0.2, -0.2, 0.2],
              [0.2, -0.2, 0.2]
            ].map((legPos, legIdx) => (
              <mesh 
                key={`chair-${idx}-leg-${legIdx}`} 
                position={legPos as [number, number, number]}
                castShadow
              >
                <boxGeometry args={[0.04, 0.4, 0.04]} />
                <meshStandardMaterial color={CHAIR_COLOR} />
              </mesh>
            ))}
          </group>
        ))}
        
        {/* Hanging Lamp over table - matching copper lamp from photos */}
        <mesh position={[0, HOUSE_HEIGHT - 0.4, HOUSE_DEPTH/2 - 0.8]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.8, 8]} />
          <meshStandardMaterial color={CHAIR_COLOR} />
        </mesh>
        
        {/* Fixed: Using sphereGeometry instead of hemisphereGeometry */}
        <mesh position={[0, HOUSE_HEIGHT - 0.9, HOUSE_DEPTH/2 - 0.8]} castShadow>
          <sphereGeometry args={[0.2, 16, 8]} />
          <meshStandardMaterial color={LAMP_COLOR} roughness={0.4} metalness={0.7} />
          
          {/* Light source inside lamp */}
          <pointLight
            position={[0, -0.05, 0]}
            intensity={1.2}
            color="#fffaea"
            distance={4}
            decay={2}
            castShadow
          />
        </mesh>
      </group>
    </Center>
  );
}
