import { ChallengeDTO } from "shared/types/dto";

export interface UserData {
  userName: string;
  userId: string;
  totalStars1: number;
  totalStars2: number;
  totalTime: number;
  score: number;
  flagged: boolean;
}

export interface LeaderBoardInfoDTO {
  name: string;
  challenges: ChallengeDTO[];
}

export interface ChallengeData {
  day: number;
  userName: string;
  userId: string;
  startTime: Date;
  starOne: Date;
  starTwo: Date;
  timeTakenMsOne: number;
  timeTakenMsTwo: number;
  totalTimeTakenMs: number;
}

export interface ScoreData {
  timeTakenMsOne: number;
  timeTakenMsTwo: number;
  totalTimeTakenMs: number;
  score: number;
}
