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
import { useMitt } from '../../../hooks/useMitt';
import { useNavigate } from 'react-router-dom';

const MovingPlayer = forwardRef<Group>((_, ref) => {
  const playerRef = useRef<Group>(null);
  const [animation, setAnimation] = useState<PlayerAnimation>('Standing');
  const progress = useSinglePlayerStore((state) => state.progress);
  const navigate = useNavigate();
  const isFinishing = useSinglePlayerStore((state) => state.isFinishing);
  const setIsFinishing = useSinglePlayerStore((state) => state.setIsFinishing);
  const { emitter } = useMitt();

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
    // startfinish animation
    emitter.on('sp_finish_animation', (stateObj) => {
      if (ref) {
        setAnimation('Cheering');
        setTimeout(() => {
          emitter.emit('sp_navigate_to_leaderboard');
          setIsFinishing.off();
          navigate(`/leaderboard/${stateObj.textId}`, {
            state: stateObj,
          });
        }, 1400);
      }
    });
  }, []);

  return (
    <group ref={ref}>
      <Suspense fallback={null}>
        <Player ref={playerRef} animation={animation} />
      </Suspense>
    </group>
  );
});

export default MovingPlayer;
