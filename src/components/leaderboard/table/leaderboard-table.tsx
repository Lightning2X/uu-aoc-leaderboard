import { Tooltip } from "@material-ui/core";
import { Flag, Star } from "@material-ui/icons";
import MultiUseTable from "components/table/table";
import { Column } from "components/table/table.types";
import React from "react";
import { useHistory } from "react-router";
import {
  flagTableFormatter,
  miliSecondTableFormatter,
  starTableFormatter,
  userNameTableFormatter,
} from "./leaderboard-table-formatters";
import styles from "./leaderboard-table.module.scss";
import { LeaderBoardTableProps } from "./leaderboard-table.types";
function LeaderBoardTable(props: LeaderBoardTableProps) {
  const { userData, isLoading, isError } = props;
  const history = useHistory();
  const getStarLabel = (color: string) => {
    return <Star className={styles.icon} style={{ color: color }} />;
  };

  const getFlagLabel = () => {
    return (
      <Tooltip title="This shows whether an user has completed any challenges after the official AOC date">
        <Flag className={styles.icon} />
      </Tooltip>
    );
  };

  const onRowClick = (row: any) => {
    history.push(`/user/${row.userId}`);
  };

  const standardColumns: Column[] = [
    {
      id: "userName",
      label: "Name",
      minWidth: 100,
      format: userNameTableFormatter,
    },
    { id: "score", label: "Score", minWidth: 30 },
    {
      id: "totalStars1",
      label: getStarLabel("silver"),
      minWidth: 30,
      mobile: false,
      format: starTableFormatter,
    },
    {
      id: "totalStars2",
      label: getStarLabel("gold"),
      minWidth: 30,
      mobile: false,
      format: starTableFormatter,
    },
    {
      id: "totalTime",
      label: "Time",
      minWidth: 30,
      format: miliSecondTableFormatter,
    },
  ];

  const columns = userData.some((x) => x.flagged)
    ? standardColumns.concat([
        {
          id: "flagged",
          label: getFlagLabel(),
          minWidth: 10,
          format: flagTableFormatter,
        },
      ])
    : standardColumns;

  return (
    <MultiUseTable
      columns={columns}
      data={userData}
      isLoading={isLoading}
      isError={isError}
      onRowClick={onRowClick}
    />
  );
}

export default LeaderBoardTable;
