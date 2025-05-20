
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Center, OrbitControls, useGLTF } from '@react-three/drei';
import { GardenHouseModel } from './GardenHouseModel';
import { GardenScene } from './GardenScene';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import * as THREE from 'three';

export function GardenHouseExporter() {
  const [processing, setProcessing] = useState(false);
  
  // Function to export the current scene to GLB
  const exportGLB = () => {
    setProcessing(true);
    
    // Access the scene through the canvas
    const canvas = document.querySelector('canvas');
    if (!canvas) {
      console.error('Canvas not found');
      setProcessing(false);
      return;
    }
    
    // Use timeout to let the scene render properly
    setTimeout(() => {
      try {
        const sceneRenderer = canvas.__r3f?.fiber;
        if (!sceneRenderer) {
          console.error('Could not access R3F renderer');
          setProcessing(false);
          return;
        }
        
        // Get the scene to export
        const scene = sceneRenderer.scene;
        const clonedScene = scene.clone();
        
        // Create exporter
        const exporter = new GLTFExporter();
        
        // Export as binary GLB
        exporter.parse(
          clonedScene,
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
            setProcessing(false);
          },
          (error) => {
            console.error('An error occurred during export:', error);
            setProcessing(false);
          },
          { binary: true } // Export as GLB (binary)
        );
      } catch (error) {
        console.error('Export failed:', error);
        setProcessing(false);
      }
    }, 100);
  };
  
  return (
    <div className="relative w-full h-[80vh] bg-sky-50 rounded-lg overflow-hidden shadow-xl">
      {/* Export button outside the Canvas */}
      <button 
        onClick={exportGLB}
        disabled={processing}
        className="absolute top-4 right-4 z-10 bg-brand-darkGreen hover:bg-green-800 text-white py-2 px-4 rounded-md shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Exporting...' : 'Export as GLB'}
      </button>
      
      <Canvas camera={{ position: [8, 4, 8], fov: 40 }} shadows>
        <GardenScene />
        <Center>
          <GardenHouseModel autoRotate={false} />
        </Center>
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
