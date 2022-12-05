import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';

export interface LeaderboardData {
  id: string;
  name: string;
  acc: number;
  wpm: number;
}

interface Props {
  data: LeaderboardData[];
  playerId?: string;
}

const CustomTable: React.FC<Props> = ({ data, playerId }) => {
  return (
    <TableContainer
      maxH="250px"
      w="100%"
      h="100%"
      border="1px solid"
      borderColor="#414141"
      overflowY="auto"
      sx={{
        '&::-webkit-scrollbar': {
          width: '12px',
          bg: '#2F2F2F',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#454545',
        },
      }}
    >
      <Table>
        <Thead position="sticky" top="0">
          <Tr>
            {/* Adding invisible number for spacing purpose */}
            <Th></Th>
            <Th w="100%">Player</Th>
            <Th>acc[%]</Th>
            <Th>wpm</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((player, index) => {
            const isActiveRow = player.id === playerId;
            return (
              <Tr key={player.id} bg={isActiveRow ? 'primary' : undefined}>
                <Td>{index + 1}</Td>
                <Td>{player.name}</Td>
                <Td>{player.acc}</Td>
                <Td>{player.wpm}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
