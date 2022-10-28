import React from 'react';
import { Box, VStack } from '@chakra-ui/react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <VStack
      align="stretch"
      transition="0.2s"
      bg="background"
      h="100vh"
      overflow="hidden"
    >
      <Header />
      <Box color="white">
        <Link to="/singleplayer">Singleplayer</Link>
        <Link to="/multiplayer">Multiplayer</Link>
      </Box>
      <Footer />
    </VStack>
  );
};

export default Home;
