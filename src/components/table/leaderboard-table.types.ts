export interface Column {
  id: keyof Row;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}


export interface Row {
  user: string;
  totalTime: string;
  stars: Star[];
  score: string;
} 

export interface Star {
  one: string;
  two: string;
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
  timeTakenMs: number
}

export interface ScoreEntry {
  timeTakenMs: number;
  score: number;
}

export interface ScoreEntryUserName extends ScoreEntry { 
  username: string;
}
