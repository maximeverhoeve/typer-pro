import { Box, Center, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import useJokes from '../hooks/useJokes';
import TypingContainer from '../components/TypingContainer';

const Home: React.FC = () => {
  const { jokes, isLoading, onRestart } = useJokes();

  return (
    <Flex direction="column" bg="gray.700" h="100vh" overflow="hidden">
      <Box p="4">
        <Heading color="white">DevMax TyperPro</Heading>
      </Box>
      <Center flexGrow={1}>
        {isLoading && (
          <Box display="inline">
            <Spinner size="xl" color="yellow" />
          </Box>
        )}
        {!isLoading && <TypingContainer jokes={jokes} onRestart={onRestart} />}
      </Center>
      <Box p="4">
        <Text align="right" color="white" fontSize="2xl">
          v0.1.0
        </Text>
      </Box>
    </Flex>
  );
};

export default Home;
