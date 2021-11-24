import { asGlobalStore } from "shared/stores"; 
import { getAllLeaderBoards } from "./site.repository"
import { LeaderBoardInfoDTO } from "./site.types";

const createStore = () => ({
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

export const siteStore = asGlobalStore(createStore());
