import { UseQueryResult, useQuery } from 'react-query';
import getLeaderBoardJokes from './getLeaderboardJokes';
import { LeaderBoardObject } from '../types/LeaderBoardTypes';

const useLeaderboard = (): UseQueryResult<LeaderBoardObject[]> => {
  return useQuery(['leaderboard'], getLeaderBoardJokes, { retry: false });
};

export default useLeaderboard;
