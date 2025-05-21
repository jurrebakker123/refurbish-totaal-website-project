
import React, { useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import { GardenHouseModel } from './GardenHouseModel';
import { GardenScene } from './GardenScene';
import * as THREE from 'three';

// Component that contains the export button (outside of the Canvas)
const ExportButton = ({ onExport }: { onExport: () => void }) => {
  return (
    <button 
      onClick={onExport}
      className="absolute top-4 right-4 z-10 bg-brand-darkGreen hover:bg-green-800 text-white py-2 px-4 rounded-md shadow-md transition-colors"
    >
      Export als GLB
    </button>
  );
};

// Scene component that has access to Three.js scene
const SceneContent = ({ onSceneReady }: { onSceneReady: (scene: THREE.Scene) => void }) => {
  const { scene } = useThree();
  
  // Store the scene via callback when it's ready
  React.useEffect(() => {
    if (scene) {
      onSceneReady(scene);
    }
  }, [scene, onSceneReady]);
  
  return (
    <>
      <GardenScene />
      <Center>
        <GardenHouseModel autoRotate={false} />
      </Center>
    </>
  );
};

export function GardenHouseExporter() {
  // Use state to store the scene reference
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  
  // Function to handle scene initialization
  const handleSceneReady = (newScene: THREE.Scene) => {
    setScene(newScene);
  };
  
  // Function to export the scene as GLB
  const exportGLB = async () => {
    if (!scene) {
      console.error("No scene available to export");
      return;
    }
    
    try {
      // Dynamically import the GLTFExporter to avoid TypeScript errors
      const { GLTFExporter } = await import('three/examples/jsm/exporters/GLTFExporter');
      
      const exporter = new GLTFExporter();
      
      // Export as binary GLB
      exporter.parse(
        scene,
        (buffer) => {
          if (buffer instanceof ArrayBuffer) {
            // Create a Blob from the GLB buffer
            const blob = new Blob([buffer], { type: 'application/octet-stream' });
            
            // Create a download link and trigger it
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'garden_house.glb';
            link.click();
            
            // Clean up
            URL.revokeObjectURL(link.href);
          } else {
            console.error("Unexpected export result:", buffer);
          }
        },
        (error) => {
          console.error('An error occurred during export:', error);
        },
        { binary: true } // Export as GLB (binary)
      );
    } catch (error) {
      console.error("Failed to load GLTFExporter:", error);
    }
  };
  
  return (
    <div className="relative w-full h-[80vh] bg-sky-50 rounded-lg overflow-hidden shadow-xl">
      {/* Export button outside the canvas */}
      <ExportButton onExport={exportGLB} />
      
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
