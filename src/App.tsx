import { Center, ChakraProvider, Grid, useBoolean } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import useSocketInit, { SocketContext } from './hooks/useSocketInit';
import useGameInit, { GameContext } from './hooks/useGameInit';
import { customThemeDark, customThemeLight } from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimatedRoutes from './components/AnimatedRoutes';

const App: React.FC = () => {
  const socketContextValues = useSocketInit();
  const gameContextValues = useGameInit();
  const [isDarkTheme, setIsDarkTheme] = useBoolean();
  return (
    <SocketContext.Provider value={socketContextValues}>
      <GameContext.Provider value={gameContextValues}>
        <ChakraProvider
          theme={isDarkTheme ? customThemeDark : customThemeLight}
        >
          <Grid
            templateRows="1fr auto 1fr"
            transition="0.2s"
            bg="background"
            h="100vh"
            color="text"
          >
            <Header
              isDarkTheme={isDarkTheme}
              onThemeChange={setIsDarkTheme.toggle}
            />
            <Center flexGrow="1">
              <AnimatedRoutes />
            </Center>
            <Footer />
          </Grid>
        </ChakraProvider>
      </GameContext.Provider>
    </SocketContext.Provider>
  );
};

export default App;
