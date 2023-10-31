import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

interface Props {
  id: string;
}

const LeaderBoardCardFooter: React.FC<Props> = ({ id }) => {
  return (
    <Flex justify="flex-end" p="2">
      <Button
        as={Link}
        to={`/leaderboard/${id}`}
        _hover={{ bg: 'primary' }}
        bg="unset"
        fontWeight="400"
        size="sm"
        color="white"
        borderRadius="none"
        rightIcon={<HiArrowRight size="14px" color="white" />}
      >
        More details
      </Button>
    </Flex>
  );
};

export default LeaderBoardCardFooter;
