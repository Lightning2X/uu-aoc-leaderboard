import { performAPIFetch } from "shared/utilities"
import { LeaderBoardDTO } from "./leaderboard-data.types"

export const getLeaderBoardDataRequest = async (id: string) => await performAPIFetch<LeaderBoardDTO>(`leaderboard/${id}`)