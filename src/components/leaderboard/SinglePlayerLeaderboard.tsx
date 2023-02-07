import { Spinner, useBoolean } from '@chakra-ui/react';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { collection, doc, query, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { firestore } from '../../firebase';
import { Stats } from '../../hooks/useTyper';
import usePlayerStore from '../../store/usePlayerStore';
import CustomTable, { LeaderboardData } from '../custom-table/CustomTable';

interface Props {
  id: string;
  stats: Stats;
}

const SinglePlayerLeaderboard: React.FC<Props> = ({ id, stats }) => {
  const [isUserAdded, setIsUserAdded] = useBoolean();
  const { nickname, id: playerId } = usePlayerStore((state) => state);
  const collectionRef = collection(firestore, `leaderboard/${id}/players`);
  const playerDocRef = doc(firestore, `leaderboard/${id}/players/${playerId}`);
  const ref = query(collectionRef);
  // const addDocument = async (): Promise<void> => {
  //   try {
  //     await setDoc(playerDocRef, {
  //       name: nickname,
  //       wpm: stats.wpm,
  //       id: playerId,
  //     });
  //     setIsUserAdded.on();
  //   } catch (err) {
  //     console.error('playerdata was not added', err);
  //   }
  // };
  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-floating-promises
  //   addDocument();
  // }, []);
  const { isLoading, data: firebaseData } = useFirestoreQueryData(
    ['leaderboard', id],
    ref,
    {},
  );
  if (isLoading || !firebaseData) {
    return <Spinner color="primary" />;
  }
  return (
    <CustomTable data={firebaseData as LeaderboardData[]} playerId="3263232" />
  );
};

export default SinglePlayerLeaderboard;
