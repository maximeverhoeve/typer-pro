import React, { useMemo, useEffect, useRef } from 'react';
import Player from '../components/Player';
import { Group } from 'three';
import { GroupProps, useFrame, useThree } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { Float, Text } from '@react-three/drei';
import LeaderboardEnvironment from './LeaderboardEnvironment';

interface LocationType {
  state?: {
    stats?: {
      wpm: number;
    };
    isHighScore: boolean;
    highScore: number;
  };
}

const ThreeLeaderboard: React.FC = () => {
  const playerRef = useRef<Group>(null);
  const location = useLocation() as LocationType;
  /** Adding useMemo because the state changes before the transition between pages is done  */
  const isHighScore = useMemo(
    () => location?.state && location.state.isHighScore,
    [],
  );
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(-10, 10, 20);
    const cameraAnimation = gsap.to(camera.position, {
      z: 7,
      x: 0,
      y: 0,
      duration: 2.5,
    });
    camera.rotation.set(0, 0, 0);

    return () => {
      cameraAnimation.kill();
    };
  }, []);

  useFrame(({ camera }) => {
    if (playerRef.current) {
      camera.lookAt(playerRef.current.position);
    }
  });

  return (
    <>
      <directionalLight
        position={[10, 10, 5]}
        castShadow
        intensity={0.7}
        shadow-mapSize={2048 * 2}
        shadow-bias={-0.001}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-8.5, 15, 8.5, -8.5, 0.1, 20]}
        />
      </directionalLight>
      <LeaderboardEnvironment />
    </>
  );

  return (
    <>
      <directionalLight
        position={[-2, 10, 5]}
        intensity={0.3}
        castShadow
        shadow-mapSize={[150, 150]}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      {(location.state?.highScore || 0) > 0 && (
        <FloatText
          label="BEST"
          score={location.state?.highScore || 0}
          position-x={2}
          color="#009da5"
        />
      )}
      {location.state?.stats && (
        <FloatText
          label="CURRENT"
          score={location.state?.stats?.wpm || 0}
          position-x={-2}
          color="#ac005c"
        />
      )}

      <Player ref={playerRef} animation={isHighScore ? 'Cheering' : 'Sad'} />
    </>
  );
};

export default ThreeLeaderboard;

interface FloatTextProps {
  label: string;
  score: number;
  color?: string;
}

const FloatText: React.FC<FloatTextProps & GroupProps> = ({
  label,
  score,
  color,
  ...props
}) => {
  return (
    <Float floatIntensity={1} speed={3} {...props}>
      <Text
        font="/fonts/roboto-mono-medium.woff"
        fontSize={0.3}
        castShadow
        position={[0, 0.4, -0.5]}
        fillOpacity={1}
        outlineColor={'black'}
        outlineWidth={0.03}
      >
        {label}
      </Text>
      <Text
        font="/fonts/roboto-mono-medium.woff"
        fontSize={1.2}
        castShadow
        position={[0, -0.5, -0.5]}
        fillOpacity={1}
        outlineColor={'black'}
        outlineWidth={0.03}
        color={color}
      >
        {score}
      </Text>
    </Float>
  );
};
