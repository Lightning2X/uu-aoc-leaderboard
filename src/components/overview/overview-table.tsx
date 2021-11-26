import MultiUseTable from "components/table/table";
import { Column } from "components/table/table.types";
import React from "react";
import { useHistory } from "react-router";
import { useStore, withObserver } from "shared/stores";
import { overviewLocalStore } from "./overview.store";

function OverviewTable() {
  const { leaderBoards } = useStore(overviewLocalStore);
  const history = useHistory();
  const onRowClick = (row: any) => {
    history.push(`leaderboard/${row.id}`);
  };
  const columns: Column[] = [
    { id: "name", label: "Name", minWidth: 75 },
    { id: "id", label: "id", minWidth: 75 },
  ];

  return (
    <MultiUseTable
      columns={columns}
      data={leaderBoards}
      onRowClick={onRowClick}
    />
  );
}

export default withObserver(OverviewTable);
