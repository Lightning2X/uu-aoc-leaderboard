import { performAPIFetch } from "shared/utilities";
import { LeaderBoardInfoDTO } from "./leaderboard-data.types";

export const getLeaderBoardDataRequest = async (id: string, year: number) =>
  await performAPIFetch<LeaderBoardInfoDTO>(`leaderboard/${id}/${year}`);
