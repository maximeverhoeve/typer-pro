import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import useCanvasStore from '../../store/useCanvasStore';
import ThreeSuspense from './components/ThreeSuspense';
import Tree from './components/Tree';
import Ground from './components/Ground';
import InBoundsGroup from './components/InBoundsGroup';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call

const MainScene: React.FC = () => {
  const { hoveredItem } = useCanvasStore((state) => state);
  const { camera } = useThree();
  const movingScene = useRef<Group>(null);

  useEffect(() => {
    camera.position.set(5, 3, 5.5);
    camera.lookAt(new Vector3(0, 0, 0));
  }, []);

  const shouldTreeBeHidden = (treeX: number): boolean => {
    if (movingScene.current) {
      const scenPosX = movingScene.current.position.x;
      const treePosInScene = scenPosX + treeX;
      // What is the range?
      const range = { min: -5, max: 5 };
      console.log(
        'devmax',
        treePosInScene >= range.min && treePosInScene <= range.max,
      );
      return treePosInScene >= range.min && treePosInScene <= range.max;
    }
    return false;
  };

  useFrame((_, delta) => {
    if (movingScene.current) {
      // movingScene.current.position.x -= delta;
    }
  });

  console.log('devmax', movingScene);

  return (
    <ThreeSuspense>
      {/* <Tree position={[0, 0, -1.5]} /> */}
      <group position={[0, 0, 0]} ref={movingScene}>
        {Array.from({ length: 9 }).map((_, i) => (
          <InBoundsGroup position={[1 * i, 0, -1.5]} key={i}>
            <Tree hide={shouldTreeBeHidden(1 * i)} />
          </InBoundsGroup>
        ))}
      </group>
      <Ground position={[0, -0.1, 0]} />
    </ThreeSuspense>
  );
};

export default MainScene;
