import { ChallengeDTO } from "shared/types/dto";

export interface StarListProps {
  data: ChallengeDTO[];
  className?: string;
}

export interface StarListData {
  day: number;
  star1: boolean;
  star2: boolean;
}
