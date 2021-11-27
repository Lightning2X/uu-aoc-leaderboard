import MultiUseTable from "components/table/table";
import { Column } from "components/table/table.types";
import React from "react";
import { useHistory } from "react-router";
import { withObserver } from "shared/stores";
import { overviewStore } from "./overview.store";

function OverviewTable() {
  const history = useHistory();
  const onRowClick = (row: any) => {
    history.push(`leaderboard/${row.id}`);
  };
  const columns: Column[] = [
    { id: "name", label: "Name", minWidth: 75 },
    { id: "id", label: "Identifier", minWidth: 75 },
  ];

  return (
    <MultiUseTable
      columns={columns}
      data={overviewStore.leaderBoards}
      isLoading={overviewStore.isLoading}
      onRowClick={onRowClick}
    />
  );
}

export default withObserver(OverviewTable);
