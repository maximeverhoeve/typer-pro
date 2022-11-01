import { Center, ChakraProvider, useBoolean, VStack } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import Home from './pages/Home';
import useSocketInit, { SocketContext } from './hooks/useSocketInit';
import useGameInit, { GameContext } from './hooks/useGameInit';
import { Route, Routes } from 'react-router-dom';
import SinglePlayerView from './pages/SinglePlayerView';
import MultiplayerView from './pages/MultiplayerView';
import { customThemeDark, customThemeLight } from './theme';
import Header from './components/Header';
import Footer from './components/Footer';

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
          <VStack
            align="stretch"
            transition="0.2s"
            bg="background"
            h="100vh"
            overflow="hidden"
            color="text"
            justify="center"
          >
            <Header />
            <Center>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/singleplayer" element={<SinglePlayerView />} />
                <Route path="/multiplayer" element={<MultiplayerView />} />
              </Routes>
            </Center>
            <Footer onThemeChange={setIsDarkTheme.toggle} />
          </VStack>
        </ChakraProvider>
      </GameContext.Provider>
    </SocketContext.Provider>
  );
};

export default App;
