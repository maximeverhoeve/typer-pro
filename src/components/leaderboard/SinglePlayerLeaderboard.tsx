import { Spinner } from '@chakra-ui/react';
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
    {},
  );
  if (isLoading || !firebaseData) {
    return <Spinner color="primary" />;
  }
  return (
    <CustomTable data={firebaseData as LeaderboardData[]} playerId={playerId} />
  );
};

export default SinglePlayerLeaderboard;
