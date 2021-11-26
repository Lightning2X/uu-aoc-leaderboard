import { performAPIFetch } from "shared/utilities";
import { LeaderBoardInfoDTO } from "./overview.types";

export const getAllLeaderBoards = async () =>
  await performAPIFetch<LeaderBoardInfoDTO>(`leaderboards`);
