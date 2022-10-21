import useSocketContext from './useSocketContext';

interface ReturnProps {
  room?: string;
}

const useRoom = (): ReturnProps => {
  const { room } = useSocketContext();
  return { room };
};

export default useRoom;
