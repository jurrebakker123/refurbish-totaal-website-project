
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
  WOOD_COLOR,
  DARK_WOOD_COLOR, 
  FRAME_COLOR, 
  WALLS_COLOR, 
  GLASS_COLOR, 
  ROOF_COLOR, 
  GRASS_COLOR, 
  FLOOR_COLOR,
  DOOR_COLOR,
  DOOR_HANDLE_COLOR
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
      modelRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  // Create material with wood texture for the frame
  const woodMaterial = new THREE.MeshStandardMaterial({ 
    color: WOOD_COLOR,
    roughness: 0.7,
    metalness: 0.1
  });
  
  // Create material with darker wood texture for doors and window frames
  const doorMaterial = new THREE.MeshStandardMaterial({ 
    color: DOOR_COLOR, 
    roughness: 0.6,
    metalness: 0.1
  });

  // Glass material
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: GLASS_COLOR,
    transparent: true,
    opacity: 0.3,
    roughness: 0.05,
    transmission: 0.95,
    thickness: 0.05
  });

  return (
    <Center>
      <group ref={modelRef} position={[0, 0, 0]}>
        {/* Base/Foundation - Concrete Patio */}
        <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[HOUSE_WIDTH + OVERHANG_DEPTH, HOUSE_DEPTH + 1]} />
          <meshStandardMaterial color={FLOOR_COLOR} roughness={0.8} />
        </mesh>
        
        {/* Grass */}
        <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color={GRASS_COLOR} roughness={0.9} />
        </mesh>
        
        {/* Main House Structure */}
        <mesh position={[0, HOUSE_HEIGHT / 2, 0]}>
          <boxGeometry args={[HOUSE_WIDTH, HOUSE_HEIGHT, HOUSE_DEPTH]} />
          <meshStandardMaterial color={WALLS_COLOR} roughness={0.7} />
        </mesh>
        
        {/* Roof */}
        <mesh position={[0, HOUSE_HEIGHT + ROOF_THICKNESS / 2, 0]}>
          <boxGeometry args={[HOUSE_WIDTH + 0.2, ROOF_THICKNESS, HOUSE_DEPTH + 0.2]} />
          <meshStandardMaterial color={ROOF_COLOR} roughness={0.7} />
        </mesh>
        
        {/* Wooden Frame - Decorative Edge at Roof */}
        <mesh position={[0, HOUSE_HEIGHT - 0.05, 0]}>
          <boxGeometry args={[HOUSE_WIDTH + 0.15, 0.1, HOUSE_DEPTH + 0.15]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
        
        {/* Corner Posts/Pillars */}
        {[
          [-HOUSE_WIDTH/2 + FRAME_THICKNESS/2, HOUSE_HEIGHT/2, -HOUSE_DEPTH/2 + FRAME_THICKNESS/2],
          [HOUSE_WIDTH/2 - FRAME_THICKNESS/2, HOUSE_HEIGHT/2, -HOUSE_DEPTH/2 + FRAME_THICKNESS/2],
          [-HOUSE_WIDTH/2 + FRAME_THICKNESS/2, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - FRAME_THICKNESS/2],
          [HOUSE_WIDTH/2 - FRAME_THICKNESS/2, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - FRAME_THICKNESS/2]
        ].map((position, index) => (
          <mesh key={`post-${index}`} position={position as [number, number, number]}>
            <boxGeometry args={[FRAME_THICKNESS, HOUSE_HEIGHT, FRAME_THICKNESS]} />
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
        ))}
        
        {/* Overhang Support Beams (right side) */}
        {[
          [HOUSE_WIDTH/2 - FRAME_THICKNESS/2, HOUSE_HEIGHT * 0.75, HOUSE_DEPTH/2 + OVERHANG_DEPTH/2],
          [HOUSE_WIDTH/2 - FRAME_THICKNESS/2, HOUSE_HEIGHT * 0.75, HOUSE_DEPTH/2 + OVERHANG_DEPTH * 0.9]
        ].map((position, index) => (
          <mesh key={`beam-overhang-${index}`} position={position as [number, number, number]}>
            <boxGeometry args={[FRAME_THICKNESS, FRAME_THICKNESS, HOUSE_DEPTH * 0.3]} rotation={[0, Math.PI / 4, 0]} />
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
        ))}
        
        {/* Overhang Vertical Supports */}
        {[
          [HOUSE_WIDTH/2 - FRAME_THICKNESS/2, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 + OVERHANG_DEPTH],
          [0, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 + OVERHANG_DEPTH]
        ].map((position, index) => (
          <mesh key={`support-${index}`} position={position as [number, number, number]}>
            <boxGeometry args={[FRAME_THICKNESS, HOUSE_HEIGHT, FRAME_THICKNESS]} />
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
        ))}
        
        {/* Overhang Roof Extension */}
        <mesh position={[HOUSE_WIDTH/4, HOUSE_HEIGHT, HOUSE_DEPTH/2 + OVERHANG_DEPTH/2]}>
          <boxGeometry args={[HOUSE_WIDTH/2, ROOF_THICKNESS, OVERHANG_DEPTH]} />
          <meshStandardMaterial color={ROOF_COLOR} roughness={0.7} />
        </mesh>
        
        {/* Front Door */}
        <mesh position={[HOUSE_WIDTH/2 - 0.6, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - GLASS_THICKNESS/2]}>
          <boxGeometry args={[1.2, 2.2, GLASS_THICKNESS]} />
          <meshStandardMaterial {...doorMaterial} />
        </mesh>
        
        {/* Door Handle */}
        <mesh position={[HOUSE_WIDTH/2 - 0.9, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - GLASS_THICKNESS]}>
          <boxGeometry args={[0.05, 0.15, 0.05]} />
          <meshStandardMaterial color={DOOR_HANDLE_COLOR} metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Side Window */}
        <mesh position={[-HOUSE_WIDTH/2 + GLASS_THICKNESS/2, HOUSE_HEIGHT*0.6, 0]}>
          <boxGeometry args={[GLASS_THICKNESS, HOUSE_HEIGHT/3, HOUSE_DEPTH/3]} />
          <meshStandardMaterial {...glassMaterial} />
        </mesh>
        
        {/* Window Frame */}
        <mesh position={[-HOUSE_WIDTH/2 + GLASS_THICKNESS, HOUSE_HEIGHT*0.6, 0]}>
          <boxGeometry args={[FRAME_THICKNESS/2, HOUSE_HEIGHT/3 + FRAME_THICKNESS*0.8, HOUSE_DEPTH/3 + FRAME_THICKNESS*0.8]} />
          <meshStandardMaterial color={WOOD_COLOR} />
        </mesh>
        
        {/* Window Panes Dividers - Horizontal */}
        <mesh position={[-HOUSE_WIDTH/2 + GLASS_THICKNESS/2, HOUSE_HEIGHT*0.6, 0]}>
          <boxGeometry args={[GLASS_THICKNESS*2, FRAME_THICKNESS/4, HOUSE_DEPTH/3]} />
          <meshStandardMaterial color={WOOD_COLOR} />
        </mesh>
        
        {/* Window Panes Dividers - Vertical */}
        <mesh position={[-HOUSE_WIDTH/2 + GLASS_THICKNESS/2, HOUSE_HEIGHT*0.6, 0]}>
          <boxGeometry args={[GLASS_THICKNESS*2, HOUSE_HEIGHT/3, FRAME_THICKNESS/4]} />
          <meshStandardMaterial color={WOOD_COLOR} />
        </mesh>
        
        {/* Furniture inside - Table */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.6, 0.05, 0.8]} />
          <meshStandardMaterial color={WOOD_COLOR} roughness={0.5} />
        </mesh>
        
        {/* Table Legs */}
        {[
          [0.7, 0.2, 0.3],
          [0.7, 0.2, -0.3],
          [-0.7, 0.2, 0.3],
          [-0.7, 0.2, -0.3]
        ].map((position, index) => (
          <mesh key={`table-leg-${index}`} position={position as [number, number, number]}>
            <boxGeometry args={[0.05, 0.8, 0.05]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        ))}
        
        {/* Chairs */}
        {[
          [0.5, 0.25, 0.5],
          [0.5, 0.25, -0.5],
          [-0.5, 0.25, 0.5],
          [-0.5, 0.25, -0.5]
        ].map((position, index) => (
          <group key={`chair-${index}`} position={position as [number, number, number]}>
            {/* Chair seat */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.4, 0.05, 0.4]} />
              <meshStandardMaterial color="#222222" />
            </mesh>
            
            {/* Chair backrest */}
            <mesh position={[0, 0.25, -0.19]}>
              <boxGeometry args={[0.38, 0.5, 0.02]} />
              <meshStandardMaterial color="#222222" />
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
                <meshStandardMaterial color="#111111" />
              </mesh>
            ))}
          </group>
        ))}
        
        {/* Hanging Lamp */}
        <mesh position={[0, HOUSE_HEIGHT - 0.3, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.5, 8]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        
        <mesh position={[0, HOUSE_HEIGHT - 0.6, 0]}>
          <coneGeometry args={[0.15, 0.2, 16]} />
          <meshStandardMaterial color="#5d4037" roughness={0.5} />
        </mesh>
        
        <mesh position={[0, HOUSE_HEIGHT - 0.7, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#ffeb3b" emissive="#ffeb3b" emissiveIntensity={1} />
        </mesh>
      </group>
    </Center>
  );
}
