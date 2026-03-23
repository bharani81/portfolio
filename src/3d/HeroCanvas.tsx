import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { usePageVisibility } from '@hooks/usePageVisibility';
import { usePerformanceTier } from '@hooks/usePerformanceTier';
import { ParticleField } from './ParticleField';

const BackendSystemViz = lazy(() =>
  import('./BackendSystemViz').then(m => ({ default: m.BackendSystemViz }))
);

interface HeroCanvasProps {
  onSimulate?: () => void;
}

export function HeroCanvas({ onSimulate }: HeroCanvasProps) {
  const isVisible = usePageVisibility();
  const tier = usePerformanceTier();
  const particleCount = tier === 'HIGH' ? 1500 : tier === 'MID' ? 600 : 0;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      frameloop={isVisible ? 'always' : 'demand'}
      gl={{ antialias: tier !== 'LOW', powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        {tier !== 'LOW' && <BackendSystemViz onSimulate={onSimulate} />}
        {particleCount > 0 && <ParticleField count={particleCount} />}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI * 0.65}
          minPolarAngle={Math.PI * 0.35}
        />
      </Suspense>
    </Canvas>
  );
}
