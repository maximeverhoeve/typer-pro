import React from 'react';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import { OrthographicCamera } from '@react-three/drei';
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
    <Box position="relative" w="100vw">
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
        shadows
        flat
        className="canvas"
        dpr={[1, 2]}
        resize={{ debounce: 0 }}
        style={{ transition: '0.2s' }}
      >
        {showPerf && <Perf position="bottom-left" />}
        <fog attach="fog" args={['#121212', 10, 20]} />
        <SceneLights />
        <OrthographicCamera
          makeDefault
          position={[10.4, 3.1, 7.1]}
          near={0.01}
          far={200}
          zoom={100}
          // castShadow
        />

        {/* <OrbitControls enabled={true} /> */}
        <SceneRouter />

        <SceneShadows />
      </Canvas>
    </Box>
  );
};

export default ThreeEnvironment;
