import { Center, Spinner } from '@chakra-ui/react';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { collection, query } from 'firebase/firestore';
import React from 'react';
import { firestore } from '../../firebase';
import usePlayerStore from '../../store/usePlayerStore';
import CustomTable, { LeaderboardData } from '../custom-table/CustomTable';

interface Props {
  id: string;
}

const SinglePlayerLeaderboard: React.FC<Props> = ({ id }) => {
  const { id: playerId } = usePlayerStore((state) => state);
  const collectionRef = collection(firestore, `leaderboard/${id}/players`);
  const ref = query(collectionRef);

  const { isLoading, data: firebaseData } = useFirestoreQueryData(
    ['leaderboard', id],
    ref,
    // Subscribing will make sure it updates instantly when the database changes
    { subscribe: true },
  );

  if (isLoading || !firebaseData) {
    return (
      <Center>
        <Spinner color="primary" />
      </Center>
    );
  }
  return (
    <CustomTable data={firebaseData as LeaderboardData[]} playerId={playerId} />
  );
};

export default SinglePlayerLeaderboard;
