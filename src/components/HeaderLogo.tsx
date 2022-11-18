import React from 'react';
import { Heading, Text, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

const HeaderLogo: React.FC = () => {
  return (
    <AnimatePresence>
      <VStack p="4" spacing="4" justify="center">
        <Heading as="div">
          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              originX: '50%',
              originY: '50%',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3, type: 'spring' }}
          >
            <Text color="primary">[</Text>
            <motion.div
              style={{
                overflow: 'hidden',
              }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Text whiteSpace="nowrap" px="4">
                typer:pro
              </Text>
            </motion.div>
            <Text color="secondary">]</Text>
          </motion.div>
        </Heading>

        <motion.div
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 1.8 }}
        >
          <Text fontWeight="500">by devmax</Text>
        </motion.div>
      </VStack>
    </AnimatePresence>
  );
};

export default HeaderLogo;
