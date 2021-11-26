import MultiUseTable from "components/table/table";
import { Column } from "components/table/table.types";
import React, { useEffect } from "react";
import { withObserver } from "shared/stores";
import { leaderBoardDataStore } from "../data/leaderBoardData.store";
import {
  miliSecondTableFormatter,
  starTableFormatter,
} from "./leaderboard-table-formatters";
import { LeaderBoardTableProps } from "./leaderboard-table.types";

function LeaderBoardTable(props: LeaderBoardTableProps) {
  const { id } = props;
  useEffect(() => {
    leaderBoardDataStore.getLeaderBoardData(id);
  }, [id]);

  const columns: Column[] = [
    { id: "user", label: "Name", minWidth: 75 },
    { id: "score", label: "Score", minWidth: 75 },

    {
      id: "stars",
      label: "Stars",
      minWidth: 75,
      format: starTableFormatter,
    },
    {
      id: "totalTime",
      label: "Total time",
      minWidth: 75,
      format: miliSecondTableFormatter,
    },
  ];

  return (
    <MultiUseTable columns={columns} data={leaderBoardDataStore.userData} />
  );
}

export default withObserver(LeaderBoardTable);
