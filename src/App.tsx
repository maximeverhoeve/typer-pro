import { Box, ChakraProvider, Grid, useBoolean } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
// import useSocketInit, { SocketContext } from './hooks/useSocketInit';
// import useGameInit, { GameContext } from './hooks/useGameInit';
import { customThemeDark } from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimatedRoutes from './components/AnimatedRoutes';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainScene from './components/home/three/MainScene';

enum THEMES {
  DARK = 'dark',
  LIGHT = 'light',
}

const queryClient = new QueryClient();

const App: React.FC = () => {
  // TEMP DISABLING WHILE CODING STYLING
  // const socketContextValues =  useSocketInit();
  // const gameContextValues = useGameInit();

  const getInitialTheme = (): boolean => {
    const storageTheme = localStorage.getItem('theme');
    return storageTheme === THEMES.DARK;
  };
  const [isDarkTheme, setIsDarkTheme] = useBoolean(getInitialTheme());
  const [transitionEnded, setTransitionEnded] = useBoolean();

  const handleThemeChange = (): void => {
    if (isDarkTheme) localStorage.setItem('theme', THEMES.LIGHT);
    else localStorage.setItem('theme', THEMES.DARK);
    setIsDarkTheme.toggle();
  };

  return (
    <QueryClientProvider client={queryClient}>
      {/* <SocketContext.Provider value={socketContextValues}>
        <GameContext.Provider value={gameContextValues}> */}
      <ChakraProvider theme={customThemeDark}>
        <Grid
          templateRows="repeat(2, 50vh)"
          bg="background"
          h="100vh"
          overflow="hidden"
          w="100%"
          transition="0.2s"
          color="text"
        >
          <Canvas className="canvas" dpr={[1, 2]}>
            <MainScene hoveringItem={0} />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Canvas>
          <Header
            isDarkTheme={isDarkTheme}
            onThemeChange={handleThemeChange}
            onTransitionEnd={setTransitionEnded.on}
          />
          <Box
            // templateRows="30vh auto 30vh"
            transition="0.2s"
            w="100%"
          >
            {transitionEnded && <AnimatedRoutes />}
            <Footer />
          </Box>
        </Grid>
      </ChakraProvider>
      {/* </GameContext.Provider>
      </SocketContext.Provider> */}
    </QueryClientProvider>
  );
};

export default App;
