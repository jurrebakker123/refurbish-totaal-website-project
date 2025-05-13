
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import {
  HOUSE_WIDTH, 
  HOUSE_DEPTH, 
  HOUSE_HEIGHT, 
  ROOF_THICKNESS, 
  FRAME_THICKNESS, 
  GLASS_THICKNESS,
  WOOD_COLOR,
  DARK_WOOD_COLOR, 
  FRAME_COLOR, 
  WALLS_COLOR, 
  GLASS_COLOR, 
  ROOF_COLOR, 
  GRASS_COLOR, 
  FLOOR_COLOR
} from './constants';

interface GardenHouseModelProps {
  autoRotate?: boolean;
}

export function GardenHouseModel({ autoRotate = false }: GardenHouseModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(7, 4, 7);
  }, [camera]);
  
  // Small rotation for visual interest
  useFrame((state) => {
    if (modelRef.current && autoRotate) {
      modelRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <Center>
      <group ref={modelRef}>
        {/* Floor/terrace */}
        <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 8]} />
          <meshStandardMaterial color={FLOOR_COLOR} />
        </mesh>
        
        {/* Grass */}
        <mesh position={[0, -0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color={GRASS_COLOR} />
        </mesh>
        
        {/* Main structure - walls */}
        <mesh position={[0, HOUSE_HEIGHT / 2, 0]}>
          <boxGeometry args={[HOUSE_WIDTH, HOUSE_HEIGHT, HOUSE_DEPTH]} />
          <meshStandardMaterial color={WALLS_COLOR} />
        </mesh>
        
        {/* Roof */}
        <mesh position={[0, HOUSE_HEIGHT + ROOF_THICKNESS / 2, 0]}>
          <boxGeometry args={[HOUSE_WIDTH + 0.1, ROOF_THICKNESS, HOUSE_DEPTH + 0.1]} />
          <meshStandardMaterial color={ROOF_COLOR} />
        </mesh>
        
        {/* Wooden frame - vertical posts at corners */}
        {[
          [-HOUSE_WIDTH/2 + FRAME_THICKNESS/2, HOUSE_HEIGHT/2, -HOUSE_DEPTH/2 + FRAME_THICKNESS/2],
          [HOUSE_WIDTH/2 - FRAME_THICKNESS/2, HOUSE_HEIGHT/2, -HOUSE_DEPTH/2 + FRAME_THICKNESS/2],
          [-HOUSE_WIDTH/2 + FRAME_THICKNESS/2, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - FRAME_THICKNESS/2],
          [HOUSE_WIDTH/2 - FRAME_THICKNESS/2, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - FRAME_THICKNESS/2]
        ].map((position, index) => (
          <mesh key={`post-${index}`} position={position as [number, number, number]}>
            <boxGeometry args={[FRAME_THICKNESS, HOUSE_HEIGHT, FRAME_THICKNESS]} />
            <meshStandardMaterial color={WOOD_COLOR} />
          </mesh>
        ))}
        
        {/* Wooden frame - horizontal beams at top */}
        {[
          [0, HOUSE_HEIGHT - FRAME_THICKNESS/2, -HOUSE_DEPTH/2 + FRAME_THICKNESS/2],
          [0, HOUSE_HEIGHT - FRAME_THICKNESS/2, HOUSE_DEPTH/2 - FRAME_THICKNESS/2],
          [-HOUSE_WIDTH/2 + FRAME_THICKNESS/2, HOUSE_HEIGHT - FRAME_THICKNESS/2, 0],
          [HOUSE_WIDTH/2 - FRAME_THICKNESS/2, HOUSE_HEIGHT - FRAME_THICKNESS/2, 0]
        ].map((position, index) => {
          const isLong = index < 2;
          return (
            <mesh key={`beam-top-${index}`} position={position as [number, number, number]}>
              <boxGeometry args={[isLong ? HOUSE_WIDTH - FRAME_THICKNESS : FRAME_THICKNESS, FRAME_THICKNESS, isLong ? FRAME_THICKNESS : HOUSE_DEPTH - FRAME_THICKNESS]} />
              <meshStandardMaterial color={WOOD_COLOR} />
            </mesh>
          );
        })}
        
        {/* Front glass door - right side */}
        <mesh position={[HOUSE_WIDTH/4, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - GLASS_THICKNESS/2]}>
          <boxGeometry args={[HOUSE_WIDTH/2 - FRAME_THICKNESS, HOUSE_HEIGHT - FRAME_THICKNESS, GLASS_THICKNESS]} />
          <meshPhysicalMaterial 
            color={GLASS_COLOR}
            transparent={true}
            opacity={0.3}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
        
        {/* Front glass panels - left side */}
        <mesh position={[-HOUSE_WIDTH/4, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - GLASS_THICKNESS/2]}>
          <boxGeometry args={[HOUSE_WIDTH/2 - FRAME_THICKNESS, HOUSE_HEIGHT - FRAME_THICKNESS, GLASS_THICKNESS]} />
          <meshPhysicalMaterial 
            color={GLASS_COLOR}
            transparent={true}
            opacity={0.3}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
        
        {/* Rear door */}
        <mesh position={[0, HOUSE_HEIGHT/2 - FRAME_THICKNESS/2, -HOUSE_DEPTH/2 + GLASS_THICKNESS/2]}>
          <boxGeometry args={[HOUSE_WIDTH/3, HOUSE_HEIGHT - FRAME_THICKNESS, GLASS_THICKNESS]} />
          <meshPhysicalMaterial 
            color={GLASS_COLOR}
            transparent={true}
            opacity={0.3}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
        
        {/* Window on side wall */}
        <mesh position={[-HOUSE_WIDTH/2 + GLASS_THICKNESS/2, HOUSE_HEIGHT*0.7, -HOUSE_DEPTH/4]}>
          <boxGeometry args={[GLASS_THICKNESS, HOUSE_HEIGHT/3, HOUSE_DEPTH/4]} />
          <meshPhysicalMaterial 
            color={GLASS_COLOR}
            transparent={true}
            opacity={0.3}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
        
        {/* Window frames */}
        <mesh position={[-HOUSE_WIDTH/2 + GLASS_THICKNESS*2, HOUSE_HEIGHT*0.7, -HOUSE_DEPTH/4]}>
          <boxGeometry args={[FRAME_THICKNESS/2, HOUSE_HEIGHT/3 + FRAME_THICKNESS*0.8, HOUSE_DEPTH/4 + FRAME_THICKNESS*0.8]} />
          <meshStandardMaterial color={FRAME_COLOR} />
        </mesh>
        
        {/* Furniture - table */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.05, 16]} />
          <meshStandardMaterial color={DARK_WOOD_COLOR} />
        </mesh>
        
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
          <meshStandardMaterial color={DARK_WOOD_COLOR} />
        </mesh>
        
        {/* Furniture - chairs */}
        {[
          [0.5, 0.3, 0.3],
          [-0.5, 0.3, -0.3],
          [0.3, 0.3, -0.5],
          [-0.3, 0.3, 0.5]
        ].map((position, index) => (
          <group key={`chair-${index}`} position={position as [number, number, number]}>
            {/* Chair seat */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.05, 12]} />
              <meshStandardMaterial color="#444444" />
            </mesh>
            
            {/* Chair legs */}
            <mesh position={[0.15, -0.15, 0.15]}>
              <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
            <mesh position={[-0.15, -0.15, 0.15]}>
              <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
            <mesh position={[0.15, -0.15, -0.15]}>
              <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
            <mesh position={[-0.15, -0.15, -0.15]}>
              <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
          </group>
        ))}
        
        {/* Lamp */}
        <mesh position={[0, HOUSE_HEIGHT - 0.6, 0]}>
          <cylinderGeometry args={[0.15, 0.25, 0.2, 16]} />
          <meshStandardMaterial color="#5d4037" />
        </mesh>
        
        <mesh position={[0, HOUSE_HEIGHT - 0.8, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#ffeb3b" emissive="#ffeb3b" emissiveIntensity={1} />
        </mesh>
        
        {/* Lamp cable */}
        <mesh position={[0, HOUSE_HEIGHT - 0.3, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.5, 8]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        
        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color={GRASS_COLOR} />
        </mesh>
      </group>
    </Center>
  );
}
