import { mapToLeaderBoardData, mapToUserData } from "./leaderboard-data-utils"
import { LeaderBoardData, UserData } from "./leaderboard-data.types" 
import { getLeaderBoardDataRequest } from "./leaderBoardData.repository"

export const leaderBoardDataLocalStore = () => ({
  name: null as string,
  leaderBoardData: [] as LeaderBoardData[],
  userData: [] as UserData[],
  year: 2020,
  isLoading: false,
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  },
  setName(name: string) {
    this.name = name;
  },
  setLeaderBoardData(leaderBoardData: LeaderBoardData[]) {
    this.leaderBoardData = leaderBoardData;
  },
  setUserData(userData: UserData[]) {
    this.userData = userData;
  },
  async getLeaderBoardData(id: string) {
    this.setIsLoading(true);
    const result = await getLeaderBoardDataRequest(id, this.year);
    this.setName(result.name);
    const leaderBoardData = mapToLeaderBoardData(result.challenges);
    this.setLeaderBoardData(leaderBoardData);
    this.setUserData(mapToUserData(leaderBoardData));
    this.setIsLoading(false);
  },
});
