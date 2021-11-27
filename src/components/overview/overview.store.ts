import { asGlobalStore } from "shared/stores"
import { getAllLeaderBoards } from "./overview.repository";
import { LeaderBoardInfoDTO } from "./overview.types";

const createStore = () => ({
  leaderBoards: [] as LeaderBoardInfoDTO[],
  isLoading: true,
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  },
  setLeaderBoards(leaderboards: LeaderBoardInfoDTO[]) {
    this.leaderBoards = leaderboards;
  },
  async onInitialize() { 
    await this.refresh();
  },

  async refresh() {
    this.setIsLoading(true);
    const result = await getAllLeaderBoards();
    this.setLeaderBoards(result);
    this.setIsLoading(false);
  },
});

export const overviewStore = asGlobalStore(createStore())
