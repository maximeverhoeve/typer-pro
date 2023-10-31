import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { getDisplayName } from '../../../singleplayer/utils/playerUtils';
import { FaMedal } from 'react-icons/fa';
import { LeaderboardData } from '../../types/LeaderBoardTypes';

interface Props {
  data: LeaderboardData[];
  playerId?: string;
}

const LeaderBoardTable: React.FC<Props> = ({ data, playerId }) => {
  return (
    <TableContainer
      h="100%"
      w="100%"
      border="1px solid"
      borderColor="#414141"
      overflowY="auto"
      borderRadius="md"
      sx={{
        '&::-webkit-scrollbar': {
          width: '12px',
          bg: '#2F2F2F',
          borderTopRightRadius: 'md',
          borderBottomRightRadius: 'md',
          overflow: 'hidden',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
          overflow: 'hidden',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#454545',
          borderTopRightRadius: 'md',
          borderBottomRightRadius: 'md',
        },
      }}
    >
      <Table>
        <Thead position="sticky" top="0" zIndex="1">
          <Tr>
            {/* Adding invisible number for spacing purpose */}
            <Th></Th>
            <Th w="100%">Player</Th>
            <Th>accuracy</Th>
            <Th>wpm</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!data.length && (
            <Tr>
              <Td colSpan={4} p="4">
                <Text align="center">No leaderboard data found</Text>
              </Td>
            </Tr>
          )}
          {data.map(({ id, name, wpm, acc }, index) => {
            const isActiveRow = id === playerId;
            const isFirst = index === 0;
            return (
              <Tr
                key={id}
                bg={isActiveRow ? 'primary' : undefined}
                color={isActiveRow ? 'white' : undefined}
              >
                <Td>{index + 1}</Td>
                <Td display="flex" alignItems="center" gap="2">
                  <Text
                    sx={{
                      span: {
                        fontSize: '12px',
                        opacity: 0.4,
                        ml: 1,
                      },
                    }}
                    dangerouslySetInnerHTML={{
                      __html: getDisplayName({ id, name }),
                    }}
                  />
                  {isFirst && <FaMedal color="white" />}
                </Td>
                <Td textAlign="right">{acc ? `${acc.toFixed(1)}%` : '-'}</Td>
                <Td>{wpm}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default LeaderBoardTable;
