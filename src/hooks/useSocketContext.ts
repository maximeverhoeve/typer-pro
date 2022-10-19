import { useContext } from 'react';
import { SocketContext, SocketContextType } from './useSocketInit';

const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  return context;
};

export default useSocketContext;
