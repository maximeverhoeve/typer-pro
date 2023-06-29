import React from 'react';

const SceneShadows: React.FC = () => {
  return (
    <>
      {/* <ContactShadows
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
        far={2}
        color={color}
        opacity={opacity}
        blur={blur}
      /> */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.51, 55]}
        scale-y={120}
        scale-x={20}
        receiveShadow
      >
        <planeGeometry />
        {/* <meshBasicMaterial color="green" wireframe /> */}
        <shadowMaterial color="black" />
      </mesh>
    </>
  );
};

export default SceneShadows;
