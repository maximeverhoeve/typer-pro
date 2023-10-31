import { Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

interface Props {
  textId: string;
}

const LeaderBoardDetailActions: React.FC<Props> = ({ textId }) => {
  return (
    <HStack spacing="3" justify="space-between">
      <Button
        as={Link}
        to="/leaderboard"
        variant="outline"
        size="md"
        leftIcon={<HiArrowLeft size="14px" color="white" />}
      >
        Back to leaderboards
      </Button>
      <Button
        as={Link}
        to={`/singleplayer/${textId}`}
        variant="outline"
        size="md"
        rightIcon={<HiArrowRight size="14px" color="white" />}
      >
        Play this text
      </Button>
    </HStack>
  );
};

export default LeaderBoardDetailActions;
