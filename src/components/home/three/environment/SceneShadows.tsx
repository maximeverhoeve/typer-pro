import React, { useRef } from 'react';
import { ContactShadows } from '@react-three/drei';
import { useControls } from 'leva';
import { Group } from 'three';

const SceneShadows: React.FC = () => {
  const shadowRef = useRef<Group>();
  const { color, opacity, blur } = useControls('Shadows', {
    color: '#6a7270',
    opacity: { value: 0.5, min: 0, max: 1 },
    blur: { value: 1.3, min: 0, max: 10 },
  });

  return (
    <ContactShadows
      ref={shadowRef}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, -1.5, 0]}
      far={1.5}
      color={color}
      opacity={opacity}
      blur={blur}
    />
  );
};

export default SceneShadows;
