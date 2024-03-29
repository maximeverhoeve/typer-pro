import React from 'react';
import { Divider, Text, VStack } from '@chakra-ui/react';
import LeaderBoardCardHeader from './LeaderBoardCardHeader';
import LeaderBoardCardFooter from './LeaderBoardCardFooter';
import { LeaderBoardObject } from '../../types/LeaderBoardTypes';

interface Props {
  data: LeaderBoardObject;
}

const LeaderBoardCard: React.FC<Props> = ({ data }) => {
  return (
    <VStack
      align="stretch"
      spacing="0"
      border="1px solid"
      borderColor="#414141"
      borderRadius="md"
      divider={<Divider color="#414141" />}
    >
      <LeaderBoardCardHeader data={data} />
      <Text px="3" py="6" fontStyle="italic" flexGrow="1" fontWeight="300">
        {data.data.text}
      </Text>
      <LeaderBoardCardFooter id={data.id} updateDate={data.data.last_updated} />
    </VStack>
  );
};

export default LeaderBoardCard;
