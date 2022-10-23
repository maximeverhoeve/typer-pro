import React from 'react';
import { Center, Grid } from '@chakra-ui/react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import useSocketContext from '../hooks/useSocketContext';
import SinglePlayerView from './SinglePlayerView';
import MultiplayerView from './MultiplayerView';
import Game from './Game';

const Home: React.FC = () => {
  const { room } = useSocketContext();

  return (
    <Grid
      templateRows="repeat(3, 33%)"
      bg="gray.800"
      h="100vh"
      overflow="hidden"
    >
      <Header />
      <Center flexShrink={0}>
        {room ? <MultiplayerView /> : <SinglePlayerView />}
      </Center>
      <Footer />
    </Grid>
  );
};

export default Home;
