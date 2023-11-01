import React from 'react';
import { Th, Thead, Tr } from '@chakra-ui/react';

const MultiplayerRoomTableHead: React.FC = () => {
  return (
    <Thead position="sticky" top="0" zIndex="1">
      <Tr>
        {/* Adding invisible number for spacing purpose */}

        <Th w="100%">Room</Th>
        <Th>Players</Th>
        {/* Empty column for the table actions */}
        <Th></Th>
      </Tr>
    </Thead>
  );
};

export default MultiplayerRoomTableHead;
