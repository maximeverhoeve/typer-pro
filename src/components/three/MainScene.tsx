import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import useCanvasStore from '../../store/useCanvasStore';
import ThreeSuspense from './components/ThreeSuspense';
import Tree from './components/Tree';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call

const MainScene: React.FC = () => {
  const { hoveredItem } = useCanvasStore((state) => state);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(5, 3, 5.5);
    camera.lookAt(new Vector3(0, 0, 0));
  }, []);

  return (
    <ThreeSuspense>
      <Tree />
      <Tree position={[1, 0, 0]} />
    </ThreeSuspense>
  );
};

export default MainScene;
