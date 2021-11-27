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
import React from "react";
import { useStore, withObserver } from "shared/stores";
import styles from "./table.module.scss";
import { tableLocalStore } from "./table.store";
import { MultiUseTableProps } from "./table.types";

function MultiUseTable(props: MultiUseTableProps) {
  const { columns, data, isLoading, isError, onRowClick } = props;

  const { page, rowsPerPage, setPage, setRowsPerPage } =
    useStore(tableLocalStore);
  if (isError) {
    return (
      <h1 style={{ color: "red" }}>
        An Error has occurred, please try again later
      </h1>
    );
  }
  if (isLoading) {
    return <img src="/loading.png" className="svgLoader" alt="loading"></img>;
  }
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getRowsJSX = (rows: any[]) => {
    return rows
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row) => {
        return (
          <TableRow
            className={styles["theme-table-row"]}
            hover
            role="checkbox"
            tabIndex={-1}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            key={row.id}
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

  const rows = getRowsJSX(data);

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
        className={styles["theme-rows-per-page-list"]}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default withObserver(MultiUseTable);
