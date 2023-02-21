import { forwardRef, useEffect, Ref } from 'react';
import { Group, Mesh, SkinnedMesh } from 'three';
import { MeshProps } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';

interface Props {
  color?: string;
  isMoving?: boolean;
}

type RefMesh = Mesh;

const Player = forwardRef<RefMesh, Props & MeshProps>(
  ({ isMoving, color = '#333', ...props }, ref) => {
    const { nodes, animations } = useGLTF('/player.glb');
    const { ref: _ref, actions } = useAnimations(animations);

    useEffect(() => {
      if (isMoving) {
        actions.Standing?.fadeOut(0.2);
        actions.Runner?.reset().fadeIn(0.2).play();
      } else {
        actions.Runner?.fadeOut(0.2);
        actions.Standing?.reset().fadeIn(0.2).play();
      }
    }, [isMoving]);

    return (
      <group
        ref={_ref as Ref<Group>}
        scale={0.002}
        position={[0, -1.45, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          castShadow
          receiveShadow
          geometry={(nodes.Cube001 as SkinnedMesh).geometry}
          skeleton={(nodes.Cube001 as SkinnedMesh).skeleton}
        >
          <meshStandardMaterial color={color} roughness={0.8} metalness={1} />
        </skinnedMesh>
      </group>
    );
  },
);

export default Player;
