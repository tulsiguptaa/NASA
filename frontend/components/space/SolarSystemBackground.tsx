// frontend/components/space/SolarSystemBackground.tsx
'use client'; 

import { Canvas, useFrame } from '@react-three/fiber'; // Keep Canvas and useFrame for animation
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import React, { useEffect, useMemo, useRef, useState } from 'react';
// Import the new logic component
import { SceneCameraLogic } from './SceneCameraLogic'; 
import { SunMaterial } from './materials/SunMaterial';
import { NeptuneMaterial } from './materials/NeptuneMaterial';
import { JupiterMaterial } from './materials/JupiterMaterial';
import { SaturnMaterial } from './materials/SaturnMaterial';
import { MercuryMaterial } from './materials/MercuryMaterial';
import { VenusMaterial } from './materials/VenusMaterial';
import { EarthMaterial } from './materials/EarthMaterial';
import { MarsMaterial } from './materials/MarsMaterial';
import { UranusMaterial } from './materials/UranusMaterial';

// Textured, orbiting planet with optional normal/specular maps and rings
function TexturedPlanet({
  radius = 0.5,
  distance = 6,
  speed = 0.5,
  initialAngle = 0,
  mapUrl,
  normalUrl,
  specularUrl,
  ringUrl,
  ringInner,
  ringOuter,
  tilt = 0,
  cloudsUrl,
  cloudsOpacity = 0.35,
  cloudsSpeed = 0.02,
  fallbackColor,
  glowColor,
  materialType,
}: {
  radius?: number;
  distance?: number;
  speed?: number;
  initialAngle?: number;
  mapUrl?: string;
  normalUrl?: string;
  specularUrl?: string;
  ringUrl?: string;
  ringInner?: number;
  ringOuter?: number;
  tilt?: number;
  cloudsUrl?: string;
  cloudsOpacity?: number;
  cloudsSpeed?: number;
  fallbackColor?: string;
  glowColor?: string;
  materialType?: 'mercury' | 'venus' | 'earth' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | undefined;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);
  const loader = useMemo(() => new THREE.TextureLoader(), []);
  const [colorMap, setColorMap] = useState<THREE.Texture | undefined>(undefined);
  const [normalMap, setNormalMap] = useState<THREE.Texture | undefined>(undefined);
  const [ringMap, setRingMap] = useState<THREE.Texture | undefined>(undefined);
  const [cloudsMap, setCloudsMap] = useState<THREE.Texture | undefined>(undefined);

  useEffect(() => {
    if (!mapUrl) { setColorMap(undefined); return; }
    const tex = loader.load(
      mapUrl,
      (t) => {
        // @ts-ignore
        if ('colorSpace' in t) (t as any).colorSpace = THREE.SRGBColorSpace;
        setColorMap(t);
      },
      undefined,
      () => setColorMap(undefined)
    );
    return () => { tex.dispose?.(); };
  }, [loader, mapUrl]);

  useEffect(() => {
    if (!normalUrl) { setNormalMap(undefined); return; }
    const tex = loader.load(normalUrl, (t) => setNormalMap(t), undefined, () => setNormalMap(undefined));
    return () => { tex.dispose?.(); };
  }, [loader, normalUrl]);

  useEffect(() => {
    if (!ringUrl) { setRingMap(undefined); return; }
    const tex = loader.load(ringUrl, (t) => setRingMap(t), undefined, () => setRingMap(undefined));
    return () => { tex.dispose?.(); };
  }, [loader, ringUrl]);

  useEffect(() => {
    if (!cloudsUrl) { setCloudsMap(undefined); return; }
    const tex = loader.load(cloudsUrl, (t) => setCloudsMap(t), undefined, () => setCloudsMap(undefined));
    return () => { tex.dispose?.(); };
  }, [loader, cloudsUrl]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = initialAngle + t * speed;
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    if (groupRef.current) {
      groupRef.current.position.set(x, 0, z);
      groupRef.current.rotation.y += 0.01;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += cloudsSpeed;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, tilt, 0]}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[radius, 64, 64]} />
        {/* Force the material to be visible by setting opacity to 1.0 */}
        {materialType === 'mercury' ? (
          <MercuryMaterial />
        ) : materialType === 'venus' ? (
          <VenusMaterial />
        ) : materialType === 'earth' ? (
          <EarthMaterial />
        ) : materialType === 'mars' ? (
          <MarsMaterial />
        ) : materialType === 'jupiter' ? (
          <JupiterMaterial />
        ) : materialType === 'saturn' ? (
          <SaturnMaterial />
        ) : materialType === 'uranus' ? (
          <UranusMaterial />
        ) : materialType === 'neptune' ? (
          <NeptuneMaterial />
        ) : (
          // Fallback to standard material if no specific material type is specified
          <meshStandardMaterial 
            map={colorMap} 
            color={new THREE.Color(fallbackColor ?? '#888888')} 
            roughness={0.7}
            metalness={0.3}
          />
        )}
      </mesh>
      {glowColor && (
        <mesh>
          <sphereGeometry args={[radius * 1.03, 64, 64]} />
          <meshBasicMaterial color={new THREE.Color(glowColor)} transparent opacity={0.12} blending={THREE.AdditiveBlending} />
        </mesh>
      )}
      {cloudsMap && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[radius * 1.02, 64, 64]} />
          <meshStandardMaterial map={cloudsMap} transparent opacity={cloudsOpacity} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      )}
      {(ringUrl || (ringInner !== undefined && ringOuter !== undefined)) && (
        <mesh rotation-x={-Math.PI / 2}>
          <ringGeometry args={[radius * (ringInner as number), radius * (ringOuter as number), 256]} />
          {ringMap ? (
            <meshBasicMaterial map={ringMap} transparent opacity={0.9} side={THREE.DoubleSide} />
          ) : (
            <meshBasicMaterial color={new THREE.Color('#d9c89c')} transparent opacity={0.7} side={THREE.DoubleSide} />
          )}
        </mesh>
      )}
    </group>
  );
}

// Main background component
export function SolarSystemBackground() {
  // !!! The problematic useFrame hook has been REMOVED from here !!!

  // Define planet configs once
  const planets = useMemo(
    () => [
      // All planets now use procedural materials
      { name: 'Mercury', radius: 0.25, distance: 4, speed: 1.2, initialAngle: 0.0, materialType: 'mercury', fallbackColor: '#9e9e9e' },
      { name: 'Venus', radius: 0.35, distance: 6, speed: 0.9, initialAngle: 1.0, materialType: 'venus', fallbackColor: '#cdb28a' },
      { name: 'Earth', radius: 0.5, distance: 8.5, speed: 0.7, initialAngle: 2.0, tilt: 0.41, materialType: 'earth', fallbackColor: '#3a78ff', glowColor: '#9fd3ff' },
      { name: 'Mars', radius: 0.4, distance: 11, speed: 0.6, initialAngle: 3.0, materialType: 'mars', fallbackColor: '#c4553b' },
      { name: 'Jupiter', radius: 1.2, distance: 15, speed: 0.35, initialAngle: 0.7, materialType: 'jupiter', fallbackColor: '#d1a67a', glowColor: '#ffd9a8' },
      { name: 'Saturn', radius: 1.0, distance: 20, speed: 0.3, initialAngle: 1.7, tilt: 0.47, materialType: 'saturn', fallbackColor: '#e3cfa3', glowColor: '#ffe8b8', ringInner: 1.5, ringOuter: 2.6 },
      { name: 'Uranus', radius: 0.85, distance: 24, speed: 0.25, initialAngle: 0.4, tilt: -1.0, materialType: 'uranus', fallbackColor: '#7fd6e7', glowColor: '#b7f0ff' },
      { name: 'Neptune', radius: 0.8, distance: 28, speed: 0.22, initialAngle: 1.1, tilt: 0.49, materialType: 'neptune', fallbackColor: '#2e6cf6', glowColor: '#6aa7ff' },
    ],
    []
  );

  return (
    <Canvas
      camera={{ position: [0, 10, 25], fov: 50 }} 
      frameloop="always"
      dpr={[1, 2]} // Render at higher device pixel ratio for crispness
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        // Ensure correct color output and tonemapping
        // @ts-ignore - compatibility across three versions
        if ('outputColorSpace' in gl) (gl as any).outputColorSpace = THREE.SRGBColorSpace;
        // @ts-ignore
        if ('toneMapping' in gl) (gl as any).toneMapping = THREE.ACESFilmicToneMapping;
        // @ts-ignore
        if ('toneMappingExposure' in gl) (gl as any).toneMappingExposure = 1.1;
      }}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      {/* ADD THE NEW LOGIC COMPONENT HERE */}
      <SceneCameraLogic /> 
      
      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <hemisphereLight color={0xffffff} groundColor={0x444444} intensity={0.6} />
      <pointLight position={[0, 0, 0]} intensity={10} color="#FDB813" distance={0} decay={2} /> 

      {/* Star Field */}
      <Stars radius={150} depth={80} count={8000} factor={4.5} saturation={0} fade speed={1} />

      {/* Sun/Center - Animated shader */}
      <group>
        {/* Animated Sun surface */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[3, 96, 96]} />
          <SunMaterial colorA="#FF6A00" colorB="#FFD54D" />
        </mesh>
        {/* Corona glow removed as requested */}
      </group>

      {/* Add strong lighting for the scene */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
      <hemisphereLight args={['#ffffff', '#004080', 1]} />
      
      {/* Orbits and Planets */}
      {planets.map((p: any, idx) => (
        <group key={idx}>
          {/* Orbit ring */}
          <mesh rotation-x={-Math.PI / 2} receiveShadow>
            <ringGeometry args={[p.distance - 0.05, p.distance + 0.05, 256]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
          {/* Animated planet */}
          <TexturedPlanet
            radius={p.radius}
            distance={p.distance}
            speed={p.speed}
            initialAngle={p.initialAngle}
            mapUrl={p.mapUrl}
            normalUrl={p.normalUrl}
            specularUrl={p.specularUrl}
            ringUrl={p.ringUrl}
            ringInner={p.ringInner}
            ringOuter={p.ringOuter}
            tilt={p.tilt}
            materialType={p.materialType}
            fallbackColor={p.fallbackColor}
            glowColor={p.glowColor}
          />
          {/* Optional: add a thin atmospheric glow for Earth-like planet */}
          {idx === 2 && (
            <mesh>
              {/* Slightly larger sphere for atmosphere */}
              <sphereGeometry args={[p.radius * 1.05, 32, 32]} />
              <meshBasicMaterial color="#93c5fd" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
            </mesh>
          )}
        </group>
      ))}

    </Canvas>
  );
}
// You will also need to ensure the Planet component is imported or defined here.
// If you defined Planet in SolarSystemBackground.tsx, ensure you keep that definition.