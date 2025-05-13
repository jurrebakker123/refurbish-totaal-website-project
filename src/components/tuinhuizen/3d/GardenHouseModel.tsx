
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
  
  const darkWoodMaterial = new THREE.MeshStandardMaterial({ 
    color: DARK_WOOD_COLOR,
    roughness: 0.8,
    metalness: 0.05
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

  const floorMaterial = new THREE.MeshStandardMaterial({
    color: FLOOR_COLOR,
    roughness: 0.8,
    metalness: 0
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
        
        {/* Concrete Patio Floor */}
        <mesh position={[0, -0.03, HOUSE_DEPTH/2 - 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[HOUSE_WIDTH + 1, OVERHANG_DEPTH + 0.5]} />
          <meshStandardMaterial {...floorMaterial} />
        </mesh>
        
        {/* Main House Structure - the black part */}
        <mesh position={[0, HOUSE_HEIGHT / 2, -OVERHANG_DEPTH/6]}>
          <boxGeometry args={[HOUSE_WIDTH, HOUSE_HEIGHT, HOUSE_DEPTH - OVERHANG_DEPTH]} />
          <meshStandardMaterial {...wallsMaterial} />
        </mesh>
        
        {/* Douglas Wood Trim - Front Top */}
        <mesh position={[0, HOUSE_HEIGHT - BORDER_TRIM_WIDTH/2, (HOUSE_DEPTH-OVERHANG_DEPTH)/2]}>
          <boxGeometry args={[HOUSE_WIDTH + 0.1, BORDER_TRIM_WIDTH, 0.1]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
        
        {/* Douglas Wood Trim - Back Top */}
        <mesh position={[0, HOUSE_HEIGHT - BORDER_TRIM_WIDTH/2, -(HOUSE_DEPTH+OVERHANG_DEPTH)/2]}>
          <boxGeometry args={[HOUSE_WIDTH + 0.1, BORDER_TRIM_WIDTH, 0.1]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
        
        {/* Douglas Wood Trim - Left Top */}
        <mesh position={[-HOUSE_WIDTH/2, HOUSE_HEIGHT - BORDER_TRIM_WIDTH/2, -OVERHANG_DEPTH/6]}>
          <boxGeometry args={[0.1, BORDER_TRIM_WIDTH, HOUSE_DEPTH - OVERHANG_DEPTH + 0.2]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
        
        {/* Douglas Wood Trim - Right Top */}
        <mesh position={[HOUSE_WIDTH/2, HOUSE_HEIGHT - BORDER_TRIM_WIDTH/2, -OVERHANG_DEPTH/6]}>
          <boxGeometry args={[0.1, BORDER_TRIM_WIDTH, HOUSE_DEPTH - OVERHANG_DEPTH + 0.2]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
        
        {/* Roof - Main Building */}
        <mesh position={[0, HOUSE_HEIGHT + ROOF_THICKNESS/2, -OVERHANG_DEPTH/6]}>
          <boxGeometry args={[HOUSE_WIDTH + 0.3, ROOF_THICKNESS, HOUSE_DEPTH - OVERHANG_DEPTH + 0.3]} />
          <meshStandardMaterial {...roofMaterial} />
        </mesh>
        
        {/* Covered Area/Overhang */}
        <mesh position={[0, HOUSE_HEIGHT + ROOF_THICKNESS/2, HOUSE_DEPTH/2]} >
          <boxGeometry args={[HOUSE_WIDTH + 0.3, ROOF_THICKNESS, OVERHANG_DEPTH + 0.2]} />
          <meshStandardMaterial {...roofMaterial} />
        </mesh>
        
        {/* Overhang Douglas Wood Posts - Left Corner */}
        <mesh position={[-HOUSE_WIDTH/2 + 0.3, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - OVERHANG_DEPTH/2.7]}>
          <boxGeometry args={[FRAME_THICKNESS, HOUSE_HEIGHT, FRAME_THICKNESS]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
        
        {/* Overhang Douglas Wood Posts - Right Corner */}
        <mesh position={[HOUSE_WIDTH/2 - 0.3, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - OVERHANG_DEPTH/2.7]}>
          <boxGeometry args={[FRAME_THICKNESS, HOUSE_HEIGHT, FRAME_THICKNESS]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
        
        {/* Overhang Douglas Wood Posts - Front Left */}
        <mesh position={[-HOUSE_WIDTH/2 + 0.3, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 + OVERHANG_DEPTH/2]}>
          <boxGeometry args={[FRAME_THICKNESS, HOUSE_HEIGHT, FRAME_THICKNESS]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
        
        {/* Overhang Douglas Wood Posts - Front Right */}
        <mesh position={[HOUSE_WIDTH/2 - 0.3, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 + OVERHANG_DEPTH/2]}>
          <boxGeometry args={[FRAME_THICKNESS, HOUSE_HEIGHT, FRAME_THICKNESS]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
        
        {/* Diagonal Support Beam - Left Side */}
        <group position={[-HOUSE_WIDTH/2 + 0.3, HOUSE_HEIGHT * 0.75, HOUSE_DEPTH/2 - 0.2]}>
          <mesh rotation={[0, -Math.PI/4, 0]}>
            <boxGeometry args={[FRAME_THICKNESS, FRAME_THICKNESS, HOUSE_HEIGHT * 0.5]} />
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
        </group>
        
        {/* Diagonal Support Beam - Right Side */}
        <group position={[HOUSE_WIDTH/2 - 0.3, HOUSE_HEIGHT * 0.75, HOUSE_DEPTH/2 - 0.2]}>
          <mesh rotation={[0, Math.PI/4, 0]}>
            <boxGeometry args={[FRAME_THICKNESS, FRAME_THICKNESS, HOUSE_HEIGHT * 0.5]} />
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
        </group>
        
        {/* Windows - Front Wall (as seen in photos) */}
        <group position={[1.5, HOUSE_HEIGHT * 0.6, (HOUSE_DEPTH-OVERHANG_DEPTH)/2 + 0.02]}>
          {/* Window glass */}
          <mesh>
            <boxGeometry args={[1.6, 1.4, GLASS_THICKNESS]} />
            <meshStandardMaterial {...glassMaterial} />
          </mesh>
          
          {/* Window frame */}
          <mesh>
            <boxGeometry args={[1.7, 1.5, FRAME_THICKNESS]} />
            <meshStandardMaterial color={WINDOW_FRAME_COLOR} />
          </mesh>
          
          {/* Window dividers */}
          <mesh position={[0, 0, FRAME_THICKNESS/2]}>
            <boxGeometry args={[0.05, 1.5, FRAME_THICKNESS/2]} />
            <meshStandardMaterial color={WINDOW_FRAME_COLOR} />
          </mesh>
          
          <mesh position={[0, 0, FRAME_THICKNESS/2]}>
            <boxGeometry args={[1.7, 0.05, FRAME_THICKNESS/2]} />
            <meshStandardMaterial color={WINDOW_FRAME_COLOR} />
          </mesh>
        </group>
        
        {/* Door (sliding glass) */}
        <group position={[-1.5, HOUSE_HEIGHT * 0.5, (HOUSE_DEPTH-OVERHANG_DEPTH)/2 + 0.02]}>
          {/* Door glass */}
          <mesh>
            <boxGeometry args={[1.8, HOUSE_HEIGHT * 0.85, GLASS_THICKNESS]} />
            <meshStandardMaterial {...glassMaterial} />
          </mesh>
          
          {/* Door frame */}
          <mesh>
            <boxGeometry args={[1.9, HOUSE_HEIGHT * 0.86, FRAME_THICKNESS]} />
            <meshStandardMaterial color={DOOR_COLOR} />
          </mesh>
          
          {/* Door handle */}
          <mesh position={[0.8, 0, GLASS_THICKNESS]}>
            <boxGeometry args={[0.05, 0.3, 0.04]} />
            <meshStandardMaterial color={DOOR_HANDLE_COLOR} metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
        
        {/* Optional - Add furniture under overhang area */}
        {/* Wooden Table */}
        <mesh position={[0, 0.4, HOUSE_DEPTH/2 - 0.5]}>
          <boxGeometry args={[1.2, 0.08, 0.8]} />
          <meshStandardMaterial color={TABLE_COLOR} roughness={0.5} />
        </mesh>
        
        {/* Table Legs */}
        {[[-0.55, 0.2, -0.35], [0.55, 0.2, -0.35], [-0.55, 0.2, 0.35], [0.55, 0.2, 0.35]].map((pos, idx) => (
          <mesh key={`table-leg-${idx}`} position={[pos[0], pos[1] + 0.2, pos[2] + HOUSE_DEPTH/2 - 0.5]}>
            <boxGeometry args={[0.06, 0.8, 0.06]} />
            <meshStandardMaterial color={TABLE_COLOR} />
          </mesh>
        ))}
        
        {/* Chairs around table */}
        {[[-0.6, 0, -0.8], [0.6, 0, -0.8], [-0.6, 0, 0.6], [0.6, 0, 0.6]].map((pos, idx) => (
          <group key={`chair-${idx}`} position={[pos[0], 0.25, pos[2] + HOUSE_DEPTH/2 - 0.5]}>
            {/* Chair seat */}
            <mesh>
              <boxGeometry args={[0.5, 0.05, 0.5]} />
              <meshStandardMaterial color={CHAIR_COLOR} />
            </mesh>
            
            {/* Chair back */}
            <mesh position={[0, 0.25, -0.22]}>
              <boxGeometry args={[0.48, 0.5, 0.04]} />
              <meshStandardMaterial color={CHAIR_COLOR} />
            </mesh>
            
            {/* Chair legs */}
            {[[-0.22, -0.25, -0.22], [0.22, -0.25, -0.22], [-0.22, -0.25, 0.22], [0.22, -0.25, 0.22]].map((legPos, legIdx) => (
              <mesh key={`chair-${idx}-leg-${legIdx}`} position={legPos}>
                <boxGeometry args={[0.04, 0.5, 0.04]} />
                <meshStandardMaterial color={CHAIR_COLOR} />
              </mesh>
            ))}
          </group>
        ))}
        
        {/* Hanging Lamp over table */}
        <mesh position={[0, HOUSE_HEIGHT - 0.4, HOUSE_DEPTH/2 - 0.5]}>
          <cylinderGeometry args={[0.01, 0.01, 0.8, 8]} />
          <meshStandardMaterial color={CHAIR_COLOR} />
        </mesh>
        
        <mesh position={[0, HOUSE_HEIGHT - 0.9, HOUSE_DEPTH/2 - 0.5]}>
          <coneGeometry args={[0.15, 0.2, 16]} />
          <meshStandardMaterial color={LAMP_COLOR} roughness={0.5} metalness={0.3} />
        </mesh>
      </group>
    </Center>
  );
}
