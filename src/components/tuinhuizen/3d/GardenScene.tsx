
import React from 'react';
import * as THREE from 'three';
import { Environment, Sky } from '@react-three/drei';

export function GardenScene() {
  return (
    <>
      <color attach="background" args={['#b1d8ff']} />
      <fog attach="fog" args={['#b1d8ff', 15, 35]} />
      
      {/* Natuurlijk daglicht simuleren */}
      <ambientLight intensity={0.6} color="#e1eaff" />
      <directionalLight 
        position={[10, 12, 8]} 
        intensity={1} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color="#fffaea"
      />
      <directionalLight position={[-10, 8, 5]} intensity={0.5} color="#c2d6ff" />
      
      {/* Realistische hemel toevoegen */}
      <Sky 
        distance={450000} 
        sunPosition={[10, 5, 5]} 
        inclination={0.45} 
        azimuth={0.25} 
        turbidity={8}
        rayleigh={1}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      
      {/* HDRI-omgeving voor realistische reflecties */}
      <Environment preset="sunset" />
    </>
  );
}
