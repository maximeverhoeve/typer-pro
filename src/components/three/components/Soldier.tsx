import React, { forwardRef, useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { GroupProps } from '@react-three/fiber';
import {
  AnimationAction,
  Group,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
} from 'three';

type GLTFResult = GLTF & {
  nodes: {
    ['leg-left']: Mesh;
    ['leg-right']: Mesh;
    torso: Mesh;
    ['arm-left']: Mesh;
    ['arm-right']: Mesh;
    head: Mesh;
  };
  materials: {
    colormap: MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export type SoldierActionName =
  | 'static'
  | 'idle'
  | 'walk'
  | 'sprint'
  | 'jump'
  | 'fall'
  | 'crouch'
  | 'sit'
  | 'drive'
  | 'die'
  | 'pick-up'
  | 'emote-yes'
  | 'emote-no'
  | 'holding-right'
  | 'holding-left'
  | 'holding-both'
  | 'holding-right-shoot'
  | 'holding-left-shoot'
  | 'holding-both-shoot'
  | 'attack-melee-right'
  | 'attack-melee-left'
  | 'attack-kick-right'
  | 'attack-kick-left'
  | 'interact-right'
  | 'interact-left';

interface GLTFAction extends THREE.AnimationClip {
  name: SoldierActionName;
}

interface Props {
  animation?: SoldierActionName;
  isGhost?: boolean;
}

const ghostMaterial = new MeshBasicMaterial({
  color: 0xe0e0ff,
  wireframe: true,
  wireframeLinewidth: 0.001,
  opacity: 0.2,
});

const Soldier = forwardRef<Group, Props & GroupProps>(
  ({ animation = 'idle', isGhost, ...props }, ref) => {
    const group = useRef<Group>(null);
    const { nodes, materials, animations } = useGLTF(
      '/objects/character-soldier.glb',
    ) as GLTFResult;

    const { actions } = useAnimations(animations, group);
    actions.idle?.play();
    const soldierMaterial = materials.colormap;
    const ghostMaterial = soldierMaterial.clone();
    ghostMaterial.transparent = true;
    ghostMaterial.opacity = 0.3;
    const material = isGhost ? ghostMaterial : soldierMaterial;

    useEffect(() => {
      actions[animation]?.reset().fadeIn(0.2).play();
      return () => {
        actions[animation]?.fadeOut(0.2);
      };
    }, [animation]);

    return (
      <group ref={ref} {...props} dispose={null}>
        <group ref={group} name="character-soldier">
          <group name="character-soldier_1">
            <group name="root">
              <mesh
                name="leg-left"
                castShadow
                receiveShadow
                geometry={nodes['leg-left'].geometry}
                material={material}
                position={[0.084, 0.176, -0.024]}
              />
              <mesh
                name="leg-right"
                castShadow
                receiveShadow
                geometry={nodes['leg-right'].geometry}
                material={material}
                position={[-0.084, 0.176, -0.024]}
              />
              <mesh
                name="torso"
                castShadow
                receiveShadow
                geometry={nodes.torso.geometry}
                material={material}
                position={[0, 0.176, -0.024]}
              >
                <mesh
                  name="arm-left"
                  castShadow
                  receiveShadow
                  geometry={nodes['arm-left'].geometry}
                  material={material}
                  position={[0.1, 0.112, 0.011]}
                />
                <mesh
                  name="arm-right"
                  castShadow
                  receiveShadow
                  geometry={nodes['arm-right'].geometry}
                  material={material}
                  position={[-0.1, 0.112, 0.011]}
                />
                <mesh
                  name="head"
                  castShadow
                  receiveShadow
                  geometry={nodes.head.geometry}
                  material={material}
                  position={[0, 0.167, 0.026]}
                />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    );
  },
);

useGLTF.preload('/objects/character-soldier.glb');

export default Soldier;
