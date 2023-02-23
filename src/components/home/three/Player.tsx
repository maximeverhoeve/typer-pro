import { useMemo, forwardRef, useEffect, Ref } from 'react';
import { Group, Object3D, SkinnedMesh } from 'three';
import { GroupProps, useGraph } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';

interface Props {
  color?: string;
  isMoving?: boolean;
}

useGLTF.preload('./player.glb');

type RefMesh = Group;

const Player = forwardRef<RefMesh, Props & GroupProps>(
  ({ isMoving, color = '#DC0077', ...props }, ref) => {
    const { animations, scene } = useGLTF('./player.glb');
    scene.traverse(function (obj) {
      obj.frustumCulled = false;
    });
    const cloneScene: Object3D = useMemo(
      () => clone(scene as Object3D),
      [scene],
    );
    const { nodes } = useGraph(cloneScene);
    nodes.mixamorigHips.traverse(function (obj) {
      obj.frustumCulled = false;
    });
    const { ref: _ref, actions } = useAnimations(animations, cloneScene);
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
      <group ref={_ref as Ref<Group>} {...props}>
        <pointLight
          position-y={0.5}
          position-x={0}
          position-z={0.5}
          intensity={10}
          distance={3}
          color={color}
        />
        <group
          scale={0.002}
          position={[0, -1.45, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            castShadow
            receiveShadow
            geometry={(nodes.Cube001 as SkinnedMesh).clone().geometry}
            skeleton={(nodes.Cube001 as SkinnedMesh).clone().skeleton}
          >
            <meshStandardMaterial color="#333" roughness={0.8} metalness={1} />
          </skinnedMesh>
        </group>
      </group>
    );
  },
);

export default Player;
