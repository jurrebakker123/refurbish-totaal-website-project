
import React from 'react';
import * as THREE from 'three';
import { Environment, Sky } from '@react-three/drei';

export function GardenScene() {
  return (
    <>
      {/* Realistic sky blue background */}
      <color attach="background" args={['#87ceeb']} />
      
      {/* Atmospheric fog for distance */}
      <fog attach="fog" args={['#e8f0ff', 15, 35]} />
      
      {/* Simulate natural daylight */}
      <ambientLight intensity={0.6} color="#ffffff" />
      
      {/* Main sunlight */}
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color="#fffaea"
      />
      
      {/* Secondary fill light */}
      <directionalLight position={[-5, 8, -5]} intensity={0.4} color="#b0c4de" />
      
      {/* Realistic sky */}
      <Sky 
        distance={450000} 
        sunPosition={[5, 10, 5]} 
        inclination={0.6} 
        azimuth={0.25} 
        turbidity={10}
        rayleigh={0.5}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      
      {/* HDRI environment for realistic reflections */}
      <Environment preset="park" />
    </>
  );
}
