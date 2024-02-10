import React from 'react';
import useRoomState from '../store/useRoomState';
import LeaderBoardTable from '../features/leaderboard/components/leaderboard-table/LeaderBoardTable';
import { useSocket } from '../hooks/useSocket';
import { Button, Center, HStack, VStack } from '@chakra-ui/react';
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const MultiplayerFinish: React.FC = () => {
  const { socket } = useSocket();
  const roomLeaderboard = useRoomState((state) => state.leaderboard);
  const roomName = useRoomState((state) => state.name);

  const data = Object.entries(roomLeaderboard || {})
    .map(([id, { name, acc, wpm }]) => ({
      id,
      name,
      acc,
      wpm,
    }))
    .sort((a, b) => b.wpm - a.wpm);

  return (
    <Center>
      <VStack align="stretch" spacing="4" w="100%" maxW="xl">
        <LeaderBoardTable data={data} playerId={socket.id} />
        <HStack justify="flex-end">
          <Button
            as={Link}
            rightIcon={<HiArrowRight />}
            variant="outline"
            _hover={{ bg: 'gray.900' }}
            _active={{ bg: 'gray.700' }}
            to={`/multiplayer/${roomName || ''}`}
          >
            Back to lobby
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
};

export default MultiplayerFinish;
