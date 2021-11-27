import MultiUseTable from "components/table/table";
import { Column } from "components/table/table.types";
import React from "react";
import { withObserver } from "shared/stores";
import {
  miliSecondTableFormatter,
  starTableFormatter,
} from "./leaderboard-table-formatters";
import { LeaderBoardTableProps } from "./leaderboard-table.types";

function LeaderBoardTable(props: LeaderBoardTableProps) {
  const { userData, isLoading } = props;

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
    <MultiUseTable columns={columns} data={userData} isLoading={isLoading} />
  );
}

export default withObserver(LeaderBoardTable);
