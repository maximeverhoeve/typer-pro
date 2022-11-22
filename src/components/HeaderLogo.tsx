import React, { useEffect } from 'react';
import { Heading, Text, useBoolean, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const HeaderLogo: React.FC = () => {
  const { pathname } = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useBoolean();

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
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                style={{
                  overflow: 'hidden',
                }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                exit={{ width: 0 }}
                onAnimationComplete={setIsInitialLoad.on}
                transition={{ duration: 0.5, delay: !isInitialLoad ? 1 : 0 }}
              >
                <Text whiteSpace="nowrap" px="4">
                  {pathname === '/' ? 'typer:pro' : pathname}
                </Text>
              </motion.div>
            </AnimatePresence>
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
