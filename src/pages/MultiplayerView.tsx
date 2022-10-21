import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import PlayerRow from '../components/player-table/PlayerRow';
import useSocketContext from '../hooks/useSocketContext';
import { FaCheck } from 'react-icons/fa';

const MultiplayerView: React.FC = () => {
  const { room, nickname } = useSocketContext();
  return (
    <VStack
      color="white"
      w="100%"
      maxW="lg"
      p="6"
      borderRadius="md"
      spacing="10"
    >
      <Heading as="h1">
        Welcome to{' '}
        <Text as="span" color="yellow.400">
          {room}
        </Text>
      </Heading>
      <Box border="1px solid" borderColor="gray.500" borderRadius="md" w="100%">
        <HStack
          bg="gray.500"
          borderTopRightRadius="md"
          borderTopLeftRadius="md"
          px="4"
          py="2"
          color="black"
          fontWeight="bold"
          justify="space-between"
          w="100%"
        >
          <Text>Player</Text>
          <Text>Ready?</Text>
        </HStack>
        {/* player */}
        <PlayerRow isMe name={nickname!} color="red.600" />
        <PlayerRow name="Martijn" color="green.600" />
      </Box>
      <Button leftIcon={<FaCheck />} colorScheme="green">
        Ready up
      </Button>
    </VStack>
  );
};

export default MultiplayerView;
