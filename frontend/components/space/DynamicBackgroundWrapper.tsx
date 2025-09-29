// frontend/components/space/DynamicBackgroundWrapper.tsx
'use client'; 
// This file itself needs to be client-side to handle the dynamic import and Suspense

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the SolarSystemBackground component, disabling Server-Side Rendering (SSR)
// This ensures @react-three/fiber code is only executed in the browser.
const SolarSystemBackground = dynamic(
  () => import('./SolarSystemBackground').then((mod) => mod.SolarSystemBackground),
  { 
    ssr: false, // CRITICAL: Prevents rendering on the server
    loading: () => <div className="fixed inset-0 bg-space-dark z-[-1]" />, // Simple dark fallback
  }
);

export default function DynamicBackgroundWrapper() {
  return (
    // Use Suspense to manage the loading state while the component initializes
    <Suspense fallback={<div className="fixed inset-0 bg-space-dark z-[-1]" />}>
      <SolarSystemBackground />
    </Suspense>
  );
}