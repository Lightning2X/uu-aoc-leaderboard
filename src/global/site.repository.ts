import { performAPIFetch } from "shared/utilities"; 
import { LeaderBoardInfoDTO } from "./site.types"

export const getAllLeaderBoards = async () =>
  await performAPIFetch<LeaderBoardInfoDTO>(`leaderboards`);
