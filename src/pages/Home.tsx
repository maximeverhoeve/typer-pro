import React from 'react';
import { VStack } from '@chakra-ui/react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import useSocketContext from '../hooks/useSocketContext';
import SinglePlayerView from './SinglePlayerView';
import MultiplayerView from './MultiplayerView';

const Home: React.FC = () => {
  const { room } = useSocketContext();

  return (
    <VStack align="stretch" bg="gray.800" h="100vh" overflow="hidden">
      <Header />

      {room ? <MultiplayerView /> : <SinglePlayerView />}
      <Footer />
    </VStack>
  );
};

export default Home;
