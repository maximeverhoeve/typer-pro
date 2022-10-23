import { Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  validText: string;
  currentWord: string;
  text: string;
}

const ShowedText: React.FC<Props> = ({ validText, currentWord, text }) => {
  return (
    <div>
      <Text fontSize="lg" color="gray.400">
        <Text as="span" color="yellow.400">
          {validText}{' '}
        </Text>
        <Text as="span" fontWeight="bold" color="white">
          {currentWord}{' '}
        </Text>
        <Text as="span">{text}</Text>
      </Text>
    </div>
  );
};

export default ShowedText;
