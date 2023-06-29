import React from 'react';
import { ContactShadows } from '@react-three/drei';
import { useControls } from 'leva';

const SceneShadows: React.FC = () => {
  const { color, opacity, blur } = useControls(
    'Shadows',
    {
      color: '#000000',
      opacity: { value: 1, min: 0, max: 1 },
      blur: { value: 1.6, min: 0, max: 10 },
    },
    { collapsed: true },
  );

  return (
    <>
      <ContactShadows
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
        far={2}
        color={color}
        opacity={opacity}
        blur={blur}
      />
      {/* <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.51, 0]}
        scale-y={50}
        scale-x={20}
        receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial color="#4f72d0" />
      </mesh> */}
    </>
  );
};

export default SceneShadows;
