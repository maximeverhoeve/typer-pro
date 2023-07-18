import { useMemo, forwardRef, useEffect, Ref } from 'react';
import { useControls } from 'leva';
import { Group, Object3D, SkinnedMesh } from 'three';
import { GroupProps, dispose, useGraph } from '@react-three/fiber';
import { useAnimations, useGLTF, useMatcapTexture } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';

export type PlayerAnimation =
  | 'Running'
  | 'Standing'
  | 'Sad'
  | 'Cheering'
  | 'WallFlip';

interface Props {
  color?: string;
  isGhost?: boolean;
  animation?: PlayerAnimation;
}

type RefMesh = Group;

// good maps
// 161B1F_C7E0EC_90A5B3_7B8C9B
// 1B1B1B_999999_575757_747474
// 8D8D8D_DDDDDD_CCCCCC_B7B7B7
// 9B9B9B_1E1E1E_5C5C5C_444444
// 9D9D9D_4E4E4E_646464_6C6C6C
// 555555_C8C8C8_8B8B8B_A4A4A4 -> very good

const PlayerTwo = forwardRef<RefMesh, Props & GroupProps>(
  ({ color = '#e70087', isGhost, animation = 'Standing', ...props }, ref) => {
    const [Texture] = useMatcapTexture('9D9D9D_4E4E4E_646464_6C6C6C', 256);
    const { enableCustomColor, debugColor } = useControls(
      'Player',
      {
        enableCustomColor: { value: false, label: 'Show color' },
        debugColor: { value: color, label: 'color' },
      },
      { collapsed: true },
    );
    const { animations, scene } = useGLTF('/TypiePro.glb');

    const cloneScene: Object3D = useMemo(
      () => clone(scene as Object3D),
      [scene],
    );
    cloneScene.traverse(function (obj) {
      obj.frustumCulled = false;
    });
    const { nodes } = useGraph(cloneScene);
    const geometry = (nodes.PlayerMesh as SkinnedMesh).geometry;
    const skeleton = (nodes.PlayerMesh as SkinnedMesh).skeleton;
    const { ref: _ref, actions } = useAnimations(animations, cloneScene);
    useEffect(() => {
      actions[animation]?.reset().fadeIn(0.2).play();
      return () => {
        actions[animation]?.fadeOut(0.2);
      };
    }, [animation]);

    useEffect(() => {
      return () => {
        /** Dispose everything to prevent loading a lot of textures when the user switches pages alot */
        dispose(cloneScene);
        geometry.dispose();
        skeleton.dispose();
      };
    }, []);

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
          scale={0.002}
          position={[0, -1.45, 0]}
          rotation={[Math.PI / 2, 0, (Math.PI / 2) * 2]}
          ref={_ref as Ref<Group>}
        >
          <primitive object={nodes.mixamorigHips} />

          <skinnedMesh
            castShadow
            receiveShadow
            geometry={geometry}
            skeleton={skeleton}
          >
            {isGhost ? (
              <meshBasicMaterial color={color} wireframe={isGhost} />
            ) : (
              <meshMatcapMaterial
                color={enableCustomColor ? debugColor : color}
                matcap={Texture}
              />
            )}
          </skinnedMesh>
        </group>
      </group>
    );
  },
);

export default PlayerTwo;
useGLTF.preload('/player-2.glb');
