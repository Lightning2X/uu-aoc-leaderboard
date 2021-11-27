import { mapToLeaderBoardData, mapToUserData } from "./leaderboard-data-utils"
import { LeaderBoardData, UserData } from "./leaderboard-data.types" 
import { getLeaderBoardDataRequest } from "./leaderBoardData.repository"

export const leaderBoardDataLocalStore = () => ({
  name: null as string,
  leaderBoardData: [] as LeaderBoardData[],
  userData: [] as UserData[],
  year: 2020,
  isLoading: true,
  isError: false,
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  },
  setIsError(isError: boolean) {
    this.isError = isError;
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
    var response = await getLeaderBoardDataRequest(id, this.year);
    if (!response.success) {
      this.setIsError(true)
      return;
    } 
    const result = response.result
    this.setName(result.name);
    const leaderBoardData = mapToLeaderBoardData(result.challenges);
    this.setLeaderBoardData(leaderBoardData);
    this.setUserData(mapToUserData(leaderBoardData));
    this.setIsLoading(false);
  },
});
