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
import {
  APIData,
  Column,
  PreProcessData,
  Row,
  ScoreEntry,
  ScoreEntryUserName,
} from "./leaderboard-table.types";
const columns: readonly Column[] = [
  { id: "user", label: "Name", minWidth: 170 },
  { id: "totalTime", label: "Star1", minWidth: 100 },
  { id: "stars", label: "Star2", minWidth: 100 },
  { id: "score", label: "Score", minWidth: 100 },
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
    starTwo: "2021-11-22T20:25:09.290Z",
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
    starTwo: "2021-11-22T21:16:13.987Z",
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
          <TableRow hover role="checkbox" tabIndex={-1} key={row.user}>
            {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell key={column.id} align={column.align}>
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : value}
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
    const scores = calculateScores(data);
    var rowData = [];
    Object.entries(grouped).forEach((userEntry) => {
      // const stars = userEntry[1].map((x) => {
      //   return { one: x.starOne, two: x.starTwo };
      // });
      // const row: Row = {
      //   user: userEntry[0],
      //   stars: stars,
      // };
    });
  };

  const getPreProcessedData = (data: APIData[]) => {
    return data.map((x) => {
      const starOne = x.starOne ? new Date(x.starOne) : null;
      const starTwo = x.starTwo ? new Date(x.starTwo) : null;
      const startTime = x.startTime ? new Date(x.startTime) : null;
      return {
        day: x.day,
        year: x.year,
        username: x.username,
        starOne,
        starTwo,
        startTime,
        timeTakenMs: getTimeTaken(startTime, starOne, starTwo),
      } as PreProcessData;
    });
  };

  const getTimeTaken = (startTime: Date, starOne: Date, starTwo: Date) => {
    if (!startTime || !starOne) {
      return null;
    }
    return starTwo
      ? starTwo.valueOf() - startTime.valueOf()
      : starOne.valueOf() - startTime.valueOf();
  };

  const calculateScores = (data: PreProcessData[]) => {
    var result = new Map<string, ScoreEntry>();
    var days = _.sortBy(_.groupBy(data, "day"), ["timeTakenMs"], ["asc"]);
    var scoresPerDay = days.map((day) =>
      day.map((x, ind) => {
        return {
          score: day.length - ind,
          timeTakenMs: x.timeTakenMs,
          username: x.username,
        } as ScoreEntryUserName;
      })
    );
    scoresPerDay.forEach((day) =>
      day.forEach((x) => {
        var entry = result.get(x.username) ?? { score: 0, timeTakenMs: 0 };
        result.set(x.username, {
          score: entry.score + x.score,
          timeTakenMs: entry.timeTakenMs + x.timeTakenMs,
        });
      })
    );
    return result;
  };

  return (
    <Paper style={{ width: "100%", overflow: "hidden" }}>
      <TableContainer style={{ maxHeight: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{getRowsJSX([])}</TableBody>
        </Table>
      </TableContainer>
      {mapData(fakeData)}
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
