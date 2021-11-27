import { ChallengeDTO, LeaderBoardDTO } from "shared/types/dto"

export interface UserDTO {
    userid: string;
    username: string;
    profilePic: string;
    githubPage: string;
    challenges: ChallengeDTO[]
    leaderBoards: LeaderBoardDTO[]
}