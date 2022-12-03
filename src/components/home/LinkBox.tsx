import React, { PropsWithChildren } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { Box, Collapse, HStack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import LinkBoxContainer from './LinkBoxContainer';
import { Link } from 'react-router-dom';

interface LinkBoxProps {
  to: string;
  hoverColor?: string;
  delay?: number;
  description?: string;
  isHovering: boolean;
  setIsHovering: () => void;
  isUnavailable?: boolean;
}

const LinkBox: React.FC<PropsWithChildren & LinkBoxProps> = ({
  hoverColor = 'primary',
  delay = 0,
  to,
  description,
  isUnavailable,
  isHovering,
  setIsHovering,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: 100 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: 100 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Link to={to} onMouseEnter={setIsHovering}>
        <LinkBoxContainer hoverColor={hoverColor} isHovering={isHovering}>
          <HStack
            justify="space-between"
            mb={isHovering ? '6' : '0'}
            transition="margin 0.2s"
          >
            <Text fontSize="20px" fontWeight="500">
              {children}
              {isUnavailable && (
                <Text
                  borderRadius="full"
                  as="span"
                  color="gray.400"
                  fontSize="12px"
                  bg="gray.700"
                  p="1"
                  px="2"
                  ml="3"
                >
                  Coming soon
                </Text>
              )}
            </Text>
            <Box
              opacity={isHovering ? 1 : 0}
              transform={!isHovering ? 'translateX(50px)' : ''}
              transition="0.3s"
            >
              <HiArrowRight size="24px" color="white" />
            </Box>
          </HStack>
          <Collapse in={isHovering}>
            <Text fontSize="16px" maxW="350px">
              {description}
            </Text>
          </Collapse>
        </LinkBoxContainer>
      </Link>
    </motion.div>
  );
};

export default LinkBox;
