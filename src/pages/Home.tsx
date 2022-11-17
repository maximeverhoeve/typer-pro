import React, { PropsWithChildren, ReactElement } from 'react';
import { Box, Center, Grid, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import MultiplayerIcon from '../assets/icons/multiplayer';
import SingleplayerIcon from '../assets/icons/singleplayer';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gridGap="4">
      <Link to="/singleplayer">
        <LinkBox icon={<SingleplayerIcon />}>singleplayer</LinkBox>
      </Link>
      <Link to="/multiplayer">
        <LinkBox delay={0.1} hoverColor="secondary" icon={<MultiplayerIcon />}>
          multiplayer
        </LinkBox>
      </Link>
    </Grid>
  );
};

interface LinkBoxProps {
  icon: ReactElement;
  hoverColor?: string;
  delay?: number;
}

const LinkBox: React.FC<PropsWithChildren & LinkBoxProps> = ({
  icon,
  hoverColor = 'primary',
  delay = 0,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: '30px' }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Center
        _hover={{
          bg: hoverColor,
          transform: 'scale(1.05)',
          color: 'white',
        }}
        transition="0.2s"
        bg="box"
        border="1px solid"
        borderColor="text"
        w="210px"
        p="8"
        py="16"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        _active={{
          transform: 'scale(0.95)',
        }}
      >
        <VStack>
          <Box>{icon}</Box>
          <Text fontWeight="500">{children}</Text>
        </VStack>
      </Center>
    </motion.div>
  );
};

export default Home;
