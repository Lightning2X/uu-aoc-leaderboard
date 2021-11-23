export interface Column {
  id: keyof Row;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: unknown) => string;
}


export interface Row {
  user: string;
  stars: HasStars[];
  totalTime: number;
  score: number;
} 

export interface HasStars {
  one: boolean;
  two: boolean;
}

export interface APIData {
  year: number;
  day: number;
  username: string;
  startTime: string;
  starOne: string;
  starTwo: string;
}

export interface PreProcessData {
  year: number;
  day: number;
  username: string;
  startTime: Date;
  starOne: Date;
  starTwo: Date;
  timeTakenMsOne: number;
  timeTakenMsTwo: number;
}

export interface ScoreData {
  timeTakenMsOne: number;
  timeTakenMsTwo: number;
  totalTimeTakenMs: number;
  score: number;
}

export interface ScoreDataUserName extends ScoreData {
  username: string;
}
