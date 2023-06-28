import { useControls } from 'leva';
import React from 'react';

const SceneLights: React.FC = () => {
  const { position, intensity } = useControls('Lights', {
    position: {
      value: [0.6, 0.4, 8],
      step: 0.1,
    },
    intensity: { value: 0.7, step: 0.1, min: 0, max: 8 },
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={position} intensity={intensity} />
    </>
  );
};

export default SceneLights;
