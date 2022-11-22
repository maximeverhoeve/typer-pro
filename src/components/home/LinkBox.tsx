import React, { PropsWithChildren, ReactElement } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import LinkBoxContainer from './LinkBoxContainer';

interface LinkBoxProps {
  icon: ReactElement;
  hoverColor?: string;
  delay?: number;
}

const LinkBox: React.FC<PropsWithChildren & LinkBoxProps> = ({
  icon,
  hoverColor = 'primary',
  delay = 0,
  children,
}) => {
  return (
    <motion.div
      style={{ height: '100%' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <LinkBoxContainer hoverColor={hoverColor}>
        <VStack>
          <Box>{icon}</Box>
          <Text fontWeight="500">{children}</Text>
        </VStack>
      </LinkBoxContainer>
    </motion.div>
  );
};

export default LinkBox;
