import { Box, Center, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import useJoke from '../hooks/useJoke';
import TypingContainer from '../components/TypingContainer';

const Home: React.FC = () => {
  const { joke, isLoading, onRestart } = useJoke();

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
        {!isLoading && <TypingContainer joke={joke} onRestart={onRestart} />}
      </Center>
      <Box p="4">
        <Text align="right" color="white" fontSize="2xl">
          v0.1.2
        </Text>
      </Box>
    </Flex>
  );
};

export default Home;
