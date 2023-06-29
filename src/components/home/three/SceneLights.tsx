import { useControls } from 'leva';
import React from 'react';

const SceneLights: React.FC = () => {
  const { position, intensity } = useControls(
    'Lights',
    {
      position: {
        value: [-12, 0.4, 8],
        step: 0.1,
      },
      intensity: { value: 0.7, step: 0.1, min: 0, max: 8 },
    },
    { collapsed: true },
  );

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight
        position={position}
        intensity={intensity}
        castShadow
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
    </>
  );
};

export default SceneLights;
