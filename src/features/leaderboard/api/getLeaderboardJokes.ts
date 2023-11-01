import { collection, limit, orderBy, query, getDocs } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import { LeaderBoardObject, LeaderboardData } from '../types/LeaderBoardTypes';

const getLeaderBoardJokes = async (): Promise<LeaderBoardObject[]> => {
  const jokesQuery = query(
    collection(firestore, 'leaderboard'),
    limit(10),
    orderBy('last_updated', 'desc'),
  );

  const querySnapshot = await getDocs(jokesQuery);
  const docs = [];
  for (const doc of querySnapshot.docs) {
    const q = query(
      collection(firestore, `leaderboard/${doc.id}/players`),
      limit(1),
      orderBy('wpm', 'desc'),
    );
    const docData = await getDocs(q);
    const leaderBoardObject = {
      id: doc.id,
      data: doc.data() as { text: string },
      topPlayer: docData.docs[0].data() as LeaderboardData,
    };
    docs.push(leaderBoardObject);
  }
  return docs;
};

export default getLeaderBoardJokes;
