import React from 'react';
import { Box, Center, VStack } from '@chakra-ui/react';
import LinkBox from '../components/home/LinkBox';
import useCanvasStore from '../store/useCanvasStore';

const Home: React.FC = () => {
  const { hoveredItem, setHoveredItem } = useCanvasStore((state) => state);

  return (
    <Box mx="auto" h="100%" maxW="2xl" w="100%">
      <Center></Center>
      <VStack flexGrow={1} align="stretch" justify="flex-start">
        <LinkBox
          setIsHovering={() => setHoveredItem('SINGLEPLAYER')}
          isHovering={hoveredItem === 'SINGLEPLAYER'}
          to="/player"
          description="Practice your skills to become a typer pro!"
        >
          Singleplayer
        </LinkBox>
        <LinkBox
          setIsHovering={() => setHoveredItem('MULTIPLAYER')}
          isHovering={hoveredItem === 'MULTIPLAYER'}
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
          setIsHovering={() => setHoveredItem('LEADERBOARD')}
          isHovering={hoveredItem === 'LEADERBOARD'}
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
