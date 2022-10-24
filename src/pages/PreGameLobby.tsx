import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import PlayerRow from '../components/player-table/PlayerRow';
import useSocketContext from '../hooks/useSocketContext';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const PreGameLobby: React.FC = () => {
  const { socket, room, nickname, players, isReady } = useSocketContext();

  const handleClickReady = (): void => {
    // Toggle ready
    socket.emit('player:update-ready', !isReady);
  };

  const handleStart = (): void => {
    socket.emit('game:start');
  };

  const isEveryPlayerReady = players.every((p) => p.isReady);
  return (
    <Center flexGrow={1}>
      <VStack
        color="white"
        w="100%"
        maxW="lg"
        p="6"
        borderRadius="md"
        spacing="6"
        alignItems="stretch"
      >
        <HStack justify="space-between">
          <Heading as="h1" fontSize="2xl">
            Lobby:{' '}
            <Text as="span" color="yellow.400">
              {room}
            </Text>
          </Heading>
          <Button
            onClick={handleStart}
            size="sm"
            colorScheme="yellow"
            isDisabled={!isEveryPlayerReady}
            flexShrink="0"
          >
            Start
          </Button>
        </HStack>
        <Box
          border="1px solid"
          borderColor="gray.500"
          borderRadius="md"
          w="100%"
        >
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
        <HStack justify="center">
          <Button
            isDisabled={players.length < 2}
            leftIcon={isReady ? <IoClose size="20px" /> : <FaCheck />}
            variant="outline"
            _hover={{ bg: 'gray.900' }}
            _active={{ bg: 'gray.700' }}
            colorScheme={isReady ? 'red' : 'green'}
            onClick={handleClickReady}
          >
            {isReady ? 'Unready' : 'Ready up'}
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
};

export default PreGameLobby;
