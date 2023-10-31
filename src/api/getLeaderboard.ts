import { UseQueryResult, useQuery } from 'react-query';
import getLeaderBoardJokes, { LeaderBoardObject } from './getLeaderboardJokes';

const useLeaderboard = (): UseQueryResult<LeaderBoardObject[]> => {
  return useQuery(['leaderboard'], getLeaderBoardJokes, { retry: false });
};

export default useLeaderboard;
