import { Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  validText: string;
  currentWord: string;
  text: string;
}

const ShowedText: React.FC<Props> = ({ validText, currentWord, text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: '0%' }}
      animate={{ opacity: 1, height: '100%' }}
      exit={{ opacity: 0, height: '0%' }}
      transition={{ duration: 0.3 }}
    >
      <Text fontSize="lg" color="gray.500">
        <Text as="span" color="text">
          {validText}{' '}
        </Text>
        <Text as="span" fontWeight="bold" color="primary">
          {currentWord}{' '}
        </Text>
        <Text as="span">{text}</Text>
      </Text>
    </motion.div>
  );
};

export default ShowedText;
