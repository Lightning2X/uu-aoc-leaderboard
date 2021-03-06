import { appGlobalStore } from "app.store";
import { getUserDataRequest } from "./user.repository";
import { UserInfoDTO } from "./user.types";

export const userLocalStore = () => ({
  isLoading: true,
  isError: false,
  userInfo: null as UserInfoDTO,
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  },
  setIsError(isError: boolean) {
    this.isError = isError;
  },
  setUserInfo(userInfo: UserInfoDTO) {
    this.userInfo = userInfo;
  },
  async getUserData(id: string) {
    this.setIsLoading(true);
    var response = await getUserDataRequest(id, appGlobalStore.year);
    if (!response.success) {
      this.setIsError(true);
      return;
    }
    this.setUserInfo(response.result);
    this.setIsLoading(false);
  },
});
