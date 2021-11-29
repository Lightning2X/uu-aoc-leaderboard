import { ChallengeDTO, LeaderBoardDTO } from "shared/types/dto";

export interface UserPageContentProps {
  userInfo: UserInfoDTO;
  isError: boolean;
  isLoading: boolean;
  year: number;
}
export interface UserInfoDTO {
  userid: string;
  username: string;
  profilePic: string;
  githubPage: string;
  challenges: ChallengeDTO[];
  leaderBoards: LeaderBoardDTO[];
}
