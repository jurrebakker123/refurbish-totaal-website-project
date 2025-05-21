
import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Center, OrbitControls, useGLTF } from '@react-three/drei';
import { GardenHouseModel } from './GardenHouseModel';
import { GardenScene } from './GardenScene';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
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
const SceneContent = ({ sceneRef }: { sceneRef: React.RefObject<THREE.Group> }) => {
  const { scene } = useThree();
  
  // Store the scene in the ref so it can be accessed outside
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current = scene;
    }
  }, [scene, sceneRef]);
  
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
  // Create a ref to hold the Three.js scene
  const sceneRef = useRef<THREE.Group | THREE.Scene | null>(null);
  
  // Function to export the scene as GLB
  const exportGLB = () => {
    if (!sceneRef.current) {
      console.error("No scene available to export");
      return;
    }
    
    const exporter = new GLTFExporter();
    
    // Process the scene for export (clone to prevent modifying the original)
    const scene = sceneRef.current;
    
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
  };
  
  return (
    <div className="relative w-full h-[80vh] bg-sky-50 rounded-lg overflow-hidden shadow-xl">
      {/* Export button outside the canvas */}
      <ExportButton onExport={exportGLB} />
      
      <Canvas camera={{ position: [8, 4, 8], fov: 40 }} shadows>
        <SceneContent sceneRef={sceneRef} />
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
