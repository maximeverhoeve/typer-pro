import { useContext } from 'react';
import { SocketContext, SocketContextType } from './useSocketInit';

/**
 * @deprecated Old component that is not used anymore, removed once first finished version comes out
 */
const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  return context;
};

export default useSocketContext;
