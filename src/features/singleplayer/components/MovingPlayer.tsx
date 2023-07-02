import { a, useSpring } from '@react-spring/three';
import { useThree } from '@react-three/fiber';
import React, {
  Suspense,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import useSinglePlayerStore from '../../../store/useSinglePlayerStore';
import { Group } from 'three';
import Player, {
  PlayerAnimation,
} from '../../../components/home/three/components/Player';

const MovingPlayer = forwardRef<Group>((_, ref) => {
  const playerRef = useRef<Group>(null);
  const [animation, setAnimation] = useState<PlayerAnimation>('Standing');
  const { camera } = useThree();
  const progress = useSinglePlayerStore((state) => state.progress);
  const isFinishing = useSinglePlayerStore((state) => state.isFinishing);
  const setIsFinishing = useSinglePlayerStore((state) => state.setIsFinishing);
  const isGameStarted = useSinglePlayerStore((state) => state.isGameStarted);

  const [{ z }, api] = useSpring(
    {
      z: progress * 100,
      onStart: () => {
        // When camera position is not initially correct on page load. It should correct it
        if (camera.position.x !== -6) {
          if (ref) {
            gsap.to(camera.position, { x: -6, y: 1 });
          }
        }
        if (!isFinishing) setAnimation('Runner');
      },
      config: {
        duration: 300,
      },
      onRest: () => !isFinishing && setAnimation('Standing'),
    },
    [progress],
  );

  useLayoutEffect(() => {
    api.stop();
    api.set({ z: 0 });
  }, []);

  useEffect(() => {
    api.stop();
    api.set({ z: 0 });
  }, [isGameStarted]);

  useEffect(() => {
    if (isFinishing) {
      // startfinish animation
      if (ref) {
        setAnimation('wall_flip');
        setTimeout(() => {
          setIsFinishing.off();
        }, 1500);
      }
    }
  }, [isFinishing]);

  return (
    <a.group ref={ref} position-z={z}>
      <Suspense fallback={null}>
        <Player ref={playerRef} animation={animation} />
      </Suspense>
    </a.group>
  );
});

export default MovingPlayer;
