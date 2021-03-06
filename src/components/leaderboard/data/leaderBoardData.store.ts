import { appGlobalStore } from "app.store";
import { mapToChallengeData, mapToUserData } from "./leaderboard-data-utils";
import { ChallengeData, UserData } from "./leaderboard-data.types";
import { getLeaderBoardDataRequest } from "./leaderBoardData.repository";

export const leaderBoardDataLocalStore = () => ({
  name: null as string,
  leaderBoardData: [] as ChallengeData[],
  userData: [] as UserData[],
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
  setLeaderBoardData(leaderBoardData: ChallengeData[]) {
    this.leaderBoardData = leaderBoardData;
  },
  setUserData(userData: UserData[]) {
    this.userData = userData ? userData.sort((a, b) => b.score - a.score) : null;
  },
  async getLeaderBoardData(id: string) {
    this.setIsLoading(true);
    var response = await getLeaderBoardDataRequest(id, appGlobalStore.year);
    if (!response.success) {
      this.setIsError(true);
      return;
    }
    const result = response.result;
    this.setName(result.name);
    const leaderBoardData = mapToChallengeData(result.challenges);
    this.setLeaderBoardData(leaderBoardData);
    this.setUserData(mapToUserData(leaderBoardData, appGlobalStore.year));
    this.setIsLoading(false);
  },
});
