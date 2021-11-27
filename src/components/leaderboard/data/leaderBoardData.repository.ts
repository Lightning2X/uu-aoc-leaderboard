import { performAPIFetch } from "shared/utilities"
import { LeaderBoardDTO } from "./leaderboard-data.types"

export const getLeaderBoardDataRequest = async (id: string, year: number) =>
  await performAPIFetch<LeaderBoardDTO>(`leaderboard/${id}/${year}`);