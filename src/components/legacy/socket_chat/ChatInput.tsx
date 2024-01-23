import { HStack, IconButton, Input } from '@chakra-ui/react';
import React, { useRef, useState, ChangeEvent } from 'react';
import { IoMdSend } from 'react-icons/io';
import useSocketContext from '../../../hooks/legacy/useSocketContext';

// let timeOutId;

interface Props {
  onFocusChange: (focused: boolean) => void;
}

const ChatInput: React.FC<Props> = ({ onFocusChange }) => {
  const { nickname, room, isConnected } = useSocketContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [chatMessage, setChatMessage] = useState<string>('');

  const handleSendButton = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    inputRef.current?.focus();

    // if user disconnected for some reason -> connect again
    // if (!isConnected) socket.connect();

    if (chatMessage && nickname && room) {
      // socket.emit('chat:send', { message: chatMessage, nickname, room });
    }
    setChatMessage('');
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setChatMessage(event.currentTarget.value);
  };

  const handleInputFocus = (): void => {
    // if (timeOutId) {
    //   clearInterval(timeOutId);
    // }
    onFocusChange(true);
  };

  const handleInputBlur = (): void => {
    // if (timeOutId) {
    //   clearInterval(timeOutId);
    // }
    // timeOutId = setTimeout(() => {
    //   onFocusChange(false);
    // }, 2000);
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
