// frontend/components/space/materials/NeptuneMaterial.tsx
'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/*
  NeptuneMaterial: Procedural banded blue gas-giant look (no external textures)
  - Horizontal bands using layered fbm noise warped over latitude
  - Subtle brighter storms using thresholded noise
*/

const vertexShader = /* glsl */ `
  varying vec3 vPos;
  varying vec3 vNormal;
  void main() {
    vPos = position;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec3 vPos;
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec3 uDeep;
  uniform vec3 uMid;
  uniform vec3 uLight;

  // iq hash/noise
  float hash(vec3 p){ p = fract(p*0.3183099+vec3(0.1,0.2,0.3)); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
  float noise(vec3 x){
    vec3 i=floor(x); vec3 f=fract(x); vec3 u=f*f*(3.0-2.0*f);
    return mix(
      mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)), u.x),
          mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), u.x), u.y),
      mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), u.x),
          mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), u.x), u.y), u.z);
  }
  float fbm(vec3 p){ float s=0.0,a=0.5; for(int i=0;i<5;i++){ s+=a*noise(p); p*=2.0; a*=0.55; } return s; }

  void main(){
    vec3 nrm = normalize(vNormal);
    vec3 sp = normalize(vPos);

    // latitude (y of normalized pos) for banding
    float lat = sp.y; // -1..1

    float t = uTime * 0.05;
    // base bands driven by lat with fbm warping
    float bands = sin((lat*10.0) + fbm(sp*3.0 + vec3(t, -t, t))*2.0);
    bands = bands*0.5 + 0.5; // 0..1

    // color blend across three blues
    vec3 col = mix(uDeep, uMid, bands);
    col = mix(col, uLight, smoothstep(0.6, 1.0, bands));

    // storms: soft bright patches
    float storms = smoothstep(0.75, 1.0, fbm(sp*5.0 + vec3(-t*1.3, t*0.7, t*0.9)));
    col += storms * 0.08;

    // slight rim lighting for spherical look
    float ndotv = max(dot(nrm, vec3(0.0,0.0,1.0)), 0.0);
    float rim = pow(1.0 - ndotv, 1.2);
    col += rim*0.05;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function NeptuneMaterial() {
  const ref = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uDeep: { value: new THREE.Color('#1237b3') },   // deep blue
    uMid:  { value: new THREE.Color('#2e6cf6') },   // mid blue
    uLight:{ value: new THREE.Color('#7fb4ff') },   // light blue
  }), []);

  useFrame((_, dt) => { if (ref.current) uniforms.uTime.value += dt; });

  return (
    <shaderMaterial ref={ref} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
  );
}
