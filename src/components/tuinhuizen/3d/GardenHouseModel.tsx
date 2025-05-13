
import React, { useRef, useEffect } from 'react';
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
  CHAIR_COLOR
} from './constants';

interface GardenHouseModelProps {
  autoRotate?: boolean;
}

export function GardenHouseModel({ autoRotate = false }: GardenHouseModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  useEffect(() => {
    // Set the camera to a more realistic viewing position
    camera.position.set(8, 4, 8);
  }, [camera]);
  
  // Small rotation for visual interest if autoRotate is enabled
  useFrame((state) => {
    if (modelRef.current && autoRotate) {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  // Materials
  const woodMaterial = new THREE.MeshStandardMaterial({ 
    color: WOOD_COLOR,
    roughness: 0.7,
    metalness: 0.1
  });
  
  const wallsMaterial = new THREE.MeshStandardMaterial({
    color: WALLS_COLOR,
    roughness: 0.8,
    metalness: 0.05
  });
  
  const roofMaterial = new THREE.MeshStandardMaterial({
    color: ROOF_COLOR,
    roughness: 0.9,
    metalness: 0.1
  });
  
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: GLASS_COLOR,
    transparent: true,
    opacity: 0.3,
    roughness: 0.05,
    transmission: 0.95,
    thickness: 0.05
  });

  // Render the garden house
  return (
    <Center>
      <group ref={modelRef} position={[0, 0, 0]}>
        {/* Ground/Grass */}
        <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color={GRASS_COLOR} roughness={0.9} />
        </mesh>
        
        {/* Concrete Patio */}
        <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[HOUSE_WIDTH + 1, HOUSE_DEPTH + 2]} />
          <meshStandardMaterial color={FLOOR_COLOR} roughness={0.8} />
        </mesh>
        
        {/* Main House Structure */}
        <mesh position={[0, HOUSE_HEIGHT / 2, 0]}>
          <boxGeometry args={[HOUSE_WIDTH, HOUSE_HEIGHT, HOUSE_DEPTH]} />
          <meshStandardMaterial {...wallsMaterial} />
        </mesh>
        
        {/* Roof */}
        <mesh position={[0, HOUSE_HEIGHT + ROOF_THICKNESS / 2, 0]}>
          <boxGeometry args={[HOUSE_WIDTH + 0.2, ROOF_THICKNESS, HOUSE_DEPTH + 0.2]} />
          <meshStandardMaterial {...roofMaterial} />
        </mesh>
        
        {/* Wooden Trim at Top Edge - Front */}
        <mesh position={[0, HOUSE_HEIGHT - BORDER_TRIM_WIDTH / 2, HOUSE_DEPTH / 2]}>
          <boxGeometry args={[HOUSE_WIDTH, BORDER_TRIM_WIDTH, 0.05]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
        
        {/* Wooden Trim at Top Edge - Back */}
        <mesh position={[0, HOUSE_HEIGHT - BORDER_TRIM_WIDTH / 2, -HOUSE_DEPTH / 2]}>
          <boxGeometry args={[HOUSE_WIDTH, BORDER_TRIM_WIDTH, 0.05]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
        
        {/* Wooden Trim at Top Edge - Left */}
        <mesh position={[-HOUSE_WIDTH / 2, HOUSE_HEIGHT - BORDER_TRIM_WIDTH / 2, 0]}>
          <boxGeometry args={[0.05, BORDER_TRIM_WIDTH, HOUSE_DEPTH]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
        
        {/* Wooden Trim at Top Edge - Right */}
        <mesh position={[HOUSE_WIDTH / 2, HOUSE_HEIGHT - BORDER_TRIM_WIDTH / 2, 0]}>
          <boxGeometry args={[0.05, BORDER_TRIM_WIDTH, HOUSE_DEPTH]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
        
        {/* Corner Posts */}
        {[
          [-HOUSE_WIDTH/2, HOUSE_HEIGHT/2, HOUSE_DEPTH/2],
          [HOUSE_WIDTH/2, HOUSE_HEIGHT/2, HOUSE_DEPTH/2],
          [-HOUSE_WIDTH/2, HOUSE_HEIGHT/2, -HOUSE_DEPTH/2],
          [HOUSE_WIDTH/2, HOUSE_HEIGHT/2, -HOUSE_DEPTH/2]
        ].map((position, index) => (
          <mesh key={`post-${index}`} position={position as [number, number, number]}>
            <boxGeometry args={[FRAME_THICKNESS, HOUSE_HEIGHT, FRAME_THICKNESS]} />
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
        ))}
        
        {/* Overhang Support Beams */}
        {[
          [HOUSE_WIDTH/4, HOUSE_HEIGHT - 0.3, HOUSE_DEPTH/2 + OVERHANG_DEPTH * 0.5],
          [-HOUSE_WIDTH/4, HOUSE_HEIGHT - 0.3, HOUSE_DEPTH/2 + OVERHANG_DEPTH * 0.5],
        ].map((position, index) => (
          <mesh key={`beam-long-${index}`} position={position as [number, number, number]}>
            <boxGeometry args={[FRAME_THICKNESS, FRAME_THICKNESS, OVERHANG_DEPTH * 0.9]} />
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
        ))}
        
        {/* Diagonal Support Beams */}
        {[
          [HOUSE_WIDTH/2 - FRAME_THICKNESS, HOUSE_HEIGHT * 0.75, HOUSE_DEPTH/2 + OVERHANG_DEPTH/3],
          [-HOUSE_WIDTH/2 + FRAME_THICKNESS, HOUSE_HEIGHT * 0.75, HOUSE_DEPTH/2 + OVERHANG_DEPTH/3]
        ].map((position, index) => (
          <mesh 
            key={`beam-diagonal-${index}`} 
            position={position as [number, number, number]} 
            rotation={[0, index === 0 ? Math.PI / 4 : -Math.PI / 4, 0]}
          >
            <boxGeometry args={[FRAME_THICKNESS, FRAME_THICKNESS, HOUSE_HEIGHT * 0.4]} />
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
        ))}
        
        {/* Vertical Support Beams for Overhang */}
        {[
          [HOUSE_WIDTH/2 - FRAME_THICKNESS/2, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 + OVERHANG_DEPTH - FRAME_THICKNESS/2],
          [-HOUSE_WIDTH/2 + FRAME_THICKNESS/2, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 + OVERHANG_DEPTH - FRAME_THICKNESS/2]
        ].map((position, index) => (
          <mesh key={`support-${index}`} position={position as [number, number, number]}>
            <boxGeometry args={[FRAME_THICKNESS, HOUSE_HEIGHT, FRAME_THICKNESS]} />
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
        ))}
        
        {/* Overhang Roof */}
        <mesh position={[0, HOUSE_HEIGHT, HOUSE_DEPTH/2 + OVERHANG_DEPTH/2 - 0.1]}>
          <boxGeometry args={[HOUSE_WIDTH, ROOF_THICKNESS, OVERHANG_DEPTH + 0.2]} />
          <meshStandardMaterial {...roofMaterial} />
        </mesh>
        
        {/* Glass Door (right side) */}
        <mesh position={[HOUSE_WIDTH/2 - 0.6, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - GLASS_THICKNESS/2]}>
          <boxGeometry args={[1.0, HOUSE_HEIGHT * 0.8, GLASS_THICKNESS]} />
          <meshStandardMaterial {...glassMaterial} />
        </mesh>
        
        {/* Door Frame */}
        <mesh position={[HOUSE_WIDTH/2 - 0.6, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - GLASS_THICKNESS/2]}>
          <boxGeometry args={[1.1, HOUSE_HEIGHT * 0.82, FRAME_THICKNESS]} />
          <meshStandardMaterial color={DOOR_COLOR} />
        </mesh>
        
        {/* Door Handle */}
        <mesh position={[HOUSE_WIDTH/2 - 0.9, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - GLASS_THICKNESS * 2]}>
          <boxGeometry args={[0.05, 0.15, 0.05]} />
          <meshStandardMaterial color={DOOR_HANDLE_COLOR} metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Windows - Side wall (left) */}
        <group position={[-HOUSE_WIDTH/2 + GLASS_THICKNESS/2, HOUSE_HEIGHT * 0.6, 0]}>
          {/* Window glass */}
          <mesh>
            <boxGeometry args={[GLASS_THICKNESS, HOUSE_HEIGHT * 0.3, HOUSE_HEIGHT * 0.3]} />
            <meshStandardMaterial {...glassMaterial} />
          </mesh>
          
          {/* Window frame */}
          <mesh>
            <boxGeometry args={[FRAME_THICKNESS * 1.5, HOUSE_HEIGHT * 0.32, HOUSE_HEIGHT * 0.32]} />
            <meshStandardMaterial color={WINDOW_FRAME_COLOR} />
          </mesh>
          
          {/* Window dividers - vertical */}
          <mesh>
            <boxGeometry args={[FRAME_THICKNESS * 2, FRAME_THICKNESS * 0.5, HOUSE_HEIGHT * 0.32]} />
            <meshStandardMaterial color={WINDOW_FRAME_COLOR} />
          </mesh>
          
          {/* Window dividers - horizontal */}
          <mesh>
            <boxGeometry args={[FRAME_THICKNESS * 2, HOUSE_HEIGHT * 0.32, FRAME_THICKNESS * 0.5]} />
            <meshStandardMaterial color={WINDOW_FRAME_COLOR} />
          </mesh>
        </group>
        
        {/* Second Window - Side wall */}
        <group position={[-HOUSE_WIDTH/2 + GLASS_THICKNESS/2, HOUSE_HEIGHT * 0.6, -HOUSE_DEPTH * 0.25]}>
          {/* Window glass */}
          <mesh>
            <boxGeometry args={[GLASS_THICKNESS, HOUSE_HEIGHT * 0.3, HOUSE_HEIGHT * 0.3]} />
            <meshStandardMaterial {...glassMaterial} />
          </mesh>
          
          {/* Window frame */}
          <mesh>
            <boxGeometry args={[FRAME_THICKNESS * 1.5, HOUSE_HEIGHT * 0.32, HOUSE_HEIGHT * 0.32]} />
            <meshStandardMaterial color={WINDOW_FRAME_COLOR} />
          </mesh>
          
          {/* Window dividers - vertical */}
          <mesh>
            <boxGeometry args={[FRAME_THICKNESS * 2, FRAME_THICKNESS * 0.5, HOUSE_HEIGHT * 0.32]} />
            <meshStandardMaterial color={WINDOW_FRAME_COLOR} />
          </mesh>
          
          {/* Window dividers - horizontal */}
          <mesh>
            <boxGeometry args={[FRAME_THICKNESS * 2, HOUSE_HEIGHT * 0.32, FRAME_THICKNESS * 0.5]} />
            <meshStandardMaterial color={WINDOW_FRAME_COLOR} />
          </mesh>
        </group>
        
        {/* Furniture inside - Table */}
        <mesh position={[0, 0.4, HOUSE_DEPTH/2 - 1.0]}>
          <boxGeometry args={[1.4, 0.05, 0.8]} />
          <meshStandardMaterial color={TABLE_COLOR} roughness={0.5} />
        </mesh>
        
        {/* Table Legs */}
        {[
          [0.65, 0.2, HOUSE_DEPTH/2 - 0.7],
          [0.65, 0.2, HOUSE_DEPTH/2 - 1.3],
          [-0.65, 0.2, HOUSE_DEPTH/2 - 0.7],
          [-0.65, 0.2, HOUSE_DEPTH/2 - 1.3]
        ].map((position, index) => (
          <mesh key={`table-leg-${index}`} position={position as [number, number, number]}>
            <boxGeometry args={[0.05, 0.8, 0.05]} />
            <meshStandardMaterial color={CHAIR_COLOR} />
          </mesh>
        ))}
        
        {/* Chairs */}
        {[
          [0.4, 0.25, HOUSE_DEPTH/2 - 0.5],
          [-0.4, 0.25, HOUSE_DEPTH/2 - 0.5],
          [0.4, 0.25, HOUSE_DEPTH/2 - 1.5],
          [-0.4, 0.25, HOUSE_DEPTH/2 - 1.5]
        ].map((position, index) => (
          <group key={`chair-${index}`} position={position as [number, number, number]}>
            {/* Chair seat */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.4, 0.05, 0.4]} />
              <meshStandardMaterial color={CHAIR_COLOR} />
            </mesh>
            
            {/* Chair backrest */}
            <mesh position={[0, 0.25, -0.19]}>
              <boxGeometry args={[0.38, 0.5, 0.02]} />
              <meshStandardMaterial color={CHAIR_COLOR} />
            </mesh>
            
            {/* Chair legs */}
            {[
              [0.18, -0.25, 0.18],
              [-0.18, -0.25, 0.18],
              [0.18, -0.25, -0.18],
              [-0.18, -0.25, -0.18]
            ].map((legPos, legIndex) => (
              <mesh key={`chair-leg-${index}-${legIndex}`} position={legPos as [number, number, number]}>
                <boxGeometry args={[0.02, 0.5, 0.02]} />
                <meshStandardMaterial color={CHAIR_COLOR} />
              </mesh>
            ))}
          </group>
        ))}
        
        {/* Hanging Lamp */}
        <mesh position={[0, HOUSE_HEIGHT - 0.3, HOUSE_DEPTH/2 - 1.0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.7, 8]} />
          <meshStandardMaterial color={CHAIR_COLOR} />
        </mesh>
        
        <mesh position={[0, HOUSE_HEIGHT - 0.8, HOUSE_DEPTH/2 - 1.0]}>
          <coneGeometry args={[0.2, 0.25, 16]} />
          <meshStandardMaterial color={LAMP_COLOR} roughness={0.5} metalness={0.3} />
        </mesh>
      </group>
    </Center>
  );
}
