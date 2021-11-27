import { LeaderBoardDTO } from "shared/types/dto"
import { getAllLeaderBoards } from "./overview.repository"; 

export const overviewLocalStore = () => ({
  leaderBoards: [] as LeaderBoardDTO[],
  isLoading: true,
  isError: false,
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  },
  setIsError(isError: boolean) {
    this.isError = isError;
  },
  setLeaderBoards(leaderboards: LeaderBoardDTO[]) {
    this.leaderBoards = leaderboards;
  },
  async onInitialize() {
    await this.refresh();
  },

  async refresh() {
    this.setIsLoading(true);
    const response = await getAllLeaderBoards();
    if (!response.success) {
      this.setIsError(true);
      return;
    }
    const result = response.result;
    this.setLeaderBoards(result);
    this.setIsLoading(false);
  },
}); 