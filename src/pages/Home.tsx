import React, { PropsWithChildren, ReactElement } from 'react';
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import MultiplayerIcon from '../assets/icons/multiplayer';
import SingleplayerIcon from '../assets/icons/singleplayer';

const Home: React.FC = () => {
  return (
    <HStack spacing="4">
      <Link to="/singleplayer">
        <LinkBox icon={<SingleplayerIcon />}>singleplayer</LinkBox>
      </Link>
      <Link to="/multiplayer">
        <LinkBox hoverColor="secondary" icon={<MultiplayerIcon />}>
          multiplayer
        </LinkBox>
      </Link>
    </HStack>
  );
};

interface LinkBoxProps {
  icon: ReactElement;
  hoverColor?: string;
}

const LinkBox: React.FC<PropsWithChildren & LinkBoxProps> = ({
  icon,
  hoverColor = 'primary',
  children,
}) => {
  return (
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
    >
      <VStack>
        <Box>{icon}</Box>
        <Text fontWeight="500">{children}</Text>
      </VStack>
    </Center>
  );
};

export default Home;
