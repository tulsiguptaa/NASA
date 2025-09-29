// frontend/components/space/materials/SunMaterial.tsx
'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/*
  SunMaterial: Animated emissive shader simulating solar granulation and glow
  - uTime animates the noise
  - uColorA/B control inner/outer colors
*/

const vertexShader = /* glsl */ `
  varying vec3 vPos;
  varying vec3 vNormal;
  void main() {
    vPos = position;
    vNormal = normalMatrix * normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Simple 3D noise (iq noise)
const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec3 vPos;
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  // Hash/Noise helpers
  float hash(vec3 p){
    p = fract(p * 0.3183099 + vec3(0.1,0.2,0.3));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x){
    vec3 i = floor(x);
    vec3 f = fract(x);
    // Smoothstep
    vec3 u = f*f*(3.0-2.0*f);
    return mix(
      mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), u.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), u.x), u.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), u.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), u.x), u.y), u.z);
  }

  float fbm(vec3 p){
    float sum = 0.0;
    float amp = 0.5;
    for(int i=0;i<6;i++){
      sum += amp * noise(p);
      p *= 2.0;
      amp *= 0.6;
    }
    return sum;
  }

  void main(){
    // Animate and wrap the noise around the sphere
    vec3 nrm = normalize(vNormal);
    vec3 p = normalize(vPos) * 2.0; // base scale
    float t = uTime * 0.6;

    float n = fbm(p * 1.8 + vec3(t * 0.5, t * 0.7, -t * 0.4));
    float cells = fbm(p * 6.0 + vec3(-t * 1.2, t * 1.1, t * 0.9));
    float granules = smoothstep(0.3, 0.8, n) * smoothstep(0.35, 0.8, cells);

    vec3 baseCol = mix(uColorA, uColorB, granules);

    // Limb darkening and glow falloff
    float ndotv = max(dot(nrm, vec3(0.0, 0.0, 1.0)), 0.0);
    float rim = pow(1.0 - ndotv, 1.5);

    vec3 color = baseCol + rim * vec3(1.2, 0.8, 0.2);

    // High emissive look
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function SunMaterial({ colorA = '#FF5A00', colorB = '#FFD54D' }: { colorA?: string; colorB?: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
    }), [colorA, colorB]
  );

  useFrame((_, delta) => {
    if (materialRef.current) uniforms.uTime.value += delta;
  });

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      transparent={false}
    />
  );
}
