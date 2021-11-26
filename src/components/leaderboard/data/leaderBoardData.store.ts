import { mapToLeaderBoardData, mapToUserData } from "./leaderboard-data-utils"
import { LeaderBoardData, UserData } from "./leaderboard-data.types" 
import { getLeaderBoardDataRequest } from "./leaderBoardData.repository"

export const leaderBoardDataLocalStore = () => ({
  leaderBoardData: [] as LeaderBoardData[],
  userData: [] as UserData[],
  year: 2020,

  setLeaderBoardData(leaderBoardData: LeaderBoardData[]) {
    this.leaderBoardData = leaderBoardData;
  },
  setUserData(userData: UserData[]) {
    this.userData = userData;
  },
  async getLeaderBoardData(id: string) {
    const result = await getLeaderBoardDataRequest(id, this.year);
    const leaderBoardData = mapToLeaderBoardData(result);
    this.setLeaderBoardData(leaderBoardData);
    this.setUserData(mapToUserData(leaderBoardData));
  },
});
 
