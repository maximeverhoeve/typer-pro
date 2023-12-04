import React, {
  MutableRefObject,
  Suspense,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Group } from 'three';
import Player, {
  PlayerAnimation,
} from '../../../components/home/three/components/Player';
import { gsap } from 'gsap';

interface Props {
  progress: number;
  color: string;
  playerOffset?: number;
}

const MovingMultiplayerPlayer = forwardRef<Group, Props>(
  ({ progress, color, playerOffset = 0 }, ref) => {
    const backupRef = useRef<Group>(null);
    const playerRef = useRef<Group>(null);
    const [animation, setAnimation] = useState<PlayerAnimation>('Standing');

    useEffect(() => {
      let animation: gsap.core.Tween;
      const refPos = ((ref as MutableRefObject<Group | null>) || backupRef)
        ?.current?.position;
      if ((ref || backupRef) && refPos) {
        animation = gsap.to(refPos, {
          z: progress * 100,
          duration: 0.5,
          onStart: () => {
            if (progress !== 0) setAnimation('Running');
          },
          onComplete: () => {
            setAnimation('Standing');
          },
        });
      }

      return () => {
        animation?.kill();
      };
    }, [progress]);

    return (
      <group ref={ref || backupRef}>
        <Suspense fallback={null}>
          <Player
            ref={playerRef}
            position-x={playerOffset}
            color={color}
            animation={animation}
          />
        </Suspense>
      </group>
    );
  },
);

export default MovingMultiplayerPlayer;
