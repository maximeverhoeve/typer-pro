import { Box, ChakraProvider, Grid, useBoolean } from '@chakra-ui/react';
import React from 'react';
import './App.css';
// import useSocketInit, { SocketContext } from './hooks/useSocketInit';
// import useGameInit, { GameContext } from './hooks/useGameInit';
import { customThemeDark } from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Router from './Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import ThreeEnvironment from './components/home/three/environment/ThreeEnvironment';
import { Leva } from 'leva';
import { MittProvider } from './hooks/useMitt';

const queryClient = new QueryClient();

const App: React.FC = () => {
  // TEMP DISABLING WHILE CODING STYLING
  // const socketContextValues =  useSocketInit();
  // const gameContextValues = useGameInit();

  const [transitionEnded, setTransitionEnded] = useBoolean();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <SocketContext.Provider value={socketContextValues}>
        <GameContext.Provider value={gameContextValues}> */}
      <MittProvider>
        <ChakraProvider theme={customThemeDark}>
          <Leva collapsed />
          <Grid
            templateRows="55vh 45vh"
            bg="background"
            h="100vh"
            overflow="hidden"
            w="100%"
            transition="0.2s"
            color="text"
          >
            <ThreeEnvironment />
            <Header onTransitionEnd={setTransitionEnded.on} />
            <Box
              // templateRows="30vh auto 30vh"
              transition="0.2s"
              w="100%"
              position="relative"
              _before={{
                content: '""',
                h: '10vh',
                w: '100%',
                bg: 'linear-gradient(0deg, #121212 3%, rgba(0,0,0, 0) 100%);',
                position: 'absolute',
                bottom: '100%',
                zIndex: '1',
              }}
              pt="4"
            >
              {transitionEnded && <Router />}
              <Footer />
            </Box>
          </Grid>
        </ChakraProvider>
      </MittProvider>
      {/* </GameContext.Provider>
      </SocketContext.Provider> */}
    </QueryClientProvider>
  );
};

export default App;
