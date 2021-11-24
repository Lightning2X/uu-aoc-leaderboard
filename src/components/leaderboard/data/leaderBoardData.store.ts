import { asGlobalStore } from "shared/stores"
import { mapToLeaderBoardData, mapToUserData } from "./leaderboard-data-utils"
import { LeaderBoardData, UserData } from "./leaderboard-data.types" 
import { getLeaderBoardDataRequest } from "./leaderBoardData.repository"

const createStore = () => ({
  leaderBoardData: [] as LeaderBoardData[],
  userData: [] as UserData[],

  setLeaderBoardData(leaderBoardData: LeaderBoardData[]) {
    this.leaderBoardData = leaderBoardData;
  },
  setUserData(userData: UserData[]) {
    this.userData = userData;
  },
  async getLeaderBoardData(id: string) {
    const result = await getLeaderBoardDataRequest(id); 
    const leaderBoardData = mapToLeaderBoardData(result)
    this.setLeaderBoardData(leaderBoardData)
    this.setUserData(mapToUserData(leaderBoardData));
  },
});

export const leaderBoardDataStore = asGlobalStore(createStore());
