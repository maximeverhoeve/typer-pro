import React from 'react';
import { Button, Text, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

interface Props {
  id: string;
  updateDate?: string;
}

const LeaderBoardCardFooter: React.FC<Props> = ({ id, updateDate }) => {
  const date = updateDate && new Date(updateDate);
  return (
    <HStack justify="space-between" p="2">
      {date && (
        <Text fontWeight="300">
          {date.toLocaleString([], {
            dateStyle: 'long',
            timeStyle: 'short',
          })}
        </Text>
      )}
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
    </HStack>
  );
};

export default LeaderBoardCardFooter;
