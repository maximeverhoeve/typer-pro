import {
  useFirestoreQuery,
  useFirestoreQueryData,
} from '@react-query-firebase/firestore';
import {
  DocumentData,
  QuerySnapshot,
  collection,
  doc,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from '../firebase';

const useLeaderBoardJokes = (): void => {
  const ref = query(
    collection(firestore, 'leaderboard'),
    limit(10),
    // orderBy('updatedAt', 'desc'),
  );

  // const { data } = useFirestoreQuery(['products'], ref);

  // if (query.isLoading) {
  //   console.log('loading');
  // }

  // const snapshot = data as QuerySnapshot<DocumentData>;

  // const array = snapshot.docs.map((docSnapshot: QuerySnapshot<DocumentData>) => {
  //   const data = docSnapshot.data();

  //   return data;
  // });
};

export default useLeaderBoardJokes;
