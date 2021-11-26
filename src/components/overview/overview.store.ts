import { getAllLeaderBoards } from "./overview.repository";
import { LeaderBoardInfoDTO } from "./overview.types";

export const overviewLocalStore = () => ({
  leaderBoards: [] as LeaderBoardInfoDTO[],
  isLoading: false,
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  },
  setLeaderBoards(leaderboards: LeaderBoardInfoDTO[]) {
    this.leaderBoards = leaderboards;
  },
  async onInitialize() {
    this.refresh();
  },

  async refresh() {
    this.setIsLoading(true);
    const result = await getAllLeaderBoards();
    this.setLeaderBoards(result);
    this.setIsLoading(false);
  },
});
