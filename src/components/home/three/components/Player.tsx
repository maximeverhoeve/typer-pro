import { useMemo, forwardRef, useEffect, Ref } from 'react';
import { useControls } from 'leva';
import { Group, Object3D, SkinnedMesh } from 'three';
import { GroupProps, useGraph } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';

export type PlayerAnimation =
  | 'Runner'
  | 'Standing'
  | 'Sad'
  | 'Cheering'
  | 'wall_flip'
  | 'flip_kick';

interface Props {
  color?: string;
  isGhost?: boolean;
  animation?: PlayerAnimation;
}

type RefMesh = Group;

const Player = forwardRef<RefMesh, Props & GroupProps>(
  ({ color = '#ac005c', isGhost, animation = 'Standing', ...props }, ref) => {
    const { enableCustomColor, debugColor } = useControls(
      'Player',
      {
        enableCustomColor: { value: false, label: 'Show color' },
        debugColor: { value: color, label: 'color' },
      },
      { collapsed: true },
    );
    const { animations, scene } = useGLTF('/player.glb');

    const cloneScene: Object3D = useMemo(
      () => clone(scene as Object3D),
      [scene],
    );
    cloneScene.traverse(function (obj) {
      obj.frustumCulled = false;
    });
    const { nodes } = useGraph(cloneScene);
    const { ref: _ref, actions } = useAnimations(animations, cloneScene);

    useEffect(() => {
      actions[animation]?.reset().fadeIn(0.2).play();
      return () => {
        actions[animation]?.fadeOut(0.2);
      };
    }, [animation]);

    return (
      <group ref={ref} {...props}>
        {isGhost && (
          <>
            <pointLight
              position-y={0.5}
              position-z={-0.8}
              intensity={100}
              distance={2}
              color="#999"
            />
          </>
        )}
        <group
          scale={0.0025}
          position={[0, -1.45, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          ref={_ref as Ref<Group>}
        >
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            castShadow
            receiveShadow
            geometry={(nodes.Cube001 as SkinnedMesh).clone().geometry}
            skeleton={(nodes.Cube001 as SkinnedMesh).clone().skeleton}
          >
            <meshStandardMaterial
              color={enableCustomColor ? debugColor : color}
              roughness={isGhost ? 0 : 0.3}
              metalness={isGhost ? 0 : 0.65}
              wireframe={isGhost}
              flatShading={!isGhost}
            />
          </skinnedMesh>
        </group>
      </group>
    );
  },
);

export default Player;
useGLTF.preload('/player.glb');
