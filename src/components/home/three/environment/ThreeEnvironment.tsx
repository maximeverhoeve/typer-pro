import React from 'react';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import { OrbitControls } from '@react-three/drei';
import { Canvas, Vector3 } from '@react-three/fiber';
import SceneRouter from '../SceneRouter';
import SceneLights from './SceneLights';
import SceneShadows from './SceneShadows';
import { Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export const DEFAULT_CAMERA_POSITION = [0, 0, 5] as Vector3;

const ThreeEnvironment: React.FC = () => {
  const location = useLocation();
  const { showPerf, showOrbit } = useControls({
    showPerf: false,
    showOrbit: false,
  });

  const getKeyForAnimationChange = (): string => {
    if (location.pathname.includes('/singleplayer/')) {
      return '/singleplayer';
    }
    return location.pathname;
  };

  return (
    <Box position="relative">
      <AnimatePresence mode="wait">
        <motion.div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
          }}
          initial={{ background: 'rgba(18, 18, 18, 1)' }}
          animate={{ background: 'rgba(18, 18, 18, 0)' }}
          exit={{ background: 'rgba(18, 18, 18, 1)' }}
          transition={{
            duration: 0.5,
            type: 'tween',
          }}
          key={getKeyForAnimationChange()}
        />
      </AnimatePresence>
      <Canvas
        // shadows
        flat
        className="canvas"
        dpr={[1, 2]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 3],
          aspect: window.innerWidth / window.innerHeight,
        }}
        style={{ transition: '0.2s' }}
      >
        {showPerf && <Perf position="bottom-left" />}

        <SceneLights />

        <OrbitControls enabled={showOrbit} />
        <SceneRouter />

        <SceneShadows />
      </Canvas>
    </Box>
  );
};

export default ThreeEnvironment;
