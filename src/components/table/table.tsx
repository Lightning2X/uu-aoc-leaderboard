import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Help } from "@material-ui/icons";
import PlaceHolder from "components/placeholder/placeholder";
import React from "react";
import { useStore, withObserver } from "shared/stores";
import { useMediaQueryContext } from "shared/utilities/useMediaQuery";
import styles from "./table.module.scss";
import { tableLocalStore } from "./table.store";
import { MultiUseTableProps } from "./table.types";

function MultiUseTable(props: MultiUseTableProps) {
  const { columns: inputColumns, data, isLoading, isError, onRowClick } = props;

  const { mobile } = useMediaQueryContext();
  const columns = mobile
    ? inputColumns.filter((x) => x.mobile !== false)
    : inputColumns;

  const { page, rowsPerPage, setPage, setRowsPerPage } =
    useStore(tableLocalStore);

  if (isError || isLoading) {
    return <PlaceHolder isError={isError} isLoading={isLoading} />;
  }

  if (!data.length) {
    return (
      <Typography variant="h5" className={styles["no-results"]}>
        <Help /> Sorry, no results. Please try another page or year
      </Typography>
    );
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
      .map((row, ind) => {
        return (
          <TableRow
            className={styles["theme-table-row"]}
            hover
            role="checkbox"
            tabIndex={-1}
            style={{ cursor: onRowClick ? "pointer" : "inherit" }}
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
                >
                  {column.format
                    ? column.format(value, page * rowsPerPage + ind)
                    : value}
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
        labelRowsPerPage={"Rows"}
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
