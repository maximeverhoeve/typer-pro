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
import { gsap } from 'gsap';
import { useMitt } from '../../../hooks/useMitt';
import { useNavigate } from 'react-router-dom';
import Soldier, {
  SoldierActionName,
} from '../../../components/three/components/Soldier';

const MovingPlayer = forwardRef<Group>((_, ref) => {
  const playerRef = useRef<Group>(null);
  const [animation, setAnimation] = useState<SoldierActionName>('idle');
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
        x: progress * 100 * 0.8,
        duration: 0.5,
        onStart: () => {
          if (!isFinishing && progress !== 0) setAnimation('sprint');
        },
        onComplete: () => {
          !isFinishing && setAnimation('idle');
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
        if (stateObj.isHighScore) setAnimation('emote-yes');
        else setAnimation('emote-no');
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
        <Soldier
          rotation={[0, Math.PI / 2, 0]}
          scale={[0.9, 0.9, 0.9]}
          position={[0, -1.5, 0]}
          ref={playerRef}
          animation={animation}
        />
      </Suspense>
    </group>
  );
});

export default MovingPlayer;
