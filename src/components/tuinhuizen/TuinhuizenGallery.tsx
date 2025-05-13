
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Center } from '@react-three/drei';
import * as THREE from 'three';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Garden house model dimensions (in meters)
const HOUSE_WIDTH = 5; // 500cm
const HOUSE_DEPTH = 3.5;
const HOUSE_HEIGHT = 2.8;
const ROOF_THICKNESS = 0.1;
const FRAME_THICKNESS = 0.12;
const GLASS_THICKNESS = 0.01;

// Colors
const WOOD_COLOR = '#d0a675'; // Douglas wood color
const DARK_WOOD_COLOR = '#5d4037';
const FRAME_COLOR = '#d0a675';
const WALLS_COLOR = '#303030';
const GLASS_COLOR = '#a5c7d3';
const ROOF_COLOR = '#303030'; // EPDM color
const GRASS_COLOR = '#4caf50';
const FLOOR_COLOR = '#e0e0e0'; // Light concrete

function GardenHouseModel(props: any) {
  const modelRef = useRef<THREE.Group>(null);
  
  // Small rotation for visual interest
  useFrame((state) => {
    if (modelRef.current && props.autoRotate) {
      modelRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <group ref={modelRef} {...props}>
      {/* Floor/terrace */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color={FLOOR_COLOR} />
      </mesh>
      
      {/* Grass */}
      <mesh position={[0, -0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={GRASS_COLOR} />
      </mesh>
      
      {/* Main structure - walls */}
      <mesh position={[0, HOUSE_HEIGHT / 2, 0]}>
        <boxGeometry args={[HOUSE_WIDTH, HOUSE_HEIGHT, HOUSE_DEPTH]} />
        <meshStandardMaterial color={WALLS_COLOR} />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, HOUSE_HEIGHT + ROOF_THICKNESS / 2, 0]}>
        <boxGeometry args={[HOUSE_WIDTH + 0.1, ROOF_THICKNESS, HOUSE_DEPTH + 0.1]} />
        <meshStandardMaterial color={ROOF_COLOR} />
      </mesh>
      
      {/* Wooden frame - vertical posts at corners */}
      {[
        [-HOUSE_WIDTH/2 + FRAME_THICKNESS/2, HOUSE_HEIGHT/2, -HOUSE_DEPTH/2 + FRAME_THICKNESS/2],
        [HOUSE_WIDTH/2 - FRAME_THICKNESS/2, HOUSE_HEIGHT/2, -HOUSE_DEPTH/2 + FRAME_THICKNESS/2],
        [-HOUSE_WIDTH/2 + FRAME_THICKNESS/2, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - FRAME_THICKNESS/2],
        [HOUSE_WIDTH/2 - FRAME_THICKNESS/2, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - FRAME_THICKNESS/2]
      ].map((position, index) => (
        <mesh key={`post-${index}`} position={position as [number, number, number]}>
          <boxGeometry args={[FRAME_THICKNESS, HOUSE_HEIGHT, FRAME_THICKNESS]} />
          <meshStandardMaterial color={WOOD_COLOR} />
        </mesh>
      ))}
      
      {/* Wooden frame - horizontal beams at top */}
      {[
        [0, HOUSE_HEIGHT - FRAME_THICKNESS/2, -HOUSE_DEPTH/2 + FRAME_THICKNESS/2],
        [0, HOUSE_HEIGHT - FRAME_THICKNESS/2, HOUSE_DEPTH/2 - FRAME_THICKNESS/2],
        [-HOUSE_WIDTH/2 + FRAME_THICKNESS/2, HOUSE_HEIGHT - FRAME_THICKNESS/2, 0],
        [HOUSE_WIDTH/2 - FRAME_THICKNESS/2, HOUSE_HEIGHT - FRAME_THICKNESS/2, 0]
      ].map((position, index) => {
        const isLong = index < 2;
        return (
          <mesh key={`beam-top-${index}`} position={position as [number, number, number]}>
            <boxGeometry args={[isLong ? HOUSE_WIDTH - FRAME_THICKNESS : FRAME_THICKNESS, FRAME_THICKNESS, isLong ? FRAME_THICKNESS : HOUSE_DEPTH - FRAME_THICKNESS]} />
            <meshStandardMaterial color={WOOD_COLOR} />
          </mesh>
        );
      })}
      
      {/* Front glass door - right side */}
      <mesh position={[HOUSE_WIDTH/4, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - GLASS_THICKNESS/2]}>
        <boxGeometry args={[HOUSE_WIDTH/2 - FRAME_THICKNESS, HOUSE_HEIGHT - FRAME_THICKNESS, GLASS_THICKNESS]} />
        <meshPhysicalMaterial 
          color={GLASS_COLOR}
          transparent={true}
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
          reflectivity={1}
        />
      </mesh>
      
      {/* Front glass panels - left side */}
      <mesh position={[-HOUSE_WIDTH/4, HOUSE_HEIGHT/2, HOUSE_DEPTH/2 - GLASS_THICKNESS/2]}>
        <boxGeometry args={[HOUSE_WIDTH/2 - FRAME_THICKNESS, HOUSE_HEIGHT - FRAME_THICKNESS, GLASS_THICKNESS]} />
        <meshPhysicalMaterial 
          color={GLASS_COLOR}
          transparent={true}
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
          reflectivity={1}
        />
      </mesh>
      
      {/* Rear door */}
      <mesh position={[0, HOUSE_HEIGHT/2 - FRAME_THICKNESS/2, -HOUSE_DEPTH/2 + GLASS_THICKNESS/2]}>
        <boxGeometry args={[HOUSE_WIDTH/3, HOUSE_HEIGHT - FRAME_THICKNESS, GLASS_THICKNESS]} />
        <meshPhysicalMaterial 
          color={GLASS_COLOR}
          transparent={true}
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
          reflectivity={1}
        />
      </mesh>
      
      {/* Window on side wall */}
      <mesh position={[-HOUSE_WIDTH/2 + GLASS_THICKNESS/2, HOUSE_HEIGHT*0.7, -HOUSE_DEPTH/4]}>
        <boxGeometry args={[GLASS_THICKNESS, HOUSE_HEIGHT/3, HOUSE_DEPTH/4]} />
        <meshPhysicalMaterial 
          color={GLASS_COLOR}
          transparent={true}
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
          reflectivity={1}
        />
      </mesh>
      
      {/* Window frames */}
      <mesh position={[-HOUSE_WIDTH/2 + GLASS_THICKNESS*2, HOUSE_HEIGHT*0.7, -HOUSE_DEPTH/4]}>
        <boxGeometry args={[FRAME_THICKNESS/2, HOUSE_HEIGHT/3 + FRAME_THICKNESS*0.8, HOUSE_DEPTH/4 + FRAME_THICKNESS*0.8]} />
        <meshStandardMaterial color={FRAME_COLOR} />
      </mesh>
      
      {/* Furniture - table */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.05, 16]} />
        <meshStandardMaterial color={DARK_WOOD_COLOR} />
      </mesh>
      
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
        <meshStandardMaterial color={DARK_WOOD_COLOR} />
      </mesh>
      
      {/* Furniture - chairs */}
      {[
        [0.5, 0.3, 0.3],
        [-0.5, 0.3, -0.3],
        [0.3, 0.3, -0.5],
        [-0.3, 0.3, 0.5]
      ].map((position, index) => (
        <group key={`chair-${index}`} position={position as [number, number, number]}>
          {/* Chair seat */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.05, 12]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
          
          {/* Chair legs */}
          <mesh position={[0.15, -0.15, 0.15]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          <mesh position={[-0.15, -0.15, 0.15]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          <mesh position={[0.15, -0.15, -0.15]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          <mesh position={[-0.15, -0.15, -0.15]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        </group>
      ))}
      
      {/* Lamp */}
      <mesh position={[0, HOUSE_HEIGHT - 0.6, 0]}>
        <cylinderGeometry args={[0.15, 0.25, 0.2, 16]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      
      <mesh position={[0, HOUSE_HEIGHT - 0.8, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffeb3b" emissive="#ffeb3b" emissiveIntensity={1} />
      </mesh>
      
      {/* Lamp cable */}
      <mesh position={[0, HOUSE_HEIGHT - 0.3, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 8]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
    </group>
  );
}

function Scene() {
  const { camera } = useThree();
  
  // Set the camera position initially
  useEffect(() => {
    camera.position.set(7, 4, 7);
  }, [camera]);

  return (
    <>
      <color attach="background" args={['#e6f2ff']} />
      <fog attach="fog" args={['#e6f2ff', 10, 25]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, 10, 5]} intensity={0.5} />

      <Center>
        <GardenHouseModel autoRotate={true} />
      </Center>
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={GRASS_COLOR} />
      </mesh>
      
      {/* OrbitControls allows the user to rotate and zoom the scene */}
      <OrbitControls 
        enablePan={false}
        maxPolarAngle={Math.PI / 2 - 0.1}
        minPolarAngle={Math.PI / 6}
        maxDistance={15}
        minDistance={4}
      />
    </>
  );
}

export function TuinhuizenGallery() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Sublime Plat Dak – 500 cm breed
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Een moderne overkapping met strakke lijnen en hoogwaardige afwerking.
            Draai, zoom en verken het model om alle details te bekijken.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <AspectRatio ratio={16/10} className="bg-sky-50">
              <Canvas shadows gl={{ antialias: true }}>
                <Scene />
              </Canvas>
            </AspectRatio>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-brand-darkGreen mb-3">
                Specificaties
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Deur aan de voorzijde én achterzijde</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Geïntegreerde overkapping</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Raam voor extra lichtinval</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Onbehandeld geschaafd Douglas hout</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>EPDM dakbedekking met zijuitloop</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-brand-darkGreen mb-3">
                Inbegrepen
              </h3>
              <p className="text-gray-700">
                Standaard geleverd als compleet bouwpakket inclusief bevestigingsmateriaal en opbouwinstructie. 
                Uit te breiden met diverse opties zoals wandmodules, schuifwanden, verlichting en fundering.
              </p>
            </div>
            
            <div className="pt-4">
              <a 
                href="#offerte-aanvragen" 
                className="btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-md"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Offerte aanvragen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

