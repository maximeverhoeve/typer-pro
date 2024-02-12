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
      intensity: { value: 1.3, step: 0.1, min: 0, max: 8 },
    },
    { collapsed: true },
  );

  return (
    <>
      <ambientLight intensity={1} />
      {/* <directionalLight position={position} intensity={intensity} /> */}
    </>
  );
};

export default SceneLights;
