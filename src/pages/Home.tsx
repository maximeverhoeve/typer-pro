import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import React, { ChangeEvent, useState } from 'react';
import ShowedText from '../components/ShowedText';
const text =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates minima enim repellat delectus perspiciatis, dolores odit quo architecto consequuntur voluptate, recusandae ipsa? Voluptates delectus minima animi voluptate. Cumque, aliquid neque.';

const Home: React.FC = () => {
  const wordArray = text.split(' ');
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [wordToTypeIndex, setWordToTypeIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    const valueWithoutSpaces = value.replaceAll(' ', '');
    const isWordValid = valueWithoutSpaces === wordArray[wordToTypeIndex];
    const hasInputASpace = value.includes(' ');

    if (isWordValid && hasInputASpace) {
      setTypedWords((prev) => [...prev, valueWithoutSpaces]);
      setWordToTypeIndex((prev) => (prev += 1));
      setInputValue('');
    } else {
      setInputValue(value);
    }
  };

  return (
    <Flex direction="column" bg="gray.700" h="100vh" overflow="hidden">
      <Box p="4">
        <Heading color="white">DevMax TyperPro</Heading>
      </Box>
      <Center flexGrow={1}>
        <VStack
          spacing="5"
          bg="gray.100"
          p="6"
          borderRadius="md"
          w="600px"
          maxW="90%"
          align="stretch"
        >
          <ShowedText
            validText={typedWords.join(' ')}
            currentWord={wordArray[wordToTypeIndex]}
            text={wordArray.slice(wordToTypeIndex + 1).join(' ')}
          />
          <HStack>
            <Input bg="white" onChange={handleChange} value={inputValue} />
            <Button
              leftIcon={<RepeatIcon />}
              variant="solid"
              colorScheme="yellow"
              minW="32"
            >
              Restart
            </Button>
          </HStack>
        </VStack>
      </Center>
      <Box p="4">
        <Text color="white" fontSize="2xl">
          v0.0.1
        </Text>
      </Box>
    </Flex>
  );
};

export default Home;
