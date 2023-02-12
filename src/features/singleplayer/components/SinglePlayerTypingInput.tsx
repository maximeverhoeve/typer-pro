import { Input, useBoolean } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';

interface Props {
  value?: string;
  hasError?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SinglePlayerTypingInput: React.FC<Props> = ({
  value,
  hasError,
  onChange,
}) => {
  const [showPlaceholder, setShowPlaceholder] = useBoolean();
  return (
    <Input
      autoFocus
      border="none"
      fontSize="6xl"
      color={hasError ? 'red.500' : 'gray.600'}
      _focus={{ boxShadow: 'none' }}
      value={value}
      borderRadius="none"
      textAlign="center"
      onChange={onChange}
      onFocus={setShowPlaceholder.off}
      onBlur={setShowPlaceholder.on}
      height="auto"
      placeholder={showPlaceholder ? 'Type here' : undefined}
      _placeholder={{ color: 'gray.500', opacity: 0.2 }}
    />
  );
};

export default SinglePlayerTypingInput;
