import React, { useState } from 'react';
import { Center, Grid, VStack } from '@chakra-ui/react';
import LinkBox from '../components/home/LinkBox';
import { Canvas } from '@react-three/fiber';
import MainScene from '../components/home/three/MainScene';
import { OrbitControls } from '@react-three/drei';

const Home: React.FC = () => {
  const [hoveringItem, setHoveringItem] = useState(0);
  return (
    <Grid
      templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
      h="100%"
      gridGap="4"
      maxW="100vw"
      overflow="hidden"
    >
      <Center>
        <Canvas className="canvas" dpr={[1, 2]}>
          <MainScene hoveringItem={hoveringItem} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </Center>
      <VStack align="stretch" justify="center">
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
          to="/multiplayer"
          delay={0.2}
          hoverColor="secondary"
          description="Play against friends and see who is the typer pro"
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
    </Grid>
  );
};

export default Home;
