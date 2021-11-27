import { LeaderBoardDTO } from "shared/types/dto"
import { performAPIFetch } from "shared/utilities"; 

export const getLeaderBoardDataRequest = async (id: string, year: number) =>
  await performAPIFetch<LeaderBoardDTO>(`leaderboard/${id}/${year}`);
