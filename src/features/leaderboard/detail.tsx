import { Center, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
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

  const { isLoading, data: firebaseData } = useQuery({
    queryKey: ['leaderboard', id],
    queryFn: async () => {
      const collectionRef = collection(firestore, `leaderboard/${id}/players`);
      const ref = query(collectionRef, orderBy('wpm', 'desc'));
      const snapshot = await getDocs(ref);
      return snapshot.docs.map((doc) => doc.data() as LeaderboardData);
    },
  });

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
