import React, { useEffect, useRef } from 'react';
import Player from '../Player';
import { Group } from 'three';
import { GroupProps, useThree } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { Float, Text, Text3D } from '@react-three/drei';

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
  const isHighScore = location?.state && location.state.isHighScore;
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 50);
    gsap.to(camera.position, { z: 5, duration: 2 });
    camera.rotation.set(0, 0, 0);
  }, []);

  console.log('highscore: ', location.state || 'no highscore');

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
        />
      )}
      <FloatText
        label="CURRENT"
        score={location.state?.stats?.wpm || 0}
        position-x={-2}
      />

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
      >
        {label}
        <meshStandardMaterial color={color || '#656565'} />
      </Text>
      <Text
        font="/fonts/roboto-mono-medium.woff"
        fontSize={1.2}
        castShadow
        position={[0, -0.5, -0.5]}
        fillOpacity={1}
      >
        {score}
        <meshStandardMaterial color={color || '#656565'} />
      </Text>
    </Float>
  );
};
