import { Center, Spinner } from '@chakra-ui/react';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import React from 'react';
import { firestore } from '../../firebase';
import usePlayerStore from '../../store/usePlayerStore';
import LeaderBoardTable from './components/leaderboard-table/LeaderBoardTable';
import { LeaderboardData } from './types/LeaderBoardTypes';

interface Props {
  id: string;
}

const LeaderBoardDetail: React.FC<Props> = ({ id }) => {
  const { id: playerId } = usePlayerStore((state) => state);
  const collectionRef = collection(firestore, `leaderboard/${id}/players`);
  const ref = query(collectionRef, orderBy('wpm', 'desc'));

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
    <LeaderBoardTable
      data={firebaseData as LeaderboardData[]}
      playerId={playerId}
    />
  );
};

export default LeaderBoardDetail;
