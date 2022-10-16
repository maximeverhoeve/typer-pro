import { HStack, IconButton, Input } from '@chakra-ui/react';
import React, { useRef, useState, ChangeEvent } from 'react';
import { IoMdSend } from 'react-icons/io';
import useSocket from '../../hooks/useSocket';

let timeOutId: NodeJS.Timeout;

interface Props {
  onFocusChange: (focused: boolean) => void;
}

const ChatInput: React.FC<Props> = ({ onFocusChange }) => {
  const socket = useSocket();
  const inputRef = useRef<HTMLInputElement>(null);
  const [chatMessage, setChatMessage] = useState<string>('');

  const handleSendButton = (e: React.SyntheticEvent): void => {
    inputRef.current?.focus();
    e.preventDefault();
    if (chatMessage) {
      socket.emit('send_message', { message: chatMessage });
    }
    setChatMessage('');
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setChatMessage(event.currentTarget.value);
  };

  const handleInputFocus = (): void => {
    if (timeOutId) {
      clearInterval(timeOutId);
    }
    onFocusChange(true);
  };

  const handleInputBlur = (): void => {
    if (timeOutId) {
      clearInterval(timeOutId);
    }
    timeOutId = setTimeout(() => {
      onFocusChange(false);
    }, 2000);
  };
  return (
    <HStack as="form" onSubmit={handleSendButton}>
      <Input
        color="gray.200"
        placeholder="Chat message"
        value={chatMessage}
        onChange={handleChangeInput}
        ref={inputRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <IconButton
        aria-label="Send"
        icon={<IoMdSend />}
        type="submit"
        isDisabled={!chatMessage}
      />
    </HStack>
  );
};

export default ChatInput;