import { Box, ChakraProvider, Grid, useBoolean } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import { customThemeDark } from './theme';
import Header from './components/Header';
import Router from './Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import ThreeEnvironment from './components/three/environment/ThreeEnvironment';
import { Leva } from 'leva';
import { MittProvider } from './hooks/useMitt';
import { useLocation } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import { SocketProvider } from './hooks/useSocket';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { pathname } = useLocation();
  const [transitionEnded, setTransitionEnded] = useBoolean();
  /** Debounced because of animations */
  const debouncedPath = useDebounce<string>(pathname, 500);

  const getSceneHeight = (): string => {
    if (debouncedPath === '/multiplayer') return '20%';
    if (debouncedPath === '/leaderboard') return '40%';
    return '55%';
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <MittProvider>
          <ChakraProvider theme={customThemeDark}>
            <Leva collapsed />
            <Grid
              templateRows={`${getSceneHeight()} auto`}
              bg="background"
              h="100vh"
              w="100%"
              overflowX="hidden"
              sx={{
                /** Making scrollbar absolute position */
                overflowY: 'overlay',
              }}
              transition="0.2s"
              color="text"
            >
              <ThreeEnvironment />
              <Header onTransitionEnd={setTransitionEnded.on} />
              <Box
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
                {/* <Footer /> */}
              </Box>
            </Grid>
          </ChakraProvider>
        </MittProvider>
      </SocketProvider>
    </QueryClientProvider>
  );
};

export default App;
