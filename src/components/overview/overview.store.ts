import { getAllLeaderBoards } from "./overview.repository";
import { LeaderBoardInfoDTO } from "./overview.types";

export const overviewLocalStore = () => ({
  leaderBoards: [] as LeaderBoardInfoDTO[],
  setLeaderBoards(leaderboards: LeaderBoardInfoDTO[]) {
    this.leaderBoards = leaderboards;
  },
  async onInitialize() {
    this.refresh();
  },

  async refresh() {
    const result = await getAllLeaderBoards();
    this.setLeaderBoards(result);
  },
});
