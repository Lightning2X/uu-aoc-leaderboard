import { UserData } from "../data/leaderboard-data.types"

export interface Column {
  id: keyof Row;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: unknown) => JSX.Element;
}

export interface Row extends UserData {

}




