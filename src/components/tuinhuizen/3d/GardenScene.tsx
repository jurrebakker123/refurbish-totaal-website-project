
import React from 'react';
import { Environment, Sky, Cloud } from '@react-three/drei';

export function GardenScene() {
  return (
    <>
      {/* Realistic sky blue background */}
      <color attach="background" args={['#87ceeb']} />
      
      {/* Atmospheric fog for depth perception */}
      <fog attach="fog" args={['#e8f0ff', 15, 35]} />
      
      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.6} color="#ffffff" />
      
      {/* Main directional light (sunlight) */}
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
      
      {/* Secondary fill light to reduce harsh shadows */}
      <directionalLight position={[-5, 8, -5]} intensity={0.3} color="#b0c4de" />
      
      {/* Updated Cloud properties to match the current API */}
      <Cloud 
        opacity={0.8}
        speed={0.4} 
        size={20} 
        depthTest={false}
        position={[-10, 15, -10]}
      />
      
      <Cloud 
        opacity={0.7}
        speed={0.3} 
        size={15} 
        depthTest={false}
        position={[10, 12, -15]}
      />
      
      {/* Sky dome for realistic outdoor appearance */}
      <Sky 
        distance={450000} 
        sunPosition={[5, 10, 5]} 
        inclination={0.6} 
        azimuth={0.25} 
        turbidity={8}
        rayleigh={0.5}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      
      {/* HDRI environment for realistic reflections on materials */}
      <Environment preset="sunset" />
    </>
  );
}
