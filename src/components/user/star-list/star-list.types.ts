import { ChallengeDTO } from "shared/types/dto";

export interface StarListProps {
  data: ChallengeDTO[];
  year: number;
  className?: string;
}

export interface StarListData {
  day: number;
  // whether this was completed past the year it was supposed to
  flagged: boolean;
  star1: boolean;
  star2: boolean;
}
