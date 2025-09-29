// frontend/components/space/SceneCameraLogic.tsx
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

// This component handles any movement or updates to the scene itself
// (like the subtle camera drift, which uses useFrame)
export function SceneCameraLogic() {
  // Cache the initial camera position so we oscillate around it rather than drift away
  const basePos = useRef<{ x: number; y: number; z: number } | null>(null);

  // UseFrame is now INSIDE a component that will be rendered inside the Canvas
  useFrame(({ camera, clock }) => {
    if (!basePos.current) {
      basePos.current = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    }

    const t = clock.getElapsedTime();
    const ampXZ = 0.8; // horizontal oscillation amplitude
    const ampY = 0.3;  // vertical oscillation amplitude
    const speed = 0.2; // oscillation speed

    const bx = basePos.current.x;
    const by = basePos.current.y;
    const bz = basePos.current.z;

    camera.position.x = bx + Math.sin(t * speed) * ampXZ;
    camera.position.z = bz + Math.cos(t * speed) * ampXZ;
    camera.position.y = by + Math.sin(t * speed * 0.6) * ampY;

    // Always look at the origin (sun at [0,0,0]) so the system stays centered on screen
    camera.lookAt(0, 0, 0);
  });

  // This component doesn't render any visible objects itself
  return null; 
}