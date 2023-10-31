import React from 'react';
import { LeaderBoardObject } from '../../../api/getLeaderboardJokes';
import { Button, Divider, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { FaMedal } from 'react-icons/fa';

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
      <HStack p="3" bg="background" spacing="4">
        <FaMedal color="white" />
        <Text fontWeight="500" color="white" flexGrow="1">
          {data.topPlayer.name}
        </Text>
        {data.topPlayer.acc && (
          <Text fontWeight="300" color="white">
            {data.topPlayer.acc.toFixed(1)}% ACC
          </Text>
        )}
        <Text fontWeight="300" color="secondary">
          {data.topPlayer.wpm} WPM
        </Text>
      </HStack>
      <Text px="3" py="6" fontStyle="italic" flexGrow="1" fontWeight="300">
        {data.data.text}
      </Text>
      <Flex justify="flex-end" p="2">
        <Button
          as={Link}
          to={`/leaderboard/${data.id}`}
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
    </VStack>
  );
};

export default LeaderBoardCard;
