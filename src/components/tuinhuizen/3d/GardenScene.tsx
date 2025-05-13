
import React from 'react';
import * as THREE from 'three';
import { Environment } from '@react-three/drei';

export function GardenScene() {
  return (
    <>
      <color attach="background" args={['#e6f2ff']} />
      <fog attach="fog" args={['#e6f2ff', 10, 25]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, 10, 5]} intensity={0.5} />
      
      <Environment preset="sunset" />
    </>
  );
}
