import React from 'react';
import { Th, Thead, Tr } from '@chakra-ui/react';

const MultiplayerLobbyTableHead: React.FC = () => {
  return (
    <Thead position="sticky" top="0" zIndex="1">
      <Tr>
        {/* Adding invisible number for spacing purpose */}

        <Th w="100%">Player</Th>
        <Th>Ready?</Th>
      </Tr>
    </Thead>
  );
};

export default MultiplayerLobbyTableHead;
