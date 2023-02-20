import { forwardRef } from 'react';
import { Mesh } from 'three';
import { MeshProps } from '@react-three/fiber';

interface Props {
  color?: string;
}

type Ref = Mesh;

const Player = forwardRef<Ref, Props & MeshProps>(
  ({ position = [0, 0, 0], color = '#333', ...props }, ref) => {
    return (
      <mesh ref={ref} position={position} {...props}>
        <boxGeometry args={[1, 1.5, 1]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.4} />
      </mesh>
    );
  },
);

export default Player;
