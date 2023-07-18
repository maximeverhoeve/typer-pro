import React, {
  MutableRefObject,
  Suspense,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import useSinglePlayerStore from '../../../store/useSinglePlayerStore';
import { Group } from 'three';
import Player, {
  PlayerAnimation,
} from '../../../components/home/three/components/Player';
import { gsap } from 'gsap';

const MovingPlayer = forwardRef<Group>((_, ref) => {
  const playerRef = useRef<Group>(null);
  const [animation, setAnimation] = useState<PlayerAnimation>('Standing');
  const progress = useSinglePlayerStore((state) => state.progress);
  const isFinishing = useSinglePlayerStore((state) => state.isFinishing);
  const setIsFinishing = useSinglePlayerStore((state) => state.setIsFinishing);

  useEffect(() => {
    let animation: gsap.core.Tween;
    const refPos = (ref as MutableRefObject<Group | null>).current?.position;
    if (ref && refPos) {
      animation = gsap.to(refPos, {
        z: progress * 100,
        duration: 0.5,
        onStart: () => {
          if (!isFinishing && progress !== 0) setAnimation('Running');
        },
        onComplete: () => {
          !isFinishing && setAnimation('Standing');
        },
      });
    }

    return () => {
      animation?.kill();
    };
  }, [progress]);

  useEffect(() => {
    if (isFinishing) {
      // startfinish animation
      if (ref) {
        setAnimation('WallFlip');
        setTimeout(() => {
          setIsFinishing.off();
        }, 1500);
      }
    }
  }, [isFinishing]);

  return (
    <group ref={ref}>
      <Suspense fallback={null}>
        <Player ref={playerRef} animation={animation} />
      </Suspense>
    </group>
  );
});

export default MovingPlayer;
