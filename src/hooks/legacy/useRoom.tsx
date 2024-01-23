import useSocketContext from './useSocketContext';

interface ReturnProps {
  room?: string;
}

/**
 * @deprecated Old component that is not used anymore, removed once first finished version comes out
 */
const useRoom = (): ReturnProps => {
  const { room } = useSocketContext();
  return { room };
};

export default useRoom;
