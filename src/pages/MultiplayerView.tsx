import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import PlayerRow from '../components/player-table/PlayerRow';
import useSocketContext from '../hooks/useSocketContext';
import { FaCheck } from 'react-icons/fa';

const MultiplayerView: React.FC = () => {
  const { socket, room, nickname, players, isReady } = useSocketContext();

  const handleClickReady = (): void => {
    // Toggle ready
    socket.emit('player:update-ready', !isReady);
  };

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
        {players.map((player) => (
          <PlayerRow
            key={`player-row-${player.nickname}`}
            isMe={player.nickname === nickname && players.length > 1}
            name={player.nickname}
            color={player.isReady ? 'green.600' : 'red.600'}
          />
        ))}
      </Box>
      <Button
        isDisabled={players.length < 2}
        leftIcon={<FaCheck />}
        colorScheme="green"
        onClick={handleClickReady}
      >
        Ready up
      </Button>
    </VStack>
  );
};

export default MultiplayerView;
