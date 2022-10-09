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
      <Text
        fontSize="xl"
        sx={{
          span: {
            color: 'green',
            fontWeight: 500,
          },
        }}
      >
        <Text as="span" color="green">
          {validText}{' '}
        </Text>
        <Text as="span" color="yellow">
          {currentWord}{' '}
        </Text>
        <Text as="span">{text}</Text>
      </Text>
    </div>
  );
};

export default ShowedText;
