
import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import { GardenHouseModel } from './GardenHouseModel';
import { GardenScene } from './GardenScene';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import * as THREE from 'three';

// Scene component with a ref to access the Three.js objects
const SceneContent = ({ onSceneReady }) => {
  const sceneRef = useRef();
  
  React.useEffect(() => {
    if (sceneRef.current) {
      onSceneReady(sceneRef.current);
    }
  }, [onSceneReady]);
  
  return (
    <group ref={sceneRef}>
      <GardenScene />
      <Center>
        <GardenHouseModel autoRotate={false} />
      </Center>
    </group>
  );
};

export function GardenHouseExporter() {
  const [processing, setProcessing] = useState(false);
  const sceneRef = useRef(null);
  
  // Store a ref to the scene
  const handleSceneReady = (sceneObject) => {
    sceneRef.current = sceneObject;
  };
  
  // Function to export the current scene to GLB
  const exportGLB = () => {
    if (!sceneRef.current) {
      console.error('Scene reference not available');
      return;
    }
    
    setProcessing(true);
    
    try {
      // Create a clone of the scene to export
      const clonedScene = sceneRef.current.clone();
      
      // Create exporter
      const exporter = new GLTFExporter();
      
      // Export as binary GLB
      exporter.parse(
        clonedScene,
        (buffer) => {
          // Create a Blob from the GLB buffer
          const blob = new Blob([buffer], { type: 'application/octet-stream' });
          
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
        <SceneContent onSceneReady={handleSceneReady} />
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
