
import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Center, OrbitControls, useGLTF } from '@react-three/drei';
import { GardenHouseModel } from './GardenHouseModel';
import { GardenScene } from './GardenScene';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import * as THREE from 'three';

const ExportButton = ({ onExport }: { onExport: () => void }) => {
  return (
    <button 
      onClick={onExport}
      className="absolute top-4 right-4 z-10 bg-brand-darkGreen hover:bg-green-800 text-white py-2 px-4 rounded-md shadow-md transition-colors"
    >
      Export as GLB
    </button>
  );
};

const SceneExporter = () => {
  const { scene } = useThree();
  
  // Function to export the current scene to GLB
  const exportGLB = () => {
    const exporter = new GLTFExporter();
    
    // Process the scene for export (clone to prevent modifying the original)
    const exportScene = scene.clone();
    
    // Export as binary GLB
    exporter.parse(
      exportScene,
      (buffer) => {
        // Create a Blob from the GLB buffer
        const blob = new Blob([buffer as ArrayBuffer], { type: 'application/octet-stream' });
        
        // Create a download link and trigger it
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'garden_house.glb';
        link.click();
        
        // Clean up
        URL.revokeObjectURL(link.href);
      },
      (error) => {
        console.error('An error occurred during export:', error);
      },
      { binary: true } // Export as GLB (binary)
    );
  };
  
  return (
    <>
      <ExportButton onExport={exportGLB} />
    </>
  );
};

export function GardenHouseExporter() {
  return (
    <div className="relative w-full h-[80vh] bg-sky-50 rounded-lg overflow-hidden shadow-xl">
      <Canvas camera={{ position: [8, 4, 8], fov: 40 }} shadows>
        <GardenScene />
        <Center>
          <GardenHouseModel autoRotate={false} />
        </Center>
        <SceneExporter />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
