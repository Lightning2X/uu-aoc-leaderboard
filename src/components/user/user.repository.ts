import { performAPIFetch } from "shared/utilities"; 
import { UserInfoDTO } from "./user.types"

export const getUserDataRequest = async (id: string, year: number) =>
  await performAPIFetch<UserInfoDTO>(`user/${id}/${year}`);
