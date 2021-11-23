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
import _ from "lodash";
import React from "react";
import { calculateScores } from "./calculatescores";
import {
  miliSecondTableFormatter,
  starTableFormatter,
} from "./leaderboard-table-formatters";
import {
  APIData,
  Column,
  PreProcessData,
  Row,
  StarData,
} from "./leaderboard-table.types";
import styles from "./table.module.scss";

const columns: readonly Column[] = [
  { id: "user", label: "Name", minWidth: 170 },
  { id: "score", label: "Score", minWidth: 100 },

  {
    id: "stars",
    label: "Stars",
    minWidth: 100,
    format: starTableFormatter,
  },
  {
    id: "totalTime",
    label: "Total time",
    minWidth: 100,
    format: miliSecondTableFormatter,
  },
];

const fakeData: APIData[] = [
  {
    year: 2020,
    day: 1,
    username: "Rutgerdj",
    startTime: "2021-11-22T20:09:30.410Z",
    starOne: "2021-11-22T20:14:10.663Z",
    starTwo: "2021-11-22T20:15:13.987Z",
  },
  {
    year: 2020,
    day: 3,
    username: "Rutgerdj",
    startTime: "2021-11-22T20:28:28.960Z",
    starOne: null,
    starTwo: null,
  },
  {
    year: 2020,
    day: 2,
    username: "Rutgerdj",
    startTime: "2021-11-22T20:15:37.987Z",
    starOne: "2021-11-22T20:19:19.487Z",
    starTwo: null,
  },
  {
    year: 2020,
    day: 6,
    username: "Rutgerdj",
    startTime: "2021-11-22T20:42:54.260Z",
    starOne: null,
    starTwo: null,
  },
  {
    year: 2020,
    day: 1,
    username: "Lightning2x",
    startTime: "2021-11-22T20:09:30.410Z",
    starOne: "2021-11-22T20:15:10.663Z",
    starTwo: "2021-11-22T20:16:13.987Z",
  },
  {
    year: 2020,
    day: 3,
    username: "Lightning2x",
    startTime: "2021-11-22T20:28:28.960Z",
    starOne: "2021-11-22T21:15:10.663Z",
    starTwo: null,
  },
  {
    year: 2020,
    day: 2,
    username: "Lightning2x",
    startTime: "2021-11-22T20:15:37.987Z",
    starOne: "2021-11-22T21:19:19.487Z",
    starTwo: "2021-11-22T21:25:09.290Z",
  },
  {
    year: 2020,
    day: 6,
    username: "Lightning2x",
    startTime: "2021-11-22T20:42:54.260Z",
    starOne: null,
    starTwo: null,
  },
];

function LeaderBoardTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getRowsJSX = (rows: Row[]) => {
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

  const mapData = (input: APIData[]) => {
    const data = getPreProcessedData(input);
    var grouped = _.mapValues(_.groupBy(data, "username"), (list) =>
      list.map((user) => _.omit(user, "username"))
    );
    const scoreMap = calculateScores(data);
    var rowData = [] as Row[];
    Object.entries(grouped).forEach((userEntry) => {
      const stars = userEntry[1].map((x) => {
        return { day: x.day, one: !!x.starOne, two: !!x.starTwo } as StarData;
      });
      const row: Row = {
        user: userEntry[0],
        stars: _.sortBy(stars, ["day"], ["asc"]),
        score: scoreMap.get(userEntry[0])?.score,
        totalTime: scoreMap.get(userEntry[0])?.totalTimeTakenMs,
      };
      rowData.push(row);
    });

    return rowData;
  };

  const getPreProcessedData = (data: APIData[]) => {
    return (
      data
        // We do not care for anything that will not result in a score
        .filter((x) => x.starOne && x.startTime)
        .map((x) => {
          const startTime = new Date(x.startTime);
          const starOne = new Date(x.starOne);
          const starTwo = x.starTwo ? new Date(x.starTwo) : null;
          return {
            day: x.day,
            year: x.year,
            username: x.username,
            starOne,
            starTwo,
            startTime,
            timeTakenMsOne: getTimeTaken(startTime, starOne),
            timeTakenMsTwo: getTimeTaken(startTime, starTwo),
          } as PreProcessData;
        })
    );
  };

  const getTimeTaken = (startTime: Date, star: Date) => {
    if (!startTime || !star) {
      return null;
    }
    return star.valueOf() - startTime.valueOf();
  };

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
          <TableBody className={styles["theme-table-body"]}>
            {getRowsJSX(mapData(fakeData))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default LeaderBoardTable;
