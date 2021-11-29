import { LeaderBoardDTO } from "shared/types/dto";
import { performAPIFetch } from "shared/utilities";

export const getAllLeaderBoards = async () =>
  await performAPIFetch<LeaderBoardDTO[]>("leaderboards");
