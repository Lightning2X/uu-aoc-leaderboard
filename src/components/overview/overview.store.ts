import { getAllLeaderBoards } from "./overview.repository";
import { LeaderBoardInfoDTO } from "./overview.types";

export const overviewLocalStore = () => ({
  leaderBoards: [] as LeaderBoardInfoDTO[],
  isLoading: true,
  isError: false,
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  },
  setIsError(isError: boolean) {
    this.isError = isError;
  },
  setLeaderBoards(leaderboards: LeaderBoardInfoDTO[]) {
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
    }
    const result = response.result;
    this.setLeaderBoards(result);
    this.setIsLoading(false);
  },
}); 