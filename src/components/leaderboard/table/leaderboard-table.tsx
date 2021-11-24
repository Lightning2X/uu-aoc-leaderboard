import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { withObserver } from "shared/stores";
import { UserData } from "../data/leaderboard-data.types";
import { leaderBoardDataStore } from "../data/leaderBoardData.store";
import {
  miliSecondTableFormatter,
  starTableFormatter,
} from "./leaderboard-table-formatters";
import { Column, LeaderBoardTableProps } from "./leaderboard-table.types";
import styles from "./table.module.scss";

const columns: readonly Column[] = [
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

function LeaderBoardTable(props: LeaderBoardTableProps) {
  const { id } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    leaderBoardDataStore.getLeaderBoardData("1271673");
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getRowsJSX = (rows: UserData[]) => {
    return rows
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row) => {
        return (
          <TableRow
            className={styles["theme-table-row"]}
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.user}
          >
            {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell
                  className={styles["theme-table-cell"]}
                  key={column.id}
                  align={column.align}
                  style={{ backgroundColor: "#393e46" }}
                >
                  {column.format ? column.format(value) : value}
                </TableCell>
              );
            })}
          </TableRow>
        );
      });
  };

  const rows = getRowsJSX(leaderBoardDataStore.userData);

  return (
    <Paper className={styles["theme-paper"]}>
      <TableContainer style={{ maxHeight: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className={styles["theme-table-header-row"]}>
              {columns.map((column) => (
                <TableCell
                  className={styles["theme-table-header-cell"]}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles["theme-table-body"]}>{rows}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default withObserver(LeaderBoardTable);
