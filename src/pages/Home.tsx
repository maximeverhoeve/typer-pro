import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import LinkBox from '../components/LinkBox';
import useCanvasStore from '../store/useCanvasStore';
import usePlayerStore from '../store/usePlayerStore';

const Home: React.FC = () => {
  const nickname = usePlayerStore((state) => state.nickname);
  const { hoveredItem, setHoveredItem } = useCanvasStore((state) => state);

  return (
    <Box mx="auto" h="100%" maxW="2xl" w="100%">
      <VStack flexGrow={1} align="stretch" justify="flex-start">
        <LinkBox
          setIsHovering={() => setHoveredItem('SINGLEPLAYER')}
          isHovering={hoveredItem === 'SINGLEPLAYER'}
          to={nickname ? '/singleplayer' : '/player'}
          description="Practice your skills to become a typer pro!"
        >
          Singleplayer
        </LinkBox>
        <LinkBox
          setIsHovering={() => setHoveredItem('MULTIPLAYER')}
          isHovering={hoveredItem === 'MULTIPLAYER'}
          to="/multiplayer"
          delay={0.2}
          hoverColor="secondary"
          description="Play against friends and see who is the typer pro"
        >
          Multiplayer
        </LinkBox>
        <LinkBox
          setIsHovering={() => setHoveredItem('LEADERBOARD')}
          isHovering={hoveredItem === 'LEADERBOARD'}
          to="/leaderboard"
          delay={0.4}
          hoverColor="gray.500"
          description="Check out the leaderboards of every text that's been played"
          // isUnavailable
        >
          Leaderboard
        </LinkBox>
      </VStack>
    </Box>
  );
};

export default Home;
