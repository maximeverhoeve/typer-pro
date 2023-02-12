import React, { useState } from 'react';
import { Box, Center, VStack } from '@chakra-ui/react';
import LinkBox from '../components/home/LinkBox';

const Home: React.FC = () => {
  const [hoveringItem, setHoveringItem] = useState(0);
  return (
    <Box mx="auto" h="100%" maxW="2xl" w="100%">
      <Center></Center>
      <VStack flexGrow={1} align="stretch" justify="flex-start">
        <LinkBox
          setIsHovering={() => setHoveringItem(0)}
          isHovering={hoveringItem === 0}
          to="/player"
          description="Practice your skills to become a typer pro!"
        >
          Singleplayer
        </LinkBox>
        <LinkBox
          setIsHovering={() => setHoveringItem(1)}
          isHovering={hoveringItem === 1}
          // to="/multiplayer"
          to="/"
          delay={0.2}
          hoverColor="secondary"
          description="Play against friends and see who is the typer pro"
          isUnavailable
        >
          Multiplayer
        </LinkBox>
        <LinkBox
          setIsHovering={() => setHoveringItem(2)}
          isHovering={hoveringItem === 2}
          to="/"
          delay={0.4}
          hoverColor="gray.500"
          description="Check out the leaderboards of every text that's been played"
          isUnavailable
        >
          Leaderboard
        </LinkBox>
      </VStack>
    </Box>
  );
};

export default Home;
